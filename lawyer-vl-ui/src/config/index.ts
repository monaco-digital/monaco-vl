const stage = process.env.REACT_APP_STAGE ?? 'dev'

// https://4xrp27z7te.execute-api.eu-west-2.amazonaws.com/prod

const apiUrl = (): string => {
	if (stage === 'prod') {
		return 'https://95b3honng8.execute-api.eu-west-2.amazonaws.com/dev'
	} else if (stage === 'dev') {
		return 'https://95b3honng8.execute-api.eu-west-2.amazonaws.com/dev'
	}
	return ''
}

const vlApiUrl = (): string => {
	if (stage === 'prod') {
		return 'https://4xrp27z7te.execute-api.eu-west-2.amazonaws.com/prod/graphql'
	} else if (stage === 'dev') {
		return 'https://95b3honng8.execute-api.eu-west-2.amazonaws.com/dev/graphql'
	}
}

const gaPropertyId = (): string => {
	if (stage === 'prod') {
		return 'UA-66970592-3'
	} else if (stage === 'dev') {
		return 'UA-66970592-4'
	}
}

export const config = {
	API_URL: apiUrl(),
	VL_API_URL: vlApiUrl(),
	GA_PROPERTY_ID: gaPropertyId(),
}

export default config
