import { getAllTags } from '@/services/fetchServices';
import { TTag } from '@/types/types';

export const allTagsSet = async () => {
  const categoriesSet = new Set<string>();

  const response = await getAllTags();
  response.data.map((tag: TTag) => {
    const capFirstLetter =
      tag.attributes.tag.charAt(0).toUpperCase() + tag.attributes.tag.slice(1);

    categoriesSet.add(capFirstLetter);
  });

  return categoriesSet;
};
