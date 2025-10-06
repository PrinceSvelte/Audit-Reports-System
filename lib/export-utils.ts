import { Document, Paragraph, Table, TableCell, TableRow, TextRun, HeadingLevel, AlignmentType, WidthType } from "docx"

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

export const generateWordDoc = async (data: ExportData) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Title
          new Paragraph({
            children: [
              new TextRun({
                text: "Security Audit Report",
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
                    children: [new Paragraph({ text: data.auditDetails.reportReleaseDate || "Not specified" })],
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
                    children: [new Paragraph({ text: data.auditDetails.typeOfAudit || "Not specified" })],
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
                    children: [new Paragraph({ text: data.auditDetails.typeOfAuditReport || "Not specified" })],
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
                    children: [new Paragraph({ text: data.auditDetails.period || "Not specified" })],
                  }),
                ],
              }),
            ],
          }),

          // Introduction Section
          ...(data.editableContent.introduction
            ? [
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
                new Paragraph({
                  children: [new TextRun({ text: data.editableContent.introduction })],
                  spacing: { after: 200 },
                }),
              ]
            : []),

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
                      children: [new Paragraph({ text: item.value || "Not specified" })],
                      width: { size: 70, type: WidthType.PERCENTAGE },
                    }),
                  ],
                }),
            ),
          }),

          // Tools/Software Section
          ...(data.toolsSoftware.length > 0
            ? [
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
                    ...data.toolsSoftware.map(
                      (item) =>
                        new TableRow({
                          children: [
                            new TableCell({
                              children: [new Paragraph({ text: item.sNo || "N/A", alignment: AlignmentType.CENTER })],
                            }),
                            new TableCell({
                              children: [new Paragraph({ text: item.name || "N/A", alignment: AlignmentType.CENTER })],
                            }),
                            new TableCell({
                              children: [
                                new Paragraph({ text: item.version || "N/A", alignment: AlignmentType.CENTER }),
                              ],
                            }),
                            new TableCell({
                              children: [
                                new Paragraph({ text: item.license || "N/A", alignment: AlignmentType.CENTER }),
                              ],
                            }),
                          ],
                        }),
                    ),
                  ],
                }),
              ]
            : []),

          // Vulnerabilities Section
          ...(data.vulnerabilities.length > 0
            ? [
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
                          children: [new Paragraph({ text: "Severity", alignment: AlignmentType.CENTER })],
                          shading: { fill: "D0D0D0" },
                        }),
                      ],
                    }),
                    ...data.vulnerabilities.map(
                      (item) =>
                        new TableRow({
                          children: [
                            new TableCell({
                              children: [new Paragraph({ text: item.sNo || "N/A", alignment: AlignmentType.CENTER })],
                            }),
                            new TableCell({
                              children: [
                                new Paragraph({ text: item.affectedAsset || "N/A", alignment: AlignmentType.CENTER }),
                              ],
                            }),
                            new TableCell({
                              children: [
                                new Paragraph({ text: item.observation || "N/A", alignment: AlignmentType.CENTER }),
                              ],
                            }),
                            new TableCell({
                              children: [
                                new Paragraph({ text: item.severity || "N/A", alignment: AlignmentType.CENTER }),
                              ],
                            }),
                          ],
                        }),
                    ),
                  ],
                }),
              ]
            : []),
        ],
      },
    ],
  })

  return doc
}
