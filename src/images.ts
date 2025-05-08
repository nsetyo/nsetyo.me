import type { AstroConfig, ImageTransform, LocalImageService } from 'astro'

import sharpService from 'astro/assets/services/sharp'

const service: LocalImageService = {
	...sharpService,
	getURL(options: ImageTransform, imageConfig: AstroConfig['image']) {
		const searchParams = new URLSearchParams()
		const source = typeof options.src === 'object' ? options.src.src : options.src

		searchParams.append('href', source)

		const { quality, format } = options
		const { width, height } = parseSize(options)

		if (width) {
			searchParams.append('w', width.toString())
		}

		if (height) {
			searchParams.append('h', height.toString())
		}

		if (quality) {
			searchParams.append('q', quality.toString())
		}

		if (format) {
			searchParams.append('f', format)
		}

		return `/_image?${searchParams}`
	},
	getHTMLAttributes(options, imageConfig) {
		const { width, height } = parseSize(options)

		const { src, format, quality, ...attributes } = options

		return {
			...attributes,
			loading: attributes.loading ?? 'lazy',
			decoding: attributes.decoding ?? 'async',
			width,
			height,
		}
	},
}

const parseSize = (options: ImageTransform) => {
	const source = typeof options.src === 'object' ? options.src.src : options.src

	const { width, height } = options

	if (typeof options.src !== 'object') {
		return { width, height }
	}

	const aspectRatio = options.src.width / options.src.height
	const isPostImages = source.includes('/content/posts/')

	if (height && !width) {
		return { height, width: Math.round(height * aspectRatio) }
	}

	if (isPostImages && options.src.width > 720) {
		return { width: 720, height: Math.round(720 / aspectRatio) }
	}

	if (width && !height) {
		return { width, height: Math.round(width / aspectRatio) }
	}

	return { width, height }
}

export default service
