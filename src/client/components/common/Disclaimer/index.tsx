import React, { FC } from 'react';
import { Grid, Typography } from '@material-ui/core/';

const Disclaimer: FC = () => {
	const disclaimerText =
		'Monaco Solicitors make every attempt to ensure the factual accuracy of website content at the time of publication. Any guidance or tips given are for information only. Nothing should be taken as legal advice or as forming a lawyer-client relationship. If you require legal representation please get in touch ';

	return (
		<div className="disclaimer">
			<Grid container justify="space-between">
				<Grid item xs={12} className="disclaimer-text">
					<Typography variant="body1">
						{disclaimerText}{' '}
						<a href="/cdf" target="_blank">
							here.
						</a>
					</Typography>
				</Grid>
			</Grid>
			<Grid container direction="row" justify="space-between">
				<Grid item xs={6}>
					<Typography variant="body2">
						© Monaco Solicitors Ltd, <br />
						Registered company no. 08487857 <br /> <br />
						Solicitors Regulation Authority ID no: 621671
					</Typography>
				</Grid>
				<Grid item xs={6}>
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
		</div>
	);
};

export default Disclaimer;
