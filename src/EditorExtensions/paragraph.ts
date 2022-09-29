import { Node } from "@tiptap/core";

export default Node.create({
  name: 'paragraph',
  group: 'block',
  content: 'inline*',

  parseHTML() {
    return [{ tag: 'p' }];
  },

  renderHTML() {
    return ['p', 0];
  }
});