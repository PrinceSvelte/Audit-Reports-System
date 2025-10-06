"use client"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

interface AuditDetails {
  reportReleaseDate: string
  typeOfAudit: string
  typeOfAuditReport: string
  period: string
}

interface AuditDetailsProps {
  data: AuditDetails
  onChange: (data: AuditDetails) => void
}

export default function AuditDetails({ data, onChange }: AuditDetailsProps) {
  const updateField = (field: keyof AuditDetails, value: string) => {
    onChange({
      ...data,
      [field]: value,
    })
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Audit Details</h3>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium bg-gray-100 w-1/3">Report Release Date</TableCell>
            <TableCell>
              <Input
                type="date"
                value={data.reportReleaseDate}
                onChange={(e) => updateField("reportReleaseDate", e.target.value)}
                className="border-0 bg-transparent"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium bg-gray-100">Type of Audit</TableCell>
            <TableCell>
              <Input
                value={data.typeOfAudit}
                onChange={(e) => updateField("typeOfAudit", e.target.value)}
                placeholder="Enter audit type (e.g., Web Application Security Assessment)"
                className="border-0 bg-transparent"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium bg-gray-100">Type of Audit Report</TableCell>
            <TableCell>
              <Select value={data.typeOfAuditReport} onValueChange={(value) => updateField("typeOfAuditReport", value)}>
                <SelectTrigger className="border-0 bg-transparent">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="First Audit Report">First Audit Report</SelectItem>
                  <SelectItem value="Follow-up Report">Follow-up Report</SelectItem>
                  <SelectItem value="Re-audit Report">Re-audit Report</SelectItem>
                  <SelectItem value="Compliance Report">Compliance Report</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium bg-gray-100">Period</TableCell>
            <TableCell>
              <Input
                value={data.period}
                onChange={(e) => updateField("period", e.target.value)}
                placeholder="DD-MM-YYYY to DD-MM-YYYY"
                className="border-0 bg-transparent"
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
