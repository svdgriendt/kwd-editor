import { Mark } from "@tiptap/core";

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    strikethrough: {
      setStrikethrough: () => ReturnType,
      unsetStrikethrough: () => ReturnType,
      toggleStrikethrough: () => ReturnType
    }
  }
}

export default Mark.create({
  name: 'strikethrough',

  parseHTML() {
    return [
      { tag: 'del' }
    ];
  },

  renderHTML() {
    return ['del', 0];
  },

  addCommands() {
    return {
      setStrikethrough: () => ({ commands }) => {
        return commands.setMark(this.name);
      },
      unsetStrikethrough: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      },
      toggleStrikethrough: () => ({ commands }) => {
        return commands.toggleMark(this.name);
      }
    };
  },

  addKeyboardShortcuts() {
    return {
      'Ctrl-Shift-s': () => this.editor.commands.toggleStrikethrough()
    };
  }
});