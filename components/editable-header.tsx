"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit, Save, X } from "lucide-react"

interface EditableHeaderProps {
  title: string
  onTitleChange: (title: string) => void
  children?: React.ReactNode
}

export default function EditableHeader({ title, onTitleChange, children }: EditableHeaderProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(title)

  const handleSave = () => {
    onTitleChange(editTitle)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditTitle(title)
    setIsEditing(false)
  }

  return (
    <div className="flex justify-between items-center">
      {isEditing ? (
        <div className="flex items-center gap-2 flex-1">
          <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="flex-1" />
          <Button onClick={handleSave} size="sm" variant="default">
            <Save className="w-4 h-4" />
          </Button>
          <Button onClick={handleCancel} size="sm" variant="outline">
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            <Button onClick={() => setIsEditing(true)} size="sm" variant="ghost">
              <Edit className="w-4 h-4" />
            </Button>
          </div>
          {children}
        </>
      )}
    </div>
  )
}
