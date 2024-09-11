import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { categoryPosts } from '../../controller/controller';

export default function Category() {
  const initialData = useLoaderData();
  const { category } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ['category', category],
    queryFn: () => categoryPosts(category!),
    initialData,
  });

  return <div>{data!.data[0].attributes.title}</div>;
}
