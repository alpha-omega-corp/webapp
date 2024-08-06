/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,vue}",
    ],
    theme: {
        extend: {},
    },
    corePlugins: {
        aspectRatio: false,
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
    ],
    safelist: [
        'btn-light-orange',
        'btn-light-cyan',
        'btn-light-green',
        'btn-light-red',
        'btn-light-blue',

        'btn-icon-red',
        'btn-icon-blue',
        'lg:grid-cols-2',

        'btn-icon-create',
        'btn-create',
        'btn-icon-delete',
        'btn-delete',
    ],
}