import { getCollection } from 'astro:content'
import { getConfig } from '@/utilities'
import rss from '@astrojs/rss'

const { title, description, author } = await getConfig()

export async function GET(context: any) {
	const posts = await getCollection('posts')

	return rss({
		title,
		description: description ?? '',
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			author: post.data.author?.name ?? author?.name,
			link: `/posts/${post.id}/`,
		})),
	})
}
