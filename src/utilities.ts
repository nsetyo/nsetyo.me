import { getCollection, getEntry } from 'astro:content'
import * as MainMd from '@/content/index.md'
import jsdom from 'jsdom'
import { twJoin, twMerge } from 'tailwind-merge'

export const clsx = twMerge
export const clss = twJoin

export function getSummary(content: string) {
	if (content.includes('<!--more-->')) return content.split('<!--more-->')[0]

	const dom = new jsdom.JSDOM(content)

	return dom.window.document.body.querySelector('p')?.innerHTML
}

export function dateFormat(date: string | Date) {
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}

	return new Date(date).toLocaleDateString('id-ID', options)
}

export function toTitleCase(str: string) {
	return str.replace(
		/\w\S*/g,
		(txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase(),
	)
}

export async function getMenu() {
	const pages = await getCollection('pages')

	return pages
		.filter((p) => p.data.menu)
		.map((p) => {
			const data = { ...p.data, menu: p.data.menu ?? 0 }

			return { ...p, data }
		})
		.toSorted((a, b) => (b.data.menu > a.data.menu ? -1 : 1))
		.map((p) => {
			return { title: toTitleCase(p.id), href: `/${p.id}` }
		})
}

export async function getConfig() {
	const page = await getEntry('pages', MainMd.frontmatter.slug ?? 'index')

	if (!page) throw new Error("Couldn't find main markdownc page")

	return { ...page.data, page }
}
