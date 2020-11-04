import EditorJs from 'react-editor-js'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { EDITOR_JS_TOOLS } from './tools'
import { Box } from '@material-ui/core'

type Props = {
	data: any
}

const useStyles = makeStyles({
	root: {
		minWidth: 275,
		minHeight: '100rem',
		padding: '2rem',
		textAlign: 'left',
		fontSize: '16px',
	},
})

export const SimpleEditor: React.FC<Props> = (props: Props) => {
	const classes = useStyles()
	const { data } = props
	const [inputBlocks, setInputBlocks] = useState([])

	useEffect(() => {
		const { blocks = [] } = data
		setInputBlocks(blocks)
	}, [data])

	return (
		<Box className={classes.root}>
			<EditorJs
				enableReInitialize={true}
				data={{
					time: 1556098174501,
					blocks: inputBlocks,
					version: '2.12.4',
				}}
				tools={EDITOR_JS_TOOLS}
			/>
			;
		</Box>
	)
}
