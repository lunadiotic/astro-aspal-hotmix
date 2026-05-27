import { defineCollection, z } from 'astro:content';

const servicesCollection = defineCollection({
  type: 'content', // Markdown content files (.md)
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(), // Name or path of the icon to draw
    order: z.number().default(0),
    subServices: z.array(z.string()).optional(), // Sub-services listed in this category
  }),
});

const blogCollection = defineCollection({
  type: 'content', // Markdown content files (.md)
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    author: z.string(),
    image: z.string().optional(),
  }),
});

const wilayahCollection = defineCollection({
  type: 'content', // Markdown content files (.md)
  schema: z.object({
    title: z.string(),
    description: z.string(),
    popularServices: z.array(z.string()).optional(), // Services in high demand for this area
    metaTitle: z.string().optional(),
  }),
});

export const collections = {
  services: servicesCollection,
  blog: blogCollection,
  wilayah: wilayahCollection,
};
