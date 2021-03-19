import { DocumentParagraphBulletPoints, BulletPoints } from '@monaco-digital/vl-types/lib/main';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { TextareaAutosize } from '@material-ui/core';
import { updateSessionDocumentComponent } from '../../../../data/sessionDataSlice';

interface Props {
	templateBulletPoints: BulletPoints;
	documentBulletPoints: DocumentParagraphBulletPoints;
}

export const PreviewBulletPoints: FC<Props> = ({ templateBulletPoints, documentBulletPoints }: Props) => {
	const dispatch = useDispatch();

	const values = {};

	const updateBulletPoints = (values: any) => {
		const updatedDocumentParagraphComponent = {
			id: nanoid(),
			baseTemplateComponent: templateBulletPoints.id,
			type: 'BulletPoints',
			completedBulletPoints: Object.keys(values).map(key => ({ id: key, value: values[key] })),
		} as DocumentParagraphBulletPoints;
		dispatch(updateSessionDocumentComponent(updatedDocumentParagraphComponent));
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			{templateBulletPoints.bulletPoints.map((bulletPoint, idx) => {
				const matchingDocumentBulletPoint = documentBulletPoints?.completedBulletPoints?.find(
					cbp => cbp.id === bulletPoint.id
				);
				if (matchingDocumentBulletPoint?.value && matchingDocumentBulletPoint.value !== bulletPoint.placeholder) {
					values[matchingDocumentBulletPoint.id] = matchingDocumentBulletPoint.value;
					return (
						<div style={{ display: 'flex', flexDirection: 'row', paddingLeft: '5px' }}>
							<li />
							<TextareaAutosize
								id={bulletPoint.id}
								name={bulletPoint.id}
								style={{ width: '90%', backgroundColor: '#deefff', margin: '2px' }}
								placeholder={bulletPoint.placeholder}
								maxLength={350}
								defaultValue={values[bulletPoint.id] || matchingDocumentBulletPoint?.value || bulletPoint.placeholder}
								onChange={e => (values[e.target.id] = e.target.value)}
								onBlur={() => updateBulletPoints(values)}
							/>
						</div>
					);
				}
				return (
					<div style={{ display: 'flex', flexDirection: 'row', paddingLeft: '5px' }}>
						<li />
						<TextareaAutosize
							id={bulletPoint.id}
							name={bulletPoint.id}
							style={{ width: '90%', backgroundColor: '#deefff', margin: '2px' }}
							placeholder={bulletPoint.placeholder}
							maxLength={350}
							onChange={e => (values[e.target.id] = e.target.value)}
							onBlur={() => updateBulletPoints(values)}
						/>
					</div>
				);
			})}
		</div>
	);
};
