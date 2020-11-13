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
import { updateAll } from '../../../data/paragraphsDataSlice'
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
			dispatch(updateAll(data))
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
						<Box style={{ textAlign: 'left', padding: '1rem' }} width="50%">
							<Typography variant="h4">Virtual Lawyer</Typography>
							<br />
							<Typography variant="subtitle1">
								Select all keywords that are relevant to your case. Scan the
								suggested paragraphs on the left of your screen and drag the
								relevant ones to the right of the screen. Choose editor mode to
								perfect your letter. Return to paragraph select and click copy
								text. Place text in a document of your choice.
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
