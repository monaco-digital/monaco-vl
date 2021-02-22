const stage = process.env.REACT_APP_STAGE ?? 'dev'

const apiUrl = (): string => {
	if (stage === 'prod') {
		return 'https://4xrp27z7te.execute-api.eu-west-2.amazonaws.com/prod'
	} else if (stage === 'dev') {
		return 'https://95b3honng8.execute-api.eu-west-2.amazonaws.com/dev'
	}
	return ''
}

const vlApiUrl = (): string => {
	if (stage === 'prod') {
		return ''
	} else if (stage === 'dev') {
		return 'https://95b3honng8.execute-api.eu-west-2.amazonaws.com/dev/graphql'
	}
}

export const config = {
	API_URL: apiUrl(),
	VL_API_URL: vlApiUrl(),
}

export default config