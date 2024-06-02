const path = require('path');

module.exports = {
    cache: true,
    entry: './src/Application.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map', // Включаем генерацию карт исходных файлов
    module: {
        rules: [
          {
              test: /\.(png|svg|jpg|gif)$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    sourceMaps: 'inline' // или false, если карта исходного кода не нужна
                }
            }
          }
      ]
    }
};
