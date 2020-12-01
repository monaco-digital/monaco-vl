//@ts-nocheck
import React, { useEffect, useState } from 'react'
import {
	Grid,
	Paper,
	TextField,
	Box,
	createStyles,
	Theme,
	Accordion,
	AccordionSummary,
	Typography,
	AccordionDetails,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { LetterParagraph } from './LetterParagraph'
import { updateAllParagraphs } from '../../../data/paragraphsDataSlice'
import { useSelector, useDispatch } from 'react-redux'
import { getData } from '../../../api/vlmasersheet'
import AppState from '../../../data/AppState'
import { Paragraph } from '../../../data/types'
import { Filter } from './Filter'
import {
	filterByExactTopicMatch,
	filterByGeneralMatch,
	filterByOrMatch,
} from '../../../filters'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { SimpleEditor } from './editor/SimpleEditor'
import {
	convertParagraphsForEditor,
	getEData,
} from './editor/convertParagraphs'

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			background: theme.palette.background.default,
			padding: '1rem',
			paddingTop: '2rem',
		},
		proot: {
			width: '100%',
		},
		heading4: {
			fontSize: theme.typography.h4.fontSize,
			fontWeight: theme.typography.subtitle,
		},
		paper: {
			height: '100%',
			padding: theme.spacing(2),
			textAlign: 'center',
			color: theme.palette.text.secondary,
		},
	})
)

export const Main: React.FC<Props> = (props: Props) => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const data = useSelector<AppState>(state => state.paragraphs.all)
	const [filteredData, setFilteredData] = useState<Paragraph[]>(data ?? [])

	// filter for exact match
	const [filter, setFilter] = useState<string>(null)
	const [orFitler, setOrFitler] = useState<string[]>([])

	const matches = filteredData?.length

	const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setFilter(event.target.value)
	}

	const onOrFilterChange = (topics: string[]): void => {
		setOrFitler(topics)
	}

	useEffect(() => {
		async function captureData() {
			const data = await getData()
			console.log('Adding the data 6666 : ', data)
			dispatch(updateAllParagraphs(data))
		}
		captureData()
	}, [])

	useEffect(() => {
		setFilteredData(data)
	}, [data])

	useEffect(() => {
		//run filter 1
		const newData1 = filterByExactTopicMatch(data, filter)

		//run filter 2 for or logic
		const newData2 = filterByGeneralMatch(newData1, orFitler)
		console.log('setting filtered data: ', newData2)
		setFilteredData(newData2)
	}, [filter, orFitler])

	return (
		<>
			<Grid container spacing={2} className={classes.root}>
				<Grid item spacing={0} xs={12}>
					<Paper className={classes.proot}>
						<Box style={{ textAlign: 'left', padding: '1rem' }} width="65%">
							<Typography variant="h4">Virtual Lawyer</Typography>
							<br />
							<Typography variant="subtitle1">
								<div style={{ fontSize: '12' }}>
									Instructions for use:
									<br />
									[1] Ensure you are using a desktop or laptop, as this doesn't
									yet work on mobiles.
									<br />
									[2] Select the case features which apply to your case by
									clicking the orange buttons below. This populates paragraphs
									for you to choose from, on the left hand side of the screen.
									<br />
									[3] Drag and drop the relevant paragraphs from the left hand
									side to the grey space on the right. Try not to use duplicate
									paragraphs.
									<br />
									[4] When you’re happy with your chosen paragraphs, copy and
									paste the contents (use the yellow ‘Copy Text’ button below
									the template letter) onto a Word doc Google doc.
									<br />
									[5] Edit your draft letter, by filling in the gaps in square
									brackets. When filling in the gaps, do not exceed 3 short
									bullet points for each piece of information requested. Try to
									focus only on the very strongest points of your case.
									<br />
									[6] For the amount of money requested, use{' '}
									<a
										style={{ color: '#2962ff' }}
										href="https://www.monacosolicitors.co.uk/free-settlement-agreement-calculator/"
										target="_blank"
									>
										our settlement calculator
									</a>
									<br />
									[7] To apply for our lawyer backed no win no fee service
									(terms and conditions{' '}
									<a
										style={{ color: '#2962ff' }}
										href="https://www.monacosolicitors.co.uk/virtual-lawyer-plus-terms-of-use/"
										target="_blank"
									>
										here
									</a>
									), send your completed letter to us at{' '}
									<a
										style={{ color: '#2962ff' }}
										href="mailto:communications@monacosolicitors.co.uk"
										target="_blank"
									>
										communications@monacosolicitors.co.uk
									</a>
								</div>
							</Typography>
						</Box>
						<Filter
							onFilterChange={onFilterChange}
							onOrFilterChange={onOrFilterChange}
							matches={matches}
						/>
					</Paper>
				</Grid>
				<Grid item spacing={2} xs={12}>
					<LetterParagraph paragraphs={filteredData} />
				</Grid>
			</Grid>
		</>
	)
}
