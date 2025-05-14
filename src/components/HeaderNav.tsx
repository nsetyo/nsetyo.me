import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { twJoin } from 'tailwind-merge'
import { ChevronDownIcon, CloseIcon } from './Icons'

export function MobileNavItem({ href, children }: { href: string; children: ReactNode }) {
	return (
		<li>
			<a
				className="block py-2"
				href={href}
			>
				{children}
			</a>
		</li>
	)
}

type Nav = { title: string; href: string }

type MobileNavProps = ComponentPropsWithoutRef<'div'> & {
	menu?: Nav[]
}

export function MobileNav({ menu, ...props }: MobileNavProps) {
	return (
		<div {...props}>
			<button
				className={twJoin(
					'group',
					'flex',
					'items-center',
					'rounded-full',
					'bg-white/90',
					'px-4',
					'py-2',
					'text-sm',
					'font-medium',
					'text-zinc-800',
					'shadow-lg',
					'ring-1',
					'shadow-zinc-800/5',
					'ring-zinc-900/5',
					'backdrop-blur-sm',
					'dark:bg-zinc-800/90',
					'dark:text-zinc-200',
					'dark:ring-white/10',
					'dark:hover:ring-white/20',
				)}
			>
				Menu
				<ChevronDownIcon
					className={twJoin(
						'ml-3',
						'h-auto',
						'w-2',
						'stroke-zinc-500',
						'group-hover:stroke-zinc-700',
						'dark:group-hover:stroke-zinc-400',
					)}
				/>
			</button>
			<div
				className={twJoin(
					'data-closed',
					'pointer-events-none',
					'fixed',
					'inset-0',
					'z-50',
					'bg-zinc-800/40',
					'backdrop-blur-xs',
					'duration-150',
					'data-closed:opacity-0',
					'data-enter:ease-out',
					'data-leave:ease-in',
					'dark:bg-black/80',
				)}
			/>
			<div
				className={twJoin(
					'fixed',
					'inset-x-4',
					'top-8',
					'z-50',
					'origin-top',
					'rounded-3xl',
					'bg-white',
					'p-8',
					'ring-1',
					'ring-zinc-900/5',
					'duration-150',
					'data-closed:scale-95',
					'data-closed:opacity-0',
					'data-enter:ease-out',
					'data-leave:ease-in',
					'dark:bg-zinc-900',
					'dark:ring-zinc-800',
				)}
			>
				<div className="flex flex-row-reverse items-center justify-between">
					<button
						aria-label="Close menu"
						className="-m-1 p-1"
					>
						<CloseIcon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
					</button>
					<h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Navigation</h2>
				</div>
				<nav className="mt-6">
					<ul
						className={twJoin(
							'-my-2',
							'divide-y',
							'divide-zinc-100',
							'text-base',
							'text-zinc-800',
							'dark:divide-zinc-100/5',
							'dark:text-zinc-300',
						)}
					>
						{menu?.map((nav) => (
							<MobileNavItem
								key={nav.href}
								href={nav.href}
							>
								{nav.title}
							</MobileNavItem>
						))}
					</ul>
				</nav>
			</div>
		</div>
	)
}

type NavItemProps = {
	isActive?: boolean
	href: string
	children: ReactNode
}

export function NavItem({ isActive, href, children }: NavItemProps) {
	return (
		<li>
			<a
				href={href}
				className={twJoin(
					'relative block px-3 py-2 transition',
					isActive
						? 'text-teal-500 dark:text-teal-400'
						: 'hover:text-teal-500 dark:hover:text-teal-400',
				)}
			>
				{children}
				{isActive && (
					<span
						className={twJoin(
							'absolute',
							'inset-x-1',
							'-bottom-px',
							'h-px',
							'bg-linear-to-r',
							'from-teal-500/0',
							'via-teal-500/40',
							'to-teal-500/0',
							'dark:from-teal-400/0',
							'dark:via-teal-400/40',
							'dark:to-teal-400/0',
						)}
					/>
				)}
			</a>
		</li>
	)
}

type DesktopNavProps = ComponentPropsWithoutRef<'nav'> & {
	active?: string
	menu?: Nav[]
}

export function DesktopNav({ menu, active, ...props }: DesktopNavProps) {
	return (
		<nav {...props}>
			<ul
				className={twJoin(
					'flex',
					'rounded-full',
					'bg-white/90',
					'px-3',
					'text-sm',
					'font-medium',
					'text-zinc-800',
					'shadow-lg',
					'ring-1',
					'shadow-zinc-800/5',
					'ring-zinc-900/5',
					'backdrop-blur-sm',
					'dark:bg-zinc-800/90',
					'dark:text-zinc-200',
					'dark:ring-white/10',
				)}
			>
				{menu?.map((nav) => (
					<NavItem
						key={nav.href}
						isActive={active?.startsWith(nav.href)}
						href={nav.href}
					>
						{nav.title}
					</NavItem>
				))}
			</ul>
		</nav>
	)
}
