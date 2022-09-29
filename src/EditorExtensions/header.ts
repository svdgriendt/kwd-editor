import { Node } from "@tiptap/core";

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    header: {
      setHeader: (attributes: { level: HeaderLevels }) => ReturnType,
      unsetHeader: () => ReturnType,
      toggleHeader: (attributes: { level: HeaderLevels }) => ReturnType
    }
  }
}

const levels = [1, 2, 3, 4, 5, 6] as const;
export type HeaderLevels = typeof levels[number];

export default Node.create({
  name: 'header',
  group: 'block header',
  content: 'inline*',
  priority: 50,

  addAttributes() {
    return {
      level: {
        default: 1,
        rendered: false
      }
    };
  },

  parseHTML() {
    return levels.map(level => ({ tag: `h${level}`, attrs: { level } }));
  },

  renderHTML({ node }) {
    const level = node.attrs.level;
    return [`h${level}`, 0];
  },

  addCommands() {
    return {
      setHeader: attributes => ({ commands }) => {
        return commands.setNode(this.name, attributes);
      },
      unsetHeader: () => ({ commands, editor }) => {
        return editor.isActive(this.name) && commands.toggleHeader(<{ level: HeaderLevels }>editor.getAttributes('header'));
      },
      toggleHeader: (attributes) => ({ commands }) => {
        return commands.toggleNode(this.name, 'paragraph', attributes);
      }
    }
  },

  addKeyboardShortcuts() {
    return levels.reduce((shortcuts, level) => ({
      ...shortcuts,
      ...{
        [`Ctrl-Alt-${level}`]: () => this.editor.commands.toggleHeader({ level })
      }
    }), {
      'Ctrl-Alt-0': () => this.editor.commands.unsetHeader()
    });
  }
});