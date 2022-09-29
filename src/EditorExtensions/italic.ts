import { Mark } from "@tiptap/core";

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    italic: {
      setItalic: () => ReturnType,
      unsetItalic: () => ReturnType,
      toggleItalic: () => ReturnType
    }
  }
}

export default Mark.create({
  name: 'italic',

  parseHTML() {
    return [
      { tag: 'em' }
    ];
  },

  renderHTML() {
    return ['em', 0];
  },

  addCommands() {
    return {
      setItalic: () => ({ commands }) => {
        return commands.setMark(this.name);
      },
      unsetItalic: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      },
      toggleItalic: () => ({ commands }) => {
        return commands.toggleMark(this.name);
      }
    };
  },

  addKeyboardShortcuts() {
    return {
      'Ctrl-i': () => this.editor.commands.toggleItalic()
    };
  }
});