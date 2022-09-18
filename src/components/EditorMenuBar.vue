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
const lists = {
  bullet: 'list-ul',
  ordered: 'list-ol',
  task: 'list-check'
};
const horizontalAlignments = {
  left: 'align-left',
  center: 'align-center',
  right: 'align-right',
  justify: 'align-justify'
}
const verticalAlignments = {
  subscript: 'subscript',
  superscript: 'superscript'
};

type KeysOfType<T> = {
  [K in keyof T]: K;
}[keyof T];
type Marks = KeysOfType<typeof marks>;
type Headings = KeysOfType<typeof headings>;
type Lists = KeysOfType<typeof lists>;
type HorizontalAlignments = KeysOfType<typeof horizontalAlignments>;
type VerticalAlignments = KeysOfType<typeof verticalAlignments>;

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

function toggleList(type: Lists) {
  const capitalized = type[0].toUpperCase() + type.slice(1) as Capitalize<Lists>;
  props.editor.chain().focus()[`toggle${capitalized}List`]().run();
}

function isListActive(type: Lists) {
  return props.editor?.isActive(`${type}List`);
}

function setHorizontalAlignment(type: HorizontalAlignments) {
  props.editor.chain().focus().setTextAlign(type).run();
}

function isHorizontalAlignmentActive(type: HorizontalAlignments) {
  return props.editor?.isActive({ textAlign: type });
}

function toggleVerticalAlignment(type: VerticalAlignments) {
  const capitalized = type[0].toUpperCase() + type.slice(1) as Capitalize<VerticalAlignments>;
  props.editor.chain().focus()[`toggle${capitalized}`]().run();
}

function isVerticalAlignmentActive(type: VerticalAlignments) {
  return props.editor?.isActive(type);
}
</script>
  
<template>
  <button v-for="mark in Object.entries(marks)" :key="mark[0]" @click="toggleMark(mark[0] as Marks)" :class="{active: isMarkActive(mark[0] as Marks)}">
    <i :class="`fa-solid fa-${mark[1]}`"></i>
  </button>

  <button v-for="heading in Object.entries(headings)" :key="heading[0]" @click="toggleHeading(parseInt(heading[0]) as Headings)" :class="{active: isHeadingActive(parseInt(heading[0]) as Headings)}">
    <i class="fa-solid fa-heading"></i> <i :class="`fa-solid fa-${heading[1]}`"></i>
  </button>

  <button v-for="list in Object.entries(lists)" :key="list[0]" @click="toggleList(list[0] as Lists)" :class="{active: isListActive(list[0] as Lists)}">
    <i :class="`fa-solid fa-${list[1]}`"></i>
  </button>

  <button v-for="alignment in Object.entries(horizontalAlignments)" :key="alignment[0]" @click="setHorizontalAlignment(alignment[0] as HorizontalAlignments)" :class="{active: isHorizontalAlignmentActive(alignment[0] as HorizontalAlignments)}">
    <i :class="`fa-solid fa-${alignment[1]}`"></i>
  </button>

  <button v-for="alignment in Object.entries(verticalAlignments)" :key="alignment[0]" @click="toggleVerticalAlignment(alignment[0] as VerticalAlignments)" :class="{active: isVerticalAlignmentActive(alignment[0] as VerticalAlignments)}">
    <i :class="`fa-solid fa-${alignment[1]}`"></i>
  </button>
</template>