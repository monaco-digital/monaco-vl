import { CaseTopic } from '@monaco-digital/vl-types/lib/main'

const checkTopicInputStatus = (selectedTopics: CaseTopic[], id: string): boolean => {
	const isChecked = !!selectedTopics.find(topic => topic.id === id)
	return isChecked
}

export default checkTopicInputStatus
