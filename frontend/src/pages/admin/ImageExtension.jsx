import Image from "@tiptap/extension-image";
import { mergeAttributes, ReactNodeViewRenderer } from "@tiptap/react";
import ImageComponent from "./ImageComponent";

const ImageExtension = Image.extend({
  name: "customImage",

  inline: false,
  group: "block",
  selectable: true,
  draggable: false,

  addAttributes() {
    return {
      ...this.parent?.(),
      src: { default: null },
      alt: { default: null },
      title: { default: null },
      width: { default: "auto" },
      height: { default: "auto" },
      layout: { default: "inline" },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageComponent);
  },

  // ✅ MUST MATCH renderHTML
  parseHTML() {
    return [{ tag: "img-component" }];
  },

 renderHTML({ HTMLAttributes }) {
  const { src, layout, width, height } = HTMLAttributes;

  const style = [
    width && width !== "auto" ? `width:${width}px` : "",
    height && height !== "auto" ? `height:${height}px` : "",
  ]
    .filter(Boolean)
    .join(";");

  return [
    "div",
    {
      class: "custom-image-wrapper",
      "data-layout": layout,
    },
    [
      "img",
      {
        src,
        style,
      },
    ],
  ];
}

});


export default ImageExtension;
