import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

import { setPostInfo, setIsEdited } from '@/state/store/slices/postEditSlice';

import '@mdxeditor/editor/style.css';
import { RootState } from '@/state/store/store';

export default function Editor({ type }: { type: string }) {
  const dispatch = useDispatch();
  const editorRef = useRef<MDXEditorMethods>(null);

  const introText = useSelector(
    (state: RootState) => state.postEditSlice.value.intro,
  );
  const contentText = useSelector(
    (state: RootState) => state.postEditSlice.value.content,
  );

  useEffect(() => {
    if (editorRef.current) {
      if (type === 'intro') {
        editorRef.current.setMarkdown(introText!);
      } else {
        editorRef.current.setMarkdown(contentText);
      }
    }
  }, [introText, contentText]);

  const handleChange = (text: string) => {
    dispatch(setPostInfo({ type, text }));
    dispatch(setIsEdited({ bool: true }));
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
