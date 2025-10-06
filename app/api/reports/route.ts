import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

function createClient() {
  const cookieStore = cookies()
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // Handle cookie setting errors
        }
      },
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { pdfData, screenshotKeys, reportMetadata } = body

    const supabase = createClient()

    const reportId = `report_${Date.now()}_${Math.random().toString(36).substring(7)}`

    console.log("[v0] Saving report to database...")
    console.log("[v0] Report ID:", reportId)

    const pdfBuffer = Buffer.from(pdfData, "base64")

    const { data: reportData, error: reportError } = await supabase
      .from("audit_reports")
      .insert({
        report_id: reportId,
        pdf_data: pdfBuffer,
        report_release_date: reportMetadata?.reportReleaseDate || null,
        type_of_audit: reportMetadata?.typeOfAudit || null,
        type_of_audit_report: reportMetadata?.typeOfAuditReport || null,
        period: reportMetadata?.period || null,
      })
      .select()
      .single()

    if (reportError) {
      console.error("[v0] Error saving report:", reportError)
      throw new Error(reportError.message)
    }

    if (screenshotKeys && screenshotKeys.length > 0) {
      const screenshotRecords = screenshotKeys.map((key: any) => ({
        report_id: reportId,
        observation_id: key.observationId,
        poc_id: key.pocId,
        image_index: key.imageIndex,
        file_name: key.fileName,
        file_size: key.fileSize,
        file_type: key.fileType,
        uploaded_at: key.uploadedAt,
      }))

      const { error: screenshotError } = await supabase.from("screenshot_keys").insert(screenshotRecords)

      if (screenshotError) {
        console.error("[v0] Error saving screenshot keys:", screenshotError)
        // Continue even if screenshot keys fail
      }
    }

    return NextResponse.json({
      success: true,
      reportId,
      message: "Report saved successfully",
      data: {
        reportId,
        createdAt: new Date().toISOString(),
        screenshotCount: screenshotKeys?.length || 0,
      },
    })
  } catch (error) {
    console.error("[v0] Error saving report:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to save report" },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const reportId = searchParams.get("reportId")

    if (!reportId) {
      return NextResponse.json({ success: false, error: "Report ID is required" }, { status: 400 })
    }

    const supabase = createClient()

    console.log("[v0] Fetching report:", reportId)

    const { data: reportData, error: reportError } = await supabase
      .from("audit_reports")
      .select("*")
      .eq("report_id", reportId)
      .single()

    if (reportError) {
      console.error("[v0] Error fetching report:", reportError)
      throw new Error(reportError.message)
    }

    const { data: screenshotData, error: screenshotError } = await supabase
      .from("screenshot_keys")
      .select("*")
      .eq("report_id", reportId)
      .order("observation_id", { ascending: true })
      .order("image_index", { ascending: true })

    if (screenshotError) {
      console.error("[v0] Error fetching screenshot keys:", screenshotError)
      // Continue without screenshot keys
    }

    const pdfBase64 = reportData.pdf_data ? Buffer.from(reportData.pdf_data).toString("base64") : null

    return NextResponse.json({
      success: true,
      data: {
        reportId: reportData.report_id,
        createdAt: reportData.created_at,
        pdfData: pdfBase64,
        screenshotKeys: screenshotData || [],
        metadata: {
          reportReleaseDate: reportData.report_release_date,
          typeOfAudit: reportData.type_of_audit,
          typeOfAuditReport: reportData.type_of_audit_report,
          period: reportData.period,
        },
      },
    })
  } catch (error) {
    console.error("[v0] Error fetching report:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to fetch report" },
      { status: 500 },
    )
  }
}
