import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

import { TextStyle } from "@tiptap/extension-text-style";
import { FontFamily } from "@tiptap/extension-font-family";
import { Placeholder } from "@tiptap/extension-placeholder"
import { Color } from "@tiptap/extension-color";

export const editorExtensions = [
  StarterKit,
  Underline,
  TextStyle,
  Color,
  FontFamily,
  Link.configure({
    openOnClick: false,
  }),
  Placeholder.configure({
    placeholder: "Start writing..."
  }),
  Image.configure({
    inline: false,
    allowBase64: false
  })
];