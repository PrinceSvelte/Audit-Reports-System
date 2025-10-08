"use client"

import { useState, forwardRef, useImperativeHandle } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2 } from "lucide-react"

interface AuditingTeam {
  sNo: string
  name: string
  designation: string
  email: string
  qualifications: string
  certInListed: string
}

const AuditingTeamTable = forwardRef((props, ref) => {
  const [data, setData] = useState<AuditingTeam[]>([
    {
      sNo: "1",
      name: "",
      designation: "",
      email: "",
      qualifications: "",
      certInListed: "Yes",
    },
  ])

  useImperativeHandle(ref, () => ({
    getData: () => data,
  }))

  const addRow = () => {
    const newRow: AuditingTeam = {
      sNo: (data.length + 1).toString(),
      name: "",
      designation: "",
      email: "",
      qualifications: "",
      certInListed: "Yes",
    }
    setData([...data, newRow])
  }

  const updateRow = (index: number, field: keyof AuditingTeam, value: string) => {
    const updated = [...data]
    updated[index][field] = value
    setData(updated)
  }

  const deleteRow = (index: number) => {
    const filtered = data.filter((_, i) => i !== index)
    // Renumber the remaining rows
    const renumbered = filtered.map((item, idx) => ({
      ...item,
      sNo: (idx + 1).toString(),
    }))
    setData(renumbered)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Details of the Auditing Team</h3>
        <Button onClick={addRow} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Row
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead className="text-center font-semibold">S. No.</TableHead>
              <TableHead className="text-center font-semibold">Name</TableHead>
              <TableHead className="text-center font-semibold">Designation</TableHead>
              <TableHead className="text-center font-semibold">Email ID</TableHead>
              <TableHead className="text-center font-semibold">Professional Qualifications / Certifications</TableHead>
              <TableHead className="text-center font-semibold">
                Whether the resource has been listed in the Snapshot information published on CERT-In's website(Yes/No)
              </TableHead>
              <TableHead className="text-center font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Input
                    value={item.sNo}
                    readOnly
                    className="text-center bg-gray-100"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.name}
                    onChange={(e) => updateRow(index, "name", e.target.value)}
                    className="text-center"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.designation}
                    onChange={(e) => updateRow(index, "designation", e.target.value)}
                    className="text-center"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.email}
                    onChange={(e) => updateRow(index, "email", e.target.value)}
                    className="text-center"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.qualifications}
                    onChange={(e) => updateRow(index, "qualifications", e.target.value)}
                    className="text-center"
                  />
                </TableCell>
                <TableCell>
                  <Select value={item.certInListed} onValueChange={(value) => updateRow(index, "certInListed", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
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

AuditingTeamTable.displayName = "AuditingTeamTable"

export default AuditingTeamTable
