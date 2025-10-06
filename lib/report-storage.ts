export interface ReportMetadata {
  reportReleaseDate: string
  typeOfAudit: string
  typeOfAuditReport: string
  period: string
}

export interface ScreenshotKey {
  observationId: string
  pocId: string
  imageIndex: number
  fileName: string
  fileSize: number
  fileType: string
  uploadedAt: string
}

export interface SaveReportParams {
  pdfBlob: Blob
  screenshotKeys: ScreenshotKey[]
  metadata: ReportMetadata
}

export interface SaveReportResponse {
  success: boolean
  reportId?: string
  pdfUrl?: string
  error?: string
}

/**
 * Saves a PDF report and screenshot metadata to the database
 */
export async function saveReportToDatabase(params: SaveReportParams): Promise<SaveReportResponse> {
  try {
    const { pdfBlob, screenshotKeys, metadata } = params

    // Convert PDF blob to base64 for transmission
    const pdfBase64 = await blobToBase64(pdfBlob)

    // Call API endpoint to save report
    const response = await fetch("/api/reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pdfData: pdfBase64,
        screenshotKeys,
        reportMetadata: metadata,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || "Failed to save report")
    }

    return {
      success: true,
      reportId: result.reportId,
      pdfUrl: result.data?.pdfUrl,
    }
  } catch (error) {
    console.error("[v0] Error in saveReportToDatabase:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

/**
 * Fetches a report from the database by ID
 */
export async function fetchReportFromDatabase(reportId: string) {
  try {
    const response = await fetch(`/api/reports?reportId=${reportId}`)
    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || "Failed to fetch report")
    }

    return result.data
  } catch (error) {
    console.error("[v0] Error fetching report:", error)
    throw error
  }
}

/**
 * Extracts screenshot keys from detailed observations
 */
export function extractScreenshotKeys(detailedObservations: any[]): ScreenshotKey[] {
  const screenshotKeys: ScreenshotKey[] = []

  detailedObservations.forEach((obs, obsIndex) => {
    if (obs.proofOfConcepts && obs.proofOfConcepts.length > 0) {
      obs.proofOfConcepts.forEach((poc: any, pocIndex: number) => {
        if (poc.images && poc.images.length > 0) {
          poc.images.forEach((image: File, imgIndex: number) => {
            screenshotKeys.push({
              observationId: `obs_${obsIndex}`,
              pocId: poc.id,
              imageIndex: imgIndex,
              fileName: image.name,
              fileSize: image.size,
              fileType: image.type,
              uploadedAt: new Date().toISOString(),
            })
          })
        }
      })
    }
  })

  return screenshotKeys
}

/**
 * Helper function to convert Blob to base64
 */
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result as string
      // Remove data URL prefix
      const base64Data = base64.split(",")[1]
      resolve(base64Data)
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}
