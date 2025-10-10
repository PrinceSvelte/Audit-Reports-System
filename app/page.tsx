"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, Download, FileText } from "lucide-react"
import DocumentControlTables from "@/components/document-control-tables"
import EngagementScopeTable from "@/components/engagement-scope-table"
import AuditingTeamTable from "@/components/auditing-team-table"
import AuditActivitiesTable from "@/components/audit-activities-table"
import ToolsSoftwareTable from "@/components/tools-software-table"
import VulnerabilityTable from "@/components/vulnerability-table"
import DetailedObservationTable from "@/components/detailed-observation-table"
import AuditDetails from "@/components/audit-details"
import TableOfContents from "@/components/table-of-contents"
import EditableContentSection from "@/components/editable-content-section"
import SeverityTable from "@/components/severity-table"
import ConfirmationDialog from "@/components/confirmation-dialog"
import { generateWordDoc, type ExportData } from "@/lib/export-utils"
import { useToast } from "@/hooks/use-toast"
import { Packer } from "docx"
import jsPDF from "jspdf"
import "jspdf-autotable"
import EditableHeader from "@/components/editable-header"
// Import report saving utilities
import { saveReportToDatabase, extractScreenshotKeys } from "@/lib/report-storage"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// Declare the autoTable method for TypeScript
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}

