import React, { useContext } from 'react'
import classNames from 'classnames'
import ScreenContext from '../../context'

const Paragraph = ({ paragraphText }) => {
	const { activeParagraphs, setActiveParagraphs } = useContext(ScreenContext)
	const handleOnClick = () => {
		setActiveParagraphs(paragraphs => {
			const isAlreadyActive = paragraphs.includes(paragraphText)

			if (isAlreadyActive) {
				return paragraphs.filter(value => value !== paragraphText)
			} else {
				return [...paragraphs, paragraphText]
			}
		})
	}
	const classes = classNames('paragraph__text', {
		'paragraph__text--active': activeParagraphs.find(
			value => value === paragraphText
		),
	})

	return (
		<button className="paragraph" onClick={() => handleOnClick()}>
			<span className={classes}>{paragraphText}</span>
		</button>
	)
}

export default Paragraph
