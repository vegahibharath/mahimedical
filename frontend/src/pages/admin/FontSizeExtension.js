import { Extension } from '@tiptap/core';
import '@tiptap/extension-text-style';

export const FontSize = Extension.create({
    name: 'fontSize',

    addOptions() {
        return {
            types: ['textStyle'],
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: element => element.style.fontSize.replace('px', ''),
                        renderHTML: attributes => {
                            if (!attributes.fontSize) {
                                return {}
                            }
                            return {
                                style: `font-size: ${attributes.fontSize}px`,
                            }
                        },
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setFontSize: (fontSize) => ({ chain }) => {
                return chain()
                    .setMark('textStyle', { fontSize })
                    .run()
            },
            unsetFontSize: () => ({ chain }) => {
                return chain()
                    .setMark('textStyle', { fontSize: null })
                    .removeEmptyTextStyle()
                    .run()
            },
            incrementFontSize: () => ({ chain, editor }) => {
                const { fontSize } = editor.getAttributes('textStyle');
                const currentSize = fontSize ? parseInt(fontSize) : 16; // default 16px
                return chain().setFontSize(currentSize + 2).run();
            },
            decrementFontSize: () => ({ chain, editor }) => {
                const { fontSize } = editor.getAttributes('textStyle');
                const currentSize = fontSize ? parseInt(fontSize) : 16; // default 16px
                if (currentSize <= 8) return false;
                return chain().setFontSize(currentSize - 2).run();
            }
        }
    },
});

export default FontSize;
