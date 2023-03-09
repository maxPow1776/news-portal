import webpack from 'webpack';
import { buildBabelLoader } from './loaders/buildBabelLoader';
import { buildCssLoaders } from './loaders/buildCssLoader';
import { BuildOptions } from './types/config';

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    use: [{
      loader: 'file-loader',
    }],
  };

  const svgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  };

  const babelLoader = buildBabelLoader(isDev);

  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  const cssLoader = buildCssLoaders(isDev);

  return [
    fileLoader,
    svgLoader,
    babelLoader,
    typescriptLoader,
    cssLoader,
  ];
}
