/** @type {import('postcss-load-config').Config} */
const config = {
    plugins: {
        'postcss-preset-env': {
            stage: 1,
            features: {
                'custom-media-queries': true,
            },
        },
        '@tailwindcss/postcss': {},
    },
};

export default config;
