import { Topic } from '../data/types'
import store from '../data/store'

const topicsFinder = (topicIds: Array<Topic>) => {
	const state = store.getState()
	return state.topics.all.filter(topic => topicIds.find(id => id === topic.id))
}

export default topicsFinder
