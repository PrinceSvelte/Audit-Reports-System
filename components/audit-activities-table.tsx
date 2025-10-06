"use client"

import { useState, forwardRef, useImperativeHandle } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2 } from "lucide-react"

interface AuditActivity {
  phase: string
  description: string
  timeline: string
}

const AuditActivitiesTable = forwardRef((props, ref) => {
  const [data, setData] = useState<AuditActivity[]>([
    {
      phase: "",
      description: "",
      timeline: "",
    },
  ])

  useImperativeHandle(ref, () => ({
    getData: () => data,
  }))

  const addRow = () => {
    const newRow: AuditActivity = {
      phase: "",
      description: "",
      timeline: "",
    }
    setData([...data, newRow])
  }

  const updateRow = (index: number, field: keyof AuditActivity, value: string) => {
    const updated = [...data]
    updated[index][field] = value
    setData(updated)
  }

  const deleteRow = (index: number) => {
    setData(data.filter((_, i) => i !== index))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Audit Activities and Timelines</h3>
        <Button onClick={addRow} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Row
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead className="text-center font-semibold w-1/4">Phase</TableHead>
              <TableHead className="text-center font-semibold w-1/2">Description</TableHead>
              <TableHead className="text-center font-semibold w-1/6">Timeline</TableHead>
              <TableHead className="text-center font-semibold w-1/12">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Input
                    value={item.phase}
                    onChange={(e) => updateRow(index, "phase", e.target.value)}
                    className="text-center"
                  />
                </TableCell>
                <TableCell>
                  <Textarea
                    value={item.description}
                    onChange={(e) => updateRow(index, "description", e.target.value)}
                    className="min-h-[80px] resize-none"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.timeline}
                    onChange={(e) => updateRow(index, "timeline", e.target.value)}
                    className="text-center"
                    placeholder="Enter timeline"
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Button variant="destructive" size="sm" onClick={() => deleteRow(index)}>
                    <Trash2 className="text-white w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
})

AuditActivitiesTable.displayName = "AuditActivitiesTable"

export default AuditActivitiesTable
