export type TCell = {
  img: string;
  alt: string;
  title?: string;
  paragraph: string;
};

export type TBlogNavBar = {
  name: string;
  slug: string;
};

export type TAllPosts = {
  data: TPost[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      tota: number;
    };
  };
};

export type TCategoryPosts = TAllPosts;

export type TPost = {
  id: number;
  attributes: {
    title: string;
    content: string;
    author: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    tag: string;
    thumbnail?: {
      data: [
        {
          id: number;
          attributes: {
            url: 'string';
          };
        },
      ];
    };
    placeholderThumbnail?: string;
  };
};

export type TBlogPost = {
  title: string;
  content: string;
  author: string;
  tag: string;
  slug: string;
  publishedAt: string;
  thumbnail?: {
    data: [
      {
        id: number;
        attributes: {
          url: 'string';
        };
      },
    ];
  };
  placeholderThumbnail?: string;
};

export type TBigPost = TBlogPost;
export type TPostCard = TBlogPost;

export type TSideBarProps = {
  initialData: TAllPosts;
};
