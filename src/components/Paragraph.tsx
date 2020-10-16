//@ts-nocheck

import React from 'react';
import {Card, CardContent, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

type Props = {
    paragraph: string,
    verticalHeight: string,
    topic: string
}

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    }
});

export const Paragraph: React.FC<Props>= (props: Props) => {
    const classes = useStyles();
    const { paragraph, verticalHeight, topic } = props


    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant="body2"  component="p"  gutterBottom>
                    { paragraph }
                </Typography>
                <Typography variant="h5" component="h5" color="textSecondary">
                    Vertical Height: {verticalHeight}
                </Typography>
                <Typography variant="h5" component="h5" color="textSecondary">
                    Topic: {topic}
                </Typography>
            </CardContent>
        </Card>

    )
}
