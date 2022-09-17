<script setup lang="ts">
import { Editor } from '@tiptap/vue-3';

const props = defineProps<{ editor: Editor }>();

// Key = tiptap mark name, Value = Font Awesome name
const marks = {
  bold: 'bold',
  italic: 'italic',
  strike: 'strikethrough'
};

type KeysOfType<T> = {
  [K in keyof T]: K;
}[keyof T];
type Marks = KeysOfType<typeof marks>;

function toggleMark(mark: Marks) {
  const capitalized = mark[0].toUpperCase() + mark.slice(1) as Capitalize<Marks>;
  props.editor.chain().focus()[`toggle${capitalized}`]().run();
}

function isMarkActive(style: Marks) {
  return props.editor?.isActive(style);
}
</script>
  
<template>
  <button v-for="mark in Object.entries(marks)" :key="mark[0]" @click="toggleMark(mark[0] as Marks)" :class="{active: isMarkActive(mark[0] as Marks)}">
    <i :class="`fa-solid fa-${mark[1]}`"></i>
  </button>
</template>