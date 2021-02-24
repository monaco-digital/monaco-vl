import { ApolloClient, InMemoryCache } from '@apollo/client'
import config from '../../config'

const { VL_API_URL } = config

export const client = new ApolloClient({
	uri: VL_API_URL,
	cache: new InMemoryCache(),
})
