import { Topics, Topic } from '../data/types'

const topicsFinder = (topicIds: Array<Topic>) => {
	return Topics.filter(topic => topicIds.includes(topic.id))
}

export default topicsFinder
