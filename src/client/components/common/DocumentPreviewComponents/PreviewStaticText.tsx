import { DocumentParagraphStaticText, StaticText } from 'api/vl/models';
import React, { FC } from 'react';

interface Props {
	templateStaticText: StaticText;
	documentStaticText: DocumentParagraphStaticText;
}

export const PreviewStaticText: FC<Props> = ({ templateStaticText, documentStaticText }: Props) => (
	<span>{documentStaticText?.textFirstPerson || templateStaticText.textFirstPerson}</span>
);
