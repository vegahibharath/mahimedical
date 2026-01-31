import React, { useCallback } from "react";
import {
  Bold, Italic, Underline, Strikethrough,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Link as LinkIcon,
  Undo, Redo
} from "lucide-react";

const MenuBar = ({ editor, onImageUpload }) => {

  /* ================= LINK ================= */
  const setLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  /* ================= IMAGE ================= */
 // 🖼 IMAGE BUTTON (NO FILE INPUT HERE)
const addImage = () => {
  if (onImageUpload) {
    onImageUpload(); // ✅ JUST TRIGGER PARENT
  }
};


  if (!editor) return null;

  return (
    <>
      {/* 🔥 INTERNAL CSS */}
      <style>
        {`
        .menu-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 14px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          margin-bottom: 20px;
        }

        .menu-bar button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: none;
          background: white;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }

        .menu-bar button:hover {
          background: #2563eb;
          color: white;
          transform: translateY(-1px);
        }

        .menu-bar button:active {
          transform: scale(0.95);
        }

        .menu-bar button svg {
          pointer-events: none;
        }
        `}
      </style>

      {/* 🔥 TOOLBAR */}
      <div className="menu-bar">
      <button type="button" onClick={() => editor.chain().focus().undo().run()}>
  <Undo size={16} />
</button>

<button type="button" onClick={() => editor.chain().focus().redo().run()}>
  <Redo size={16} />
</button>

<button type="button" onClick={() => editor.chain().focus().toggleBold().run()}>
  <Bold size={16} />
</button>

<button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}>
  <Italic size={16} />
</button>

<button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()}>
  <Underline size={16} />
</button>

<button type="button" onClick={() => editor.chain().focus().toggleStrike().run()}>
  <Strikethrough size={16} />
</button>

<button type="button" onClick={() => editor.chain().focus().setTextAlign("left").run()}>
  <AlignLeft size={16} />
</button>

<button type="button" onClick={() => editor.chain().focus().setTextAlign("center").run()}>
  <AlignCenter size={16} />
</button>

<button type="button" onClick={() => editor.chain().focus().setTextAlign("right").run()}>
  <AlignRight size={16} />
</button>

<button type="button" onClick={() => editor.chain().focus().setTextAlign("justify").run()}>
  <AlignJustify size={16} />
</button>

<button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}>
  <List size={16} />
</button>

<button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
  <ListOrdered size={16} />
</button>

<button type="button" onClick={setLink}>
  <LinkIcon size={16} />
</button>

<button type="button" onClick={addImage}>
  🖼
</button>

      </div>
    </>
  );
};

export default MenuBar;
