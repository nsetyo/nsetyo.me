import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { clss, clsx } from '@/utilities'

export function AvatarContainer({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
	return (
		<div
			className={clsx(
				'h-10',
				'w-10',
				'rounded-full',
				'bg-white/90',
				'p-0.5',
				'shadow-lg',
				'ring-1',
				'shadow-zinc-800/5',
				'ring-zinc-900/5',
				'backdrop-blur-sm',
				'dark:bg-zinc-800/90',
				'dark:ring-white/10',
				className,
			)}
			{...props}
		/>
	)
}

type AvatarProps = ComponentPropsWithoutRef<'a'> & {
	alt?: string
	large?: boolean
	src: string
}

export function Avatar({ alt, large = false, src, className, ...props }: AvatarProps) {
	return (
		<a
			aria-label="Home"
			className={clsx('pointer-events-auto', className)}
			href="/"
			{...props}
		>
			<img
				alt={alt}
				className={clss(
					'rounded-full bg-zinc-100 object-cover dark:bg-zinc-800',
					large ? 'h-16 w-16' : 'h-9 w-9',
				)}
				sizes={large ? '4rem' : '2.25rem'}
				src={src}
			/>
		</a>
	)
}
