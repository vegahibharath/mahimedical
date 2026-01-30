import Image from "@tiptap/extension-image";
import { mergeAttributes, ReactNodeViewRenderer } from "@tiptap/react";
import ImageComponent from "./ImageComponent";

const ImageExtension = Image.extend({
  name: "customImage",

  inline: false,          // ✅ REQUIRED
  group: "block",         // ✅ REQUIRED
  selectable: true,       // ✅ REQUIRED
  draggable: false,

  addAttributes() {
    return {
      ...this.parent?.(),

      src: {
        default: null,
      },

      alt: {
        default: null,
      },

      title: {
        default: null,
      },

      width: {
        default: "auto",
      },

      height: {
        default: "auto",
      },

      layout: {
        default: "inline", // inline | wrap-left | wrap-right | center
      },

      position: {
        default: "relative", // relative | absolute
      },

      zIndex: {
        default: 0, // -1 behind | 1 front
      },

      top: {
        default: 0,
      },

      left: {
        default: 0,
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageComponent);
  },
parseHTML() {
  return [{ tag: "img" }];
}
,

 renderHTML({ HTMLAttributes }) {
  return ["img", mergeAttributes(HTMLAttributes)];
}

});

export default ImageExtension;
