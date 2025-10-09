import {
  Document,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  HeadingLevel,
  AlignmentType,
  WidthType,
  ImageRun,
  convertInchesToTwip,
} from "docx"

export interface ExportData {
  auditDetails: {
    reportReleaseDate: string
    typeOfAudit: string
    typeOfAuditReport: string
    period: string
  }
  editableContent: {
    introduction: string
    auditMethodology: string
    preEngagement: string
    engagement: string
    postEngagement: string
    riskMethodology: string
  }
  documentPreparation: Array<{ field: string; value: string }>
  changeHistory: Array<{ version: string; date: string; remarks: string }>
  distributionList: Array<{ name: string; designation: string; email: string }>
  engagementScope: Array<{
    sNo: string
    assetDescription: string
    criticality: string
    internalIP: string
    url: string
    publicIP: string
    location: string
    hashValue: string
    version: string
    otherDetails: string
  }>
  auditingTeam: Array<{
    sNo: string
    name: string
    designation: string
    email: string
    qualifications: string
    certInListed: string
  }>
  auditActivities: Array<{
    phase: string
    description: string
    timeline: string
  }>
  toolsSoftware: Array<{
    sNo: string
    name: string
    version: string
    license: string
  }>
  vulnerabilities: Array<{
    sNo: string
    affectedAsset: string
    observation: string
    cve: string
    controlObjective: string
    controlName: string
    auditRequirement: string
    severity: string
    recommendation: string
    reference: string
    newOrRepeat: string
  }>
  detailedObservations: Array<{
    vulnerabilityTitle: string
    affectedAsset: string
    detailedObservation: string
    cve: string
    controlObjective: string
    controlName: string
    auditRequirement: string
    severity: string
    recommendation: string
    reference: string
    newOrRepeat: string
    proofOfConcepts?: Array<{
      step: string
      description: string
      images: File[]
    }>
  }>
}

// Helper function to convert File to Uint8Array
const fileToUint8Array = (file: File): Promise<Uint8Array> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer
      resolve(new Uint8Array(arrayBuffer))
    }
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}

// Helper function to parse text and create formatted paragraphs
const parseTextToParagraphs = (text: string): Paragraph[] => {
  if (!text || text.trim() === "") {
    return [new Paragraph({ text: "" })]
  }

  const lines = text.split("\n")
  const paragraphs: Paragraph[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Check if line is a numbered list (starts with number followed by dot or parenthesis)
    const numberedMatch = line.match(/^(\d+)[.)]\s*(.*)/)
    if (numberedMatch) {
      paragraphs.push(
        new Paragraph({
          text: numberedMatch[2],
          numbering: {
            reference: "default-numbering",
            level: 0,
          },
          spacing: { after: 100 },
        }),
      )
      continue
    }

    // Check if line is a bullet point (starts with •, -, *, or ○)
    const bulletMatch = line.match(/^[•\-*○]\s*(.*)/)
    if (bulletMatch) {
      paragraphs.push(
        new Paragraph({
          text: bulletMatch[1],
          bullet: {
            level: 0,
          },
          spacing: { after: 100 },
        }),
      )
      continue
    }

    // Check if line is indented bullet (starts with spaces/tabs and bullet)
    const indentedBulletMatch = line.match(/^\s+[•\-*○]\s*(.*)/)
    if (indentedBulletMatch) {
      paragraphs.push(
        new Paragraph({
          text: indentedBulletMatch[1],
          bullet: {
            level: 1,
          },
          spacing: { after: 100 },
        }),
      )
      continue
    }

    // Check for heading-like text (all caps or ends with colon)
    if (line.trim().length > 0 && (line === line.toUpperCase() || line.trim().endsWith(":"))) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: line.trim(),
              bold: true,
            }),
          ],
          spacing: { before: 200, after: 100 },
        }),
      )
      continue
    }

    // Regular paragraph
    if (line.trim().length > 0) {
      paragraphs.push(
        new Paragraph({
          text: line,
          spacing: { after: 100 },
        }),
      )
    } else {
      // Empty line for spacing
      paragraphs.push(new Paragraph({ text: "" }))
    }
  }

  return paragraphs
}

