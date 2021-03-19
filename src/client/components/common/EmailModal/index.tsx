import React, { FC, useState, useEffect } from 'react';
import { TextField, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CaseTopic, Advice } from '@monaco-digital/vl-types/lib/main';
import axios from 'axios';
import AppState from '../../../../data/AppState';
import { SessionDocument } from '../../../../types/SessionDocument';
import { getDocumentText } from '../../../../utils/renderDocument';
import { getSuggestedAdviceParagraphs } from '../../../../api/vl/paragraphs';
import downloadIcon from '../../../assets/img/download-icon.png';
import config from '../../../../config';

interface Data {
	adviceText: string;
	letterText: string;
	topicsList: string;
	name: string;
	recipient: string;
	contactMe: boolean;
	templateId: string;
}

const EmailModal: FC = () => {
	const history = useHistory();
	const lambdaUrl = config.LAMBDA_URL;
	const [data, setData] = useState<Data>({
		adviceText: '',
		letterText: '',
		topicsList: '',
		name: '',
		recipient: '',
		contactMe: false,
		templateId: '',
	});
	const [contactMe, setContactMe] = useState(false);
	const [name, setName] = useState('');
	const [recipient, setRecipient] = useState('');

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

	const getLetterText = () => {
		const letterText = sessionDocument && sessionDocument.document && getDocumentText(sessionDocument.document);
		return letterText;
	};

	const getTopicsList = () => {
		const topicsList = selectedTopics.map(t => t.text).join(', ');
		return topicsList;
	};

	const getAdviceText = () => {
		const adviceText = adviceParagraphs.map(ap => ap.text).join('\n\n\n');
		return adviceText;
	};

	const getTemplateId = () => {
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

	useEffect(() => {
		data.adviceText = getAdviceText();
		data.letterText = getLetterText();
		data.topicsList = getTopicsList();
		data.templateId = getTemplateId();
		setData(data);
	}, [sessionDocument, selectedTopics, adviceParagraphs]);

	const submitDetails = () => {
		data.name = name;
		data.recipient = recipient;
		data.contactMe = contactMe;

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
					<img style={{ width: '80px' }} src={downloadIcon} />
					<h1 className="emailModal__header">
						SEND THIS
						<br /> TO ME
					</h1>
				</div>
				<div>Enter your name and email address below and we&apos;ll send this to you for free</div>

				<TextField
					id="name"
					onChange={e => setName(e.target.value)}
					label="First name"
					autoComplete="name"
					variant="filled"
					fullWidth
				/>
				<TextField
					id="email"
					onChange={e => setRecipient(e.target.value)}
					label="Your email"
					autoComplete="email"
					variant="filled"
					fullWidth
				/>

				<FormControlLabel
					control={
						<Checkbox checked={contactMe} onChange={() => setContactMe(!contactMe)} name="contactme" color="primary" />
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
							submitDetails();
							history.push('/preview/checkout/email/complete');
						}}
					>
						Send now
					</Button>
				</div>

				<input type="hidden" value={data.letterText} name="letterText" />
				<input type="hidden" value={data.adviceText} name="adviceText" />
			</div>
		</form>
	);
};

export default EmailModal;
