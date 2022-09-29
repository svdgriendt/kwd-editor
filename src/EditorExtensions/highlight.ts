import { Mark } from "@tiptap/core";

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    highlight: {
      setHighlight: () => ReturnType,
      unsetHighlight: () => ReturnType,
      toggleHighlight: () => ReturnType
    }
  }
}

export default Mark.create({
  name: 'highlight',

  parseHTML() {
    return [
      { tag: 'mark' }
    ];
  },

  renderHTML() {
    return ['mark', 0];
  },

  addCommands() {
    return {
      setHighlight: () => ({ commands }) => {
        return commands.setMark(this.name);
      },
      unsetHighlight: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      },
      toggleHighlight: () => ({ commands }) => {
        return commands.toggleMark(this.name);
      }
    };
  },

  addKeyboardShortcuts() {
    return {
      'Ctrl-Shift-h': () => this.editor.commands.toggleHighlight()
    };
  }
});