<script setup lang="ts">
import { Editor } from '@tiptap/vue-3';

const props = defineProps<{ editor: Editor }>();

function toggleMark(mark: 'Bold' | 'Italic' | 'Strike') {
  props.editor.chain().focus()[`toggle${mark}`]().run();
}
function isMarkActive(style: 'bold' | 'italic' | 'strike') {
  return props.editor?.isActive(style);
}
</script>
  
<template>
  <button @click="toggleMark('Bold')" :class="{active: isMarkActive('bold')}"><i class="fa-solid fa-bold"></i></button>
  <button @click="toggleMark('Italic')" :class="{active: isMarkActive('italic')}"><i class="fa-solid fa-italic"></i></button>
  <button @click="toggleMark('Strike')" :class="{active: isMarkActive('strike')}"><i class="fa-solid fa-strikethrough"></i></button>
</template>