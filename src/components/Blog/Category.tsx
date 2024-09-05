import React from 'react';
import { useLoaderData } from 'react-router-dom';

export default function Category() {
  const data = useLoaderData();

  return <div>{data!.data[0].attributes.title}</div>;
}
