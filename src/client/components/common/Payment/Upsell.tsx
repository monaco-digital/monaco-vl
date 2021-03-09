import React, { FC } from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import headerImage from '../../../assets/img/doc-award.png'
const Upsell: FC = () => {
	const history = useHistory()

	return (
		<div className="space-y-5">
			<Typography variant="h5">Did you know….</Typography>
			<Grid container dir="row">
				<Grid item xs={4}>
					<img src={headerImage} />
				</Grid>
				<Grid item xs={8}>
					We can generate a legal letter based on the answers you just gave...
				</Grid>
			</Grid>

			<Button
				variant="contained"
				size="large"
				color="secondary"
				fullWidth
				onClick={() => {
					history.push('/preview/checkout/payment')
				}}
			>
				Buy now - £5.00
			</Button>
			<Button
				size="large"
				fullWidth
				onClick={() => {
					history.push('/preview/checkout/email')
				}}
			>
				No thanks, I would just like my free advice
			</Button>
		</div>
	)
}

export default Upsell
