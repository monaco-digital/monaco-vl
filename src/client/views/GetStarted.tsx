import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import mainimage from '../assets/img/vl-labels-illustration.svg';

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
		</div>
	);
};

export default GetStarted;
