const stage = process.env.REACT_APP_STAGE ?? 'dev'

const apiUrl = (): string => {
	if (stage === 'prod') {
		return ''
	} else if (stage === 'dev') {
		return 'https://iddp5n4xud.execute-api.eu-west-2.amazonaws.com/dev'
	}
	return 'https://iddp5n4xud.execute-api.eu-west-2.amazonaws.com/dev'
}

export const config = {
	API_URL: apiUrl(),
}

export default config
