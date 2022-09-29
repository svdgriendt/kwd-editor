import { Node } from "@tiptap/core";

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    different: {
      setList: (attributes: { type: ListTypes }) => ReturnType,
      unsetList: (attributes: { type: ListTypes }) => ReturnType,
      toggleList: (attributes: { type: ListTypes }) => ReturnType
    }
  }
}

const types = ['ordered', 'unordered'] as const;
export type ListTypes = typeof types[number];

export default Node.create({
  name: 'list',
  group: 'block',
  content: 'listitem*',
  priority: 50,

  addAttributes() {
    return {
      type: {
        default: 'unordered',
        rendered: false
      }
    }
  },

  parseHTML() {
    return [
      { tag: 'ul' },
      { tag: 'ol' }
    ];
  },

  renderHTML({ node }) {
    return [node.attrs.type === 'ordered' ? 'ol' : 'ul', 0];
  },

  addCommands() {
    return {
      setList: attributes => ({ commands }) => {
        return commands.wrapIn(this.name, attributes);
      },
      unsetList: attributes => ({ commands }) => {
        return commands.lift(this.name, attributes);
      },
      toggleList: attributes => ({ commands }) => {
        return commands.toggleWrap(this.name, <{ type: ListTypes }>attributes);
      }
    };
  },

  addKeyboardShortcuts() {
    return {
      'Ctrl-8': () => this.editor.commands.toggleList({ type: 'unordered' }),
      'Ctrl-Shift-o': () => this.editor.commands.toggleList({ type: 'ordered' })
    };
  }
});

