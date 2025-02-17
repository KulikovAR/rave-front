const webpack = require('webpack');
const mix = require("laravel-mix");

mix.js('resources/js/app.js', 'public/js')
    .vue() // Compile Vue files
    .postCss('resources/css/app.css', 'public/css', [
        require('postcss-import'),
        require('autoprefixer'),
    ])
    .version()
    .postCss('resources/css/variables.css', 'public/css')
    .webpackConfig({
        plugins: [
            new webpack.DefinePlugin({
                'process.env.MIX_API_URL': JSON.stringify(process.env.MIX_API_URL)
            })
        ],
        // devServer: {
        //     historyApiFallback: true, // Добавляем эту строку
        // }
    });