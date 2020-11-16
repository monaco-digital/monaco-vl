import { Filter } from '../components/MVPFilter'
import { Typography, Box, Theme, Breadcrumbs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect, useState } from 'react'
import { setTopics } from '../../../data/topicDataSlice'

type Props = {}

const useStyles = makeStyles((theme: Theme) => {})

export const FilterView: React.FC<Props> = (props: Props) => {
	const classes = useStyles()

	return (
		<>
			<Filter />
		</>
	)
}
