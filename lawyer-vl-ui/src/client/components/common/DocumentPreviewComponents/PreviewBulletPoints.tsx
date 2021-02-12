import { DocumentParagraphBulletPoints, BulletPoints } from '@monaco-digital/vl-types/lib/main'
import React, { FC, useState } from 'react'
import { updateBulletPoints } from '../../../../data/sessionDataSlice'
import { filterByExactTopicMatch } from '../../../../api/vl/paragraphs'
import { SessionParagraph } from '../../../../types/SessionDocument'
import { useDispatch } from 'react-redux'

const PreviewDocumentParagraphBulletPoints: FC<{ bulletPoints: DocumentParagraphBulletPoints }> = ({
	bulletPoints,
}) => {
	const [values, setValues] = useState({})
	const dispatch = useDispatch()

	const updateValue = (key: string, value: string) => {
		console.log('updateValue', key, value)
		const newValues = (values[key] = value)
	}
	const formatValues = values => {
		const formatted = []
		Object.keys(values).map(key => formatted.push({ id: key, value: values[key] }))
		return formatted
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			{bulletPoints.completedBulletPoints.map((bulletPoint, idx) => {
				return (
					<input
						type="text"
						id={bulletPoint.id}
						name={bulletPoint.id}
						placeholder={values[bulletPoint.id] || bulletPoint.value}
						onChange={e => updateValue(e.target.id, e.target.value)}
					/>
				)
			})}
			<button
				type="button"
				onClick={e => dispatch(updateBulletPoints({ id: bulletPoints.id, values: formatValues(values) }))}
			>
				update
			</button>
		</div>
	)
}

const PreviewTemplateParagraphBulletPoints: FC<{ bulletPoints: BulletPoints }> = ({ bulletPoints }) => {
	const dispatch = useDispatch()
	const values = {}
	const updateValue = (key: string, value: string) => {
		values[key] = value
	}
	const formatValues = values => {
		const formatted = []
		Object.keys(values).map(key => formatted.push({ id: key, value: values[key] }))
		return formatted
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			{bulletPoints.bulletPoints.map((bulletPoint, idx) => {
				return (
					<input
						type="text"
						id={bulletPoint.id}
						name={bulletPoint.id}
						placeholder={bulletPoint.placeholder}
						onChange={e => updateValue(e.target.id, e.target.value)}
					/>
				)
			})}
			<button
				type="button"
				onClick={() => dispatch(updateBulletPoints({ id: bulletPoints.id, values: formatValues(values) }))}
			>
				update
			</button>
		</div>
	)
}

export { PreviewDocumentParagraphBulletPoints, PreviewTemplateParagraphBulletPoints }
