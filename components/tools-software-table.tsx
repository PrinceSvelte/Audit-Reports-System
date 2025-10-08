"use client"

import { useState, forwardRef, useImperativeHandle } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2 } from "lucide-react"

interface ToolSoftware {
  sNo: string
  name: string
  version: string
  license: string
}

const ToolsSoftwareTable = forwardRef((props, ref) => {
  const [data, setData] = useState<ToolSoftware[]>([{ sNo: "1", name: "", version: "", license: "Open Source" }])

  useImperativeHandle(ref, () => ({
    getData: () => data,
  }))

  const addRow = () => {
    const newRow: ToolSoftware = {
      sNo: (data.length + 1).toString(),
      name: "",
      version: "",
      license: "Open Source",
    }
    setData([...data, newRow])
  }

  const updateRow = (index: number, field: keyof ToolSoftware, value: string) => {
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
        <h3 className="text-lg font-semibold">Tools/Software Used</h3>
        <Button onClick={addRow} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Row
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-200">
            <TableHead className="text-center font-semibold">S. No</TableHead>
            <TableHead className="text-center font-semibold">Name of Tool/Software used</TableHead>
            <TableHead className="text-center font-semibold">Version of the tool/Software used</TableHead>
            <TableHead className="text-center font-semibold">Open Source/Licensed</TableHead>
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
                  value={item.version}
                  onChange={(e) => updateRow(index, "version", e.target.value)}
                  className="text-center"
                />
              </TableCell>
              <TableCell>
                <Select value={item.license} onValueChange={(value) => updateRow(index, "license", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open Source">Open Source</SelectItem>
                    <SelectItem value="Licensed">Licensed</SelectItem>
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
  )
})

ToolsSoftwareTable.displayName = "ToolsSoftwareTable"

export default ToolsSoftwareTable
