import React, { useEffect, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import { Button, Typography, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { mdiNumeric1Circle, mdiNumeric2Circle, mdiNumeric3Circle, mdiNumeric4Circle } from '@mdi/js';
import Icon from '@mdi/react';
import main_image from '../assets/img/operating tablet@2x.png';
import lawyer_signing_doc_image from '../assets/img/Lawyer signing doc@2x.png';
import man_with_coffee_and_letter_image from '../assets/img/Man with coffee and letter@2x.png';
import black_man_reading_letter_image from '../assets/img/Black man reading letter@2x.png';

import GetStartedButton from '../components/common/GetStartedButton';

declare let richSnippetReviewsWidgets;

const GetStarted: React.FC = () => {
	const iconColour = '#60ABFF';
	const iconSize = 1.2;

	const theme = useTheme();
	const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

	const learnMoreRef = useRef(null);

	const executeScroll = () => learnMoreRef.current.scrollIntoView();

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
		<div className="get-started">
			<div className="get-started__heading-mobile">
				<Typography variant="h3">
					Supported self <br /> representation
				</Typography>
			</div>
			{/* First row */}
			<Grid
				container
				className="get-started__grid"
				justify="space-between"
				alignItems="center"
				spacing={isSmall ? 5 : 8}
			>
				<Grid item md={6} xs={12} className="get-started__item-1">
					<div className="get-started__heading-desktop">
						<Typography variant="h3">
							Supported self <br /> representation
						</Typography>
					</div>
					<div className="get-started__icon-and-header">
						<Icon
							path={mdiNumeric1Circle}
							title="1 icon"
							size={iconSize}
							color={iconColour}
							className="get-started__number-icon"
						/>
						<Typography variant="h4">Get advice</Typography>
					</div>
					<ul className="list-disc">
						<Typography variant="body1" className="get-started__bullets">
							<li>Answer quick questions</li>
							<li>Generate written advice</li>
							<li>Decide whether to proceed</li>
						</Typography>
					</ul>
					<div className="centered-mobile">
						<div className={isSmall ? 'flex flex-col' : 'flex flex-row'}>
							<GetStartedButton />
							<Button className="get-started__learn-more-button" size="large" onClick={executeScroll}>
								Learn more
							</Button>
						</div>
					</div>
				</Grid>
				<Grid item md={6} xs={12} className="get-started__item-2">
					<img src={main_image} alt="" />
				</Grid>

				{/* Second Row */}
				<Grid item md={6} xs={12} className="get-started__item-3" ref={learnMoreRef}>
					<img src={lawyer_signing_doc_image} alt="" />
				</Grid>
				<Grid item md={6} xs={12} className="get-started__item-4">
					<div className="centered-desktop">
						<div className="flex-col">
							<div className="get-started__icon-and-header">
								<Icon
									path={mdiNumeric2Circle}
									title="2 icon"
									size={iconSize}
									color={iconColour}
									className="get-started__number-icon"
								/>
								<Typography variant="h4">Write letter</Typography>
							</div>
							<ul className="list-disc">
								<Typography variant="body1" className="get-started__bullets">
									<li>Download letter template</li>
									<li>Get help filling in the gaps</li>
									<li>We can send to your employer</li>
								</Typography>
							</ul>
						</div>
					</div>
				</Grid>

				{/* Third Row */}
				<Grid item md={6} xs={12} className="get-started__item-5">
					<div className="get-started__icon-and-header">
						<Icon
							path={mdiNumeric3Circle}
							title="3 icon"
							size={iconSize}
							color={iconColour}
							className="get-started__number-icon"
						/>
						<Typography variant="h4">Negotiate</Typography>
					</div>
					<ul className="list-disc">
						<Typography variant="body1" className="get-started__bullets">
							<li>Get response from employer</li>
							<li>Build reply to employer</li>
							<li>Generate court documents if needed</li>
						</Typography>
					</ul>
				</Grid>
				<Grid item md={6} xs={12} className="get-started__item-6">
					<img src={man_with_coffee_and_letter_image} alt="" />
				</Grid>

				{/* Fourth Row */}
				<Grid item md={6} xs={12} className="get-started__item-7">
					<img src={black_man_reading_letter_image} alt="" />
				</Grid>
				<Grid item md={6} xs={12} className="get-started__item-8">
					<div className="centered-desktop">
						<div className="flex-col">
							<div className="get-started__icon-and-header">
								<Icon
									path={mdiNumeric4Circle}
									title="4 icon"
									size={iconSize}
									color={iconColour}
									className="get-started__number-icon"
								/>
								<Typography variant="h4">Agree settlement</Typography>
							</div>
							<ul className="list-disc">
								<Typography variant="body1" className="get-started__bullets">
									<li>Most cases settle out of court</li>
									<li>We can sign paperwork for you</li>
									<li>We charge £50 up front + 10% of settlement</li>
								</Typography>
							</ul>
						</div>
					</div>
				</Grid>
			</Grid>
			<div className="get-started__call-to-action">
				<div>
					<Typography variant="h3">
						Ready to start the <br /> experience?
					</Typography>
				</div>
				<div style={{ marginTop: '1rem' }}>
					<GetStartedButton />
				</div>
			</div>
			<div id="text-banner-widget" className="get-started__reviews-widget" />
		</div>
	);
};

export default GetStarted;
