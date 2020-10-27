//@ts-nocheck

import React, {useEffect, useState} from 'react';
import {
    Typography,
    Box,
    Paper,
    TextField,
    Grid,
    Theme,
    createStyles,
    ButtonGroup,
    Button,
    styled
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {FilterButton} from './FilterButton';
import {getData} from '../api/vlmasersheet';
import {updateAll} from '../data/paragraphsDataSlice';
import {ParagraphTopicMapping, ParagraphTopics} from '../data/types';

type Props = {
    onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onOrFilterChange: (topics: stringp[]) => void
    matches: number
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
    },
    button: {
        margin: 2,
        width: '10rem',
        color: 'white'
    }
}));



export const Filter: React.FC<Props>= (props: Props) => {
    const classes = useStyles();
    const { onFilterChange, onOrFilterChange, matches} = props
    const [topics, setTopics] = useState<string[]>([]);

    const addTopic = (topic: string) => () =>  {
        const updatedTopics  =  [...topics, topic];
        setTopics(updatedTopics)
    }

    const removeTopic = (topic: string) => () =>  {
        const updatedTopics = topics.filter(tpc => tpc !== topic);
        setTopics(updatedTopics);
    }

    useEffect(() => {
        const mapToTopicList = topics.map( tpc => ParagraphTopicMapping[tpc])
        onOrFilterChange(mapToTopicList);
    }, [topics]);

    return (
        <Paper className={classes.root}>
            <Grid container spacing={1} className={classes.root}>
                <Grid item xs={5}>
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                        <FilterButton size="medium" addTopic={addTopic(ParagraphTopics.EMPLOYED)} removeTopic={removeTopic(ParagraphTopics.EMPLOYED)} >Employed</FilterButton>
                        <FilterButton size="medium" addTopic={addTopic(ParagraphTopics.DISMISSED)} removeTopic={removeTopic(ParagraphTopics.DISMISSED)}>Dismissed</FilterButton>
                        <FilterButton size="medium" addTopic={addTopic(ParagraphTopics.REDUNDANCY)} removeTopic={removeTopic(ParagraphTopics.REDUNDANCY)}>Redundancy</FilterButton>
                        <FilterButton size="medium" addTopic={addTopic(ParagraphTopics.PERFORMANCE)} removeTopic={removeTopic(ParagraphTopics.PERFORMANCE)}>Performance</FilterButton>
                        <FilterButton size="medium" addTopic={addTopic(ParagraphTopics.CORONAVIRUS)} removeTopic={removeTopic(ParagraphTopics.CORONAVIRUS)}>Coronavirus</FilterButton>
                        <FilterButton size="medium" addTopic={addTopic(ParagraphTopics.WHISTLEBLOWING)} removeTopic={removeTopic(ParagraphTopics.WHISTLEBLOWING)}>Whistleblowing</FilterButton>
                        <FilterButton size="medium" addTopic={addTopic(ParagraphTopics.SICKNESS)} removeTopic={removeTopic(ParagraphTopics.SICKNESS)}>Sickness</FilterButton>
                        <FilterButton size="medium" addTopic={addTopic(ParagraphTopics.MONEY_OWED)} removeTopic={removeTopic(ParagraphTopics.MONEY_OWED)}>Money owed</FilterButton>
                        <FilterButton size="medium" addTopic={addTopic(ParagraphTopics.RESIGNED)} removeTopic={removeTopic(ParagraphTopics.RESIGNED)}>Resigned</FilterButton>
                        <FilterButton size="medium" addTopic={addTopic(ParagraphTopics.SUSPENSION)} removeTopic={removeTopic(ParagraphTopics.SUSPENSION)}>Suspension</FilterButton>
                        <FilterButton size="medium" addTopic={addTopic(ParagraphTopics.MISCONDUCT)} removeTopic={removeTopic(ParagraphTopics.MISCONDUCT)}>Misconduct</FilterButton>
                        <FilterButton size="medium" addTopic={addTopic(ParagraphTopics.FAILURE_TO_PROVIDE_PARTCULARS)} removeTopic={removeTopic(ParagraphTopics.FAILURE_TO_PROVIDE_PARTCULARS)}>FPP</FilterButton>
                        <FilterButton size="medium" addTopic={addTopic(ParagraphTopics.GRIEVANCE)} removeTopic={removeTopic(ParagraphTopics.GRIEVANCE)}>Grievance</FilterButton>
                </Grid>
                <Grid item xs={5}>
                            <FilterButton size="medium" addTopic={addTopic(ParagraphTopics.DISCRIMINATION)} removeTopic={removeTopic(ParagraphTopics.DISCRIMINATION)}>Discrimination</FilterButton>
                            <FilterButton size="medium" addTopic={addTopic(ParagraphTopics.PREGNANCY)} removeTopic={removeTopic(ParagraphTopics.PREGNANCY)}>Pregnancy</FilterButton>
                            <FilterButton size="medium" addTopic={addTopic(ParagraphTopics.MATERNITY)} removeTopic={removeTopic(ParagraphTopics.MATERNITY)}>Maternity</FilterButton>
                            <FilterButton size="medium" addTopic={addTopic(ParagraphTopics.SEX)} removeTopic={removeTopic(ParagraphTopics.SEX)}>Sex</FilterButton>
                            <FilterButton size="medium" addTopic={addTopic(ParagraphTopics.SEXUALITY)} removeTopic={removeTopic(ParagraphTopics.SEXUALITY)}>Sexuality</FilterButton>
                            <FilterButton size="medium" addTopic={addTopic(ParagraphTopics.RACE)} removeTopic={removeTopic(ParagraphTopics.RACE)}>Race</FilterButton>
                            <FilterButton size="medium" addTopic={addTopic(ParagraphTopics.RELIGION_BELIEF)} removeTopic={removeTopic(ParagraphTopics.RELIGION_BELIEF)}>Religion/Belief</FilterButton>
                            <FilterButton size="medium" addTopic={addTopic(ParagraphTopics.AGE)} removeTopic={removeTopic(ParagraphTopics.AGE)}>Age</FilterButton>
                            <FilterButton size="medium" addTopic={addTopic(ParagraphTopics.DISABILITY)} removeTopic={removeTopic(ParagraphTopics.DISABILITY)}>Disability</FilterButton>
                            <FilterButton size="medium" addTopic={addTopic(ParagraphTopics.MARRIAGE_CIVIL_PARTNERSHIP)} removeTopic={removeTopic(ParagraphTopics.MARRIAGE_CIVIL_PARTNERSHIP)}>Marriage</FilterButton>
                            <FilterButton size="medium" addTopic={addTopic(ParagraphTopics.GENDER_REASSIGNMENT)} removeTopic={removeTopic(ParagraphTopics.GENDER_REASSIGNMENT)}>GR</FilterButton>

                </Grid>
                <Grid item xs={2}>
                    <Box  display="flex" p={1}  justifyContent="flex-end" >
                    <TextField
                        id="topic-filter"
                        label="Exact Topic Filter"
                        type="search"
                        variant="outlined"
                        color="secondary"
                        onChange={onFilterChange}
                    />
                    </Box>
                    <Box  display="flex" p={2}  justifyContent="center" >
                        <Typography variant="h6">
                            Matches: {matches}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    )
}
