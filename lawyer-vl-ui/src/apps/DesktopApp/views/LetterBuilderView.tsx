import { LetterParagraph } from '../components/LetterParagraph'
import { Typography, Box, Theme, Breadcrumbs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect, useState } from 'react'
import { updateAllParagraphs } from '../../../data/paragraphsDataSlice'
import { useSelector, useDispatch } from 'react-redux'
import { getData } from '../../../api/vlmasersheet'
import AppState from '../../../data/AppState'
import { Paragraph } from '../../../data/types'
import { filterByExactTopicMatch, filterByGeneralMatch } from '../../../filters'
import { Grid } from '@material-ui/core'

type Props = {}

const useStyles = makeStyles((theme: Theme) => {})

export const LetterBuilderView: React.FC<Props> = (props: Props) => {
	return <></>
}
