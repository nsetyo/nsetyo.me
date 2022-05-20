const header = document.querySelector('body > header')
const toggle = document.getElementById('scheme-toggler')

window.addEventListener('load', () => {
    header.classList.remove('shadow', 'border-b')

    toggle.classList.remove('hidden')
})

const docel = document.documentElement

document.addEventListener('scroll', () => {
    const scrollHeight = docel.scrollHeight || document.body.scrollHeight
    const scrollTop = docel.scrollTop || document.body.scrollTop
    const scroll = (scrollTop / (scrollHeight - docel.clientHeight)) * 100

    if (scroll > 0) {
        header.classList.add('bg-white', 'dark:bg-gray-900')
        header.classList.add('shadow', 'border-b')
    } else {
        header.classList.remove('bg-white', 'dark:bg-gray-900')
        header.classList.remove('shadow', 'border-b')
    }
})

const switchToLightColorScheme = () => {
    docel.classList.remove('dark')

    localStorage.theme = 'light'
}

const switchToDarkColorScheme = () => {
    docel.classList.add('dark')

    localStorage.theme = 'dark'
}

const colorScheme = window.matchMedia('(prefers-color-scheme: dark)')

const useMatchMediaColor = !('theme' in localStorage) && colorScheme.matches

if (localStorage.theme === 'dark' || useMatchMediaColor) {
    docel.classList.add('dark')
} else {
    docel.classList.remove('dark')
}

colorScheme.addEventListener('change', (event) => {
    if ('theme' in localStorage) {
        return
    }

    if (event.matches) {
        docel.classList.add('dark')
    } else {
        docel.classList.remove('dark')
    }
})
