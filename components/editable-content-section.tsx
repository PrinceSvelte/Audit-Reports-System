"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Trash2, Save, X } from "lucide-react"

interface EditableContentSectionProps {
  title: string
  content: string
  onContentChange: (content: string) => void
  onDelete: () => void
  className?: string
}

export default function EditableContentSection({
  title,
  content,
  onContentChange,
  onDelete,
  className = "",
}: EditableContentSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(content)

  const handleSave = () => {
    onContentChange(editContent)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditContent(content)
    setIsEditing(false)
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button onClick={handleSave} size="sm" variant="default">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button onClick={handleCancel} size="sm" variant="outline">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setIsEditing(true)} size="sm" variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button onClick={onDelete} size="sm" variant="destructive">
                <Trash2 className="text-white w-4 h-4 mr-2" />
                Delete
              </Button>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="min-h-[200px] text-sm leading-relaxed"
            placeholder="Enter content..."
          />
        ) : (
          <div className="prose max-w-none">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
