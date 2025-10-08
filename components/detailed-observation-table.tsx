"use client"

import { useState, useRef, forwardRef, useImperativeHandle, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Upload, X } from "lucide-react"
// import { useToast } from "@/components/ui/use-toast"

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
  // const { toast } = useToast()
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
    setData((prev) => [...prev, newObservation])

    // toast({
    //   title: "New Observation Table Added!",
    //   description: "A new observation section has been created successfully.",
    // })
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

  // Handle drag/drop and paste image upload
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

  // Enable paste image upload (Ctrl+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items
      if (!items) return
      const files = Array.from(items)
        .filter((item) => item.type.startsWith("image/"))
        .map((item) => item.getAsFile())
        .filter(Boolean) as File[]
      if (files.length > 0 && data.length > 0) {
        // Add to last observation and last PoC
        const lastObsIndex = data.length - 1
        const lastPocIndex = data[lastObsIndex].proofOfConcepts.length - 1
        if (lastPocIndex >= 0) {
          const updated = [...data]
          updated[lastObsIndex].proofOfConcepts[lastPocIndex].images.push(...files)
          setData(updated)
        }
      }
    }

    window.addEventListener("paste", handlePaste)
    return () => window.removeEventListener("paste", handlePaste)
  }, [data])

  return (
    <div className="space-y-6">
      {data.map((observation, obsIndex) => (
        <Card key={obsIndex} className="border-2">
          <CardHeader className="flex flex-row items-center justify-between bg-gray-50">
            <CardTitle className="text-base">Observation #{obsIndex + 1}</CardTitle>
            <div className="flex items-center gap-2">
              <Button onClick={addObservation} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Observation
              </Button>
              <Button variant="destructive" size="sm" onClick={() => deleteObservation(obsIndex)}>
                <Trash2 className="text-white w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Basic Info Table (unchanged) */}
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
                  <TableCell className="font-medium bg-gray-100">Affected Asset (IP/URL/Application)</TableCell>
                  <TableCell>
                    <Input
                      value={observation.affectedAsset}
                      onChange={(e) => updateObservation(obsIndex, "affectedAsset", e.target.value)}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium bg-gray-100">Detailed Observation / Vulnerable Point</TableCell>
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
                    <Input value={observation.cve} onChange={(e) => updateObservation(obsIndex, "cve", e.target.value)} />
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
                  <TableCell className="font-medium bg-gray-100">New or Repeat Observation</TableCell>
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

            {/* Proof of Concept Section remains same as before */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold bg-gray-100 p-2 rounded">References to Evidence / Proof of Concept</h4>
                <Button onClick={() => addProofOfConcept(obsIndex)} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Proof of Concept
                </Button>
              </div>

              {observation.proofOfConcepts.map((poc, pocIndex) => (
                <Card key={poc.id} className="border border-gray-200">
                  <CardContent className="p-4 space-y-4">
                    <div
                      className="flex justify-between items-start border-2 border-dashed rounded-lg p-3"
                      onDrop={(e) => {
                        e.preventDefault()
                        handleImageUpload(obsIndex, pocIndex, e.dataTransfer.files)
                      }}
                      onDragOver={(e) => e.preventDefault()}
                    >
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

                        {/* Image Upload */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const key = `${obsIndex}-${pocIndex}`
                                fileInputRefs.current[key]?.click()
                              }}
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              Upload / Drop / Paste Images
                            </Button>
                            <span className="text-sm text-gray-500">{poc.images.length} image(s) uploaded</span>
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

                          {poc.images.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                              {poc.images.map((image, imageIndex) => (
                                <div key={imageIndex} className="relative group">
                                  <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Proof ${imageIndex + 1}`}
                                    className="w-full h-32 object-cover rounded-lg border"
                                  />
                                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center rounded-lg">
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => removeImage(obsIndex, pocIndex, imageIndex)}
                                    >
                                      <X className="w-4 h-4" />
                                    </Button>
                                  </div>
                                  <p className="text-xs truncate mt-1 text-gray-600">{image.name}</p>
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
