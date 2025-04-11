// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// const RichTextEditor = ({input, setInput}) => {

//     const handleChange = (content) => {
//         setInput({...input, description:content});
//     }

//   return <ReactQuill theme="snow" value={input.description} onChange={handleChange} />;
// }
// export default RichTextEditor
// RichTextEditor.jsx
// import { useEditor, EditorContent } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import { useEffect } from 'react'
// // import './tiptap.css' // Optional styling

// const RichTextEditor = ({ input, setInput }) => {
//   const editor = useEditor({
//     extensions: [StarterKit],
//     content: input.description || '',
//     onUpdate({ editor }) {
//       const html = editor.getHTML()
//       setInput({ ...input, description: html })
//     },
//   })

//   // Optional: Sync initial content if input changes externally
//   useEffect(() => {
//     if (editor && input.description !== editor.getHTML()) {
//       editor.commands.setContent(input.description)
//     }
//   }, [input.description, editor])

//   return (
//     <div className="border rounded-md p-4 min-h-[50px]">
//       <EditorContent editor={editor} />
//     </div>
//   )
// }

// export default RichTextEditor

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Image from "@tiptap/extension-image";
import { useEffect, useRef } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Image as ImageIcon,
  Text,
} from "lucide-react";

const RichTextEditor = ({ input, setInput }) => {
  const fileInputRef = useRef(null);

  const editor = useEditor({
    extensions: [StarterKit, Underline, Strike, Image],
    content: input.description || "",
    onUpdate({ editor }) {
      const html = editor.getHTML();
      setInput({ ...input, description: html });
    },
  });

  useEffect(() => {
    if (editor && input.description !== editor.getHTML()) {
      editor.commands.setContent(input.description);
    }
  }, [input.description, editor]);

  const addImage = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        editor.chain().focus().setImage({ src: reader.result }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  if (!editor) return null;

  return (
    <div>
      {/* Toolbar */}
      {/* Toolbar */}
      <div className="mb-2 flex flex-wrap gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={
            editor.isActive("bold")
              ? "bg-black text-white p-2 rounded"
              : "border p-2 rounded"
          }
        >
          <Bold size={16} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic")
              ? "bg-black text-white p-2 rounded"
              : "border p-2 rounded"
          }
        >
          <Italic size={16} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={
            editor.isActive("underline")
              ? "bg-black text-white p-2 rounded"
              : "border p-2 rounded"
          }
        >
          <UnderlineIcon size={16} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={
            editor.isActive("strike")
              ? "bg-black text-white p-2 rounded"
              : "border p-2 rounded"
          }
        >
          <Strikethrough size={16} />
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 })
              ? "bg-black text-white p-2 rounded"
              : "border p-2 rounded"
          }
        >
          <Heading1 size={16} />
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-black text-white p-2 rounded"
              : "border p-2 rounded"
          }
        >
          <Heading2 size={16} />
        </button>

        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={
            !editor.isActive("heading")
              ? "bg-black text-white p-2 rounded"
              : "border p-2 rounded"
          }
        >
          <Text size={16} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList")
              ? "bg-black text-white p-2 rounded"
              : "border p-2 rounded"
          }
        >
          <List size={16} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList")
              ? "bg-black text-white p-2 rounded"
              : "border p-2 rounded"
          }
        >
          <ListOrdered size={16} />
        </button>

        <button
          onClick={() => fileInputRef.current.click()}
          className="border p-2 rounded"
        >
          <ImageIcon size={16} />
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={addImage}
          className="hidden"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <div className="border rounded-md p-4 min-h-[100px]">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
