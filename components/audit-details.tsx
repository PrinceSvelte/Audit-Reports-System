"use client"
import { useState } from "react"
import { format } from "date-fns"
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
  const [fromDate, setFromDate] = useState<Date | undefined>()
  const [toDate, setToDate] = useState<Date | undefined>()

  const updateField = (field: keyof AuditDetails, value: string) => {
    onChange({
      ...data,
      [field]: value,
    })
  }

  const handleFromDateSelect = (date: Date | undefined) => {
    setFromDate(date)
    updatePeriod(date, toDate)
  }

  const handleToDateSelect = (date: Date | undefined) => {
    setToDate(date)
    updatePeriod(fromDate, date)
  }

  const updatePeriod = (from: Date | undefined, to: Date | undefined) => {
    if (from && to) {
      const formattedRange = `${format(from, "dd-MM-yyyy")} to ${format(to, "dd-MM-yyyy")}`
      updateField("period", formattedRange)
    } else if (from) {
      const formattedDate = `${format(from, "dd-MM-yyyy")} to DD-MM-YYYY`
      updateField("period", formattedDate)
    } else if (to) {
      const formattedDate = `DD-MM-YYYY to ${format(to, "dd-MM-yyyy")}`
      updateField("period", formattedDate)
    }
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Audit Details</h3>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium bg-gray-100 w-1/3">
              Report Release Date <span className="text-red-500">*</span>
            </TableCell>
            <TableCell>
              <Input
                type="date"
                value={data.reportReleaseDate}
                onChange={(e) => updateField("reportReleaseDate", e.target.value)}
                className="border-0 bg-transparent"
                required
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium bg-gray-100">
              Type of Audit <span className="text-red-500">*</span>
            </TableCell>
            <TableCell>
              <Input
                value={data.typeOfAudit}
                onChange={(e) => updateField("typeOfAudit", e.target.value)}
                placeholder="Enter audit type (e.g., Web Application Security Assessment)"
                className="border-0 bg-transparent"
                required
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium bg-gray-100">
              Type of Audit Report <span className="text-red-500">*</span>
            </TableCell>
            <TableCell>
              <Select value={data.typeOfAuditReport} onValueChange={(value) => updateField("typeOfAuditReport", value)} required>
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
            <TableCell className="font-medium bg-gray-100">
              Period <span className="text-red-500">*</span>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Input
                  type="date"
                  value={fromDate ? format(fromDate, "yyyy-MM-dd") : ""}
                  onChange={(e) => {
                    const date = e.target.value ? new Date(e.target.value) : undefined
                    handleFromDateSelect(date)
                  }}
                  className="border-0 bg-transparent"
                  placeholder="From Date"
                  required
                />
                <span className="text-muted-foreground">to</span>
                <Input
                  type="date"
                  value={toDate ? format(toDate, "yyyy-MM-dd") : ""}
                  onChange={(e) => {
                    const date = e.target.value ? new Date(e.target.value) : undefined
                    handleToDateSelect(date)
                  }}
                  min={fromDate ? format(fromDate, "yyyy-MM-dd") : undefined}
                  className="border-0 bg-transparent"
                  placeholder="To Date"
                  required
                />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
