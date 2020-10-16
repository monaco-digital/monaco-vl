//@ts-nocheck

import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {Paragraph} from './Paragraph';
import {Box, Paper} from '@material-ui/core';

interface Props {
    data: any

}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));


// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {} as any ;
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: '5px',
    width: 400
});




export const LetterParagraph: React.FC<Props>= (props: Props) => {

    const classes = useStyles();

    const { data } = props;

    console.log('the props passed to Letter Paragraph are :  ' , data );

    const [items, setItems] = useState(data ?? []);
    const [selected, setSelected] = useState([{id:"1000", paragraph:"test", verticalHeight: "9", topic: "All"}]);

    console.log('the items are :  ' ,  items );
    console.log('the selected are :  ' , selected );


    useEffect(() => {
            setItems(data ?? []);
            setSelected([{id:"100000", paragraph:"test", verticalHeight: "9", topic: "All"}])

        }, [data])

    const getList = (id) => {
        if (id === 'droppable') {
            return items;
        } else if (id === 'droppable2') {
            return selected;
        }
    }

    const onDragEnd = result => {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                getList(source.droppableId),
                source.index,
                destination.index
            );

            if (source.droppableId === 'droppable2') {
                //@ts-ignore
                setSelected(items);
            }
            setItems(items);

        } else {
            const result = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            );
            setItems(result.droppable);
            setSelected(result.droppable2);

        }
    };

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
               <Box component="div" display="inline" p={1} m={1}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}>
                                {items?.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                            >
                                                <Paragraph paragraph={item.paragraph} verticalHeight={item.verticalHeight} topic={item.topic} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="droppable2">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}>
                                {selected?.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                            >
                                                <Paragraph paragraph={item.paragraph} verticalHeight={item.verticalHeight} topic={item.topic} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </Box>
            </DragDropContext>

        </>
    );

}
