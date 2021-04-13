import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Button as MUIButton } from '@material-ui/core';
import Button from '../components/Button';
import mainimage from '../assets/img/vl-labels-illustration.svg';
import lady_reading_letter_image from '../assets/img/Lady reading letter@2x.png';
import lawyer_signing_doc_image from '../assets/img/Lawyer signing doc@2x.png';
import man_with_coffee_and_letter_image from '../assets/img/Man with coffee and letter@2x.png';
import black_man_reading_letter_image from '../assets/img/Black man reading letter@2x.png';

// eslint-disable-next-line
declare var richSnippetReviewsWidgets;

const GetStarted: React.FC = () => {
	const history = useHistory();

	const goToTopics = () => {
		history.push('/questions');
	};

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
					<div>
						<h1>Empowering employees</h1>
						<h3>Treated unfairly at work? Get free advice & build a bespoke legal letter in less than 10 minutes.</h3>
						<div className="get-started__button-desktop">
							<Button type="start" text="Get started" rounded fn={goToTopics} />
						</div>
					</div>
					<div className="get-started__image">
						<img className="object-cover" src={mainimage} alt="" />
					</div>
				</div>
				<div className="get-started__button-mobile flex justify-center">
					<Button type="start" text="Get started" rounded fn={goToTopics} />
				</div>
			</div>
			<div id="text-banner-widget" />
			<div>
				<h2>How can we help you?</h2>
			</div>
			<div className="get-started__grid-row">
				<Grid container direction="row" justify="center" alignItems="flex-start" spacing={10}>
					<Grid item>
						<div className="get-started__find-out-more">
							<h4>Get a free customised advice letter</h4>
							<div className="get-started__find-out-more-bullets">
								<ul className="list-disc">
									<li>No need to sign up</li>
									<li>Get a free customised advice letter</li>
									<li>Customised advice letter in less than 5 minutes</li>
								</ul>
							</div>
							<MUIButton variant="outlined">Find out more</MUIButton>
						</div>
					</Grid>
					<Grid item>
						<div className="get-started__grid-image">
							<img src={lady_reading_letter_image} alt="" />
						</div>
					</Grid>
				</Grid>
			</div>
			<div className="get-started__grid-row">
				<Grid container direction="row" justify="center" alignItems="flex-start" spacing={10}>
					<Grid item>
						<div className="get-started__grid-image">
							<img src={lawyer_signing_doc_image} alt="" />
						</div>
					</Grid>
					<Grid item>
						<div className="get-started__find-out-more">
							<h4>Respond to a legal letter</h4>
							<div className="get-started__find-out-more-bullets">
								<ul className="list-disc">
									<li>No need to sign up</li>
									<li>Formal grievance process</li>
									<li>Legally accurate letter in less than 5 minutes</li>
								</ul>
							</div>
							<MUIButton variant="outlined">Find out more</MUIButton>
						</div>
					</Grid>
				</Grid>
			</div>
			<div className="get-started__grid-row">
				<Grid container direction="row" justify="center" alignItems="flex-start" spacing={10}>
					<Grid item>
						<div className="get-started__find-out-more">
							<h4>Build a formal grievance letter</h4>
							<div className="get-started__find-out-more-bullets">
								<ul className="list-disc">
									<li>No need to sign up</li>
									<li>Formal grievance process</li>
									<li>Legally accurate letter in less than 5 minutes</li>
								</ul>
							</div>
							<MUIButton variant="outlined">Find out more</MUIButton>
						</div>
					</Grid>
					<Grid item>
						<div className="get-started__grid-image">
							<img src={man_with_coffee_and_letter_image} alt="" />
						</div>
					</Grid>
				</Grid>
			</div>
			<div className="get-started__grid-row">
				<Grid container direction="row" justify="center" alignItems="flex-start" spacing={10}>
					<Grid item>
						<div className="get-started__grid-image">
							<img src={black_man_reading_letter_image} alt="" />
						</div>
					</Grid>
					<Grid item>
						<div className="get-started__find-out-more">
							<h4>
								Build a &apos;without prejudice&apos; letter <br />
								negotiating an exit package
							</h4>
							<div className="get-started__find-out-more-bullets">
								<ul className="list-disc">
									<li>Off the record</li>
									<li>Without prejudice procedure</li>
									<li>Legally accurate letter in less than 5 minutes</li>
								</ul>
							</div>
							<MUIButton variant="outlined">Find out more</MUIButton>
						</div>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

export default GetStarted;
