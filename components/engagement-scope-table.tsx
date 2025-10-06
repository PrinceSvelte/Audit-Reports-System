"use client"

import { useState, forwardRef, useImperativeHandle } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2 } from "lucide-react"

interface EngagementScope {
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
}

const EngagementScopeTable = forwardRef((props, ref) => {
  const [data, setData] = useState<EngagementScope[]>([
    {
      sNo: "",
      assetDescription: "",
      criticality: "",
      internalIP: "",
      url: "",
      publicIP: "",
      location: "",
      hashValue: "",
      version: "",
      otherDetails: "",
    },
  ])

  useImperativeHandle(ref, () => ({
    getData: () => data,
  }))

  const addRow = () => {
    const newRow: EngagementScope = {
      sNo: "",
      assetDescription: "",
      criticality: "",
      internalIP: "",
      url: "",
      publicIP: "",
      location: "",
      hashValue: "",
      version: "",
      otherDetails: "",
    }
    setData([...data, newRow])
  }

  const updateRow = (index: number, field: keyof EngagementScope, value: string) => {
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
        <h3 className="text-lg font-semibold">Engagement Scope</h3>
        <Button onClick={addRow} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Row
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead className="text-center font-semibold min-w-[60px]">S.No</TableHead>
              <TableHead className="text-center font-semibold min-w-[120px]">Asset Description</TableHead>
              <TableHead className="text-center font-semibold min-w-[120px]">Criticality of Asset</TableHead>
              <TableHead className="text-center font-semibold min-w-[120px]">Internal IP Address</TableHead>
              <TableHead className="text-center font-semibold min-w-[200px]">URL</TableHead>
              <TableHead className="text-center font-semibold min-w-[120px]">Public IP Address</TableHead>
              <TableHead className="text-center font-semibold min-w-[100px]">Location</TableHead>
              <TableHead className="text-center font-semibold min-w-[120px]">
                Hash Value (in case of applications)
              </TableHead>
              <TableHead className="text-center font-semibold min-w-[120px]">
                Version (in case of applications)
              </TableHead>
              <TableHead className="text-center font-semibold min-w-[200px]">
                Other details such as make and model in case of network devices or security devices
              </TableHead>
              <TableHead className="text-center font-semibold min-w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Input
                    value={item.sNo}
                    onChange={(e) => updateRow(index, "sNo", e.target.value)}
                    className="text-center"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.assetDescription}
                    onChange={(e) => updateRow(index, "assetDescription", e.target.value)}
                    className="text-center"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.criticality}
                    onChange={(e) => updateRow(index, "criticality", e.target.value)}
                    className="text-center"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.internalIP}
                    onChange={(e) => updateRow(index, "internalIP", e.target.value)}
                    className="text-center"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.url}
                    onChange={(e) => updateRow(index, "url", e.target.value)}
                    className="text-center"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.publicIP}
                    onChange={(e) => updateRow(index, "publicIP", e.target.value)}
                    className="text-center"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.location}
                    onChange={(e) => updateRow(index, "location", e.target.value)}
                    className="text-center"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.hashValue}
                    onChange={(e) => updateRow(index, "hashValue", e.target.value)}
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
                  <Input
                    value={item.otherDetails}
                    onChange={(e) => updateRow(index, "otherDetails", e.target.value)}
                    className="text-center"
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Button variant="destructive" size="sm" onClick={() => deleteRow(index)}>
                    <Trash2 className="w-4 h-4" />
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

EngagementScopeTable.displayName = "EngagementScopeTable"

export default EngagementScopeTable
