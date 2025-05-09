import { type SchemaContext, defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const schema = ({ image }: SchemaContext) => {
	const contact = z.object({
		email: z.string(),
		github: z.string(),
		instagram: z.string(),
		linkedin: z.string(),
		twitter: z.string(),
	})

	const work = z.object({
		title: z.string(),
		company: z.string(),
		logo: image(),
		since: z.coerce.date(),
		until: z.coerce.date().optional(),
		tasks: z.string().array().optional(),
	})

	const educations = z.object({
		university: z.string(),
		title: z.string(),
		location: z.string().optional(),
		since: z.coerce.date(),
		until: z.coerce.date().optional(),
	})

	const awards = z.object({
		issuer: z.string(),
		title: z.string(),
		location: z.string().optional(),
		since: z.coerce.date(),
		link: z.string().url().optional(),
	})

	const author = z.object({
		name: z.string(),
		picture: image().optional(),
		avatar: image().optional(),
		contacts: contact.partial().optional(),
		works: z.array(work).optional(),
		educations: z.array(educations).optional(),
		awards: z.array(awards).optional(),
		skills: z.object({}).passthrough().optional(),
	})

	return z.object({
		title: z.string(),
		description: z.string().optional(),
		date: z.coerce.date().optional(),
		author: author.optional(),
	})
}

const pages = defineCollection({
	loader: glob({
		base: './src/content',
		pattern: ['**/*.{md,mdx}', 'posts/index.md', '!posts/*/**'],
	}),
	schema: (ctx) =>
		schema(ctx).extend({
			menu: z.coerce.number().optional(),
		}),
})

const posts = defineCollection({
	loader: glob({
		base: './src/content/posts',
		pattern: ['*/**/*.{md,mdx}', '!index.md'],
	}),
	schema,
})

export const collections = { pages, posts }
