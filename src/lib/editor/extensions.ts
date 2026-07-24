import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

import { TextStyle } from "@tiptap/extension-text-style";
import { FontFamily } from "@tiptap/extension-font-family";
import { Placeholder } from "@tiptap/extension-placeholder"

export const editorExtensions = [
  StarterKit,
  Underline,
  TextStyle,
  FontFamily,
  Link.configure({
    openOnClick: false,
  }),
  Image,
  Placeholder.configure({
    placeholder: "Start writing..."
  })
];