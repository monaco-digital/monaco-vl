import React from 'react'
import { Typography, Box, Theme, createStyles } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { CustomParagraphs } from '../../../../data/CustomParagraphs'
import { CaseTopic } from '../../../../data/types'

interface Props {
	selectedTopics: CaseTopic[]
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			textAlign: 'left',
		},
	})
)

export const LetterBottom: React.FC<Props> = (props: Props) => {
	const classes = useStyles()
	const { selectedTopics } = props
	const { bottom } = CustomParagraphs.getParagraphs(selectedTopics)

	const paragraphsText = bottom.map(({ paragraph }) => paragraph)

	return (
		<Box className={classes.root}>
			{paragraphsText.map(paragraphsText => {
				return (
					<div>
						{paragraphsText}
						<br />
						<br />
					</div>
				)
			})}
		</Box>
	)
}
