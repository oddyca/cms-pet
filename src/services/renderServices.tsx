import React from 'react';
import { TPost } from '@/types/types';

export const renderComponents = (
  data: TPost[],
  Component: React.ComponentType<TPost['attributes']>,
): React.ReactElement[] => {
  return data.map((post) => {
    const { attributes } = post;
    return <Component key={post.id} {...attributes} />;
  });
};
