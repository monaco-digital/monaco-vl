import React, { useEffect } from 'react'
import { Typography, Box, Theme, Breadcrumbs, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

type Props = {
	next: () => void
}

const useStyles = makeStyles((theme: Theme) => ({
	numberIcon: {
		borderRadius: '50%',
		backgroundColor: 'blue',
		color: 'white',
		width: '2em',
		height: '2em',
		textAlign: 'center',
		lineHeight: '2em',
		marginRight: '10px',
	},
	paragraph: {
		marginTop: '15px',
		marginBottom: '15px',
		display: 'flex',
		flexDirection: 'row',
	},
	getStarted: {
		margin: 3,
		width: '10rem',
		color: 'white',
		borderRadius: 15,
		borderColor: 'green',
		backgroundColor: 'green',
	},
}))

export const GetStarted: React.FC<Props> = (props: Props) => {
	const classes = useStyles()
	const next = props.next
	const {} = props

	/*
	const loadReviews = (callback) => {
		const existingScript = document.getElementById('reviewsIO');
		if (!existingScript) {
		  const script = document.createElement('script');
		  script.src = 'https://widget.reviews.co.uk/rich-snippet-reviews-widgets/dist.js';
		  script.id = 'reviewsIO';
		  document.body.appendChild(script);
		  script.onload = () => { 
			if (callback) callback();
		  };
		}
		if (existingScript && callback) callback();
	};

	/*
	const initialiseReviews = () => {
		document.richSnippetReviewsWidgets("text-banner-widget", {
			store: "monacosolicitors-co-uk",
			starsClr: "#f47e27",
			textClr: "#313131",
			logoClr: "black",
			widgetName: "text-banner"
		})
	}

	useEffect(() => {
		loadReviews(initialiseReviews)
	}, []) */

	return (
		<>
			<div
				style={{
					fontSize: '12',
					textAlign: 'left',
					padding: '50px',
					width: '100vw',
				}}
			>
				<h1>Welcome to Virtual Lawyer</h1>
				<p>
					<i>Negotiate your exit like a pro</i>{' '}
				</p>
				<br />
				<p className={classes.paragraph}>
					With just a few clicks you can build the perfect legal letter to send
					to your employer to negotiate <br /> a fair settlement agreement exit
					package after being badly treated at work.
				</p>

				<p className={classes.paragraph}>
					<b>You can do this in 3 easy steps:</b>
				</p>

				<p className={classes.paragraph}>
					<i className={classes.numberIcon}>1</i> Tell us a few
					<b>&nbsp;key facts&nbsp;</b> about your case.
				</p>

				<p className={classes.paragraph}>
					<i className={classes.numberIcon}>2</i> Select the paragraphs that
					apply to you to <b>&nbsp;build your letter&nbsp;</b>.
				</p>

				<p className={classes.paragraph}>
					<i className={classes.numberIcon}>3</i>{' '}
					<b>&nbsp;Preview your letter&nbsp;</b> and create a draft to take
					away.
				</p>

				<Button
					size={'large'}
					onClick={() => {
						next()
					}}
					className={classes.getStarted}
					variant="contained"
				>
					Get started
				</Button>
			</div>
		</>
	)
}
