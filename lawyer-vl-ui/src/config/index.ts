const stage = process.env.REACT_APP_STAGE ?? 'dev'

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

const vlStripeUrl = (): string => {
	if (stage === 'prod') {
		return 'https://oixsmncpd5.execute-api.eu-west-2.amazonaws.com/prod'
	} else if (stage === 'dev') {
		return 'https://rl6mqddh4h.execute-api.eu-west-2.amazonaws.com/dev'
	}
}

export const config = {
	API_URL: apiUrl(),
	VL_API_URL: vlApiUrl(),
	VL_STRIPE_URL: vlStripeUrl(),
	STRIPE_PUBLIC_KEY:
		stage === 'prod' ? 'pk_live_6Uq8eJFH8Hx6nXFrAOCkVckm00cI5AF91f' : 'pk_test_hGSeVxDC8lZRMNo8TNE2XSC200i9IRSvSj',
}

export default config
