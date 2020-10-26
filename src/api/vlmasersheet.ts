//@ts-nocheck
import axios from 'axios'
import {Paragraph, TopicAlgebraOperators} from '../data/types';

export const getData = async (): Promise<any>  => {
    const sheetsUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1xF6OTVysJCQ_MTJEg5uhv2m2WP4xKlln2Py1dI9fTUQ/values/Para%20bank!F6:I?key=AIzaSyCbRwifccXG8NxW4zIK_wbbHSgEskoSkp4'
    const response = await axios.get(sheetsUrl)
    const { data: {values = [] } } = response;
    const filteredValues = values.filter(value => value.length > 0);
    const data = filteredValues.map( (value, index) => {
        const topic = value[2]
        //remove all conjunction operators
        topic?.replace(TopicAlgebraOperators.AND, '');
        topic?.replace(TopicAlgebraOperators.OR, '');
        topic?.replace(TopicAlgebraOperators.OPEN_ENCLOSURE, '');
        topic?.replace(TopicAlgebraOperators.CLOSE_ENCLOSURE, '');
        //disjoin by white space , trim and convert into an array
        const topicList = topic?.split(' ')
                ?.filter(topic => !topic.includes[TopicAlgebraOperators.NOT])
                ?.map(topic => topic.trim())
        const dataPoint: Paragraph = {
            id: index.toString(10),
            paragraph: value[0],
            verticalHeight: value[3],
            topic,
            topicList
        }
        return dataPoint;
    })
    return data;
}