export const generateWordDoc = async (data: ExportData) => {
  const doc = new Document({
    numbering: {
      config: [
        {
          reference: "default-numbering",
          levels: [
            {
              level: 0,
              format: "decimal",
              text: "%1.",
              alignment: AlignmentType.START,
            },
            {
              level: 1,
              format: "lowerLetter",
              text: "%2.",
              alignment: AlignmentType.START,
            },
          ],
        },
      ],
    },
    sections: [
      {
        properties: {},
        children: [
          // Title - Cover Page
          new Paragraph({
            children: [
              new TextRun({
                text: "SECURITY AUDIT REPORT",
                bold: true,
                size: 32,
              }),
            ],
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),

          // Audit Details Section
          new Paragraph({
            children: [
              new TextRun({
                text: "Audit Details",
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),

          // Audit Details Table
          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ text: "Report Release Date", alignment: AlignmentType.LEFT })],
                    shading: { fill: "F0F0F0" },
                    width: { size: 30, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: data.auditDetails.reportReleaseDate || "" })],
                    width: { size: 70, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ text: "Type of Audit" })],
                    shading: { fill: "F0F0F0" },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: data.auditDetails.typeOfAudit || "" })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ text: "Type of Audit Report" })],
                    shading: { fill: "F0F0F0" },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: data.auditDetails.typeOfAuditReport || "" })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ text: "Period" })],
                    shading: { fill: "F0F0F0" },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: data.auditDetails.period || "" })],
                  }),
                ],
              }),
            ],
          }),

          // Document Preparation Section
          new Paragraph({
            children: [
              new TextRun({
                text: "Document Preparation",
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 600, after: 200 },
          }),

          // Document Preparation Table
          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            rows: data.documentPreparation.map(
              (item) =>
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: item.field })],
                      shading: { fill: "F0F0F0" },
                      width: { size: 30, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: item.value || "" })],
                      width: { size: 70, type: WidthType.PERCENTAGE },
                    }),
                  ],
                }),
            ),
          }),

          // Document Change History Section
          new Paragraph({
            children: [
              new TextRun({
                text: "Document Change History",
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 600, after: 200 },
          }),

          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ text: "Version", alignment: AlignmentType.CENTER })],
                    shading: { fill: "D0D0D0" },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Date", alignment: AlignmentType.CENTER })],
                    shading: { fill: "D0D0D0" },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Remarks / Reason of change", alignment: AlignmentType.CENTER })],
                    shading: { fill: "D0D0D0" },
                  }),
                ],
              }),
              ...(data.changeHistory && data.changeHistory.length > 0
                ? data.changeHistory.map(
                    (item) =>
                      new TableRow({
                        children: [
                          new TableCell({
                            children: [new Paragraph({ text: item.version || "", alignment: AlignmentType.CENTER })],
                          }),
                          new TableCell({
                            children: [new Paragraph({ text: item.date || "", alignment: AlignmentType.CENTER })],
                          }),
                          new TableCell({
                            children: [new Paragraph({ text: item.remarks || "", alignment: AlignmentType.CENTER })],
                          }),
                        ],
                      }),
                  )
                : [
                    new TableRow({
                      children: [
                        new TableCell({
                          children: [new Paragraph({ text: "", alignment: AlignmentType.CENTER })],
                        }),
                        new TableCell({
                          children: [new Paragraph({ text: "", alignment: AlignmentType.CENTER })],
                        }),
                        new TableCell({
                          children: [new Paragraph({ text: "", alignment: AlignmentType.CENTER })],
                        }),
                      ],
                    }),
                  ]),
            ],
          }),

          // Distribution List Section
          new Paragraph({
            children: [
              new TextRun({
                text: "Document Distribution List",
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 600, after: 200 },
          }),

          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ text: "Name", alignment: AlignmentType.CENTER })],
                    shading: { fill: "D0D0D0" },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Designation", alignment: AlignmentType.CENTER })],
                    shading: { fill: "D0D0D0" },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Email ID", alignment: AlignmentType.CENTER })],
                    shading: { fill: "D0D0D0" },
                  }),
                ],
              }),
              ...(data.distributionList && data.distributionList.length > 0
                ? data.distributionList.map(
                    (item) =>
                      new TableRow({
                        children: [
                          new TableCell({
                            children: [new Paragraph({ text: item.name || "", alignment: AlignmentType.CENTER })],
                          }),
                          new TableCell({
                            children: [
                              new Paragraph({ text: item.designation || "", alignment: AlignmentType.CENTER }),
                            ],
                          }),
                          new TableCell({
                            children: [new Paragraph({ text: item.email || "", alignment: AlignmentType.CENTER })],
                          }),
                        ],
                      }),
                  )
                : [
                    new TableRow({
                      children: [
                        new TableCell({
                          children: [new Paragraph({ text: "", alignment: AlignmentType.CENTER })],
                        }),
                        new TableCell({
                          children: [new Paragraph({ text: "", alignment: AlignmentType.CENTER })],
                        }),
                        new TableCell({
                          children: [new Paragraph({ text: "", alignment: AlignmentType.CENTER })],
                        }),
                      ],
                    }),
                  ]),
            ],
          }),

          // Introduction Section
          new Paragraph({
            children: [
              new TextRun({
                text: "Introduction",
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 600, after: 200 },
          }),
          ...parseTextToParagraphs(data.editableContent.introduction || ""),

          // Engagement Scope Section
          new Paragraph({
            children: [
              new TextRun({
                text: "Engagement Scope",
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 600, after: 200 },
          }),

          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ text: "S.No", alignment: AlignmentType.CENTER })],
                    shading: { fill: "D0D0D0" },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Asset Description", alignment: AlignmentType.CENTER })],
                    shading: { fill: "D0D0D0" },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Criticality", alignment: AlignmentType.CENTER })],
                    shading: { fill: "D0D0D0" },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Internal IP", alignment: AlignmentType.CENTER })],
                    shading: { fill: "D0D0D0" },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "URL", alignment: AlignmentType.CENTER })],
                    shading: { fill: "D0D0D0" },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Public IP", alignment: AlignmentType.CENTER })],
                    shading: { fill: "D0D0D0" },
                  }),
                ],
              }),
              ...(data.engagementScope && data.engagementScope.length > 0
                ? data.engagementScope.map(
                    (item) =>
                      new TableRow({
                        children: [
                          new TableCell({
                            children: [new Paragraph({ text: item.sNo || "", alignment: AlignmentType.CENTER })],
                          }),
                          new TableCell({
                            children: [
                              new Paragraph({ text: item.assetDescription || "", alignment: AlignmentType.CENTER }),
                            ],
                          }),
                          new TableCell({
                            children: [
                              new Paragraph({ text: item.criticality || "", alignment: AlignmentType.CENTER }),
                            ],
                          }),
                          new TableCell({
                            children: [
                              new Paragraph({ text: item.internalIP || "", alignment: AlignmentType.CENTER }),
                            ],
                          }),
                          new TableCell({
                            children: [new Paragraph({ text: item.url || "", alignment: AlignmentType.CENTER })],
                          }),
                          new TableCell({
                            children: [new Paragraph({ text: item.publicIP || "", alignment: AlignmentType.CENTER })],
                          }),
                        ],
                      }),
                  )
                : [
                    new TableRow({
                      children: [
                        new TableCell({
                          children: [new Paragraph({ text: "", alignment: AlignmentType.CENTER })],
                        }),
                        new TableCell({
                          children: [new Paragraph({ text: "", alignment: AlignmentType.CENTER })],
                        }),
                        new TableCell({
                          children: [new Paragraph({ text: "", alignment: AlignmentType.CENTER })],
                        }),
                        new TableCell({
                          children: [new Paragraph({ text: "", alignment: AlignmentType.CENTER })],
                        }),
                        new TableCell({
                          children: [new Paragraph({ text: "", alignment: AlignmentType.CENTER })],
                        }),
                        new TableCell({
                          children: [new Paragraph({ text: "", alignment: AlignmentType.CENTER })],
                        }),
                      ],
                    }),
                  ]),
            ],
          }),

          // Auditing Team Section
          new Paragraph({
            children: [
              new TextRun({
                text: "Details of the Auditing Team",
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 600, after: 200 },
          }),

          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ text: "S.No", alignment: AlignmentType.CENTER })],
                    shading: { fill: "D0D0D0" },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Name", alignment: AlignmentType.CENTER })],
                    shading: { fill: "D0D0D0" },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Designation", alignment: AlignmentType.CENTER })],
                    shading: { fill: "D0D0D0" },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Email", alignment: AlignmentType.CENTER })],
                    shading: { fill: "D0D0D0" },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Qualifications", alignment: AlignmentType.CENTER })],
                    shading: { fill: "D0D0D0" },
                  }),
                ],
              }),
              ...(data.auditingTeam && data.auditingTeam.length > 0
                ? data.auditingTeam.map(
                    (item) =>
                      new TableRow({
                        children: [
                          new TableCell({
                            children: [new Paragraph({ text: item.sNo || "", alignment: AlignmentType.CENTER })],
                          }),
                          new TableCell({
                            children: [new Paragraph({ text: item.name || "", alignment: AlignmentType.CENTER })],
                          }),
                          new TableCell({
                            children: [
                              new Paragraph({ text: item.designation || "", alignment: AlignmentType.CENTER }),
                            ],
                          }),
                          new TableCell({
                            children: [new Paragraph({ text: item.email || "", alignment: AlignmentType.CENTER })],
                          }),
                          new TableCell({
                            children: [
                              new Paragraph({ text: item.qualifications || "", alignment: AlignmentType.CENTER }),
                            ],
                          }),
                        ],
                      }),
                  )
                : [
                    new TableRow({
                      children: [
                        new TableCell({
                          children: [new Paragraph({ text: "", alignment: AlignmentType.CENTER })],
                        }),
                        new TableCell({
                          children: [new Paragraph({ text: "", alignment: AlignmentType.CENTER })],
                        }),
                        new TableCell({
                          children: [new Paragraph({ text: "", alignment: AlignmentType.CENTER })],
                        }),
                        new TableCell({
                          children: [new Paragraph({ text: "", alignment: AlignmentType.CENTER })],
                        }),
                        new TableCell({
                          children: [new Paragraph({ text: "", alignment: AlignmentType.CENTER })],
                        }),
                      ],
                    }),
                  ]),
            ],
          }),

          // Audit Activities Section
          new Paragraph({
            children: [
              new TextRun({
                text: "Audit Activities and Timelines",
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 600, after: 200 },
          }),

          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ text: "Phase", alignment: AlignmentType.CENTER })],
                    shading: { fill: "D0D0D0" },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Description", alignment: AlignmentType.CENTER })],
                    shading: { fill: "D0D0D0" },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Timeline", alignment: AlignmentType.CENTER })],
                    shading: { fill: "D0D0D0" },
                  }),
                ],
              }),
              ...(data.auditActivities && data.auditActivities.length > 0
                ? data.auditActivities.map(
                    (item) =>
                      new TableRow({
                        children: [
                          new TableCell({
                            children: [new Paragraph({ text: item.phase || "", alignment: AlignmentType.CENTER })],
                          }),
                          new TableCell({
                            children: [
                              new Paragraph({ text: item.description || "", alignment: AlignmentType.CENTER }),
                            ],
                          }),
                          new TableCell({
                            children: [new Paragraph({ text: item.timeline || "", alignment: AlignmentType.CENTER })],
                          }),
                        ],
                      }),
                  )
                : [
                    new TableRow({
                      children: [
                        new TableCell({
                          children: [new Paragraph({ text: "", alignment: AlignmentType.CENTER })],
                        }),
                        new TableCell({
                          children: [new Paragraph({ text: "", alignment: AlignmentType.CENTER })],
                        }),
                        new TableCell({
                          children: [new Paragraph({ text: "", alignment: AlignmentType.CENTER })],
                        }),
                      ],
                    }),
                  ]),
            ],
          }),

          // Audit Methodology Section
          new Paragraph({
            children: [
              new TextRun({
                text: "Audit Methodology and Criteria / Standard referred for Audit",
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 600, after: 200 },
          }),
          ...parseTextToParagraphs(data.editableContent.auditMethodology || ""),

          // Pre-engagement Section
          new Paragraph({
            children: [
              new TextRun({
                text: "Pre-engagement",
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 600, after: 200 },
          }),
          ...parseTextToParagraphs(data.editableContent.preEngagement || ""),

          // Engagement Section
          new Paragraph({
            children: [
              new TextRun({
                text: "Engagement",
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 600, after: 200 },
          }),
          ...parseTextToParagraphs(data.editableContent.engagement || ""),

          // Post-Engagement Section
          new Paragraph({
            children: [
              new TextRun({
                text: "Post-Engagement",
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 600, after: 200 },
          }),
          ...parseTextToParagraphs(data.editableContent.postEngagement || ""),

          // Risk Assessment Methodology Section
          new Paragraph({
            children: [
              new TextRun({
                text: "Risk Assessment Methodology",
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 600, after: 200 },
          }),
          ...parseTextToParagraphs(data.editableContent.riskMethodology || ""),

          // Tools/Software Section
          new Paragraph({
            children: [
              new TextRun({
                text: "Tools/Software Used",
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 600, after: 200 },
          }),

          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ text: "S.No", alignment: AlignmentType.CENTER })],
                    shading: { fill: "D0D0D0" },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Tool/Software", alignment: AlignmentType.CENTER })],
                    shading: { fill: "D0D0D0" },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Version", alignment: AlignmentType.CENTER })],
                    shading: { fill: "D0D0D0" },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "License", alignment: AlignmentType.CENTER })],
                    shading: { fill: "D0D0D0" },
                  }),
                ],
              }),
              ...(data.toolsSoftware && data.toolsSoftware.length > 0
                ? data.toolsSoftware.map(
                    (item) =>
                      new TableRow({
                        children: [
                          new TableCell({
                            children: [new Paragraph({ text: item.sNo || "", alignment: AlignmentType.CENTER })],
                          }),
                          new TableCell({
                            children: [new Paragraph({ text: item.name || "", alignment: AlignmentType.CENTER })],
                          }),
                          new TableCell({
                            children: [new Paragraph({ text: item.version || "", alignment: AlignmentType.CENTER })],
                          }),
                          new TableCell({
                            children: [new Paragraph({ text: item.license || "", alignment: AlignmentType.CENTER })],
                          }),
                        ],
                      }),
                  )
                : [
                    new TableRow({
                      children: [
                        new TableCell({
                          children: [new Paragraph({ text: "", alignment: AlignmentType.CENTER })],
                        }),
                        new TableCell({
                          children: [new Paragraph({ text: "", alignment: AlignmentType.CENTER })],
                        }),
                        new TableCell({
                          children: [new Paragraph({ text: "", alignment: AlignmentType.CENTER })],
                        }),
                        new TableCell({
                          children: [new Paragraph({ text: "", alignment: AlignmentType.CENTER })],
                        }),
                      ],
                    }),
                  ]),
            ],
          }),

          // Executive Summary Section
          new Paragraph({
            children: [
              new TextRun({
                text: "Executive Summary",
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 600, after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "The objective of this assessment was to assess the immunity level, discover weak links and provide recommendations and guidelines to vulnerable entities discovered.",
              }),
            ],
            spacing: { after: 200 },
          }),

          // Vulnerabilities Summary Section
          new Paragraph({
            children: [
              new TextRun({
                text: "Vulnerability Overview",
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 600, after: 200 },
          }),

          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ text: "S.No", alignment: AlignmentType.CENTER })],
                    shading: { fill: "D0D0D0" },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Affected Asset", alignment: AlignmentType.CENTER })],
                    shading: { fill: "D0D0D0" },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Observation", alignment: AlignmentType.CENTER })],
                    shading: { fill: "D0D0D0" },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "CVE/CWE", alignment: AlignmentType.CENTER })],
                    shading: { fill: "D0D0D0" },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Severity", alignment: AlignmentType.CENTER })],
                    shading: { fill: "D0D0D0" },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Recommendation", alignment: AlignmentType.CENTER })],
                    shading: { fill: "D0D0D0" },
                  }),
                ],
              }),
              ...(data.vulnerabilities && data.vulnerabilities.length > 0
                ? data.vulnerabilities.map(
                    (item) =>
                      new TableRow({
                        children: [
                          new TableCell({
                            children: [new Paragraph({ text: item.sNo || "", alignment: AlignmentType.CENTER })],
                          }),
                          new TableCell({
                            children: [
                              new Paragraph({ text: item.affectedAsset || "", alignment: AlignmentType.CENTER }),
                            ],
                          }),
                          new TableCell({
                            children: [
                              new Paragraph({ text: item.observation || "", alignment: AlignmentType.CENTER }),
                            ],
                          }),
                          new TableCell({
                            children: [new Paragraph({ text: item.cve || "", alignment: AlignmentType.CENTER })],
                          }),
                          new TableCell({
                            children: [new Paragraph({ text: item.severity || "", alignment: AlignmentType.CENTER })],
                          }),
                          new TableCell({
                            children: [
                              new Paragraph({ text: item.recommendation || "", alignment: AlignmentType.CENTER }),
                            ],
                          }),
                        ],
                      }),
                  )
                : [
                    new TableRow({
                      children: [
                        new TableCell({
                          children: [new Paragraph({ text: "", alignment: AlignmentType.CENTER })],
                        }),
                        new TableCell({
                          children: [new Paragraph({ text: "", alignment: AlignmentType.CENTER })],
                        }),
                        new TableCell({
                          children: [new Paragraph({ text: "", alignment: AlignmentType.CENTER })],
                        }),
                        new TableCell({
                          children: [new Paragraph({ text: "", alignment: AlignmentType.CENTER })],
                        }),
                        new TableCell({
                          children: [new Paragraph({ text: "", alignment: AlignmentType.CENTER })],
                        }),
                        new TableCell({
                          children: [new Paragraph({ text: "", alignment: AlignmentType.CENTER })],
                        }),
                      ],
                    }),
                  ]),
            ],
          }),

          // Detailed Observations Section
          new Paragraph({
            children: [
              new TextRun({
                text: "Detailed Observations",
                bold: true,
                size: 24,
              }),
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 600, after: 200 },
          }),

          ...(data.detailedObservations && data.detailedObservations.length > 0
            ? await Promise.all(
                data.detailedObservations.map(async (obs, index) => {
                  const elements: (Paragraph | Table)[] = []

                  // Observation heading
                  elements.push(
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: `Observation #${index + 1}: ${obs.vulnerabilityTitle || "Untitled"}`,
                          bold: true,
                          size: 20,
                        }),
                      ],
                      heading: HeadingLevel.HEADING_2,
                      spacing: { before: 400, after: 200 },
                    }),
                  )

                  // Observation details table
                  elements.push(
                    new Table({
                      width: {
                        size: 100,
                        type: WidthType.PERCENTAGE,
                      },
                      rows: [
                        new TableRow({
                          children: [
                            new TableCell({
                              children: [new Paragraph({ text: "Vulnerability Title" })],
                              shading: { fill: "F0F0F0" },
                              width: { size: 30, type: WidthType.PERCENTAGE },
                            }),
                            new TableCell({
                              children: [new Paragraph({ text: obs.vulnerabilityTitle || "" })],
                            }),
                          ],
                        }),
                        new TableRow({
                          children: [
                            new TableCell({
                              children: [new Paragraph({ text: "Affected Asset" })],
                              shading: { fill: "F0F0F0" },
                            }),
                            new TableCell({
                              children: [new Paragraph({ text: obs.affectedAsset || "" })],
                            }),
                          ],
                        }),
                        new TableRow({
                          children: [
                            new TableCell({
                              children: [new Paragraph({ text: "Detailed Observation" })],
                              shading: { fill: "F0F0F0" },
                            }),
                            new TableCell({
                              children: parseTextToParagraphs(obs.detailedObservation || ""),
                            }),
                          ],
                        }),
                        new TableRow({
                          children: [
                            new TableCell({
                              children: [new Paragraph({ text: "CVE/CWE" })],
                              shading: { fill: "F0F0F0" },
                            }),
                            new TableCell({
                              children: [new Paragraph({ text: obs.cve || "" })],
                            }),
                          ],
                        }),
                        new TableRow({
                          children: [
                            new TableCell({
                              children: [new Paragraph({ text: "Severity" })],
                              shading: { fill: "F0F0F0" },
                            }),
                            new TableCell({
                              children: [new Paragraph({ text: obs.severity || "" })],
                            }),
                          ],
                        }),
                        new TableRow({
                          children: [
                            new TableCell({
                              children: [new Paragraph({ text: "Recommendation" })],
                              shading: { fill: "F0F0F0" },
                            }),
                            new TableCell({
                              children: parseTextToParagraphs(obs.recommendation || ""),
                            }),
                          ],
                        }),
                      ],
                    }),
                  )

                  // Proof of Concepts section
                  if (obs.proofOfConcepts && obs.proofOfConcepts.length > 0) {
                    elements.push(
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Proof of Concept:",
                            bold: true,
                            size: 18,
                          }),
                        ],
                        spacing: { before: 300, after: 200 },
                      }),
                    )

                    for (const poc of obs.proofOfConcepts) {
                      // POC Step heading
                      elements.push(
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: `${poc.step} ${poc.description}`,
                              bold: true,
                            }),
                          ],
                          spacing: { before: 200, after: 100 },
                        }),
                      )

                      // Add images
                      if (poc.images && poc.images.length > 0) {
                        for (const image of poc.images) {
                          try {
                            const imageData = await fileToUint8Array(image)

                            // Create image with auto-scaling based on aspect ratio
                            // Max width: 5.5 inches to fit within page margins
                            // Determine image type from file
                            const imageType = image.type.includes("png") ? "png" : "jpg"

                            elements.push(
                              new Paragraph({
                                children: [
                                  new ImageRun({
                                    type: imageType,
                                    data: imageData,
                                    transformation: {
                                      width: 400, // pixels - approximately 5.5 inches at 72 DPI
                                      height: 250, // pixels - maintains reasonable aspect ratio
                                    },
                                  }),
                                ],
                                spacing: { before: 100, after: 100 },
                                alignment: AlignmentType.CENTER,
                              }),
                            )
                            // Image caption
                            elements.push(
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: `Screenshot: ${image.name}`,
                                    italics: true,
                                    size: 16,
                                  }),
                                ],
                                alignment: AlignmentType.CENTER,
                                spacing: { after: 200 },
                              }),
                            )
                          } catch (error) {
                            console.error("Error adding image to Word doc:", error)
                            elements.push(
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: `[Image could not be loaded: ${image.name}]`,
                                    color: "FF0000",
                                  }),
                                ],
                                spacing: { after: 100 },
                              }),
                            )
                          }
                        }
                      }
                    }
                  }

                  return elements
                }),
              ).then((results) => results.flat())
            : [
                new Paragraph({
                  children: [new TextRun({ text: "No detailed observations recorded." })],
                  spacing: { after: 200 },
                }),
              ]),
        ],
      },
    ],
  })

  return doc
}
