import { DocumentParagraphStaticText, StaticText } from 'api/vl/models';
import AppState from 'data/AppState';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';

interface Props {
	templateStaticText: StaticText;
	documentStaticText: DocumentParagraphStaticText;
}

export const PreviewStaticText: FC<Props> = ({ templateStaticText, documentStaticText }: Props) => {
	const academyFlow = useSelector<AppState, boolean>(state => state.features.academyFlow);
	let text = '';
	if (academyFlow) {
		text =
			documentStaticText?.textThirdPerson || templateStaticText.textThirdPerson || templateStaticText.textFirstPerson;
	} else {
		text = documentStaticText?.textFirstPerson || templateStaticText.textFirstPerson;
	}
	return <span>{text}</span>;
};
