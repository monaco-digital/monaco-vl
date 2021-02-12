import { DocumentParagraphEditableText, EditableText } from '@monaco-digital/vl-types/lib/main'
import React, { FC, useState } from 'react'
import { updateSessionDocumentComponent } from '../../../../data/sessionDataSlice'
import { useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'

export const PreviewEditableText: FC<{
	templateEditableText: EditableText
	documentEditableText: DocumentParagraphEditableText
}> = ({ templateEditableText, documentEditableText }) => {
	let value = ''
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

	if (documentEditableText?.value) {
		value = documentEditableText.value
		return (
			<span
				contentEditable="true"
				onInput={e => (value = e.currentTarget.textContent)}
				id={documentEditableText.id}
				onBlur={e => updateEditableText(value)}
			>
				{value}
			</span>
		)
	} else {
		return (
			<span>
				<input
					type="text"
					id={templateEditableText.id}
					placeholder={templateEditableText.placeholder}
					onInput={e => (value = e.currentTarget.value)}
					onBlur={e => updateEditableText(value)}
				/>
			</span>
		)
	}
}
