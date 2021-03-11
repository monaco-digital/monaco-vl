import React, { FC } from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { useHistory, Link } from 'react-router-dom'
import logo from '../../../assets/img/vl-logo-2.png'

const Upsell: FC = () => {
	const history = useHistory()

	return (
		<div className="max-w-xs space-y-5">
			<img className="w-48" alt="Virtual lawyer" src={logo} />

			<Typography variant="h5">Did you know</Typography>

			<p>We can generate a legal letter based on the answers you just gave us</p>
			<Typography variant="body2">
				<ul className="list-disc p-4">
					<li>Legally accurate letter</li>
					<li>Formal grievance process</li>
					<li>Without prejudice procedure</li>
					<li>Request compensation</li>
				</ul>
			</Typography>

			<Grid container dir="row" spacing={2} justify="flex-end">
				<Grid item xs={6}>
					<Button
						variant="contained"
						size="large"
						color="secondary"
						fullWidth
						onClick={() => {
							history.push('/preview/checkout/payment')
						}}
					>
						Buy now
					</Button>
				</Grid>
				<Grid item xs={6} className="self-end">
					<Typography variant="h6" className="underline">
						for just £5
					</Typography>
				</Grid>
			</Grid>

			<Link
				onClick={() => {
					history.push('/preview/checkout/email')
				}}
			>
				<Typography variant="body2">
					No thanks I would just like my free advice <ArrowForwardIcon />
				</Typography>
			</Link>
		</div>
	)
}

export default Upsell
