import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Button, Typography } from '@material-ui/core';
import { mdiNumeric1Circle, mdiNumeric2Circle, mdiNumeric3Circle, mdiNumeric4Circle } from '@mdi/js';
import Icon from '@mdi/react';
import mainimage from '../assets/img/vl-labels-illustration.svg';
import lady_reading_letter_image from '../assets/img/Lady reading letter@2x.png';
import lawyer_signing_doc_image from '../assets/img/Lawyer signing doc@2x.png';
import man_with_coffee_and_letter_image from '../assets/img/Man with coffee and letter@2x.png';
import black_man_reading_letter_image from '../assets/img/Black man reading letter@2x.png';

// eslint-disable-next-line
declare var richSnippetReviewsWidgets;

const GetStartedButton = () => {
	return (
		<Link to="/questions">
			<Button variant="contained" className="get-started__get-started-button" color="primary">
				Get Started
			</Button>
		</Link>
	);
};

const GetStarted: React.FC = () => {
	const iconColour = '#60ABFF';
	const iconSize = 1.2;

	useEffect(() => {
		// Load Review.Io widget into div with Id 'text-banner-widget'
		richSnippetReviewsWidgets('text-banner-widget', {
			store: 'monacosolicitors-co-uk',
			starsClr: '#f47e27',
			textClr: '#313131',
			logoClr: 'black',
			widgetName: 'text-banner',
		});
	}, []);

	return (
		<div className="get-started space-y-3 w-full">
			<div className="md:flex md:flex-shrink">
				<div className="md:flex md:flex-row space-x-20">
					<div className="get-started__heading-box">
						<div>
							<Typography variant="h1">
								Automated <br /> Legal <br /> EXperience
							</Typography>
						</div>
						<div className="get-started__caption">
							<Typography variant="h5">
								Advice and representation for negotiating an exit package in 4 easy steps
							</Typography>
						</div>
						<div className="get-started__first-button">
							<GetStartedButton />
						</div>
					</div>
					<div className="get-started__image">
						<img className="object-cover" src={mainimage} alt="" />
					</div>
				</div>
			</div>

			<div id="text-banner-widget" className="get-started__reviews-widget" />

			<div className="get-started__grid-row">
				<Grid container justify="center" alignItems="flex-start" spacing={10} className="get-started__grid-container">
					<Grid item className="get-started__grid-item">
						<div className="get-started__details">
							<div className="get-started__icon-and-header">
								<Icon
									path={mdiNumeric1Circle}
									title="1 icon"
									size={iconSize}
									color={iconColour}
									className="get-started__number-icon"
								/>
								<Typography variant="h4">Answer quick questions</Typography>
							</div>
							<div className="get-started__bullets">
								<ul className="list-disc">
									<Typography variant="body1">
										<li>Generate advice letter</li>
										<li>Receive it by email</li>
										<li>Understand your case</li>
									</Typography>
								</ul>
							</div>
							<GetStartedButton />
						</div>
					</Grid>
					<Grid item className="get-started__grid-item">
						<div className="get-started__grid-image">
							<img src={lady_reading_letter_image} alt="" className="get-started__grid-image-right" />
						</div>
					</Grid>
				</Grid>
			</div>
			<div className="get-started__grid-row">
				<Grid
					container
					justify="center"
					alignItems="flex-start"
					spacing={10}
					className="get-started__grid-container_alternate"
				>
					<Grid item className="get-started__grid-item">
						<div className="get-started__grid-image">
							<img src={lawyer_signing_doc_image} alt="" />
						</div>
					</Grid>
					<Grid item className="get-started__grid-item">
						<div className="get-started__details-alternate">
							<div className="get-started__icon-and-header">
								<Icon
									path={mdiNumeric2Circle}
									title="2 icon"
									size={iconSize}
									color={iconColour}
									className="get-started__number-icon"
								/>
								<Typography variant="h4">Send legal letter</Typography>
							</div>
							<div className="get-started__bullets">
								<ul className="list-disc">
									<Typography variant="body1">
										<li>Download template letter</li>
										<li>Fill in the gaps</li>
										<li>Send to your employer</li>
									</Typography>
								</ul>
							</div>
							<GetStartedButton />
						</div>
					</Grid>
				</Grid>
			</div>
			<div className="get-started__grid-row">
				<Grid container justify="center" alignItems="flex-start" spacing={10} className="get-started__grid-container">
					<Grid item className="get-started__grid-item">
						<div className="get-started__details">
							<div className="get-started__icon-and-header">
								<Icon
									path={mdiNumeric3Circle}
									title="3 icon"
									size={iconSize}
									color={iconColour}
									className="get-started__number-icon"
								/>
								<Typography variant="h4">Finalise legal documents</Typography>
							</div>
							<div className="get-started__bullets">
								<ul className="list-disc">
									<Typography variant="body1">
										<li>Get response from employer</li>
										<li>Build reply to employer</li>
										<li>Generate court documents if necessary</li>
									</Typography>
								</ul>
							</div>
							<GetStartedButton />
						</div>
					</Grid>
					<Grid item className="get-started__grid-item">
						<div className="get-started__grid-image">
							<img src={man_with_coffee_and_letter_image} alt="" className="get-started__grid-image-right-narrow" />
						</div>
					</Grid>
				</Grid>
			</div>
			<div className="get-started__grid-row">
				<Grid
					container
					justify="center"
					alignItems="flex-start"
					spacing={10}
					className="get-started__grid-container_alternate"
				>
					<Grid item className="get-started__grid-item">
						<div className="get-started__grid-image">
							<img src={black_man_reading_letter_image} alt="" />
						</div>
					</Grid>
					<Grid item className="get-started__grid-item">
						<div className="get-started__details-alternate">
							<div className="get-started__icon-and-header">
								<Icon
									path={mdiNumeric4Circle}
									title="4 icon"
									size={iconSize}
									color={iconColour}
									className="get-started__number-icon"
								/>
								<Typography variant="h4">Agree a settlement</Typography>
							</div>
							<div className="get-started__bullets">
								<ul className="list-disc">
									<Typography variant="body1">
										<li>Most cases settle out of court</li>
										<li>Employer offers compensation</li>
										<li>Monaco can represent you at no charge to you</li>
									</Typography>
								</ul>
							</div>
							<GetStartedButton />
						</div>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

export default GetStarted;
