import { CaseTopic } from '../../../data/types'

const checkTopicInputStatus = (selectedTopics: CaseTopic[], id: string) => {
	const isChecked = selectedTopics.find(topic => topic.id === id) || false
	return isChecked
}

export default checkTopicInputStatus
