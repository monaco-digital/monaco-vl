import { DocumentParagraphEditableText, EditableText } from '@monaco-digital/vl-types/lib/main'
import React, { FC, useState } from 'react'
import { updateEditableText } from '../../../../data/sessionDataSlice'

const PreviewDocumentParagraphEditableText: FC<{ editableText: DocumentParagraphEditableText }> = ({
	editableText,
}) => {
	return <span>{editableText.value}</span>
}

const PreviewTemplateParagraphEditableText: FC<{ editableText: EditableText }> = ({ editableText }) => {
	let value = ''

	return (
		<span>
			<input
				type="text"
				id={editableText.id}
				name={editableText.id}
				placeholder={editableText.placeholder}
				onChange={e => {
					updateEditableText({ id: editableText.id, value: value })
				}}
			/>
		</span>
	)
}

export { PreviewDocumentParagraphEditableText, PreviewTemplateParagraphEditableText }
