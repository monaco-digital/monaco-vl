import { DocumentParagraphBulletPoints, BulletPoints } from '@monaco-digital/vl-types/lib/main'
import React, { FC, useState } from 'react'
import { updateSessionDocumentComponent } from '../../../../data/sessionDataSlice'
import { useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'

export const PreviewBulletPoints: FC<{
	templateBulletPoints: BulletPoints
	documentBulletPoints: DocumentParagraphBulletPoints
}> = ({ templateBulletPoints, documentBulletPoints }) => {
	const dispatch = useDispatch()

	const values = {}

	const updateBulletPoints = (values: any) => {
		const updatedDocumentParagraphComponent = {
			id: nanoid(),
			baseTemplateComponent: templateBulletPoints.id,
			type: 'BulletPoints',
			completedBulletPoints: Object.keys(values).map(key => {
				return { id: key, value: values[key] }
			}),
		} as DocumentParagraphBulletPoints
		console.log('updateBulletPoints', updatedDocumentParagraphComponent)
		dispatch(updateSessionDocumentComponent(updatedDocumentParagraphComponent))
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			{templateBulletPoints.bulletPoints.map((bulletPoint, idx) => {
				const matchingDocumentBulletPoint = documentBulletPoints?.completedBulletPoints?.find(
					cbp => cbp.id === bulletPoint.id
				)
				if (matchingDocumentBulletPoint?.value) {
					values[matchingDocumentBulletPoint.id] = matchingDocumentBulletPoint.value
					return (
						<div style={{ display: 'flex', flexDirection: 'row', paddingLeft: '5px' }}>
							<li></li>
							<div
								contentEditable="true"
								onInput={e => (values[bulletPoint.id] = e.currentTarget.textContent)}
								id={bulletPoint.id}
								onBlur={e => updateBulletPoints(values)}
							>
								{values[bulletPoint.id] || matchingDocumentBulletPoint?.value || bulletPoint.placeholder}
							</div>
						</div>
					)
				} else {
					return (
						<div style={{ display: 'flex', flexDirection: 'row', paddingLeft: '5px' }}>
							<li></li>
							<input
								type="text"
								id={bulletPoint.id}
								name={bulletPoint.id}
								placeholder={bulletPoint.placeholder}
								onChange={e => (values[e.target.id] = e.target.value)}
								onBlur={() => updateBulletPoints(values)}
							/>
						</div>
					)
				}
			})}
		</div>
	)
}
