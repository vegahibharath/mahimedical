import { Node, mergeAttributes, nodeInputRule } from '@tiptap/core';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export const MathExtension = Node.create({
    name: 'math',

    group: 'inline',

    inline: true,

    atom: true,

    addAttributes() {
        return {
            latex: {
                default: 'E=mc^2',
                parseHTML: element => element.getAttribute('data-latex'),
                renderHTML: attributes => {
                    return {
                        'data-latex': attributes.latex,
                    }
                },
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'span[data-latex]',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['span', mergeAttributes(HTMLAttributes, { class: 'math-node' })]
    },

    addNodeView() {
        return ({ node, getPos, editor }) => {
            const dom = document.createElement('span');
            dom.classList.add('math-node');
            dom.style.cursor = 'pointer';
            dom.style.padding = '0 4px';
            dom.style.backgroundColor = '#f0f0f0';
            dom.style.borderRadius = '4px';

            const render = () => {
                try {
                    katex.render(node.attrs.latex, dom, {
                        throwOnError: false,
                        displayMode: false // inline
                    });
                } catch (e) {
                    dom.innerText = e.message;
                }
            }

            render();

            dom.addEventListener('click', () => {
                if (!editor.isEditable) return;
                const newLatex = prompt('Edit Equation (LaTeX):', node.attrs.latex);
                if (newLatex !== null) {
                    editor.commands.updateAttributes('math', { latex: newLatex });
                    // Using updateAttributes on the specific node would be safer if we had the pos, 
                    // but simpler click handler suffices for single node selection logic.
                    // Actually, updateAttributes updates the *selected* node.
                    // We should ensure this node is selected or use commands.setNodeSelection(pos).
                    if (typeof getPos === 'function') {
                        editor.commands.setNodeSelection(getPos());
                        editor.commands.updateAttributes('math', { latex: newLatex });
                    }
                }
            });

            return {
                dom,
                update: (updatedNode) => {
                    if (updatedNode.type.name !== this.name) return false;
                    if (updatedNode.attrs.latex !== node.attrs.latex) {
                        node.attrs.latex = updatedNode.attrs.latex;
                        // Note: node.attrs is mutable in NodeView update in some versions, but better safe relies on render
                    }
                    // Re-render
                    katex.render(updatedNode.attrs.latex, dom, {
                        throwOnError: false,
                        displayMode: false
                    });
                    return true;
                },
            }
        }
    },

    addCommands() {
        return {
            insertMath: ({ latex }) => ({ commands }) => {
                return commands.insertContent({
                    type: this.name,
                    attrs: { latex },
                })
            },
        }
    },

    addInputRules() {
        return [
            nodeInputRule({
                find: /\$\$(.+)\$\$/,
                type: this.type,
                getAttributes: (match) => {
                    return { latex: match[1] };
                }
            })
        ]
    }
});

export default MathExtension;
