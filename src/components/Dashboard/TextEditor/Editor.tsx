import { MDXEditor } from '@mdxeditor/editor';
import { headingsPlugin } from '@mdxeditor/editor';
import {
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  toolbarPlugin,
} from '@mdxeditor/editor';

import '@mdxeditor/editor/style.css';

export default function Editor({ content }: { content: string }) {
  return (
    <MDXEditor
      className="border border-1 border-gray-300 rounded h-full col-span-10 overflow-y-auto custom-scrollbar"
      markdown={content}
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
      ]}
    />
  );
}
