//@ts-nocheck

import React, { useState } from 'react'
import {
	Typography,
	Box,
	Button,
	useTheme,
	Theme,
	createStyles,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

type Props = {
	addTopic: () => void
	removeTopic: () => void
	color?: string
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		clicked: {
			margin: 3,
			width: '10rem',
			color: 'white',
			borderRadius: 15,
			borderColor: theme.palette.primary.main,
			backgroundColor: theme.palette.primary.main,
		},
		notClicked: {
			margin: 3,
			width: '10rem',
			borderRadius: 15,
			color: theme.palette.primary.main,
			borderColor: theme.palette.primary.main,
			backgroundColor: 'white',
		},
	})
)

export const FilterButton: React.FC<Props> = (props: Props) => {
	const theme = useTheme()
	const classes = useStyles(theme)
	const {
		size,
		children,
		onClick,
		topic,
		addTopic,
		removeTopic,
		color = 'secondary',
	} = props
	const [clicked, setClicked] = useState(false)

	return (
		<>
			{!clicked && (
				<Button
					size={size}
					onClick={() => {
						setClicked(true)
						addTopic()
					}}
					variant="outlined"
					className={classes.notClicked}
				>
					{children}
				</Button>
			)}
			{clicked && (
				<Button
					size={size}
					onClick={() => {
						setClicked(false)
						removeTopic()
					}}
					variant="contained"
					className={classes.clicked}
				>
					{children}
				</Button>
			)}
		</>
	)
}
