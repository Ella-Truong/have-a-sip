"use client";

import { Editor } from "@tiptap/react";

interface EditorToolbarProps {
  editor: Editor | null;
}

export default function EditorToolbar({
  editor,
}: EditorToolbarProps) {
  if (!editor) return null;

  return (
    <div className="flex items-center gap-2 border-b border-[#DDD5CE] p-2">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        B
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        I
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        U
      </button>
    </div>
  );
}