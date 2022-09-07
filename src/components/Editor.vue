<script setup lang="ts">
  import { useEditor, EditorContent } from '@tiptap/vue-3';
  import StarterKit from '@tiptap/starter-kit';
  
  const tiptap = useEditor({
    extensions: [StarterKit]
  });
  </script>
  
  <template>
    <editor-content :editor="tiptap" />
  </template>