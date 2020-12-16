import { CaseTopic } from '../../data/types'

const checkTopicInputStatus = (
	selectedTopics: CaseTopic[],
	id: string
): boolean => {
	const isChecked = !!selectedTopics.find(topic => topic.id === id)
	return isChecked
}

export default checkTopicInputStatus
