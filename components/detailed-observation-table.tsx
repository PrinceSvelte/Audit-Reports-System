"use client"

import { useState, useRef, forwardRef, useImperativeHandle } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Upload, X } from "lucide-react"

interface ProofOfConcept {
  id: string
  step: string
  description: string
  images: File[]
}

interface DetailedObservation {
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
  proofOfConcepts: ProofOfConcept[]
}

const DetailedObservationTable = forwardRef((props, ref) => {
  const [data, setData] = useState<DetailedObservation[]>([
    {
      vulnerabilityTitle: "",
      affectedAsset: "",
      detailedObservation: "",
      cve: "",
      controlObjective: "",
      controlName: "",
      auditRequirement: "",
      severity: "Low",
      recommendation: "",
      reference: "",
      newOrRepeat: "New",
      proofOfConcepts: [],
    },
  ])

  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})

  useImperativeHandle(ref, () => ({
    getData: () => data,
  }))

  const addObservation = () => {
    const newObservation: DetailedObservation = {
      vulnerabilityTitle: "",
      affectedAsset: "",
      detailedObservation: "",
      cve: "",
      controlObjective: "",
      controlName: "",
      auditRequirement: "",
      severity: "Low",
      recommendation: "",
      reference: "",
      newOrRepeat: "New",
      proofOfConcepts: [],
    }
    setData([...data, newObservation])
  }

  const updateObservation = (index: number, field: keyof DetailedObservation, value: any) => {
    const updated = [...data]
    updated[index][field] = value
    setData(updated)
  }

  const deleteObservation = (index: number) => {
    setData(data.filter((_, i) => i !== index))
  }

  const addProofOfConcept = (observationIndex: number) => {
    const updated = [...data]
    const newPoc: ProofOfConcept = {
      id: Date.now().toString(),
      step: `Step ${updated[observationIndex].proofOfConcepts.length + 1}:`,
      description: "",
      images: [],
    }
    updated[observationIndex].proofOfConcepts.push(newPoc)
    setData(updated)
  }

  const updateProofOfConcept = (
    observationIndex: number,
    pocIndex: number,
    field: keyof ProofOfConcept,
    value: any,
  ) => {
    const updated = [...data]
    updated[observationIndex].proofOfConcepts[pocIndex][field] = value
    setData(updated)
  }

  const deleteProofOfConcept = (observationIndex: number, pocIndex: number) => {
    const updated = [...data]
    updated[observationIndex].proofOfConcepts = updated[observationIndex].proofOfConcepts.filter(
      (_, i) => i !== pocIndex,
    )
    setData(updated)
  }

  const handleImageUpload = (observationIndex: number, pocIndex: number, files: FileList | null) => {
    if (files) {
      const updated = [...data]
      const newImages = Array.from(files)
      updated[observationIndex].proofOfConcepts[pocIndex].images = [
        ...updated[observationIndex].proofOfConcepts[pocIndex].images,
        ...newImages,
      ]
      setData(updated)
    }
  }

  const removeImage = (observationIndex: number, pocIndex: number, imageIndex: number) => {
    const updated = [...data]
    updated[observationIndex].proofOfConcepts[pocIndex].images = updated[observationIndex].proofOfConcepts[
      pocIndex
    ].images.filter((_, i) => i !== imageIndex)
    setData(updated)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (observationIndex: number, pocIndex: number, e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      handleImageUpload(observationIndex, pocIndex, files)
    }
  }

  const handlePaste = (observationIndex: number, pocIndex: number, e: React.ClipboardEvent) => {
    const items = e.clipboardData.items
    const imageFiles: File[] = []

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile()
        if (file) {
          imageFiles.push(file)
        }
      }
    }

    if (imageFiles.length > 0) {
      e.preventDefault()
      const dataTransfer = new DataTransfer()
      imageFiles.forEach(file => dataTransfer.items.add(file))
      handleImageUpload(observationIndex, pocIndex, dataTransfer.files)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Detailed Observation</h3>
        <Button onClick={addObservation} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Observation
        </Button>
      </div>

      {data.map((observation, obsIndex) => (
        <Card key={obsIndex} className="border-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Observation #{obsIndex + 1}</CardTitle>
            <Button variant="destructive" size="sm" onClick={() => deleteObservation(obsIndex)}>
              <Trash2 className="text-white w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Basic Information Table */}
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium bg-gray-100 w-1/4">Vulnerability Title</TableCell>
                  <TableCell>
                    <Input
                      value={observation.vulnerabilityTitle}
                      onChange={(e) => updateObservation(obsIndex, "vulnerabilityTitle", e.target.value)}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium bg-gray-100">Affected Asset i.e., IP/URL/Application</TableCell>
                  <TableCell>
                    <Input
                      value={observation.affectedAsset}
                      onChange={(e) => updateObservation(obsIndex, "affectedAsset", e.target.value)}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium bg-gray-100">Detailed observation / Vulnerable point</TableCell>
                  <TableCell>
                    <Textarea
                      value={observation.detailedObservation}
                      onChange={(e) => updateObservation(obsIndex, "detailedObservation", e.target.value)}
                      className="min-h-[100px]"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium bg-gray-100">CVE/CWE</TableCell>
                  <TableCell>
                    <Input
                      value={observation.cve}
                      onChange={(e) => updateObservation(obsIndex, "cve", e.target.value)}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium bg-gray-100">Control Objective</TableCell>
                  <TableCell>
                    <Input
                      value={observation.controlObjective}
                      onChange={(e) => updateObservation(obsIndex, "controlObjective", e.target.value)}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium bg-gray-100">Control Name</TableCell>
                  <TableCell>
                    <Input
                      value={observation.controlName}
                      onChange={(e) => updateObservation(obsIndex, "controlName", e.target.value)}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium bg-gray-100">Audit Requirement</TableCell>
                  <TableCell>
                    <Input
                      value={observation.auditRequirement}
                      onChange={(e) => updateObservation(obsIndex, "auditRequirement", e.target.value)}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium bg-gray-100">Severity</TableCell>
                  <TableCell>
                    <Select
                      value={observation.severity}
                      onValueChange={(value) => updateObservation(obsIndex, "severity", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Critical">Critical</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Info">Info</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium bg-gray-100">Recommendation</TableCell>
                  <TableCell>
                    <Textarea
                      value={observation.recommendation}
                      onChange={(e) => updateObservation(obsIndex, "recommendation", e.target.value)}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium bg-gray-100">Reference</TableCell>
                  <TableCell>
                    <Input
                      value={observation.reference}
                      onChange={(e) => updateObservation(obsIndex, "reference", e.target.value)}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium bg-gray-100">New or Repeat observation</TableCell>
                  <TableCell>
                    <Select
                      value={observation.newOrRepeat}
                      onValueChange={(value) => updateObservation(obsIndex, "newOrRepeat", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Repeat">Repeat</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {/* Proof of Concept Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold bg-gray-100 p-2 rounded">References to evidence / Proof of Concept</h4>
                <Button onClick={() => addProofOfConcept(obsIndex)} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Proof of Concept
                </Button>
              </div>

              {observation.proofOfConcepts.map((poc, pocIndex) => (
                <Card key={poc.id} className="border border-gray-200">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-4">
                          <Input
                            value={poc.step}
                            onChange={(e) => updateProofOfConcept(obsIndex, pocIndex, "step", e.target.value)}
                            className="w-32 font-semibold"
                          />
                          <Input
                            value={poc.description}
                            onChange={(e) => updateProofOfConcept(obsIndex, pocIndex, "description", e.target.value)}
                            placeholder="Description of this step"
                            className="flex-1"
                          />
                        </div>

                        {/* Image Upload Section */}
                        <div className="space-y-3">
                          <div
                            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer"
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(obsIndex, pocIndex, e)}
                            onPaste={(e) => handlePaste(obsIndex, pocIndex, e)}
                            onClick={() => {
                              const key = `${obsIndex}-${pocIndex}`
                              fileInputRefs.current[key]?.click()
                            }}
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                const key = `${obsIndex}-${pocIndex}`
                                fileInputRefs.current[key]?.click()
                              }
                            }}
                          >
                            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm font-medium text-gray-700">Upload / Drop / Paste Images</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {poc.images.length} image(s) uploaded
                            </p>
                          </div>

                          <input
                            ref={(el) => {
                              const key = `${obsIndex}-${pocIndex}`
                              fileInputRefs.current[key] = el
                            }}
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageUpload(obsIndex, pocIndex, e.target.files)}
                          />

                          {/* Display uploaded images */}
                          {poc.images.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                              {poc.images.map((image, imageIndex) => (
                                <div key={imageIndex} className="relative group">
                                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                                    <img
                                      src={URL.createObjectURL(image) || "/placeholder.svg"}
                                      alt={`Proof of concept ${imageIndex + 1}`}
                                      className="w-full h-full object-cover"
                                      onLoad={(e) => {
                                        // Clean up object URL after image loads
                                        const img = e.target as HTMLImageElement
                                        setTimeout(() => URL.revokeObjectURL(img.src), 1000)
                                      }}
                                    />
                                  </div>
                                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => removeImage(obsIndex, pocIndex, imageIndex)}
                                    >
                                      <X className="w-4 h-4" />
                                    </Button>
                                  </div>
                                  <p className="text-xs text-gray-600 mt-1 truncate">{image.name}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteProofOfConcept(obsIndex, pocIndex)}
                        className="ml-4"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
})

DetailedObservationTable.displayName = "DetailedObservationTable"

export default DetailedObservationTable
