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
  blogPosts: Promise<TAllPosts>;
  data: TPost[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export type TCategoryPosts = TAllPosts;

export type TPost = {
  id: number;
  attributes: {
    title: string;
    intro?: string;
    author: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    tag: string;
    article: string;
    edited: string;
    views: number;
    thumbnail?: {
      data: {
        id: number;
        attributes: {
          url: 'string';
        };
      };
    };
    placeholderThumbnail?: string;
  };
};

export type TBlogPost = {
  title: string;
  intro?: string;
  author: string;
  tag: string;
  slug: string;
  article: string;
  publishedAt: string;
  thumbnail?: {
    data: {
      id: number;
      attributes: {
        url: 'string';
      };
    };
  };
  placeholderThumbnail?: string;
};

export type TBigPost = TBlogPost;
export type TPostCard = TBlogPost;

export type TSideBarProps = {
  initialData: TAllPosts;
};

export type TBreadCrumbs = { crumbs: string[] };

export type TFormInputs = {
  email: string;
  password: string;
};

export type TUpdateEntry = {
  entryID: number;
  entryData: {
    title: string;
    category: string;
    intro: string;
    article: string;
    edited: Date;
  };
};
