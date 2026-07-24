"use client";

import { Editor } from "@tiptap/react";
import { 
    Bold, 
    Italic, 
    Underline,
    Heading1,
    Heading2,
    Heading3,
} from "lucide-react";

interface EditorToolbarProps {
  editor: Editor | null;
}

export default function EditorToolbar({
  editor,
}: EditorToolbarProps) {
  if (!editor) return null;

  const buttonClass = (active: boolean) =>
  `flex h-9 w-9 items-center justify-center rounded-md transition ${
    active
      ? "bg-[#B8C8B0] text-[#34402F]"
      : "text-[#6B5F58] hover:bg-[#F4EFEA]"
  }`;

  return (
    <div className="flex items-center gap-1 border-b border-[#DDD5CE] bg-[#FCFBF9] p-2">
        {/* Heading 1 */}
      <button
        type="button"
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
        className={buttonClass(
          editor.isActive("heading", { level: 1 })
        )}
        aria-label="Heading 1"
      >
        <Heading1 size={16} />
      </button>

      {/* Heading 2 */}
      <button
        type="button"
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        className={buttonClass(
          editor.isActive("heading", { level: 2 })
        )}
        aria-label="Heading 2"
      >
        <Heading2 size={16} />
      </button>

       {/* Heading 3 */}
      <button
        type="button"
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
        className={buttonClass(
          editor.isActive("heading", { level: 3 })
        )}
        aria-label="Heading 3"
      >
        <Heading3 size={16} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={buttonClass(editor.isActive("bold"))}
        aria-label="Bold"
      >
        <Bold size={16}/>
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={buttonClass(editor.isActive("italic"))}
        aria-label="Italic"
      >
        <Italic size={16}/>
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={buttonClass(editor.isActive("underline"))}
        aria-label="Underline"
      >
        <Underline size={16}/>
      </button>
    </div>
  );
}