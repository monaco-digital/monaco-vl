module.exports = {
  purge: [
    'src/**/*.js',
    'src/**/*.jsx',
    'src/**/*.ts',
    'src/**/*.tsx',
    'public/**/*.html',
  ],
  theme: {
    colors: {
      'white': '#fff',
      'green': '#38693A',
      'green-light': '#61DE66',
      'green-lighter': '#DFFFD8',
      'ms-orange': '#FF9553',
      'ms-blue': '#4692B4',
      'gray-light': '#eaedf1',
      gray: '#a0aec0',
      'black': '#414141'
    },
    extend: {},
    fontFamily: {
      sans: [
        'Montserrat',
        'system-ui',
        'BlinkMacSystemFont',
        '-apple-system',
        'Segoe UI',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Fira Sans',
        'Droid Sans',
        'Helvetica Neue',
        'sans-serif',
      ],
      serif: [
        'Merriweather',
        'Constantia',
        'Lucida Bright',
        'Lucidabright',
        'Lucida Serif',
        'Lucida',
        'DejaVu Serif',
        'Bitstream Vera Serif',
        'Liberation Serif',
        'Georgia',
        'serif',
      ],
    },
    corePlugins: {
      outline: false,
    },
    variants: {},
    plugins: [],
  }
}