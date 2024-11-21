import { TUpdateEntry } from '@/types/types';

export const updateViews = async (entryID: number) => {
  try {
    const response = await fetch(
      `http://localhost:1337/api/blog-posts/${entryID}/increment-view`,
      {
        method: 'PUT',
      },
    );

    if (!response.ok) {
      console.error('Failed to increment view count');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const updateEntry = async ({ entryID, entryData }: TUpdateEntry) => {
  const url = `http://localhost:1337/api/blog-posts/${entryID}`;
  const updatedData = {
    data: { ...entryData },
  };

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('JWT')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData);
    }

    return responseData;
  } catch (e) {
    console.error('Error:', e);
  }
};

export const uploadImage = async (entryID: number, imgBlop: string) => {
  const formData = new FormData();
  if (!imgBlop) return;

  // Fetch the Blob from the URL
  const response = await fetch(imgBlop);
  const blob = await response.blob();

  // Create a File object
  const file = new File([blob], 'uploaded-image.jpg', { type: blob.type });
  formData.append('files', file);
  const JWT = sessionStorage.getItem('JWT');

  const uploadResponse = await fetch(`http://localhost:1337/api/upload/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
    body: formData,
  });

  const uploadedImage = await uploadResponse.json();
  const updateResponse = await fetch(
    `http://localhost:1337/api/blog-posts/${entryID}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JWT}`,
      },
      body: JSON.stringify({
        data: {
          thumbnail: uploadedImage,
        },
      }),
    },
  );

  const updatedEntry = await updateResponse.json();
  return updatedEntry;
};

export const deletePost = async (entryID: number) => {
  const url = `http://localhost:1337/api/blog-posts/${entryID}`;
  const JWT = sessionStorage.getItem('JWT');

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JWT}`,
      },
    });

    return response;
  } catch (e) {
    console.error('Error:', e);
  }
};

export const createDraft = async (newPostData: {
  title: string;
  author: string;
  tag: string;
  intro: string | undefined;
  content: string;
  publishedAt: null;
}) => {
  const url = 'http://localhost:1337/api/blog-posts?status=draft';
  const JWT = sessionStorage.getItem('JWT');

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JWT}`,
      },
      body: JSON.stringify({
        data: { ...newPostData },
      }),
    });

    return response;
  } catch (e) {
    console.error('Error:', e);
  }
};
