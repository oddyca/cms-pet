import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  MDXEditor,
  headingsPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  toolbarPlugin,
  quotePlugin,
  MDXEditorMethods,
} from '@mdxeditor/editor';
import {
  setPostInfo,
  setIsEdited,
} from '@/controller/store/slices/postEditSlice';

import '@mdxeditor/editor/style.css';

export default function Editor({
  content,
  type,
}: {
  content: string;
  type: string;
}) {
  const dispatch = useDispatch();
  const editorRef = useRef<MDXEditorMethods>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setMarkdown(content);
    }
  }, [content]);

  const handleChange = (text: string) => {
    dispatch(setPostInfo({ type, text }));
    dispatch(setIsEdited());
  };

  return (
    <MDXEditor
      onChange={handleChange}
      className="col-span-10 border border-1 border-gray-300 rounded h-full overflow-y-auto custom-scrollbar prose max-w-none"
      markdown=""
      ref={editorRef}
      plugins={[
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <BlockTypeSelect />
              <BoldItalicUnderlineToggles />
            </>
          ),
        }),
        headingsPlugin(),
        quotePlugin(),
      ]}
    />
  );
}
