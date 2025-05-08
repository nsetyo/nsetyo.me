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
