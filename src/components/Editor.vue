<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TaskList from '@tiptap/extension-task-list';
import TaskListItem from '@tiptap/extension-task-item';
import TextAlign from '@tiptap/extension-text-align';
import EditorMenuBar from './EditorMenuBar.vue';

const tiptap = useEditor({
  extensions: [StarterKit,
    Underline,
    TaskList,
    TaskListItem.configure({ nested: true }),
    TextAlign.configure({ types: ['heading','paragraph'] })
  ]
});
</script>
  
<template>
  <editor-menu-bar :editor="tiptap!" />
  <editor-content :editor="tiptap" />
</template>