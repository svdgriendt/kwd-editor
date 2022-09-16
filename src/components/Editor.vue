<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import EditorMenuBar from './EditorMenuBar.vue';

const tiptap = useEditor({
  extensions: [StarterKit]
});
</script>
  
<template>
  <editor-menu-bar :editor="tiptap!" />
  <editor-content :editor="tiptap" />
</template>