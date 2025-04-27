function clamp(number: number, a: number, b: number) {
	const min = Math.min(a, b)
	const max = Math.max(a, b)

	return Math.min(Math.max(number, min), max)
}

function setProperty(property: string, value: string | null) {
	document.documentElement.style.setProperty(property, value)
}

function removeProperty(property: string) {
	document.documentElement.style.removeProperty(property)
}

const avatarRef = document.getElementById('avatarRef')
const downDelay = avatarRef?.offsetTop ?? 0
const upDelay = 64

function updateStyles(isInitial = false) {
	function updateHeaderStyles() {
		const headerRef = document.getElementById('headerRef')

		if (!headerRef) {
			return
		}

		const { top, height } = headerRef.getBoundingClientRect()
		const scrollY = clamp(
			window.scrollY,
			0,
			document.body.scrollHeight - window.innerHeight,
		)

		if (isInitial) {
			setProperty('--header-position', 'sticky')
		}

		setProperty('--content-offset', `${downDelay}px`)

		if (isInitial || scrollY < downDelay) {
			setProperty('--header-height', `${downDelay + height}px`)
			setProperty('--header-mb', `${-downDelay}px`)
		} else if (top + height < -upDelay) {
			const offset = Math.max(height, scrollY - upDelay)
			setProperty('--header-height', `${offset}px`)
			setProperty('--header-mb', `${height - offset}px`)
		} else if (top === 0) {
			setProperty('--header-height', `${scrollY + height}px`)
			setProperty('--header-mb', `${-scrollY}px`)
		}

		if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
			setProperty('--header-inner-position', 'fixed')
			removeProperty('--header-top')
			removeProperty('--avatar-top')
		} else {
			removeProperty('--header-inner-position')
			setProperty('--header-top', '0px')
			setProperty('--avatar-top', '0px')
		}
	}

	function updateAvatarStyles() {
		if (document.body.dataset.kind !== 'home') {
			return
		}

		const fromScale = 1
		const toScale = 36 / 64
		const fromX = 0
		const toX = 2 / 16

		const scrollY = downDelay - window.scrollY

		const scale = clamp(
			(scrollY * (fromScale - toScale)) / downDelay + toScale,
			fromScale,
			toScale,
		)

		const x = clamp((scrollY * (fromX - toX)) / downDelay + toX, fromX, toX)

		setProperty(
			'--avatar-image-transform',
			`translate3d(${x}rem, 0, 0) scale(${scale})`,
		)

		const borderScale = 1 / (toScale / scale)
		const borderX = (-toX + x) * borderScale
		const borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`

		setProperty('--avatar-border-transform', borderTransform)
		setProperty('--avatar-border-opacity', scale === toScale ? '1' : '0')
	}

	updateHeaderStyles()
	updateAvatarStyles()
}

const updateListener = () => updateStyles()

updateStyles(true)

window.addEventListener('scroll', updateListener, { passive: true })
window.addEventListener('resize', updateListener)
