module.exports = {
	parser: require('postcss-comment'),
	plugins: [
		require('postcss-import'),
		require('tailwindcss'),
		require('postcss-extend'),
		require('postcss-nested'),
		require('autoprefixer'),
	],
}
