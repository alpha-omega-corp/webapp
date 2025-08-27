import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';
import aspectRatio from '@tailwindcss/aspect-ratio';


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
    plugins: [typography, forms, aspectRatio],
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