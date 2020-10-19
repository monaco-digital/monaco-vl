//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {Grid, Paper, TextField, Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {LetterParagraph} from './LetterParagraph';
import { setFilter, fetchAllParagraphs, getFilteredParagraphs } from '../data/paragraphsDataSlice'
import { useSelector, useDispatch } from 'react-redux';

interface Props {

}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: '100%',
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: 'yellow'
    },
}));

export const Main: React.FC<Props>= (props: Props) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    
    const filteredParagraphs = useSelector(getFilteredParagraphs)
    const matches = filteredParagraphs && filteredParagraphs.length
    const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>): void => (dispatch(setFilter(event.target.value)));

    useEffect(() => {
        dispatch(fetchAllParagraphs())
      }, []);

    return (
        <>
            <Grid container spacing={0}>
                <Grid item spacing={0} xs={12} style={{ height: "15vh" }}>
                    <Paper className={classes.paper}>
                        <TextField
                            id="topic-filter"
                            label="Topic Filter"
                            type="search"
                            variant="outlined"
                            style={{ background: 'white'}}
                            onChange={onFilterChange}
                        />
                        <Box>
                        {matches} matches...
                        </Box>
                    </Paper>
                </Grid>
                <Grid item spacing={2} xs={12}>
                    <LetterParagraph data={filteredParagraphs}/>
                </Grid>
            </Grid>
        </>
    );

}
