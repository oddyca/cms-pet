import { useState, useEffect } from 'react';

const processText = (text: string) => {
  const interval = 1;
  let hash = 0;
  for (let i = 0; i < text.length; i += interval) {
    hash += text.charCodeAt(i);
  }
  return hash % 65535; // 16-bit
};

export const useHashText = (text: string, delay: number = 500) => {
  const [hash, setHash] = useState<number>(processText(text));

  useEffect(() => {
    const timeout = setTimeout(() => setHash(processText(text)), delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [text, delay]);

  return hash;
};
