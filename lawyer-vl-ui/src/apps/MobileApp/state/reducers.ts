import paragraphs from '../data/paragraphs'
import actionType from '../state/actionType'
import modes from '../state/modes'
import { ViewLogic } from '../../../clustering'
import { getSuggestedParagraphs } from '../../../filters'

type Action = {
	type: string
	payload?: Payload
}

type Payload = {
	mode?: string
	modeModifier?: string
	active?: boolean
	value?: any
	radio?: boolean
}

const reducer = (state, action: Action) => {
	const payload = action.payload
	const payloadValue = payload?.value
	const mode = payload?.mode
	const modeModifier = payload?.modeModifier

	switch (action.type) {
		case actionType.SET_SCREEN:
			return {
				...state,
				screen: payloadValue,
			}

		case actionType.INCREMENT_SCREEN:
			return {
				...state,
				screen: state.screen + 1,
			}

		case actionType.DECREMENT_SCREEN:
			return {
				...state,
				screen: state.screen - 1,
			}

		case actionType.SET_MODE:
			return {
				...state,
				mode,
			}

		case actionType.SET_MODE_MODIFIER:
			return {
				...state,
				modeModifier,
			}

		case actionType.SET_ACTIVE_TOPICS:
			const { label, value } = payloadValue.topicsValues
			const { options } = payloadValue
			const isRadio = payload.radio
			const isAlreadyActiveFilter = state.activeTopics.find(
				topic => topic.label === label
			)

			if (isRadio) {
				const radioLabels = options.map(option => option.label)
				const filteredRadioTopics = state.activeTopics.filter(
					topic => !radioLabels.includes(topic.label)
				)

				return {
					...state,
					activeTopics: [...filteredRadioTopics, { label, value }],
				}
			}

			if (isAlreadyActiveFilter) {
				return {
					...state,
					activeTopics: state.activeTopics.filter(
						topic => topic.label !== label
					),
				}
			}

			return {
				...state,
				activeTopics: [...state.activeTopics, { label, value }],
			}

		// case actionType.SET_ACTIVE_PARAGRAPHS:
		// 	const isAlreadyActiveParagraph = state.activeParagraphs.includes(
		// 		payloadValue
		// 	)

		// 	if (isAlreadyActiveParagraph) {
		// 		return {
		// 			...state,
		// 			activeParagraphs: state.activeParagraphs.filter(
		// 				value => value !== value
		// 			),
		// 		}
		// 	}

		// 	return {
		// 		...state,
		// 		activeParagraphs: [...state.activeParagraphs, payloadValue],
		// 	}

		case actionType.SET_FILTERED_PARAGRAPHS:
			const activeTopicsStringMap = state.activeTopics.filter(topic => topic)
			const suggestedParagraphs = getSuggestedParagraphs(
				payloadValue,
				activeTopicsStringMap
			)

			return {
				...state,
				suggestedParagraphs,
			}

		case actionType.REORDER_PARAGRAPHS:
			const { source, destination } = payloadValue
			const { index: sourceIndex } = source
			const { index: destinationIndex } = destination
			const tempActiveParagraphs = [...state.activeParagraphs]
			const [removed] = tempActiveParagraphs.splice(sourceIndex, 1)
			tempActiveParagraphs.splice(destinationIndex, 0, removed)

			return {
				...state,
				activeParagraphs: tempActiveParagraphs,
			}

		case actionType.DELETE_PARAGRAPH:
			return {
				...state,
				paragraphs: state.paragraphs.filter(value => value !== value),
			}

		case actionType.SET_TOPIC_VIEW:
			const view = new ViewLogic()
			const currentScreen = {
				screen: state.screen,
				options: state.activeTopics,
			}
			const isBackwards = payloadValue?.isBackwards
			const isNotFirstStep = state.screen !== 1
			const topicsView = view.getNextView(currentScreen)
			const isLastTopicScreen = !topicsView.hasOwnProperty('screen')

			if (isBackwards && isNotFirstStep) {
				return state.previousState
			}

			if (isLastTopicScreen) {
				return {
					...state,
					previousState: state,
					mode: modes.PARAGRAPHS_PREVIEW,
				}
			}

			return {
				...state,
				previousState: state,
				screen: topicsView.screen,
				topicsView,
			}

		default:
			const isActionTypeEmpty = !action.type

			if (isActionTypeEmpty) {
				console.error(state, action)
				throw new Error('No action type passed.')
			}
	}
}

export default reducer
