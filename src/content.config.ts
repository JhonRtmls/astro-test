import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const projects = defineCollection({
	// Loader para Astro 5/6
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
		category: z.string(),
		tag: z.string().optional(),
		featured: z.boolean().optional(),
		client: z.string().optional(),
	}),
});

const posts = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
		category: z.string().default('Noticias'),
		author: z.string().default('Equipo Gestoo'),
		tags: z.array(z.string()).optional(),
	}),
});

export const collections = { projects, posts };
