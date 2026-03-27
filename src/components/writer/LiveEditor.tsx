'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Markdown } from 'tiptap-markdown';
import { useEffect, useRef } from 'react';

function getMarkdown(editor: ReturnType<typeof useEditor>): string {
  if (!editor) return '';
  // tiptap-markdown stores getMarkdown on editor.storage.markdown
  const storage = editor.storage as unknown as Record<string, unknown>;
  const md = storage.markdown as { getMarkdown: () => string } | undefined;
  return md?.getMarkdown() ?? '';
}

interface LiveEditorProps {
  value: string;
  onChange: (markdown: string) => void;
}

/**
 * Rich-text markdown editor powered by Tiptap.
 * Renders markdown in place and reports changes as a markdown string.
 *
 * @param value - The current markdown content.
 * @param onChange - Callback invoked with the updated markdown string on each edit.
 */
export default function LiveEditor({ value, onChange }: LiveEditorProps) {
  const isExternalUpdate = useRef(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Placeholder.configure({
        placeholder: 'Write something…',
      }),
      Markdown.configure({
        html: false,
        transformCopiedText: true,
        transformPastedText: true,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      if (isExternalUpdate.current) return;
      onChange(getMarkdown(editor));
    },
    editorProps: {
      attributes: {
        class: 'outline-none min-h-[280px] p-5',
        role: 'textbox',
        'aria-label': 'Markdown editor',
        'aria-multiline': 'true',
      },
    },
  });

  // Sync external value changes (e.g. reset)
  useEffect(() => {
    if (!editor) return;
    const currentMd = getMarkdown(editor);
    if (value !== currentMd) {
      isExternalUpdate.current = true;
      editor.commands.setContent(value);
      isExternalUpdate.current = false;
    }
  }, [value, editor]);

  return (
    <div
      className="
        rounded-[var(--radius-md)]
        bg-[var(--bg-surface)]
        border border-[var(--border-default)]
        shadow-[var(--shadow-1)]
        overflow-hidden
        transition-colors duration-150 ease-in-out
        focus-within:border-[var(--accent)]
        focus-within:ring-2 focus-within:ring-[var(--accent)] focus-within:ring-opacity-30

        [&_.tiptap]:text-[15px] [&_.tiptap]:leading-[1.75] [&_.tiptap]:text-[var(--text-primary)]

        [&_.tiptap_h1]:text-[1.75rem] [&_.tiptap_h1]:font-bold [&_.tiptap_h1]:leading-[1.2]
        [&_.tiptap_h1]:tracking-[-0.02em] [&_.tiptap_h1]:mt-4 [&_.tiptap_h1]:mb-2
        [&_.tiptap_h2]:text-[1.375rem] [&_.tiptap_h2]:font-bold [&_.tiptap_h2]:leading-[1.25]
        [&_.tiptap_h2]:tracking-[-0.015em] [&_.tiptap_h2]:mt-3 [&_.tiptap_h2]:mb-1.5
        [&_.tiptap_h3]:text-[1.125rem] [&_.tiptap_h3]:font-semibold [&_.tiptap_h3]:leading-[1.3]
        [&_.tiptap_h3]:mt-2 [&_.tiptap_h3]:mb-1

        [&_.tiptap_p]:mb-2

        [&_.tiptap_strong]:font-semibold
        [&_.tiptap_em]:italic

        [&_.tiptap_code]:font-[var(--font-mono)] [&_.tiptap_code]:text-[0.8125rem]
        [&_.tiptap_code]:bg-[var(--bg-subtle)] [&_.tiptap_code]:px-1.5 [&_.tiptap_code]:py-0.5
        [&_.tiptap_code]:rounded-[4px]

        [&_.tiptap_pre]:bg-[var(--bg-subtle)] [&_.tiptap_pre]:rounded-[var(--radius-sm)]
        [&_.tiptap_pre]:p-4 [&_.tiptap_pre]:overflow-x-auto [&_.tiptap_pre]:mb-3
        [&_.tiptap_pre_code]:bg-transparent [&_.tiptap_pre_code]:p-0
        [&_.tiptap_pre_code]:font-[var(--font-mono)] [&_.tiptap_pre_code]:text-[0.8125rem]

        [&_.tiptap_ul]:list-disc [&_.tiptap_ul]:pl-6 [&_.tiptap_ul]:mb-2
        [&_.tiptap_ol]:list-decimal [&_.tiptap_ol]:pl-6 [&_.tiptap_ol]:mb-2
        [&_.tiptap_li]:mb-0.5

        [&_.tiptap_blockquote]:border-l-[3px] [&_.tiptap_blockquote]:border-[var(--border-strong)]
        [&_.tiptap_blockquote]:pl-4 [&_.tiptap_blockquote]:text-[var(--text-secondary)]
        [&_.tiptap_blockquote]:mb-2

        [&_.tiptap_hr]:border-[var(--border-default)] [&_.tiptap_hr]:my-4

        [&_.tiptap_.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]
        [&_.tiptap_.is-editor-empty:first-child::before]:text-[var(--text-tertiary)]
        [&_.tiptap_.is-editor-empty:first-child::before]:float-left
        [&_.tiptap_.is-editor-empty:first-child::before]:h-0
        [&_.tiptap_.is-editor-empty:first-child::before]:pointer-events-none
      "
    >
      <EditorContent editor={editor} />
    </div>
  );
}
