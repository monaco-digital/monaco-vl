import React from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Button as MUIButton } from '@material-ui/core';
import Button from '../components/Button';
import mainimage from '../assets/img/vl-labels-illustration.svg';
import lady_reading_letter_image from '../assets/img/Lady reading letter@2x.png';

const GetStarted: React.FC = () => {
	const history = useHistory();

	const goToTopics = () => {
		history.push('/questions');
	};

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
			<div>
				<h2>How can we help you?</h2>
			</div>
			<div>
				<Grid container direction="row" justify="center" alignItems="center" spacing={10}>
					<Grid item>
						<div>
							<h4>Get a free customised advice letter</h4>
							<div className="get-started__find-out-more-bullets">
								<ul className="list-disc">
									<li>No need to sign up</li>
									<li>Get a free customised advice letter</li>
									<li>Customised advice letter in less than 5 minutes</li>
								</ul>
							</div>
							<div>
								<MUIButton variant="outlined">Find out more</MUIButton>
							</div>
						</div>
					</Grid>
					<Grid item>
						<div className="get-started__grid-image">
							<img src={lady_reading_letter_image} alt="" />
						</div>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

export default GetStarted;
