//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {Grid, Paper, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {LetterParagraph} from './LetterParagraph';
import axios from 'axios'

interface Props {

}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


const getData = async (): Promise<any>  => {

    const response = await axios.get('https://sheets.googleapis.com/v4/spreadsheets/1xF6OTVysJCQ_MTJEg5uhv2m2WP4xKlln2Py1dI9fTUQ/values/Para%20bank!F6:H?key=AIzaSyCbRwifccXG8NxW4zIK_wbbHSgEskoSkp4')
    const { data: {values = [] } } = response;
    console.log('the values are: ', values);
    const filteredValues = values.filter(value => value.length > 0);
    const data = values.map( (value, index) => {
        const dataPoint = {
            id: index.toString(10),
            paragraph: value[0],
            verticalHeight: value[1],
            topic: value[2]
        }
        return dataPoint;
    })

    console.log('the values to return are: ', data);

    return data;
}

export const Main: React.FC<Props>= (props: Props) => {
    const classes = useStyles();
    const [data, setData] = useState(null);

    useEffect(() => {
        async function captureData () {
            const data = await getData();
            setData(data);
        }
        captureData();
    }, []);

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <TextField id="topic-filter" label="Topic Filter" variant="outlined" />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <LetterParagraph data={data}/>
                </Grid>
            </Grid>
        </>
    );

}
