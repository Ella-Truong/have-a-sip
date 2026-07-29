"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { useEffect } from "react";
import { editorExtensions } from "@/lib/editor/extensions";
import EditorToolbar from "./EditorToolBar";

interface ContentEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ContentEditor({
  value,
  onChange,
}: ContentEditorProps) {
  const editor = useEditor({
    extensions: editorExtensions,
    content: value,
    immediatelyRender: false,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    if (editor.getHTML() !== value) {
      editor.commands.setContent(value, {
        emitUpdate: false,
      });
    }
  }, [editor, value]);

  if (!editor) return null;

  return (
    <div className="rounded-lg border border-[#DDD5CE] overflow-hidden">
      <EditorToolbar editor={editor} />

      <BubbleMenu editor={editor} options={{placement:"top", offset:8}}>
        <div className="max-w-[280px] max-h-10 overflow-x-auto overflow-y-hidden rounded-lg border border-[#DDD5CE] bg-white shadow-lg hide-scrollbar">
            <div className="flex items-center h-10">
                <EditorToolbar editor={editor}/>
            </div>
        </div>
      </BubbleMenu>
      
      <div className="max-h-[280px] overflow-y-auto">
        <EditorContent
            editor={editor}
            className="article-content h-full px-4 py-3 outline-none"
        />
      </div>
    </div>
  );
}