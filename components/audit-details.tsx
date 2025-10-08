"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface AuditDetails {
  reportReleaseDate: string
  typeOfAudit: string
  typeOfAuditReport: string
  period: string
  periodStart?: string
  periodEnd?: string
}

interface AuditDetailsProps {
  data: AuditDetails
  onChange: (data: AuditDetails) => void
}

export default function AuditDetails({ data, onChange }: AuditDetailsProps) {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: data.periodStart ? new Date(data.periodStart) : undefined,
    to: data.periodEnd ? new Date(data.periodEnd) : undefined,
  })

  const updateField = (field: keyof AuditDetails, value: string) => {
    onChange({
      ...data,
      [field]: value,
    })
  }

  const handleDateRangeChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    setDateRange(range)
    
    // Format dates to string for storage
    const periodStart = range.from ? format(range.from, "yyyy-MM-dd") : ""
    const periodEnd = range.to ? format(range.to, "yyyy-MM-dd") : ""
    
    // Create period display string
    const periodDisplay = range.from && range.to 
      ? `${format(range.from, "dd-MM-yyyy")} to ${format(range.to, "dd-MM-yyyy")}`
      : range.from 
      ? format(range.from, "dd-MM-yyyy")
      : ""
    
    onChange({
      ...data,
      periodStart,
      periodEnd,
      period: periodDisplay
    })
  }

  const clearDateRange = () => {
    setDateRange({ from: undefined, to: undefined })
    onChange({
      ...data,
      periodStart: "",
      periodEnd: "",
      period: ""
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
              <div className="flex items-center gap-2">
                <Popover>
                  {/* <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal border-0 bg-transparent hover:bg-transparent",
                        !dateRange.from && !dateRange.to && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "dd-MM-yyyy")} to {format(dateRange.to, "dd-MM-yyyy")}
                          </>
                        ) : (
                          format(dateRange.from, "dd-MM-yyyy")
                        )
                      ) : (
                        <span className="text-muted-foreground">Select audit period</span>
                      )}
                    </Button>
                  </PopoverTrigger> */}
                  <PopoverContent className="w-auto p-0" align="start">
                    <div className="flex items-center justify-between p-2 border-b">
                      <span className="text-sm font-medium">Select Audit Period</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearDateRange}
                        className="h-8 text-xs"
                      >
                        Clear
                      </Button>
                    </div>
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange.from}
                      selected={dateRange}
                      onSelect={handleDateRangeChange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* Separate From and To inputs for manual entry */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1">
                  <Input
                    value={data.periodStart ? format(new Date(data.periodStart), "yyyy-MM-dd") : ""}
                    onChange={(e) => {
                      const periodStart = e.target.value
                      const period = periodStart && data.periodEnd 
                        ? `${format(new Date(periodStart), "dd-MM-yyyy")} to ${format(new Date(data.periodEnd), "dd-MM-yyyy")}`
                        : periodStart 
                        ? `${format(new Date(periodStart), "dd-MM-yyyy")} to `
                        : data.periodEnd 
                        ? ` to ${format(new Date(data.periodEnd), "dd-MM-yyyy")}`
                        : ""
                      
                      onChange({ 
                        ...data, 
                        periodStart,
                        period 
                      })
                      
                      // Update date range state
                      setDateRange({
                        from: periodStart ? new Date(periodStart) : undefined,
                        to: data.periodEnd ? new Date(data.periodEnd) : undefined
                      })
                    }}
                    type="date"
                    placeholder="From"
                    className="border-0 bg-transparent"
                  />
                </div>
                <span className="text-sm text-gray-500">to</span>
                <div className="flex-1">
                  <Input
                    value={data.periodEnd ? format(new Date(data.periodEnd), "yyyy-MM-dd") : ""}
                    onChange={(e) => {
                      const periodEnd = e.target.value
                      const period = data.periodStart && periodEnd 
                        ? `${format(new Date(data.periodStart), "dd-MM-yyyy")} to ${format(new Date(periodEnd), "dd-MM-yyyy")}`
                        : periodEnd 
                        ? ` to ${format(new Date(periodEnd), "dd-MM-yyyy")}`
                        : data.periodStart 
                        ? `${format(new Date(data.periodStart), "dd-MM-yyyy")} to `
                        : ""
                      
                      onChange({ 
                        ...data, 
                        periodEnd,
                        period 
                      })
                      
                      // Update date range state
                      setDateRange({
                        from: data.periodStart ? new Date(data.periodStart) : undefined,
                        to: periodEnd ? new Date(periodEnd) : undefined
                      })
                    }}
                    type="date"
                    placeholder="To"
                    className="border-0 bg-transparent"
                  />
                </div>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}