import type { ComponentPropsWithoutRef, ElementType } from 'react'

import { ChevronRightIcon } from '@/components/Icons'
import { clsx } from '@/utilities'

export function Card<T extends React.ElementType = 'div'>({
	as,
	className,
	children,
}: Omit<ComponentPropsWithoutRef<T>, 'as' | 'className'> & {
	as?: T
	className?: string
}) {
	const Component = as ?? 'div'

	return (
		<Component className={clsx(className, 'group relative flex flex-col items-start')}>
			{children}
		</Component>
	)
}

Card.Link = function CardLink({ children, ...props }: ComponentPropsWithoutRef<'a'>) {
	return (
		<>
			<div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-100/80 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50" />
			<a {...props}>
				<span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
				<span className="relative z-10">{children}</span>
			</a>
		</>
	)
}

Card.Title = function CardTitle<T extends ElementType = 'h2'>({
	as,
	href,
	children,
}: Omit<ComponentPropsWithoutRef<T>, 'as' | 'href'> & {
	as?: T
	href?: string
}) {
	const Component = as ?? 'h2'

	return (
		<Component className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
			{href ? <Card.Link href={href}>{children}</Card.Link> : children}
		</Component>
	)
}

Card.Description = function CardDescription({
	children,
	className,
	...props
}: ComponentPropsWithoutRef<'div'>) {
	return (
		<div
			className={clsx(
				'relative',
				'z-10',
				'mt-2',
				'text-sm',
				'text-zinc-600',
				'dark:text-zinc-400',
				className,
			)}
			{...props}
		>
			{children}
		</div>
	)
}

Card.Cta = function CardCta({ children }: { children: React.ReactNode }) {
	return (
		<div
			aria-hidden="true"
			className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
		>
			{children}
			<ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
		</div>
	)
}

Card.Eyebrow = function CardEyebrow<T extends React.ElementType = 'p'>({
	as,
	decorate = false,
	className,
	children,
	...props
}: Omit<ComponentPropsWithoutRef<T>, 'as' | 'decorate'> & {
	as?: T
	decorate?: boolean
}) {
	const Component = as ?? 'p'

	return (
		<Component
			className={clsx(
				className,
				'relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500',
				decorate && 'pl-3.5',
			)}
			{...props}
		>
			{decorate && (
				<span
					className="absolute inset-y-0 left-0 flex items-center"
					aria-hidden="true"
				>
					<span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
				</span>
			)}
			{children}
		</Component>
	)
}
