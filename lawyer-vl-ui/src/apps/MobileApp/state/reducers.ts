import defaultFilters from '../data/defaultFilters'
import paragraphs from '../data/paragraphs'
import actionType from '../state/actionType'

type Action = {
	type: string
	payload?: Payload
}

type Payload = {
	mode?: string
	modeModifier?: string
	active?: boolean
	value?: any
}

const reducer = (state, action: Action) => {
	const payload = action.payload
	const value = payload?.value
	const mode = payload?.mode
	const modeModifier = payload?.modeModifier

	switch (action.type) {
		case actionType.SET_DEFAULT_FILTERS:
			return {
				...state,
				defaultFilters: defaultFilters,
			}

		case actionType.SET_SCREEN:
			return {
				...state,
				screen: value,
			}

		case actionType.INCREMENT_SCREEN:
			return {
				...state,
				screen: state.screen += 1,
			}

		case actionType.DECREMENT_SCREEN:
			return {
				...state,
				screen: state.screen -= 1,
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

		case actionType.SET_ACTIVE_FILTERS:
			const filterValue = value
			const isAlreadyActiveFilter = state.activeFilters.includes(filterValue)

			if (isAlreadyActiveFilter) {
				return {
					...state,
					activeFilters: state.activeFilters.filter(
						(value: string) => value !== filterValue
					),
				}
			}

			return {
				...state,
				activeFilters: [...state.activeFilters, filterValue],
			}

		case actionType.SET_ACTIVE_PARAGRAPHS:
			const isAlreadyActiveParagraph = state.activeParagraphs.includes(value)

			if (isAlreadyActiveParagraph) {
				return {
					...state,
					activeParagraphs: state.activeParagraphs.filter(
						value => value !== value
					),
				}
			}

			return {
				...state,
				activeParagraphs: [...state.activeParagraphs, value],
			}

		case actionType.SET_FILTERED_PARAGRAPHS:
			const filteredParagraphs = []

			for (const filter of state.activeFilters) {
				filteredParagraphs.push(...paragraphs[filter])
			}
			return {
				...state,
				filteredParagraphs,
			}

		case actionType.REORDER_PARAGRAPHS:
			const { source, destination } = value
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

		default:
			const isActionTypeEmpty = !action.type

			if (isActionTypeEmpty) {
				console.error(state, action)
				throw new Error('No action type passed.')
			}
	}
}

export default reducer
