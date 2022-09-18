<script setup lang="ts">
import { Editor } from '@tiptap/vue-3';

const props = defineProps<{ editor: Editor }>();

// Key = tiptap mark name, Value = Font Awesome name
const marks = {
  bold: 'bold',
  italic: 'italic',
  underline: 'underline',
  strike: 'strikethrough'
};
const headings = {
  1: '1',
  2: '2',
  3: '3',
  4: '4'
};

type KeysOfType<T> = {
  [K in keyof T]: K;
}[keyof T];
type Marks = KeysOfType<typeof marks>;
type Headings = KeysOfType<typeof headings>;

function toggleMark(mark: Marks) {
  const capitalized = mark[0].toUpperCase() + mark.slice(1) as Capitalize<Marks>;
  props.editor.chain().focus()[`toggle${capitalized}`]().run();
}

function isMarkActive(style: Marks) {
  return props.editor?.isActive(style);
}

function toggleHeading(level: Headings) {
  props.editor.chain().focus().toggleHeading({ level }).run();
}

function isHeadingActive(level: Headings) {
  return props.editor?.isActive('heading', { level });
}
</script>
  
<template>
  <button v-for="mark in Object.entries(marks)" :key="mark[0]" @click="toggleMark(mark[0] as Marks)" :class="{active: isMarkActive(mark[0] as Marks)}">
    <i :class="`fa-solid fa-${mark[1]}`"></i>
  </button>

  <button v-for="heading in Object.entries(headings)" :key="heading[0]" @click="toggleHeading(parseInt(heading[0]) as Headings)" :class="{active: isHeadingActive(parseInt(heading[0]) as Headings)}">
    <i class="fa-solid fa-heading"></i> <i :class="`fa-solid fa-${heading[1]}`"></i>
  </button>
</template>