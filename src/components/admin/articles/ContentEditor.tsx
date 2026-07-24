"use client"

import { useEditor, EditorContent} from "@tiptap/react";
import { useEffect } from "react";
import { editorExtensions } from "@/lib/editor/extensions";
import EditorToolbar from "./EditorToolBar";

interface ContentEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function ContentEditor ({
    value,
    onChange
}: ContentEditorProps) {
    const editor = useEditor ({
        extensions: editorExtensions,
        content: value,
        immediatelyRender: false,
        onUpdate({ editor }) {
            onChange(editor.getHTML())
        },
    });

    useEffect(() => {
        if (!editor) return;

        if (editor.getHTML() !== value) {
            editor.commands.setContent(value, {
                emitUpdate: false
            });
        }
    }, [editor, value]);

    if (!editor) return null;

    return (
        <div>
            <EditorToolbar editor = {editor}/>
            <EditorContent editor = {editor} className="min-h-[350px] px-4 py-3"/>
        </div> 
    )
}