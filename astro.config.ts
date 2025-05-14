import { defineConfig, envField } from 'astro/config'
import { loadEnv } from 'vite'

import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import rehypeClassNames from 'rehype-class-names'
import emoji from 'remark-emoji'

const { SITE_BASE_URL } = loadEnv(process.env.NODE_ENV ?? 'prod', process.cwd(), '')

export default defineConfig({
	site: SITE_BASE_URL,
	env: {
		schema: {
			SITE_TITLE: envField.string({
				access: 'public',
				context: 'server',
				default: SITE_BASE_URL.replace('/https://', ''),
				optional: true,
			}),
			SITE_LOCALE: envField.string({
				access: 'public',
				context: 'server',
				default: 'en',
				optional: true,
			}),
		},
	},
	image: {
		service: {
			entrypoint: 'src/images.ts',
		},
	},
	integrations: [mdx(), sitemap(), react()],
	markdown: {
		remarkPlugins: [
			[
				emoji,
				{
					accessible: true,
				},
			],
		],
		rehypePlugins: [
			[
				rehypeClassNames,
				{
					'section.footnotes': 'text-sm mt-24',
				},
			],
		],
		shikiConfig: {
			theme: 'material-theme',
		},
	},
	vite: { plugins: [tailwindcss()] },
})
