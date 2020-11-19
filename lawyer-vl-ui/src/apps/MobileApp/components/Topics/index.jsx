import React, { useContext } from 'react'
import classNames from 'classnames'
import Topic from '../Topic'
import ScreenContext from '../../context'

const Topics = () => {
	const { state } = useContext(ScreenContext)
	const { topicsView } = state
	const { uiTopics } = topicsView

	return (
		<>
			{uiTopics.map((uiTopic, i) => {
				const classes = classNames(
					'topics',
					{
						topics__radio: uiTopic.type === 'radio',
					},
					{
						'topics__multi-statement': uiTopic.type === 'multi-statement',
					},
					{
						topics__tags: uiTopic.type === 'tags',
					}
				)
				return (
					<div className={classes}>
						<Topic key={`${uiTopic.type}-${i}`} uiTopic={uiTopic} />
					</div>
				)
			})}
		</>
	)
}

export default Topics
