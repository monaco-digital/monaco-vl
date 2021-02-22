import { DocumentParagraphEditableText, EditableText } from '@monaco-digital/vl-types/lib/main'
import React, { FC, useState, useRef } from 'react'
import { updateSessionDocumentComponent } from '../../../../data/sessionDataSlice'
import { useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'
import AutosizeInput from 'react-input-autosize'
import { TextareaAutosize } from '@material-ui/core'

export const PreviewEditableText: FC<{
	templateEditableText: EditableText
	documentEditableText: DocumentParagraphEditableText
}> = ({ templateEditableText, documentEditableText }) => {
	const [value, setValue] = useState(documentEditableText?.value)
	const dispatch = useDispatch()

	const updateEditableText = (value: string) => {
		const updatedDocumentParagraphComponent = {
			id: nanoid(),
			baseTemplateComponent: templateEditableText.id,
			type: 'EditableText',
			value: value,
		} as DocumentParagraphEditableText
		dispatch(updateSessionDocumentComponent(updatedDocumentParagraphComponent))
	}

	if (templateEditableText.maxLength && templateEditableText.maxLength > 100) {
		return (
			<TextareaAutosize
				id={templateEditableText.id}
				style={{ width: '100%', padding: '1px' }}
				placeholder={templateEditableText.placeholder}
				maxLength={templateEditableText.maxLength}
				defaultValue={value}
				onChange={e => setValue(e.target.value)}
				onBlur={e => updateEditableText(value)}
			/>
		)
	} else {
		return (
			<span>
				<AutosizeInput
					id={templateEditableText.id}
					value={value}
					inputStyle={{ padding: '1px' }}
					placeholderIsMinWidth
					placeholder={templateEditableText.placeholder}
					onChange={e => setValue(e.target.value)}
					onBlur={e => updateEditableText(value)}
				/>
			</span>
		)
	}
}
