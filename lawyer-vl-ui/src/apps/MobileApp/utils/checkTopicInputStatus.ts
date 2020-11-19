const checkTopicInputStatus = (
	activeTopics: Array<{ label: string }>,
	label: string
) => {
	const isChecked = activeTopics.find(topic => topic.label === label) || false
	return isChecked
}

export default checkTopicInputStatus
