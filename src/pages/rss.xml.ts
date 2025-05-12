import { site } from 'astro:config/client'
import { getCollection } from 'astro:content'
import { getConfig } from '@/utilities'
import rss from '@astrojs/rss'

const { description, author } = await getConfig()

const title = site?.replace('https://', '') ?? ''

export async function GET(context: any) {
	const posts = await getCollection('posts')

	return rss({
		title,
		description: description?.trim() ?? '',
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			author: post.data.author?.name ?? author?.name,
			link: `/posts/${post.id}`,
			pubDate: post.data.date,
		})),
	})
}
