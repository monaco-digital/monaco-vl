import React, { FC, useState, useEffect } from 'react'
import ReactModal from 'react-modal'
import {
	TextField,
	FormControlLabel,
	Checkbox,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from '@material-ui/core'
import { useSelector } from 'react-redux'
import AppState from '../../../../data/AppState'
import { SessionDocument } from '../../../../types/SessionDocument'
import { getDocumentText } from '../../../../utils/renderDocument'
import { CaseTopic, Advice } from '@monaco-digital/vl-types/lib/main'
import { getSuggestedAdviceParagraphs } from '../../../../api/vl/paragraphs'

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		padding: '50px',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
}

interface EmailModalProps {
	isOpen: boolean
	onRequestClose: (e: any) => void
}

interface Data {
	adviceText: string
	letterText: string
	topicsList: string
}

const EmailModal: FC<EmailModalProps> = ({ isOpen = false, onRequestClose }) => {
	const handleChange = () => {}

	const [data, setData] = useState<Data>({
		adviceText: '',
		letterText: '',
		topicsList: '',
	})
	const [contactMe, setContactMe] = useState(true)
	const sessionDocument = useSelector<AppState, SessionDocument>(state => state.session.sessionDocument)
	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.session.selectedTopics)
	const [adviceParagraphs, setAdviceParagraphs] = useState<Advice[]>([])

	useEffect(() => {
		const updateAdviceParagraphs = async () => {
			const suggestAdviceParagraphs = await getSuggestedAdviceParagraphs(selectedTopics)
			setAdviceParagraphs(suggestAdviceParagraphs)
		}
		updateAdviceParagraphs()
	}, [])

	const getLetterText = () => {
		const letterText = sessionDocument && sessionDocument.document && getDocumentText(sessionDocument.document)
		return letterText
	}

	const getTopicsList = () => {
		const topicsList = selectedTopics.map(t => t.text).join(', ')
		return topicsList
	}

	const getAdviceText = () => {
		const adviceText = adviceParagraphs.map(ap => ap.text).join('\n\n')
		return adviceText
	}

	const updateData = () => {
		setData({
			adviceText: getAdviceText(),
			letterText: getLetterText(),
			topicsList: getTopicsList(),
		})
		console.log('Topics:', data.topicsList)
		console.log('Letter:', data.letterText)
		console.log('Advice:', data.adviceText)
	}

	return (
		<ReactModal
			isOpen={isOpen}
			shouldCloseOnOverlayClick={true}
			onRequestClose={onRequestClose}
			style={customStyles}
			onAfterOpen={updateData}
		>
			<form>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<div>Please enter your email address below to email this advice to yourself</div>

					<TextField id="filled-password-input" label="Your email" autoComplete="current-password" variant="filled" />
					<FormControlLabel
						control={
							<Checkbox
								checked={contactMe}
								onChange={() => setContactMe(!contactMe)}
								name="contactMe"
								color="primary"
							/>
						}
						label="Contact me about my case"
					/>
					<Button variant="contained" size="large" color="primary">
						Submit
					</Button>

					<input type="hidden" value={data.letterText} name="letterText" />
					<input type="hidden" value={data.adviceText} name="adviceText" />
				</div>
			</form>
		</ReactModal>
	)
}

export default EmailModal
