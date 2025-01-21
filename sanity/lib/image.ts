import createImageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

import { dataset, projectId } from '../env';

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImageSource | undefined | null) => {
  if (!source) {
    console.warn('Invalid image source provided:', source);
    return {
      url: () => '/placeholder.jpg', // Fallback URL
    };
  }

  return builder.image(source);
};
