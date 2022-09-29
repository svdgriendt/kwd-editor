import { Mark } from "@tiptap/core";

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    bold: {
      setBold: () => ReturnType,
      unsetBold: () => ReturnType,
      toggleBold: () => ReturnType
    }
  }
}

export default Mark.create({
  name: 'bold',

  parseHTML() {
    return [
      { tag: 'strong' }
    ];
  },

  renderHTML() {
    return ['strong', 0];
  },

  addCommands() {
    return {
      setBold: () => ({ commands }) => {
        return commands.setMark(this.name);
      },
      unsetBold: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      },
      toggleBold: () => ({ commands }) => {
        return commands.toggleMark(this.name);
      }
    };
  },

  addKeyboardShortcuts() {
    return {
      'Ctrl-b': () => this.editor.commands.toggleBold()
    };
  }
});