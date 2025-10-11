"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Edit, Save } from "lucide-react";

interface TOCItem {
  title: string;
  page: number;
}

export default function TableOfContents() {
  const [isEditing, setIsEditing] = useState(false);
  const [contents, setContents] = useState<TOCItem[]>([
    { title: "INTRODUCTION", page: 4 },
    { title: "ENGAGEMENT SCOPE", page: 5 },
    { title: "DETAILS OF THE AUDITING TEAM", page: 6 },
    { title: "AUDIT ACTIVITIES AND TIMELINES", page: 7 },
    {
      title: "AUDIT METHODOLOGY AND CRITERIA / STANDARD REFERRED FOR AUDIT",
      page: 8,
    },
    { title: "TOOLS/ SOFTWARE USED", page: 13 },
    { title: "EXECUTIVE SUMMARY", page: 14 },
    { title: "DETAILED OBSERVATION", page: 19 },
    { title: "APPENDICES", page: 59 },
  ]);

  const addItem = () => {
    setContents([...contents, { title: "", page: 1 }]);
  };

  const updateItem = (
    index: number,
    field: keyof TOCItem,
    value: string | number
  ) => {
    const updated = [...contents];
    updated[index][field] = value as any;
    setContents(updated);
  };

  const deleteItem = (index: number) => {
    setContents(contents.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold text-center">
          Table of Contents
        </CardTitle>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button
                onClick={() => setIsEditing(false)}
                size="sm"
                variant="default"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button onClick={addItem} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              size="sm"
              variant="outline"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {contents.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b border-gray-200 pb-2"
          >
            {isEditing ? (
              <>
                <Input
                  value={item.title}
                  onChange={(e) => updateItem(index, "title", e.target.value)}
                  className="flex-1 mr-4 text-sm uppercase"
                />
                <Input
                  type="number"
                  value={item.page}
                  onChange={(e) =>
                    updateItem(
                      index,
                      "page",
                      Number.parseInt(e.target.value) || 1
                    )
                  }
                  className="w-20 mr-2"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteItem(index)}
                >
                  <Trash2 className="text-white w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <span className="font-medium text-sm uppercase">
                  {item.title}
                </span>
                <div className="flex-1 mx-4 border-b border-dotted border-gray-400"></div>
                <span className="font-medium">{item.page}</span>
              </>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
