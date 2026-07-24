"use client";

import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  Code,
  SquareCode,
  Link as LinkIcon,
  Palette,
} from "lucide-react";

interface EditorToolbarProps {
  editor: Editor | null;
}

export default function EditorToolbar({
  editor,
}: EditorToolbarProps) {
  if (!editor) return null;

  const buttonClass = (active: boolean) =>
    `flex h-9 w-9 items-center justify-center rounded-md transition-colors ${
      active
        ? "bg-[#B8C8B0] text-[#34402F]"
        : "text-[#6B5F58] hover:bg-[#F4EFEA]"
    }`;

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;

    const url = window.prompt("Enter URL", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  };

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

      <div className="mx-1 h-6 w-px bg-[#DDD5CE]" />

      {/* Bold */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={buttonClass(editor.isActive("bold"))}
        aria-label="Bold"
      >
        <Bold size={16} />
      </button>

      {/* Italic */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={buttonClass(editor.isActive("italic"))}
        aria-label="Italic"
      >
        <Italic size={16} />
      </button>

      {/* Underline */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={buttonClass(editor.isActive("underline"))}
        aria-label="Underline"
      >
        <Underline size={18} />
      </button>

      <div className="mx-1 h-6 w-px bg-[#DDD5CE]" />

      {/* Inline Code */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={buttonClass(editor.isActive("code"))}
        aria-label="Inline Code"
      >
        <Code size={18} />
      </button>

      {/* Code Block */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={buttonClass(editor.isActive("codeBlock"))}
        aria-label="Code Block"
      >
        <SquareCode size={16} />
      </button>

      <div className="mx-1 h-6 w-px bg-[#DDD5CE]" />

      {/* Link */}
      <button
        type="button"
        onClick={setLink}
        className={buttonClass(editor.isActive("link"))}
        aria-label="Insert Link"
      >
        <LinkIcon size={16} />
      </button>

      {/* Text Color */}
      <label
        className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-[#6B5F58] hover:bg-[#F4EFEA]"
        aria-label="Text color"
      >
        <Palette size={16} />

        <input
          type="color"
          className="absolute inset-0 cursor-pointer opacity-0"
          value={
            editor.getAttributes("textStyle").color || "#000000"
          }
          onChange={(e) =>
            editor
              .chain()
              .focus()
              .setColor(e.target.value)
              .run()
          }
        />
      </label>
    </div>
  );
}