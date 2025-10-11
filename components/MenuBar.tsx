'use client'

export default function MenuBar({ editor }) {
  if (!editor) return null

  const buttonClass = (isActive) =>
    `px-2 py-1 rounded hover:bg-gray-100 transition ${
      isActive ? 'bg-gray-200' : ''
    }`

  return (
    <div className="flex gap-2 border-b pb-2 mb-2">
      {/* Bold */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={buttonClass(editor.isActive('bold'))}
      >
        <b>B</b>
      </button>

      {/* Italic */}
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={buttonClass(editor.isActive('italic'))}
      >
        <i>I</i>
      </button>

      {/* Link */}
      <button
        onClick={() => {
          const previousUrl = editor.getAttributes('link').href
          const url = window.prompt('Enter URL', previousUrl)
          if (url === null) return
          if (url === '') {
            editor.chain().focus().unsetLink().run()
            return
          }
          editor.chain().focus().setLink({ href: url }).run()
        }}
        className={buttonClass(editor.isActive('link'))}
      >
        🔗
      </button>

      {/* Remove Link */}
      <button
        onClick={() => editor.chain().focus().unsetLink().run()}
        className={buttonClass(false)}
      >
        ❌
      </button>
    </div>
  )
}