export default function AuditReportSystem() {
  // Refs to get data from child components
  const documentControlRef = useRef<any>(null)
  const engagementScopeRef = useRef<any>(null)
  const auditingTeamRef = useRef<any>(null)
  const auditActivitiesRef = useRef<any>(null)
  const toolsSoftwareRef = useRef<any>(null)
  const vulnerabilityRef = useRef<any>(null)
  const detailedObservationRef = useRef<any>(null)

  // Modern color palette
  const colors = {
    primary: { r: 37, g: 99, b: 235 }, // Modern blue
    secondary: { r: 124, g: 58, b: 237 }, // Purple
    accent: { r: 5, g: 150, b: 105 }, // Emerald
    warning: { r: 217, g: 119, b: 6 }, // Amber
    danger: { r: 220, g: 38, b: 38 }, // Red
    dark: { r: 31, g: 41, b: 55 }, // Dark gray
    medium: { r: 107, g: 114, b: 128 }, // Medium gray
    light: { r: 248, g: 250, b: 252 }, // Light gray
    white: { r: 255, g: 255, b: 255 },
  }

  // Severity color mapping
  const severityColors = {
    Critical: colors.danger,
    High: { r: 234, g: 88, b: 12 },
    Medium: colors.warning,
    Low: { r: 101, g: 163, b: 13 },
    Info: colors.primary,
  }

  const generatePDF = async (data: any) => {
    const pdf = new jsPDF("p", "mm", "a4")
    let yPosition = 20

    // Helper function to add gradient header
    const addGradientHeader = (text: string, y = yPosition) => {
      // Create gradient background effect
      pdf.setFillColor(colors.primary.r, colors.primary.g, colors.primary.b)
      pdf.rect(20, y - 5, 170, 12, "F")

      // Add purple overlay for gradient effect
      pdf.setFillColor(colors.secondary.r, colors.secondary.g, colors.secondary.b)
      pdf.rect(20, y - 5, 170, 12, "F")

      // Add text
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(16)
      pdf.setFont("helvetica", "bold")
      pdf.text(text, 25, y + 2)

      return y + 20
    }

    // Helper function to add section header
    const addSectionHeader = (text: string, y = yPosition, color = colors.primary) => {
      pdf.setFillColor(color.r, color.g, color.b)
      pdf.rect(20, y - 3, 170, 8, "F")

      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(12)
      pdf.setFont("helvetica", "bold")
      pdf.text(text, 25, y + 2)

      return y + 15
    }

    // Helper function to check if new page is needed
    const checkNewPage = (requiredSpace = 20) => {
      if (yPosition + requiredSpace > 280) {
        pdf.addPage()
        yPosition = 20
        return true
      }
      return false
    }

    // Custom table drawing function with better multi-line header support and proper padding
    const drawTable = (
      headers: string[],
      rows: string[][],
      startY: number,
      columnWidths: number[],
      headerColor = colors.primary,
      multiLineHeaders = false,
    ) => {
      let currentY = startY
      const baseRowHeight = 10 // Increased from 8 to 10 for better spacing
      const cellPadding = 3 // Increased from 2 to 3 for better padding
      const lineHeight = 3.5 // Increased from 3 to 3.5 for better readability
      const minHeaderHeight = multiLineHeaders ? 18 : 10 // Increased minimum heights

      // Calculate header height based on content
      let headerHeight = minHeaderHeight
      if (multiLineHeaders) {
        headers.forEach((header, index) => {
          const availableWidth = columnWidths[index] - cellPadding * 2
          const lines = pdf.splitTextToSize(header, availableWidth)
          const requiredHeight = lines.length * lineHeight + cellPadding * 2
          headerHeight = Math.max(headerHeight, requiredHeight)
        })
      }

      // Draw header background
      pdf.setFillColor(headerColor.r, headerColor.g, headerColor.b)
      pdf.rect(
        20,
        currentY,
        columnWidths.reduce((a, b) => a + b, 0),
        headerHeight,
        "F",
      )

      // Draw header text with proper padding
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(7)
      pdf.setFont("helvetica", "bold")

      let currentX = 20
      headers.forEach((header, index) => {
        const availableWidth = columnWidths[index] - cellPadding * 2
        const lines = pdf.splitTextToSize(header, availableWidth)

        if (multiLineHeaders) {
          // Center text vertically with proper padding
          const totalTextHeight = lines.length * lineHeight
          const startTextY = currentY + cellPadding + lineHeight - 0.5

          lines.forEach((line: string, lineIndex: number) => {
            pdf.text(line, currentX + cellPadding, startTextY + lineIndex * lineHeight)
          })
        } else {
          // Single line header - vertically centered
          pdf.text(header, currentX + cellPadding, currentY + headerHeight / 2 + 1.5)
        }
        currentX += columnWidths[index]
      })

      currentY += headerHeight

      // Store row heights for border drawing
      const rowHeights: number[] = []

      // Draw rows
      pdf.setTextColor(colors.dark.r, colors.dark.g, colors.dark.b)
      pdf.setFontSize(6)
      pdf.setFont("helvetica", "normal")

      rows.forEach((row, rowIndex) => {
        // Calculate row height based on content with better padding
        let rowHeight = baseRowHeight
        row.forEach((cell, cellIndex) => {
          const availableWidth = columnWidths[cellIndex] - cellPadding * 2
          const lines = pdf.splitTextToSize(cell.toString(), availableWidth)
          const requiredHeight = lines.length * lineHeight + cellPadding * 2
          rowHeight = Math.max(rowHeight, requiredHeight)
        })

        rowHeights.push(rowHeight)

        // Alternate row colors
        if (rowIndex % 2 === 0) {
          pdf.setFillColor(colors.light.r, colors.light.g, colors.light.b)
          pdf.rect(
            20,
            currentY,
            columnWidths.reduce((a, b) => a + b, 0),
            rowHeight,
            "F",
          )
        }

        currentX = 20
        row.forEach((cell, cellIndex) => {
          // Special handling for severity column
          if (headers[cellIndex] === "Severity" && severityColors[cell as keyof typeof severityColors]) {
            const severityColor = severityColors[cell as keyof typeof severityColors]
            pdf.setFillColor(severityColor.r, severityColor.g, severityColor.b)
            pdf.rect(currentX, currentY, columnWidths[cellIndex], rowHeight, "F")
            pdf.setTextColor(255, 255, 255)
            pdf.setFont("helvetica", "bold")
          } else {
            pdf.setTextColor(colors.dark.r, colors.dark.g, colors.dark.b)
            pdf.setFont("helvetica", "normal")
          }

          // Wrap text with proper padding
          const availableWidth = columnWidths[cellIndex] - cellPadding * 2
          const lines = pdf.splitTextToSize(cell.toString(), availableWidth)

          // Start text with top padding
          const startTextY = currentY + cellPadding + lineHeight - 0.5

          // Draw each line with consistent spacing
          lines.forEach((line: string, lineIndex: number) => {
            const textY = startTextY + lineIndex * lineHeight
            // Only draw if text fits within cell
            if (textY <= currentY + rowHeight - cellPadding) {
              pdf.text(line, currentX + cellPadding, textY)
            }
          })

          currentX += columnWidths[cellIndex]
        })

        currentY += rowHeight
      })

      // Draw table borders
      pdf.setDrawColor(200, 200, 200)
      pdf.setLineWidth(0.5)

      // Horizontal lines
      let borderY = startY
      pdf.line(20, borderY, 20 + columnWidths.reduce((a, b) => a + b, 0), borderY) // Top border
      borderY += headerHeight
      pdf.line(20, borderY, 20 + columnWidths.reduce((a, b) => a + b, 0), borderY) // Header bottom

      rowHeights.forEach((height) => {
        borderY += height
        pdf.line(20, borderY, 20 + columnWidths.reduce((a, b) => a + b, 0), borderY)
      })

      // Vertical lines
      currentX = 20
      for (let i = 0; i <= columnWidths.length; i++) {
        pdf.line(currentX, startY, currentX, currentY)
        if (i < columnWidths.length) {
          currentX += columnWidths[i]
        }
      }

      return currentY + 10
    }

    // Add content section
    const addContentSection = (title: string, content: string, color = colors.primary) => {
      if (!content) return // Skip empty content

      checkNewPage(60)
      yPosition = addSectionHeader(title, yPosition, color)

      pdf.setTextColor(colors.dark.r, colors.dark.g, colors.dark.b)
      pdf.setFontSize(10)
      pdf.setFont("helvetica", "normal")

      const lines = pdf.splitTextToSize(content, 170)
      lines.forEach((line: string) => {
        checkNewPage(10)
        pdf.text(line, 25, yPosition)
        yPosition += 5
      })
      yPosition += 10
    }

    // Cover Page with Audit Details - Modern Design
    const addCoverPage = () => {
      pdf.setFillColor(255, 255, 255)
      pdf.rect(0, 0, 210, 297, "F")

      // Simple blue header bar
      pdf.setFillColor(colors.primary.r, colors.primary.g, colors.primary.b)
      pdf.rect(0, 0, 210, 40, "F")

      // Title
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(28)
      pdf.setFont("helvetica", "bold")
      pdf.text("SECURITY AUDIT REPORT", 105, 25, { align: "center" })

      // Main content area
      pdf.setTextColor(colors.dark.r, colors.dark.g, colors.dark.b)
      pdf.setFontSize(16)
      pdf.setFont("helvetica", "normal")
      pdf.text("Comprehensive Security Assessment", 105, 70, { align: "center" })

      // Simple divider
      pdf.setDrawColor(colors.primary.r, colors.primary.g, colors.primary.b)
      pdf.setLineWidth(0.5)
      pdf.line(40, 85, 170, 85)

      // Audit details in simple format
      pdf.setFontSize(12)
      pdf.setFont("helvetica", "bold")

      const auditDetailsText = [
        { label: "Release Date:", value: data.auditDetails?.reportReleaseDate || "Not specified" },
        { label: "Audit Type:", value: data.auditDetails?.typeOfAudit || "Not specified" },
        { label: "Report Type:", value: data.auditDetails?.typeOfAuditReport || "Not specified" },
        { label: "Period:", value: data.auditDetails?.period || "Not specified" },
      ]

      auditDetailsText.forEach((item, index) => {
        const yPos = 110 + index * 20
        pdf.setFont("helvetica", "bold")
        pdf.setTextColor(colors.dark.r, colors.dark.g, colors.dark.b)
        pdf.text(item.label, 50, yPos)
        pdf.setFont("helvetica", "normal")
        pdf.text(item.value, 100, yPos)
      })

      // Footer
      pdf.setFontSize(10)
      pdf.setTextColor(colors.medium.r, colors.medium.g, colors.medium.b)
      pdf.text("CONFIDENTIAL", 105, 250, { align: "center" })
      pdf.setFontSize(9)
      pdf.text(`Generated on ${new Date().toLocaleDateString()}`, 105, 260, { align: "center" })

      pdf.addPage()
      yPosition = 20
    }

    // Table of Contents
    const addTableOfContents = () => {
      yPosition = addGradientHeader("TABLE OF CONTENTS")

      const tocItems = [
        { title: "1. Document Preparation", page: 3 },
        { title: "2. Change History", page: 4 },
        { title: "3. Distribution List", page: 5 },
        { title: "4. Introduction", page: 6 },
        { title: "5. Engagement Scope", page: 7 },
        { title: "6. Auditing Team", page: 8 },
        { title: "7. Audit Activities", page: 9 },
        { title: "8. Audit Methodology", page: 10 },
        { title: "9. Pre-engagement", page: 11 },
        { title: "10. Engagement", page: 12 },
        { title: "11. Post-Engagement", page: 13 },
        { title: "12. Risk Assessment Methodology", page: 14 },
        { title: "13. Tools & Software", page: 15 },
        { title: "14. Executive Summary", page: 16 },
        { title: "15. Vulnerabilities Summary", page: 17 },
        { title: "16. Detailed Observations", page: 18 },
      ]

      pdf.setTextColor(colors.dark.r, colors.dark.g, colors.dark.b)
      pdf.setFontSize(11)

      tocItems.forEach((item) => {
        pdf.setFont("helvetica", "normal")
        pdf.text(item.title, 25, yPosition)

        // Dotted line
        const titleWidth = pdf.getTextWidth(item.title)
        const pageWidth = pdf.getTextWidth(item.page.toString())
        const dotsWidth = 165 - titleWidth - pageWidth
        const dotsCount = Math.floor(dotsWidth / 2)
        pdf.text(".".repeat(dotsCount), 25 + titleWidth + 2, yPosition)

        pdf.setFont("helvetica", "bold")
        pdf.text(item.page.toString(), 170, yPosition)

        yPosition += 8
      })

      pdf.addPage()
      yPosition = 20
    }

    // Document Preparation
    const addDocumentPreparation = () => {
      if (!data.visibleSections.documentControl) return

      checkNewPage(60)
      yPosition = addSectionHeader(data.headers.documentControl || "1. DOCUMENT PREPARATION", yPosition, colors.primary)

      const tableData = data.documentPreparation?.map((item: any) => [item.field, item.value]) || []
      if (tableData.length > 0) {
        yPosition = drawTable(["Field", "Value"], tableData, yPosition, [60, 110], colors.primary)
      }
    }

    // Change History
    const addChangeHistory = () => {
      if (!data.visibleSections.documentControl) return

      checkNewPage(60)
      yPosition = addSectionHeader("2. DOCUMENT CHANGE HISTORY", yPosition, colors.secondary)

      const tableData = data.changeHistory?.map((item: any) => [item.version, item.date, item.remarks]) || []
      if (tableData.length > 0) {
        yPosition = drawTable(["Version", "Date", "Remarks"], tableData, yPosition, [25, 35, 110], colors.secondary)
      }
    }

    // Distribution List
    const addDistributionList = () => {
      if (!data.visibleSections.documentControl) return

      checkNewPage(60)
      yPosition = addSectionHeader("3. DISTRIBUTION LIST", yPosition, colors.accent)

      const tableData = data.distributionList?.map((item: any) => [item.name, item.designation, item.email]) || []
      if (tableData.length > 0) {
        yPosition = drawTable(["Name", "Designation", "Email"], tableData, yPosition, [50, 60, 60], colors.accent)
      }
    }

    // Engagement Scope with multi-line headers
    const addEngagementScope = () => {
      if (!data.visibleSections.engagementScope) return

      checkNewPage(80)
      yPosition = addSectionHeader(data.headers.engagementScope || "5. ENGAGEMENT SCOPE", yPosition, colors.warning)

      const tableData =
        data.engagementScope?.map((item: any) => [
          item.sNo,
          item.assetDescription,
          item.criticality,
          item.internalIP,
          item.url,
          item.publicIP,
          item.location,
          item.hashValue,
          item.version,
          item.otherDetails,
        ]) || []

      if (tableData.length > 0) {
        const headers = [
          "S.No",
          "Asset Description",
          "Criticality of Asset",
          "Internal IP Address",
          "URL",
          "Public IP Address",
          "Location",
          "Hash Value (applications)",
          "Version (applications)",
          "Other Details (devices)",
        ]

        yPosition = drawTable(
          headers,
          tableData,
          yPosition,
          [12, 20, 18, 18, 25, 18, 15, 18, 18, 28],
          colors.warning,
          true, // Enable multi-line headers
        )
      }
    }

    // Auditing Team
    const addAuditingTeam = () => {
      if (!data.visibleSections.auditingTeam) return

      checkNewPage(60)
      yPosition = addSectionHeader(data.headers.auditingTeam || "6. AUDITING TEAM", yPosition, colors.primary)

      const tableData =
        data.auditingTeam?.map((item: any) => [
          item.sNo,
          item.name,
          item.designation,
          item.email,
          item.qualifications,
          item.certInListed,
        ]) || []

      if (tableData.length > 0) {
        const headers = ["S.No", "Name", "Designation", "Email", "Qualifications", "CERT-In Listed"]
        yPosition = drawTable(headers, tableData, yPosition, [12, 30, 25, 35, 35, 23], colors.primary, true)
      }
    }

    // Audit Activities
    const addAuditActivities = () => {
      if (!data.visibleSections.auditActivities) return

      checkNewPage(60)
      yPosition = addSectionHeader(data.headers.auditActivities || "7. AUDIT ACTIVITIES", yPosition, colors.secondary)

      const tableData = data.auditActivities?.map((item: any) => [item.phase, item.description, item.timeline]) || []
      if (tableData.length > 0) {
        yPosition = drawTable(
          ["Phase", "Description", "Timeline"],
          tableData,
          yPosition,
          [40, 110, 20],
          colors.secondary,
        )
      }
    }

    // Tools & Software
    const addToolsSoftware = () => {
      if (!data.visibleSections.toolsSoftware) return

      checkNewPage(60)
      yPosition = addSectionHeader(data.headers.toolsSoftware || "13. TOOLS & SOFTWARE", yPosition, colors.accent)

      const tableData = data.toolsSoftware?.map((item: any) => [item.sNo, item.name, item.version, item.license]) || []
      if (tableData.length > 0) {
        yPosition = drawTable(
          ["S.No", "Tool Name", "Version", "License"],
          tableData,
          yPosition,
          [15, 70, 50, 35],
          colors.accent,
        )
      }
    }

    // Executive Summary
    const addExecutiveSummary = () => {
      checkNewPage(180)
      yPosition = addSectionHeader("14. EXECUTIVE SUMMARY", yPosition, colors.dark)

      // Add executive summary text
      pdf.setTextColor(colors.dark.r, colors.dark.g, colors.dark.b)
      pdf.setFontSize(11)
      pdf.setFont("helvetica", "normal")

      const executiveSummaryText = `The objective of this assessment was to assess the immunity level, discover weak links and provide recommendations and guidelines to vulnerable entities discovered.

Some of the evidence found during the assessment are used in this report to support the findings and recommendations of this assessment.`

      const lines = pdf.splitTextToSize(executiveSummaryText, 170)
      lines.forEach((line: string) => {
        pdf.text(line, 25, yPosition)
        yPosition += 5
      })

      yPosition += 15

      // Summary statistics
      const totalVulns = data.vulnerabilities?.length || 0
      const criticalCount = data.vulnerabilities?.filter((v: any) => v.severity === "Critical").length || 0
      const highCount = data.vulnerabilities?.filter((v: any) => v.severity === "High").length || 0
      const mediumCount = data.vulnerabilities?.filter((v: any) => v.severity === "Medium").length || 0
      const lowCount = data.vulnerabilities?.filter((v: any) => v.severity === "Low").length || 0

      // Risk Matrix Chart - Fixed dimensions
      checkNewPage(100)

      // Chart background - smaller and centered
      const chartX = 35
      const chartY = yPosition
      const chartWidth = 140
      const chartHeight = 70

      // Dark background
      pdf.setFillColor(60, 60, 60)
      pdf.rect(chartX, chartY, chartWidth, chartHeight, "F")

      // Chart title
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(14)
      pdf.setFont("helvetica", "bold")
      pdf.text("Risk Matrix", chartX + chartWidth / 2, chartY + 12, { align: "center" })

      // Chart data
      const chartData = [
        { label: "Critical", count: criticalCount, color: [220, 38, 38] },
        { label: "High", count: highCount, color: [234, 88, 12] },
        { label: "Medium", count: mediumCount, color: [217, 119, 6] },
        { label: "Low", count: lowCount, color: [101, 163, 13] },
      ]

      // Find max value for scaling
      const maxCount = Math.max(...chartData.map((d) => d.count), 1)

      // Bar chart - adjusted dimensions
      const barWidth = 20
      const barSpacing = 10
      const maxBarHeight = 35
      const chartStartX = chartX + 20
      const chartStartY = chartY + 50

      chartData.forEach((item, index) => {
        const barX = chartStartX + index * (barWidth + barSpacing)
        const barHeight = (item.count / maxCount) * maxBarHeight
        const barY = chartStartY - barHeight

        // Draw bar
        pdf.setFillColor(item.color[0], item.color[1], item.color[2])
        pdf.rect(barX, barY, barWidth, barHeight, "F")

        // Draw count on top of bar
        pdf.setTextColor(255, 255, 255)
        pdf.setFontSize(9)
        pdf.setFont("helvetica", "bold")
        pdf.text(item.count.toString(), barX + barWidth / 2, barY - 2, { align: "center" })

        // Draw label below bar
        pdf.setFontSize(8)
        pdf.text(item.label, barX + barWidth / 2, chartStartY + 6, { align: "center" })
      })

      // Y-axis labels - smaller scale
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(7)
      const maxScale = Math.ceil(maxCount / 5) * 5 || 5
      for (let i = 0; i <= maxScale; i += Math.ceil(maxScale / 5)) {
        const y = chartStartY - (i / maxCount) * maxBarHeight
        pdf.text(i.toString(), chartStartX - 5, y, { align: "right" })

        // Grid lines
        if (i > 0) {
          pdf.setDrawColor(100, 100, 100)
          pdf.setLineWidth(0.2)
          pdf.line(chartStartX, y, chartStartX + 4 * (barWidth + barSpacing) - barSpacing, y)
        }
      }

      // Legend - below chart
      const legendY = chartY + chartHeight + 8
      pdf.setTextColor(colors.dark.r, colors.dark.g, colors.dark.b)
      pdf.setFontSize(8)

      chartData.forEach((item, index) => {
        const legendX = chartX + 10 + index * 32

        // Legend color box
        pdf.setFillColor(item.color[0], item.color[1], item.color[2])
        pdf.rect(legendX, legendY, 3, 3, "F")

        // Legend text
        pdf.text(item.label, legendX + 5, legendY + 2)
      })

      yPosition = legendY + 15

      // Summary text
      pdf.setTextColor(colors.dark.r, colors.dark.g, colors.dark.b)
      pdf.setFontSize(10)
      pdf.setFont("helvetica", "normal")

      const summaryText = `This security assessment identified ${totalVulns} vulnerabilities across the tested systems. The findings include ${criticalCount} critical, ${highCount} high, ${mediumCount} medium, and ${lowCount} low severity issues that require attention and remediation according to the recommended timelines.`

      const summaryLines = pdf.splitTextToSize(summaryText, 170)
      summaryLines.forEach((line: string) => {
        pdf.text(line, 25, yPosition)
        yPosition += 5
      })

      yPosition += 10
    }

    // Vulnerabilities Summary with multi-line headers
    const addVulnerabilitiesSummary = () => {
      if (!data.visibleSections.vulnerability) return

      checkNewPage(100)
      yPosition = addSectionHeader(
        data.headers.vulnerability || "15. VULNERABILITIES SUMMARY",
        yPosition,
        colors.danger,
      )

      const tableData =
        data.vulnerabilities?.map((item: any, index: number) => [
          (index + 1).toString(),
          item.affectedAsset || "",
          item.observation || "",
          item.cve || "",
          item.controlObjective || "",
          item.controlName || "",
          item.auditRequirement || "",
          item.severity || "",
          item.recommendation || "",
          item.reference || "",
          item.newOrRepeat || "",
        ]) || []

      if (tableData.length > 0) {
        const headers = [
          "S.No",
          "Affected Asset i.e., IP/URL/Application",
          "Observation/Vulnerability title",
          "CVE/CWE",
          "Control Objective",
          "Control Name",
          "Audit Requirement",
          "Severity",
          "Recommendation",
          "Reference",
          "New or Repeat observation",
        ]

        yPosition = drawTable(
          headers,
          tableData,
          yPosition,
          [8, 18, 22, 12, 18, 18, 18, 12, 22, 18, 14],
          colors.danger,
          true, // Enable multi-line headers
        )
      }
    }

    // Detailed Observations with images
    const addDetailedObservations = async () => {
      if (
        !data.visibleSections.detailedObservation ||
        !data.detailedObservations ||
        data.detailedObservations.length === 0
      )
        return

      for (const obs of data.detailedObservations) {
        const index = data.detailedObservations.indexOf(obs)
        pdf.addPage()
        yPosition = 20

        yPosition = addSectionHeader(
          `${data.headers.detailedObservation || "16. DETAILED OBSERVATION"} - ${index + 1}`,
          yPosition,
          colors.dark,
        )

        // Observation details table
        const obsData = [
          ["Vulnerability Title", obs.vulnerabilityTitle || "N/A"],
          ["Affected Asset", obs.affectedAsset || "N/A"],
          ["Detailed Observation", obs.detailedObservation || "N/A"],
          ["CVE/CWE", obs.cve || "N/A"],
          ["Control Objective", obs.controlObjective || "N/A"],
          ["Control Name", obs.controlName || "N/A"],
          ["Audit Requirement", obs.auditRequirement || "N/A"],
          ["Severity", obs.severity || "N/A"],
          ["Recommendation", obs.recommendation || "N/A"],
          ["Reference", obs.reference || "N/A"],
          ["New/Repeat", obs.newOrRepeat || "N/A"],
        ]

        yPosition = drawTable(["Field", "Details"], obsData, yPosition, [50, 120], colors.dark)

        if (obs.proofOfConcepts && obs.proofOfConcepts.length > 0) {
          checkNewPage(40)
          yPosition = addSectionHeader("Proof of Concept", yPosition, colors.medium)

          for (const poc of obs.proofOfConcepts) {
            checkNewPage(30)

            // Add step description
            pdf.setTextColor(colors.dark.r, colors.dark.g, colors.dark.b)
            pdf.setFontSize(10)
            pdf.setFont("helvetica", "bold")
            pdf.text(`${poc.step} ${poc.description}`, 25, yPosition)
            yPosition += 10

            // Add images if available
            if (poc.images && poc.images.length > 0) {
              for (let imgIndex = 0; imgIndex < poc.images.length; imgIndex++) {
                const image = poc.images[imgIndex]
                checkNewPage(90)

                try {
                  // Convert File to base64 data URL
                  const imgData = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader()
                    reader.onload = () => {
                      const result = reader.result as string
                      resolve(result)
                    }
                    reader.onerror = () => reject(new Error("Failed to read image"))
                    reader.readAsDataURL(image)
                  })

                  // Determine image format
                  const imageFormat = image.type.includes("png") ? "PNG" : "JPEG"

                  // Add image to PDF with proper sizing
                  const imgWidth = 160
                  const imgHeight = 80

                  pdf.addImage(imgData, imageFormat, 25, yPosition, imgWidth, imgHeight)

                  // Add image caption
                  pdf.setFontSize(8)
                  pdf.setTextColor(colors.medium.r, colors.medium.g, colors.medium.b)
                  pdf.text(`Screenshot: ${image.name}`, 25, yPosition + imgHeight + 5)

                  yPosition += imgHeight + 15
                } catch (err) {
                  console.error("[v0] Error adding image to PDF:", err)
                  // Add error message in PDF
                  pdf.setFontSize(9)
                  pdf.setTextColor(colors.danger.r, colors.danger.g, colors.danger.b)
                  pdf.text(`[Image could not be loaded: ${image.name}]`, 25, yPosition)
                  yPosition += 10
                }
              }
            }
            yPosition += 10
          }
        }
      }
    }

    // Generate all sections
    addCoverPage()

    if (data.visibleSections.tableOfContents) {
      addTableOfContents()
    }

    addDocumentPreparation()
    addChangeHistory()
    addDistributionList()

    // Add content sections only if visible and have content
    if (data.visibleSections.introduction) {
      addContentSection(data.headers.introduction || "4. INTRODUCTION", data.editableContent?.introduction || "")
    }

    addEngagementScope()
    addAuditingTeam()
    addAuditActivities()

    if (data.visibleSections.auditMethodology) {
      addContentSection(
        data.headers.auditMethodology || "8. AUDIT METHODOLOGY",
        data.editableContent?.auditMethodology || "",
      )
    }

    if (data.visibleSections.preEngagement) {
      addContentSection(data.headers.preEngagement || "9. PRE-ENGAGEMENT", data.editableContent?.preEngagement || "")
    }

    if (data.visibleSections.engagement) {
      addContentSection(data.headers.engagement || "10. ENGAGEMENT", data.editableContent?.engagement || "")
    }

    if (data.visibleSections.postEngagement) {
      addContentSection(
        data.headers.postEngagement || "11. POST-ENGAGEMENT",
        data.editableContent?.postEngagement || "",
      )
    }

    if (data.visibleSections.riskMethodology) {
      addContentSection(
        data.headers.riskMethodology || "12. RISK ASSESSMENT METHODOLOGY",
        data.editableContent?.riskMethodology || "",
      )
    }

    addToolsSoftware()
    addExecutiveSummary()
    addVulnerabilitiesSummary()
    await addDetailedObservations()

    // Remove page numbers and footers from PDF
    // (The previous code that added page numbers has been removed)

    return pdf
  }

  const [visibleTables, setVisibleTables] = useState({
    documentControl: true,
    tableOfContents: true,
    introduction: true,
    engagementScope: true,
    auditingTeam: true,
    auditActivities: true,
    auditMethodology: true,
    preEngagement: true,
    engagement: true,
    postEngagement: true,
    riskMethodology: true,
    toolsSoftware: true,
    vulnerability: true,
    detailedObservation: true,
  })

  const [auditDetails, setAuditDetails] = useState({
    reportReleaseDate: "",
    typeOfAudit: "",
    typeOfAuditReport: "",
    period: "",
  })

  const [editableContent, setEditableContent] = useState({
    introduction: `The audit engagement focuses on evaluating the effectiveness and adequacy of information security measures implemented across various domains. This includes assessing compliance with industry standards and regulatory frameworks such as PCI DSS, ISO 27001, and Cert-In guidelines. Key services under review may include vulnerability assessments and penetration testing of Web. The audit also considers any applicable exemptions or limitations, and where sampling is used, it follows a risk-based methodology to ensure a representative and efficient evaluation of the security controls in place.`,

    auditMethodology: `Assessment Type

Testing Team follows the OWASP Top 10, SANS top 25 standards, ISO/IEC, Cyber Security Audit Baseline Requirements, other standards like OSSTMM (Open-Source Security Testing Methodology Manual) and framework like NIST Cybersecurity Framework (CSF) 2.0 in security methodology.

The Open Web Application Security Project (OWASP) is a worldwide free and open community focused on improving the security of application software. OWASP's mission is to make application security "visible," so that people and organizations can make informed decisions about application security risks.

The SANS Top 25 is a list of the most critical software vulnerabilities and exposures that are actively being exploited. It is compiled by the SANS Institute, a leading cybersecurity training and research organization.`,

    preEngagement: `1. Pre-engagement

Discovery Meeting

This step is optional.
The Discovery Meeting is an initial interaction with the Testing Team that will perform the testing and, it is an opportunity for the customer to discuss the scope and the details of the Testing. Below is a list of some specific information that the Discovery Meeting will address. The customer will provide clarification about the information contained in the request if necessary. Based on the request, testing team will discuss and clarify the following:
• Review Scope of application and Rules of Engagement
• Projected schedule (start and end dates for the Testing)

a. Scoping: As a part of the scoping process, the organization should consider supplying the reviewer with the following documentation(s)/information(s):
• Architecture Diagram Document of application
• TSD (Technical Specification Document)
• Technology details of application like used framework, database version etc.

b. Rules of Engagement: Below are some examples of considerations that may be included in the rules of engagement:
• During what time window will testing need to be performed?
• Are there any legacy systems that have known issues with automated scanning? If so, how should testing be performed against these systems?
• Is there a preferred method of communicating about scope and issues encountered during the engagement?

As an outcome of the above activities, a detailed project plan was defined that covered the below areas:
• Scope
• Schedule
• Documented checklist and prerequisites`,

    engagement: `2. Engagement
a. Functional Walkthrough of Scope

A functional walkthrough of the scope is a form of peer review in which a designer or programmer leads members of the development team and other interested parties through an application and the security reviewer asks questions about each function of the application and makes comments about possible vulnerabilities. The main purpose of walkthrough is to enable the learning of actual functionality/working of scope.

b. Scan Using Baseline

Perform automated testing of application using various automated tools and plugins.

c. Perform Manual Testing

Manual Testing is the process used to identify potential vulnerabilities. It is a tedious process that requires skill, experience, persistence, and patience. Vulnerabilities discovered, and subsequently addressed through the manual process can greatly improve an organization's security posture.`,

    postEngagement: `3. Post-Engagement

The post-engagement stage contains various activities including reporting, presentation, remediation best practices, and retesting identified vulnerabilities. Assessments require that the annual reports show there are no "exploitable" vulnerabilities. At a minimum, test reports contain an executive summary, methodology, findings, and remediation activities. This report contains the following:
• Scan Manifest – It defines the scope of assessment.
• Contacts Details - Contact details of auditor(s) and reviewer.
• Revision history – It contains the version history of document.
• Executive Summary – Report for management and leadership team.
• Summary of Findings – High level information of found vulnerabilities.
• Methodology – Assessment type, risk rating methodology, and risk classification.
• Technical Detailed Report - This report outlines the results of the security assessment.
• This will help them to develop the mitigation plan in an efficient and effective manner.
  o Details of all the vulnerabilities found.
  o Description of each vulnerability.
  o Vulnerability Risk (Technical as well as business).
  o No of found affected instance(s).`,

    riskMethodology: `Risk Assessment Methodology

The risk rating is used to signify the level of risk due to gaps noted during the review and is based on a quantitative and qualitative criterion defined as follows:

CVSS 3.0 and 3.1 Base Calculator

Calculate CVSS From Metrics: CVSS takes Base, Temporal and Environmental metric values as individual parameters and returns scores for each, severity ratings for each, and a complete Vector String. The input parameters are:

• Attack Vector, Attack Complexity, Privileges Required, User Interaction, Scope, Confidentiality, Integrity, Availability,
• Exploitability, Remediation Level, Report Confidence,
• Confidentiality Requirement, Integrity Requirement, Availability Requirement,
• Modified Attack Vector, Modified Attack Complexity, Modified Privileges Required, Modified User Interaction, Modified Scope,
• Modified Confidentiality, Modified Integrity, Modified Availability

Assumptions

This report has been produced based on the output of the Security Assessment. All vulnerabilities have been highlighted in the report assuming that the utilities and other applications installed on the systems were being used for the business purpose, and accordingly the recommendation to mitigate those vulnerabilities have been made. It is, therefore, recommended that prior to action on the recommendation, following actions are taken:

• Ascertain whether a service or application for which vulnerability has been identified and recommendation is made is required in the system for business purpose. In case there is no requirement of such services or applications, the same may be removed or disabled following an appropriate process. Else, the recommendations are applied on the system.

• Appropriate backup and rollback plan are made prior to implementing the recommendation on the system.

• Vulnerabilities identified were as on the date testing conducted and also as per the scan policies (intrusive or non-intrusive) & plugins selected. There may be vulnerabilities which may exist and may not assess, since their exploits may lead to system downtime due to Denial of Service (DOS) attack. Also, the vulnerabilities identified after the scan date may also not form part of this report.`,
  })

  const [editableHeaders, setEditableHeaders] = useState({
    documentControl: "Document Control",
    tableOfContents: "Table of Contents",
    introduction: "Introduction",
    engagementScope: "Engagement Scope",
    auditingTeam: "Details of the Auditing Team",
    auditActivities: "Audit Activities and Timelines",
    auditMethodology: "Audit Methodology and Criteria / Standard referred for Audit",
    preEngagement: "Pre-engagement",
    engagement: "Engagement",
    postEngagement: "Post-Engagement",
    riskMethodology: "Risk Assessment Methodology",
    toolsSoftware: "Tools/Software Used",
    vulnerability: "Vulnerability Overview",
    detailedObservation: "Detailed Observation",
    documentPreparation: "Document Preparation",
    changeHistory: "Document Change History",
    distributionList: "Document Distribution List",
  })

  const updateEditableHeader = (key: keyof typeof editableHeaders, title: string) => {
    setEditableHeaders((prev) => ({
      ...prev,
      [key]: title,
    }))
  }

  const [showPdfDialog, setShowPdfDialog] = useState(false)
  const [showWordDialog, setShowWordDialog] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const { toast: shadcnToast } = useToast()

  const toggleTable = (tableKey: keyof typeof visibleTables) => {
    setVisibleTables((prev) => ({
      ...prev,
      [tableKey]: !prev[tableKey],
    }))
  }

  const updateEditableContent = (key: keyof typeof editableContent, content: string) => {
    setEditableContent((prev) => ({
      ...prev,
      [key]: content,
    }))
  }

  const deleteEditableContent = (key: keyof typeof editableContent) => {
    setEditableContent((prev) => ({
      ...prev,
      [key]: "",
    }))
    toggleTable(key as keyof typeof visibleTables)
  }

  // Function to collect all data from child components
  const collectAllData = () => {
    return {
      auditDetails,
      editableContent,
      headers: editableHeaders,
      visibleSections: visibleTables,
      documentPreparation: documentControlRef.current?.getDocumentPreparation() || [],
      changeHistory: documentControlRef.current?.getChangeHistory() || [],
      distributionList: documentControlRef.current?.getDistributionList() || [],
      engagementScope: engagementScopeRef.current?.getData() || [],
      auditingTeam: auditingTeamRef.current?.getData() || [],
      auditActivities: auditActivitiesRef.current?.getData() || [],
      toolsSoftware: toolsSoftwareRef.current?.getData() || [],
      vulnerabilities: vulnerabilityRef.current?.getData() || [],
      detailedObservations: detailedObservationRef.current?.getData() || [],
    }
  }

  const exportToPDF = async () => {
    setIsExporting(true)
    try {
      const exportData = collectAllData()
      const pdf = await generatePDF(exportData)

      const pdfBlob = pdf.output("blob")
      const screenshotKeys = extractScreenshotKeys(exportData.detailedObservations || [])

      // Save to database
      const saveResult = await saveReportToDatabase({
        pdfBlob,
        screenshotKeys,
        metadata: exportData.auditDetails,
      })

      if (saveResult.success) {
        console.log("[v0] Report saved to database:", saveResult.reportId)
        shadcnToast({
          title: "PDF Generated and Saved",
          description: `Report ID: ${saveResult.reportId}. Your report has been saved to the database.`,
        })
      } else {
        console.error("[v0] Failed to save report:", saveResult.error)
        shadcnToast({
          title: "PDF Generated (Not Saved)",
          description: "PDF created but failed to save to database. Download will proceed.",
          variant: "destructive",
        })
      }

      // Download PDF
      pdf.save(`security-audit-report-${new Date().toISOString().split("T")[0]}.pdf`)
    } catch (error) {
      console.error("PDF Export Error:", error)
      shadcnToast({
        title: "Export Failed",
        description: "There was an error generating the PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
      setShowPdfDialog(false)
    }
  }

  const exportToWord = async () => {
    setIsExporting(true)
    try {
      const exportData: ExportData = collectAllData()
      const doc = await generateWordDoc(exportData)
      const docBlob = await Packer.toBlob(doc)

      const url = URL.createObjectURL(docBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `audit-report-${new Date().toISOString().split("T")[0]}.docx`

      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      shadcnToast({
        title: "Word Document Generated",
        description: "Your audit report has been exported as Word document successfully.",
      })
    } catch (error) {
      console.error("Word Export Error:", error)
      shadcnToast({
        title: "Export Failed",
        description: "There was an error generating the Word document. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
      setShowWordDialog(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Audit Report System</h1>
              <p className="mt-2 opacity-90">Comprehensive security audit documentation</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowPdfDialog(true)}
                className="flex items-center gap-2 bg-white text-blue-600 hover:bg-gray-100"
                disabled={isExporting}
              >
                <FileText className="w-4 h-4" />
                {isExporting ? "Generating..." : "Export PDF"}
              </Button>
              {/* <Button
                onClick={() => setShowWordDialog(true)}
                variant="outline"
                className="flex items-center gap-2 border-white text-white hover:bg-white hover:text-blue-600"
                disabled={isExporting}
              >
                <Download className="w-4 h-4" />
                {isExporting ? "Generating..." : "Export Word"}
              </Button> */}
            </div>
          </div>
        </div>

        {/* Audit Details - Cover Page */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-blue-800">Audit Details - Cover Page</CardTitle>
          </CardHeader>
          <CardContent>
            <AuditDetails data={auditDetails} onChange={setAuditDetails} />
          </CardContent>
        </Card>

        {/* Document Control Tables - Page 2 */}
        {visibleTables.documentControl && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <EditableHeader
                title={editableHeaders.documentControl}
                onTitleChange={(title) => updateEditableHeader("documentControl", title)}
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => toggleTable("documentControl")}
                className="flex items-center gap-2 text-white"
              >
                <Trash2 className="w-4 h-4 text-white" />
                Delete Section
              </Button>
            </CardHeader>
            <CardContent>
              <DocumentControlTables
                ref={documentControlRef}
                headers={{
                  documentPreparation: editableHeaders.documentPreparation,
                  changeHistory: editableHeaders.changeHistory,
                  distributionList: editableHeaders.distributionList,
                }}
                onHeaderChange={(key, title) => updateEditableHeader(key as keyof typeof editableHeaders, title)}
              />
            </CardContent>
          </Card>
        )}

        {/* Table of Contents - Page 3 */}
        {visibleTables.tableOfContents && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <EditableHeader
                title={editableHeaders.tableOfContents}
                onTitleChange={(title) => updateEditableHeader("tableOfContents", title)}
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => toggleTable("tableOfContents")}
                className="flex items-center gap-2 text-white"
              >
                <Trash2 className="w-4 h-4 text-white" />
                Delete Section
              </Button>
            </CardHeader>
            <CardContent>
              <TableOfContents />
            </CardContent>
          </Card>
        )}

        {/* Introduction - Page 4 */}
        {visibleTables.introduction && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <EditableHeader
                title={editableHeaders.introduction}
                onTitleChange={(title) => updateEditableHeader("introduction", title)}
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteEditableContent("introduction")}
                className="flex items-center gap-2 text-white"
              >
                <Trash2 className="w-4 h-4 text-white" />
                Delete Section
              </Button>
            </CardHeader>
            <CardContent>
              <EditableContentSection
                title=""
                content={editableContent.introduction}
                onContentChange={(content) => updateEditableContent("introduction", content)}
                onDelete={() => deleteEditableContent("introduction")}
                className="border-0 shadow-none"
              />
            </CardContent>
          </Card>
        )}

        {/* Engagement Scope Table - Page 5 */}
        {visibleTables.engagementScope && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <EditableHeader
                title={editableHeaders.engagementScope}
                onTitleChange={(title) => updateEditableHeader("engagementScope", title)}
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => toggleTable("engagementScope")}
                className="flex items-center gap-2 text-white"
              >
                <Trash2 className="w-4 h-4 text-white" />
                Delete Table
              </Button>
            </CardHeader>
            <CardContent>
              <EngagementScopeTable ref={engagementScopeRef} />
            </CardContent>
          </Card>
        )}

        {/* Auditing Team Table - Page 6 */}
        {visibleTables.auditingTeam && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <EditableHeader
                title={editableHeaders.auditingTeam}
                onTitleChange={(title) => updateEditableHeader("auditingTeam", title)}
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => toggleTable("auditingTeam")}
                className="flex items-center gap-2 text-white"
              >
                <Trash2 className="w-4 h-4 text-white" />
                Delete Table
              </Button>
            </CardHeader>
            <CardContent>
              <AuditingTeamTable ref={auditingTeamRef} />
            </CardContent>
          </Card>
        )}

        {/* Audit Activities Table - Page 7 */}
        {visibleTables.auditActivities && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <EditableHeader
                title={editableHeaders.auditActivities}
                onTitleChange={(title) => updateEditableHeader("auditActivities", title)}
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => toggleTable("auditActivities")}
                className="flex items-center gap-2 text-white"
              >
                <Trash2 className="w-4 h-4 text-white" />
                Delete Table
              </Button>
            </CardHeader>
            <CardContent>
              <AuditActivitiesTable ref={auditActivitiesRef} />
            </CardContent>
          </Card>
        )}

        {/* Audit Methodology - Page 8 */}
        {visibleTables.auditMethodology && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <EditableHeader
                title={editableHeaders.auditMethodology}
                onTitleChange={(title) => updateEditableHeader("auditMethodology", title)}
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteEditableContent("auditMethodology")}
                className="flex items-center gap-2 text-white"
              >
                <Trash2 className="w-4 h-4 text-white" />
                Delete Section
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <EditableContentSection
                title=""
                content={editableContent.auditMethodology}
                onContentChange={(content) => updateEditableContent("auditMethodology", content)}
                onDelete={() => deleteEditableContent("auditMethodology")}
                className="border-0 shadow-none"
              />
              <SeverityTable />
            </CardContent>
          </Card>
        )}

        {/* Pre-engagement - Page 9 */}
        {visibleTables.preEngagement && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <EditableHeader
                title={editableHeaders.preEngagement}
                onTitleChange={(title) => updateEditableHeader("preEngagement", title)}
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteEditableContent("preEngagement")}
                className="flex items-center gap-2 text-white"
              >
                <Trash2 className="w-4 h-4 text-white" />
                Delete Section
              </Button>
            </CardHeader>
            <CardContent>
              <EditableContentSection
                title=""
                content={editableContent.preEngagement}
                onContentChange={(content) => updateEditableContent("preEngagement", content)}
                onDelete={() => deleteEditableContent("preEngagement")}
                className="border-0 shadow-none"
              />
            </CardContent>
          </Card>
        )}

        {/* Engagement - Page 10 */}
        {visibleTables.engagement && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <EditableHeader
                title={editableHeaders.engagement}
                onTitleChange={(title) => updateEditableHeader("engagement", title)}
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteEditableContent("engagement")}
                className="flex items-center gap-2 text-white"
              >
                <Trash2 className="w-4 h-4 text-white" />
                Delete Section
              </Button>
            </CardHeader>
            <CardContent>
              <EditableContentSection
                title=""
                content={editableContent.engagement}
                onContentChange={(content) => updateEditableContent("engagement", content)}
                onDelete={() => deleteEditableContent("engagement")}
                className="border-0 shadow-none"
              />
            </CardContent>
          </Card>
        )}

        {/* Post-Engagement */}
        {visibleTables.postEngagement && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <EditableHeader
                title={editableHeaders.postEngagement}
                onTitleChange={(title) => updateEditableHeader("postEngagement", title)}
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteEditableContent("postEngagement")}
                className="flex items-center gap-2 text-white"
              >
                <Trash2 className="w-4 h-4 text-white" />
                Delete Section
              </Button>
            </CardHeader>
            <CardContent>
              <EditableContentSection
                title=""
                content={editableContent.postEngagement}
                onContentChange={(content) => updateEditableContent("postEngagement", content)}
                onDelete={() => deleteEditableContent("postEngagement")}
                className="border-0 shadow-none"
              />
            </CardContent>
          </Card>
        )}

        {/* Risk Methodology */}
        {visibleTables.riskMethodology && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <EditableHeader
                title={editableHeaders.riskMethodology}
                onTitleChange={(title) => updateEditableHeader("riskMethodology", title)}
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteEditableContent("riskMethodology")}
                className="flex items-center gap-2 text-white"
              >
                <Trash2 className="w-4 h-4 text-white" />
                Delete Section
              </Button>
            </CardHeader>
            <CardContent>
              <EditableContentSection
                title=""
                content={editableContent.riskMethodology}
                onContentChange={(content) => updateEditableContent("riskMethodology", content)}
                onDelete={() => deleteEditableContent("riskMethodology")}
                className="border-0 shadow-none"
              />
            </CardContent>
          </Card>
        )}

        {/* Tools/Software Table */}
        {visibleTables.toolsSoftware && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <EditableHeader
                title={editableHeaders.toolsSoftware}
                onTitleChange={(title) => updateEditableHeader("toolsSoftware", title)}
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => toggleTable("toolsSoftware")}
                className="flex items-center gap-2 text-white"
              >
                <Trash2 className="w-4 h-4 text-white" />
                Delete Table
              </Button>
            </CardHeader>
            <CardContent>
              <ToolsSoftwareTable ref={toolsSoftwareRef} />
            </CardContent>
          </Card>
        )}

        {/* Vulnerability Table */}
        {visibleTables.vulnerability && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <EditableHeader
                title={editableHeaders.vulnerability}
                onTitleChange={(title) => updateEditableHeader("vulnerability", title)}
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => toggleTable("vulnerability")}
                className="flex items-center gap-2 text-white"
              >
                <Trash2 className="w-4 h-4 text-white" />
                Delete Table
              </Button>
            </CardHeader>
            <CardContent>
              <VulnerabilityTable ref={vulnerabilityRef} />
            </CardContent>
          </Card>
        )}

        {/* Detailed Observation Table */}
        {visibleTables.detailedObservation && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <EditableHeader
                title={editableHeaders.detailedObservation}
                onTitleChange={(title) => updateEditableHeader("detailedObservation", title)}
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => toggleTable("detailedObservation")}
                className="flex items-center gap-2 text-white"
              >
                <Trash2 className="w-4 h-4 text-white" />
                Delete Table
              </Button>
            </CardHeader>
            <CardContent>
              <DetailedObservationTable 
                ref={detailedObservationRef} 
                onObservationAdded={() => {
                  toast.success("Observation added successfully!")
                }}
              />
            </CardContent>
          </Card>
        )}

        {/* Confirmation Dialogs */}
        <ConfirmationDialog
          open={showPdfDialog}
          onOpenChange={setShowPdfDialog}
          title="Generate PDF Report"
          description="Are you sure you want to generate a PDF report? This will include all the current data in your tables and content sections."
          onConfirm={exportToPDF}
          confirmText="Generate PDF"
        />

        <ConfirmationDialog
          open={showWordDialog}
          onOpenChange={setShowWordDialog}
          title="Generate Word Document"
          description="Are you sure you want to generate a Word document? This will include all the current data in your tables and content sections."
          onConfirm={exportToWord}
          confirmText="Generate Word"
        />
      </div>
    </div>
  )
}