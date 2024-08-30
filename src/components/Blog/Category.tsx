import React from 'react';
import { useLoaderData } from 'react-router-dom';

export default function Category() {
  const data = useLoaderData();

  console.log('DATA FROM CATEGORY ELEM', data);
  return <div>{data!.data[0].attributes.title}</div>;
}
