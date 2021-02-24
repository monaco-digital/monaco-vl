import React, { FC, useState, useEffect } from 'react'
import ReactModal from 'react-modal'
import { TextField, FormControlLabel, Checkbox, Button } from '@material-ui/core'
import { useSelector } from 'react-redux'
import AppState from '../../../../data/AppState'
import { SessionDocument } from '../../../../types/SessionDocument'
import { getDocumentText } from '../../../../utils/renderDocument'
import { CaseTopic, Advice } from '@monaco-digital/vl-types/lib/main'
import { getSuggestedAdviceParagraphs } from '../../../../api/vl/paragraphs'
import axios from 'axios'
import downloadIcon from '../../../assets/img/download-icon.png'
import IconButton from '@material-ui/core/IconButton'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'
import paperPlaneIcon from '../../../assets/img/paper-plane-regular.svg'
import { isWhiteSpaceLike } from 'typescript'
import { on } from 'cluster'

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
	name: string
	recipient: string
	contactMe: boolean
}

const EmailModal: FC<EmailModalProps> = ({ isOpen = false, onRequestClose }) => {
	const handleChange = () => {}

	const lambdaUrl =
		process.env.REACT_APP_STAGE === 'prod'
			? 'https://j8em4hk1r5.execute-api.eu-west-2.amazonaws.com/prod/process-virtual-lawyer'
			: 'https://41k1wj67k4.execute-api.eu-west-2.amazonaws.com/dev/process-virtual-lawyer'

	const [data, setData] = useState<Data>({
		adviceText: '',
		letterText: '',
		topicsList: '',
		name: '',
		recipient: '',
		contactMe: false,
	})
	const [contactMe, setContactMe] = useState(false)
	const [name, setName] = useState('')
	const [recipient, setRecipient] = useState('')

	const sessionDocument = useSelector<AppState, SessionDocument>(state => state.session.sessionDocument)
	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.session.selectedTopics)
	const [adviceParagraphs, setAdviceParagraphs] = useState<Advice[]>([])

	useEffect(() => {
		const updateAdviceParagraphs = async () => {
			const suggestAdviceParagraphs = await getSuggestedAdviceParagraphs(selectedTopics)
			setAdviceParagraphs(suggestAdviceParagraphs)
		}
		updateAdviceParagraphs()
	}, [selectedTopics])

	const getLetterText = () => {
		const letterText = sessionDocument && sessionDocument.document && getDocumentText(sessionDocument.document)
		return letterText
	}

	const getTopicsList = () => {
		const topicsList = selectedTopics.map(t => t.text).join(', ')
		return topicsList
	}

	const getAdviceText = () => {
		const adviceText = adviceParagraphs.map(ap => ap.text).join('\n\n\n')
		return adviceText
	}

	const updateData = () => {
		data.adviceText = getAdviceText()
		data.letterText = getLetterText()
		data.topicsList = getTopicsList()
		setData(data)
	}

	const submitDetails = () => {
		data.name = name
		data.recipient = recipient
		data.contactMe = contactMe

		axios({
			method: 'POST',
			url: lambdaUrl,
			data,
			headers: {
				'Content-Type': 'application/json',
			},
		})
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
				<div className="emailModal">
					<div className="close-button">
						<IconButton aria-label="cancel" onClick={onRequestClose}>
							<CancelOutlinedIcon />
						</IconButton>
					</div>
					<div className="section-end">
						<img style={{ width: '80px' }} src={downloadIcon} />
						<h1>
							SEND THIS
							<br /> TO ME
						</h1>
					</div>
					<div className="section">
						<span>Enter your name and email address below and we'll send this to you for free</span>
					</div>

					<div className="section">
						<TextField
							id="name"
							onChange={e => setName(e.target.value)}
							label="First name"
							autoComplete="name"
							variant="filled"
							classes={{ root: 'textfield' }}
						/>
					</div>
					<div className="section">
						<TextField
							id="email"
							onChange={e => setRecipient(e.target.value)}
							label="Your email"
							autoComplete="email"
							variant="filled"
							classes={{ root: 'textfield' }}
						/>
					</div>

					<div className="section">
						<FormControlLabel
							control={
								<Checkbox
									checked={contactMe}
									onChange={() => setContactMe(!contactMe)}
									name="contactme"
									color="primary"
								/>
							}
							classes={{ label: 'checkbox-font' }}
							label="Check this box if you want our specialist team to contact you about your case"
						/>
					</div>

					<div className="section-end">
						<Button
							variant="contained"
							size="large"
							color="primary"
							onClick={() => {
								submitDetails()
								onRequestClose(null)
							}}
						>
							Send now
						</Button>
					</div>

					<input type="hidden" value={data.letterText} name="letterText" />
					<input type="hidden" value={data.adviceText} name="adviceText" />
				</div>
			</form>
		</ReactModal>
	)
}

export default EmailModal
