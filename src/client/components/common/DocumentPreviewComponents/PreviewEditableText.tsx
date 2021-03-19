import { DocumentParagraphEditableText, EditableText } from '@monaco-digital/vl-types/lib/main';
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import AutosizeInput from 'react-input-autosize';
import { TextareaAutosize } from '@material-ui/core';
import { updateSessionDocumentComponent } from '../../../../data/sessionDataSlice';

interface Props {
	templateEditableText: EditableText;
	documentEditableText: DocumentParagraphEditableText;
}

export const PreviewEditableText: FC<Props> = ({ templateEditableText, documentEditableText }: Props) => {
	const initialValue =
		documentEditableText?.value !== templateEditableText.placeholder ? documentEditableText?.value : '';
	const [value, setValue] = useState(initialValue);
	const dispatch = useDispatch();

	const updateEditableText = () => {
		const updatedDocumentParagraphComponent = {
			id: nanoid(),
			baseTemplateComponent: templateEditableText.id,
			type: 'EditableText',
			value,
		} as DocumentParagraphEditableText;
		dispatch(updateSessionDocumentComponent(updatedDocumentParagraphComponent));
	};

	if (templateEditableText.maxLength && templateEditableText.maxLength > 100) {
		return (
			<TextareaAutosize
				id={templateEditableText.id}
				style={{ width: '100%', padding: '1px', backgroundColor: '#deefff' }}
				placeholder={templateEditableText.placeholder}
				maxLength={templateEditableText.maxLength}
				defaultValue={value}
				onChange={e => setValue(e.target.value)}
				onBlur={() => updateEditableText()}
			/>
		);
	}
	return (
		<span>
			<AutosizeInput
				id={templateEditableText.id}
				value={value}
				inputStyle={{ padding: '1px', backgroundColor: '#deefff' }}
				placeholderIsMinWidth
				placeholder={templateEditableText.placeholder}
				onChange={e => setValue(e.target.value)}
				onBlur={() => updateEditableText()}
			/>
		</span>
	);
};
