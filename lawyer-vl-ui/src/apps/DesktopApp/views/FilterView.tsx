import { Filter } from '../components/MVPFilter'
import { Typography, Box, Theme, Breadcrumbs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect, useState } from 'react'

type Props = {}

const useStyles = makeStyles((theme: Theme) => {})

export const FilterView: React.FC<Props> = (props: Props) => {
	const classes = useStyles()
	const {} = props

	// filter for exact match
	const [filter, setFilter] = useState<string>(null)
	const [orFitler, setOrFitler] = useState<string[]>([])

	const matches = 1

	const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setFilter(event.target.value)
	}

	const onOrFilterChange = (topics: string[]): void => {
		setOrFitler(topics)
	}

	return (
		<>
			<Filter
				onFilterChange={onFilterChange}
				onOrFilterChange={onOrFilterChange}
				matches={matches}
			/>
		</>
	)
}
