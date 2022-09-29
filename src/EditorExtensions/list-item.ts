import { getNodeType, Node } from "@tiptap/core";
import { liftListItem, sinkListItem, splitListItem } from "prosemirror-schema-list";

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    listitem: {
      addListitem: () => ReturnType,
      indentList: () => ReturnType,
      outdentList: () => ReturnType
    }
  }
}

export default Node.create({
  name: 'listitem',
  content: 'paragraph block*',
  defining: true,

  parseHTML() {
    return [{ tag: 'li' }];;
  },

  renderHTML() {
    return ['li', 0];
  },

  addCommands() {
    return {
      addListitem: () => ({ tr, state, dispatch }) => {
        const type = getNodeType(this.name, state.schema);
        return splitListItem(type)(state, dispatch);
      },
      indentList: () => ({ state, dispatch }) => {
        const type = getNodeType(this.name, state.schema);
        return sinkListItem(type)(state, dispatch);
      },
      outdentList: () => ({ state, dispatch }) => {
        const type = getNodeType(this.name, state.schema);
        return liftListItem(type)(state, dispatch);
      }
    }
  },

  addKeyboardShortcuts() {
    return {
      'Enter': () => this.editor.commands.addListitem(),
      'Tab': () => this.editor.commands.indentList(),
      'Shift-Tab': () => this.editor.commands.outdentList()
    };
  }
});