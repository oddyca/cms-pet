import { MDXEditor } from '@mdxeditor/editor';
import { headingsPlugin } from '@mdxeditor/editor';
import {
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
} from '@mdxeditor/editor';

import '@mdxeditor/editor/style.css';

export default function Editor({ content }: { content: string }) {
  return (
    <MDXEditor
      markdown={content}
      plugins={[
        toolbarPlugin({
          toolbarContents: () => (
            <>
              {' '}
              <UndoRedo />
              <BoldItalicUnderlineToggles />
            </>
          ),
        }),
        headingsPlugin(),
      ]}
    />
  );
}
