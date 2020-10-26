//@ts-nocheck

import React from 'react';
import {Typography, Box, Paper, TextField, Grid, Theme, createStyles, ButtonGroup, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

type Props = {
    onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void
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
    const { onFilterChange} = props

    return (
        <Paper className={classes.root}>
            <Grid container spacing={2} className={classes.root}>
                <Grid item xs={6}>
                            <Button size="medium" color="secondary" variant="contained" className={classes.button}>Employed</Button>
                            <Button size="medium" color="secondary" variant="contained" className={classes.button}>Dismissed</Button>
                            <Button size="medium" color="secondary" variant="contained" className={classes.button}>Redundancy</Button>
                            <Button size="medium" color="secondary" variant="contained" className={classes.button}>Performance</Button>
                            <Button size="medium" color="secondary" variant="contained" className={classes.button}>Coronavirus</Button>
                            <Button size="medium" color="secondary" variant="contained" className={classes.button}>Whistleblowing</Button>
                            <Button size="medium" color="secondary" variant="contained" className={classes.button}>Sickness</Button>
                            <Button size="medium" color="secondary" variant="contained" className={classes.button}>Money owed</Button>
                            <Button size="medium" color="secondary" variant="contained" className={classes.button}>Resigned</Button>
                            <Button size="medium" color="secondary" variant="contained" className={classes.button}>Suspension</Button>
                            <Button size="medium" color="secondary" variant="contained" className={classes.button}>Misconduct</Button>
                            <Button size="medium" color="secondary" variant="contained" className={classes.button}>FPP</Button>
                </Grid>
                <Grid item xs={4}>
                    <Button size="medium" color="secondary" variant="contained" className={classes.button}>Discrimination</Button>

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
                </Grid>
            </Grid>
        </Paper>
    )
}
