import { convertDate } from '@/utils/dateUtils';
import { TBlogPost } from '@/types/types';
import { forwardRef, Dispatch, SetStateAction } from 'react';
import ReactMarkdown from 'react-markdown';
import CloseIcon from '@/assets/CloseIcon';

interface PreviewModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  postData: TBlogPost;
  intro: string;
  content: string;
}

const Modal = forwardRef<HTMLDivElement, PreviewModalProps>(function Modal(
  { setIsModalOpen, postData, intro, content }: PreviewModalProps,
  ref,
) {
  const convertedDate = convertDate(postData.publishedAt);

  return (
    <div className="fixed inset-0 bg-black/[50%] border border-black rounded flex items-center justify-center z-20">
      <div
        ref={ref}
        className="bg-white relative w-5/6 h-5/6 flex justify-center p-4"
      >
        <button
          className="absolute top-4 right-4 p-3 border border-2 rounded-full bg-red-600 hover:bg-red-400 group duration-100"
          onClick={() => setIsModalOpen(false)}
        >
          <CloseIcon color="white" />
        </button>
        <div className="lg:w-3/5 w-full flex flex-col gap-4 text-lg overflow-y-auto custom-scrollbar">
          <div className="flex flex-col gap-2 items-center">
            <h1 className="text-3xl font-serif font-black text-center">
              {postData.title}
            </h1>
            <div className="flex gap-2 items-center">
              <p>by {postData.author} </p>
              <p>•</p>
              <p>{convertedDate}</p>
              <p>• </p>
              <div className="px-4 py-1 border rounded-full border-black hover:text-link-blue-100 hover:border-link-blue-100">
                {postData.tag}
              </div>
            </div>
          </div>
          <ReactMarkdown className="w-full">{intro || ''}</ReactMarkdown>
          <img
            className="w-4/5 self-center h-96 rounded object-cover"
            src={
              postData.placeholderThumbnail ??
              `http://localhost:1337${postData.thumbnail!.data.attributes.url}`
            }
          />
          <div className="w-full text-lg prose">
            <ReactMarkdown className="w-full">{content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Modal;
