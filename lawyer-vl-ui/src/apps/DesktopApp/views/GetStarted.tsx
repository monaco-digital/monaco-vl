import React from 'react'
import { Typography, Box, Theme, Breadcrumbs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

type Props = {}

const useStyles = makeStyles((theme: Theme) => {})

export const GetStarted: React.FC<Props> = (props: Props) => {
	const classes = useStyles()
	const {} = props

	return (
		<>
			<div style={{ fontSize: '12', textAlign: 'left' }}>
				Instructions for use:
				<br />
				[1] Ensure you are using a desktop or laptop, as this doesn't yet work
				on mobiles.
				<br />
				[2] Select the case features which apply to your case by clicking the
				orange buttons below. This populates paragraphs for you to choose from,
				on the left hand side of the screen.
				<br />
				[3] Drag and drop the relevant paragraphs from the left hand side to the
				grey space on the right. Try not to use duplicate paragraphs.
				<br />
				[4] When you’re happy with your chosen paragraphs, copy and paste the
				contents (use the yellow ‘Copy Text’ button below the template letter)
				onto a Word doc Google doc.
				<br />
				[5] Edit your draft letter, by filling in the gaps in square brackets.
				When filling in the gaps, do not exceed 3 short bullet points for each
				piece of information requested. Try to focus only on the very strongest
				points of your case.
				<br />
				[6] For the amount of money requested, use{' '}
				<a
					style={{ color: '#2962ff' }}
					href="https://www.monacosolicitors.co.uk/free-settlement-agreement-calculator/"
					target="_blank"
				>
					our settlement calculator
				</a>
				<br />
				[7] To apply for our lawyer backed no win no fee service (terms and
				conditions{' '}
				<a
					style={{ color: '#2962ff' }}
					href="https://www.monacosolicitors.co.uk/virtual-lawyer-plus-terms-of-use/"
					target="_blank"
				>
					here
				</a>
				), send your completed letter to us at{' '}
				<a
					style={{ color: '#2962ff' }}
					href="mailto:communications@monacosolicitors.co.uk"
					target="_blank"
				>
					communications@monacosolicitors.co.uk
				</a>
			</div>
		</>
	)
}
