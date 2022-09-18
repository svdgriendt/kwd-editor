<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import EditorMenuBar from './EditorMenuBar.vue';

const tiptap = useEditor({
  extensions: [StarterKit, Underline]
});
</script>
  
<template>
  <editor-menu-bar :editor="tiptap!" />
  <editor-content :editor="tiptap" />
</template>