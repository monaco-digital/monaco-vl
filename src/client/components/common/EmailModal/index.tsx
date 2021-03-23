import React, { FC, useState, useEffect } from 'react';
import { TextField, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CaseTopic, Advice } from '@monaco-digital/vl-types/lib/main';
import axios from 'axios';
import AppState from '../../../../data/AppState';
import { SessionDocument } from '../../../../types/SessionDocument';
import { getDocumentText } from '../../../../utils/renderDocument';
import { getSuggestedAdviceParagraphs } from '../../../../api/vl/paragraphs';
import downloadIcon from '../../../assets/img/download-icon.png';
import config from '../../../../config';
import { updateUserData } from '../../../../data/sessionDataSlice';

interface Data {
	adviceText: string;
	letterText: string;
	topicsList: string;
	name: string;
	recipient: string;
	contactMe: boolean;
	templateId: string;
}

const getLetterText = (sessionDocument: SessionDocument) => {
	const letterText = sessionDocument && sessionDocument.document && getDocumentText(sessionDocument.document);
	return letterText;
};

const getTopicsList = (selectedTopics: CaseTopic[]) => {
	const topicsList = selectedTopics.map(t => t.text).join(', ');
	return topicsList;
};

const getAdviceText = (adviceParagraphs: Advice[]) => {
	const adviceText = adviceParagraphs.map(ap => ap.text).join('\n\n\n');
	return adviceText;
};

const getTemplateId = (selectedTopics: CaseTopic[], enabledMonetization) => {
	if (selectedTopics.find(topic => topic.id === '_LET') && !enabledMonetization) {
		return 'LAC';
	}
	if (selectedTopics.find(topic => topic.id === '_RES')) {
		if (enabledMonetization) {
			return 'GE1';
		}
		return 'LAC';
	}
	return 'AD1';
};

const EmailModal: FC = () => {
	const history = useHistory();
	const lambdaUrl = config.LAMBDA_URL;
	const dispatch = useDispatch();
	const [data, setData] = useState<Data>({
		adviceText: '',
		letterText: '',
		topicsList: '',
		name: '',
		recipient: '',
		contactMe: false,
		templateId: '',
	});

	const enabledMonetization = useSelector<AppState, boolean>(state => state.features.enableMonetization);
	const sessionDocument = useSelector<AppState, SessionDocument>(state => state.session.sessionDocument);
	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.session.selectedTopics);
	const [adviceParagraphs, setAdviceParagraphs] = useState<Advice[]>([]);

	useEffect(() => {
		const updateAdviceParagraphs = async () => {
			const suggestAdviceParagraphs = await getSuggestedAdviceParagraphs(selectedTopics);
			setAdviceParagraphs(suggestAdviceParagraphs);
		};
		updateAdviceParagraphs();
	}, [selectedTopics]);

	useEffect(() => {
		const adviceText = getAdviceText(adviceParagraphs);
		const letterText = getLetterText(sessionDocument);
		const topicsList = getTopicsList(selectedTopics);
		const templateId = getTemplateId(selectedTopics, enabledMonetization);
		setData({
			...data,
			adviceText,
			letterText,
			topicsList,
			templateId,
		});
	}, [sessionDocument, selectedTopics, adviceParagraphs, data, enabledMonetization]);

	const submitDetails = () => {
		axios({
			method: 'POST',
			url: lambdaUrl,
			data,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	};

	return (
		<form className="flex justify-center">
			<div className="emailModal space-y-5">
				<div className="emailModal__section-end">
					<img style={{ width: '80px' }} src={downloadIcon} alt="Download Icon" />
					<h1 className="emailModal__header">
						SEND THIS
						<br /> TO ME
					</h1>
				</div>
				<div>Enter your name and email address below and we&apos;ll send this to you for free</div>

				<TextField
					id="name"
					onChange={e => setData({ ...data, name: e.target.value })}
					label="First name"
					autoComplete="name"
					variant="filled"
					fullWidth
				/>
				<TextField
					id="email"
					onChange={e => setData({ ...data, recipient: e.target.value })}
					label="Your email"
					autoComplete="email"
					variant="filled"
					fullWidth
				/>

				<FormControlLabel
					control={
						<Checkbox
							checked={data.contactMe}
							onChange={() => setData({ ...data, contactMe: !data.contactMe })}
							name="contactme"
							color="primary"
						/>
					}
					classes={{ label: 'emailModal__checkbox' }}
					label="Check this box if you want our specialist team to contact you about your case"
				/>

				<div className="emailModal__section-end">
					<Button
						variant="contained"
						size="large"
						color="secondary"
						onClick={() => {
							dispatch(updateUserData({ ...data }));
							if (data.contactMe) {
								history.push('/preview/checkout/cdf1');
							} else {
								history.push('/preview/checkout/email/complete');
								submitDetails();
							}
						}}
					>
						{data.contactMe ? 'Next' : 'Send now'}
					</Button>
				</div>

				<input type="hidden" value={data.letterText} name="letterText" />
				<input type="hidden" value={data.adviceText} name="adviceText" />
			</div>
		</form>
	);
};

export default EmailModal;
