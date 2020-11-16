import React from 'react'
import { Typography, Box, Theme, Breadcrumbs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

type Props = {}

const useStyles = makeStyles((theme: Theme) => {})

export const Main: React.FC<Props> = (props: Props) => {
	const classes = useStyles()
	const {} = props

	return (
		<>
			<Breadcrumbs aria-label="breadcrumb">
				{/*<Link color="inherit" href="/" onClick={handleClick}>
                    Material-UI
                </Link>
                <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
                    Core
                </Link> */}
				<Typography color="textPrimary">Breadcrumb</Typography>
			</Breadcrumbs>
		</>
	)
}
