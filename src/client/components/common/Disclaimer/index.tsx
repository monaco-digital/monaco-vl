import React, { FC } from 'react';
import { Divider, Grid, Link, Typography } from '@material-ui/core/';
import { useRouteMatch } from 'react-router-dom';

const Disclaimer: FC = () => {
	// The following pages take up half the width of the screen, so we hide the disclaimer on these pages
	const isQuestions = useRouteMatch('/questions');
	const isStatements = useRouteMatch('/statements');
	const isStep1 = useRouteMatch('/start-legal-process');
	const isStep2 = useRouteMatch('/progress-legal-case');
	const isStep3RespondToEmployer = useRouteMatch('/respond-to-employer');
	const isStep3Grievance = useRouteMatch('/grievance-explanation');
	const isStep3Tribunal = useRouteMatch('/employment-tribunal-explanation');
	const isStep4 = useRouteMatch('/step/settlement');

	const disclaimerText =
		'Monaco Solicitors make every attempt to ensure the factual accuracy of website content at the time of publication. Any guidance or tips given are for information only. Nothing should be taken as legal advice or as forming a lawyer-client relationship. If you require legal representation please get in touch ';

	return (
		<div className="disclaimer">
			{!(
				isQuestions ||
				isStatements ||
				isStep1 ||
				isStep2 ||
				isStep3RespondToEmployer ||
				isStep3Grievance ||
				isStep3Tribunal ||
				isStep4
			) && (
				<>
					<Divider />
					<Grid container justify="space-between">
						<Grid item xs={12} className="disclaimer__text">
							<Typography variant="caption">
								{disclaimerText}{' '}
								<Link href="/cdf" target="_blank">
									here.
								</Link>
							</Typography>
						</Grid>
					</Grid>
					<Grid container direction="row" justify="space-between">
						<Grid item md={6} xs={12}>
							<Typography variant="caption">
								© Monaco Solicitors Ltd, <br />
								Registered company no. 08487857 <br /> <br />
								Solicitors Regulation Authority ID no: 621671 <br />
								<br />
							</Typography>
						</Grid>
						<Grid item md={6} xs={12}>
							<div className="SRA-main-div">
								<div className="SRA-sub-div">
									<iframe
										title="SRA registration"
										frameBorder="0"
										scrolling="no"
										allowTransparency
										src="https://cdn.yoshki.com/iframe/55845r.html"
										className="SRA-iframe"
									/>
								</div>
							</div>
						</Grid>
					</Grid>
				</>
			)}
		</div>
	);
};

export default Disclaimer;
