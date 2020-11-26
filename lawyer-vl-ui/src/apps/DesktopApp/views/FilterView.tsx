import { Filter } from '../components/MVPFilter'
import { Typography, Box, Theme, Breadcrumbs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect, useState } from 'react'
import { setTopics } from '../../../data/topicDataSlice'

type Props = {}

export const FilterView: React.FC<Props> = (props: Props) => {
	return (
		<>
			<Filter />
		</>
	)
}
