const mix = require('laravel-mix');
const webpack = require('webpack');

mix.js('resources/js/app.js', 'public/js')
    .vue()
    .postCss('resources/css/app.css', 'public/css', [
        require('postcss-import'),
        require('autoprefixer'),
    ])
    .postCss('resources/css/variables.css', 'public/css')
    .version()
    .webpackConfig({
        plugins: [
            new webpack.DefinePlugin({
                'process.env.MIX_API_URL': JSON.stringify(process.env.MIX_API_URL)
            })
        ]
    });