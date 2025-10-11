"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import MenuBar from "@/components/MenuBar";

export default function TiptapEditor({ editable }: { editable: boolean }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false, // optional: prevents auto navigation
        autolink: true,
      }),
    ],
    content: "<p>Hello <b>World</b> 🌎️</p>",
    immediatelyRender: false,
    editable,
  });

  return (
    <div className="border rounded p-3">
      {/* <MenuBar editor={editor} /> */}
      <EditorContent
        editor={editor}
        className="min-h-[150px] p-2 focus:outline-none"
      />
    </div>
  );
}
