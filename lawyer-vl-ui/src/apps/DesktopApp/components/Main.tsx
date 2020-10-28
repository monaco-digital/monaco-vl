//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { Grid, Paper, TextField, Box, createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LetterParagraph } from './LetterParagraph';
import { updateAll } from '../../../data/paragraphsDataSlice'
import { useSelector, useDispatch } from 'react-redux';
import { getData } from '../../../api/vlmasersheet';
import AppState from '../../../data/AppState';
import { Paragraph } from '../../../data/types';
import { Filter } from './Filter';
import { filterByExactTopicMatch, filterByGeneralMatch, filterByOrMatch } from '../../../filters';

interface Props {

}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        background: theme.palette.background.default,
        padding: '1rem',
        paddingTop: '2rem'
    },
    paper: {
        height: '100%',
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
}));

export const Main: React.FC<Props> = (props: Props) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const data = useSelector<AppState>((state) => state.paragraphs.all);
    const [filteredData, setFilteredData] = useState<Paragraph[]>(data ?? []);
    console.log('The  filtered data  is:  ', filteredData);

    // filter for exact match
    const [filter, setFilter] = useState<string>(null);
    const [orFitler, setOrFitler] = useState<string[]>([]);

    const matches = filteredData?.length

    const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFilter(event.target.value);
    }

    const onOrFilterChange = (topics: string[]): void => {
        setOrFitler(topics);
    }

    useEffect(() => {
        async function captureData() {
            const data = await getData();
            dispatch(updateAll(data))
        }
        captureData();

    }, []);

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    useEffect(() => {

        //run filter 1
        const newData1 = filterByExactTopicMatch(data, filter);

        //run filter 2 for or logic
        const newData2 = filterByGeneralMatch(newData1, orFitler);
        setFilteredData(newData2)

    }, [filter, orFitler]);

    return (
        <>
            <Grid container spacing={2} className={classes.root} >
                <Grid item spacing={0} xs={12}>
                    <Filter onFilterChange={onFilterChange} onOrFilterChange={onOrFilterChange} matches={matches} />
                </Grid>
                <Grid item spacing={2} xs={12}>
                    <LetterParagraph paragraphs={filteredData} />
                </Grid>
            </Grid>
        </>
    );

}
