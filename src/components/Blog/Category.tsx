import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { TCategoryPosts } from '../../types/types';

import { categoryPosts, renderComponents } from '../../controller/controller';

import PostCard from './PostCard';

export default function Category() {
  const initialData = useLoaderData() as TCategoryPosts;
  const { category } = useParams();

  const { isPending, error, data } = useQuery<TCategoryPosts>({
    queryKey: ['category', category],
    queryFn: () => categoryPosts(category!),
    initialData,
  });

  return (
    <div className="grid grid-cols-3 gap-4">
      {isPending ?? <p>Loading...</p>}
      {!isPending && !error && renderComponents(data.data, PostCard)}
    </div>
  );
}