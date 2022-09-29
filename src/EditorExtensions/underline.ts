import { Mark } from "@tiptap/core";

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    underline: {
      setUnderline: () => ReturnType,
      unsetUnderline: () => ReturnType,
      toggleUnderline: () => ReturnType
    }
  }
}

export default Mark.create({
  name: 'underline',

  parseHTML() {
    return [
      { tag: 'u', getAttrs: node => (<HTMLElement>node).style.textDecoration === 'underline' && null }
    ];
  },

  renderHTML() {
    return ['u', { style: 'text-decoration: underline' }, 0];
  },

  addCommands() {
    return {
      setUnderline: () => ({ commands }) => {
        return commands.setMark(this.name);
      },
      unsetUnderline: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      },
      toggleUnderline: () => ({ commands }) => {
        return commands.toggleMark(this.name);
      }
    };
  },

  addKeyboardShortcuts() {
    return {
      'Ctrl-u': () => this.editor.commands.toggleUnderline()
    };
  }
});