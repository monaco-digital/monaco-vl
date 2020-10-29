//@ts-nocheck

import React, {useState} from 'react';
import {Typography, Box, Button, useTheme, Theme, createStyles} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

type Props = {
    addTopic: () => void,
    removeTopic: () => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    clicked: {
        margin: 2,
        width: '10rem',
        color: 'white',
        background: theme.palette.secondary.dark
    },
    notClicked: {
        margin: 2,
        width: '10rem',
        color: 'black',
        background: theme.palette.secondary.light
    }


}));

export const FilterButton: React.FC<Props>= (props: Props) => {
    const theme = useTheme();
    const classes = useStyles();
    const { size , children, onClick, topic, addTopic, removeTopic  } = props
    const [clicked , setClicked ] = useState(false);

    return (
        <>
            {(!clicked) &&
            <Button
                size={ size }
                color="secondary"
                variant="contained"
                onClick={() => {
                    setClicked(true);
                    addTopic()
                }}
                className={classes.notClicked}>
                { children }
            </Button>
            }
            {clicked &&
            <Button
                size={ size }
                color="secondary"
                variant="contained"
                onClick={() => {
                    setClicked(false);
                    removeTopic();
                }}
                className={classes.clicked}>
                { children }
            </Button>
            }
        </>

    )
}
