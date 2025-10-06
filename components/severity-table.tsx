"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function SeverityTable() {
  const severityData = [
    {
      severity: "Critical",
      description:
        "Exposure that is exploitable and can allow for critical system access and access to protected information.",
      remediation: "Within 7 days or immediately (for active exploitation)",
      bgColor: "bg-red-600 text-white",
    },
    {
      severity: "High",
      description:
        "Exposure that is generally exploitable and can allow critical access to system resources that may impact business operations and/or expose protected information.",
      remediation: "Within 14 days",
      bgColor: "bg-red-500 text-white",
    },
    {
      severity: "Medium",
      description:
        "Exposure that may be exploitable or, in conjunction with another vulnerability, may allow critical access to system resources.",
      remediation: "Within 60 days or as per the organization's risk management policy",
      bgColor: "bg-yellow-400 text-black",
    },
    {
      severity: "Low",
      description:
        "Exposure should not impact business operations but should be addressed to ensure standard security practice expectations are met.",
      remediation: "Within 90 days or as per the organization's risk management policy",
      bgColor: "bg-yellow-300 text-black",
    },
  ]

  return (
    <div className="space-y-4">
      <p className="text-sm">Below is the suggested Management Timeline:</p>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-200">
            <TableHead className="font-bold text-center">Severity</TableHead>
            <TableHead className="font-bold text-center">Description</TableHead>
            <TableHead className="font-bold text-center">Remediation Timeframe</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {severityData.map((item, index) => (
            <TableRow key={index}>
              <TableCell className={`font-bold text-center ${item.bgColor}`}>{item.severity}</TableCell>
              <TableCell className="text-sm">{item.description}</TableCell>
              <TableCell className="text-sm">{item.remediation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
