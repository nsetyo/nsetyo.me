import { defineConfig, envField } from 'astro/config'

import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import rehypeClassNames from 'rehype-class-names'
import emoji from 'remark-emoji'

const SITE = 'nsetyo.me'

export default defineConfig({
	site: `https://${SITE}`,
	env: {
		schema: {
			SITE_TITLE: envField.string({
				access: 'public',
				context: 'server',
				default: SITE,
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
