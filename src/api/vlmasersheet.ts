//@ts-nocheck
import axios from 'axios'

export const getData = async (): Promise<any>  => {
    const sheetsUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1xF6OTVysJCQ_MTJEg5uhv2m2WP4xKlln2Py1dI9fTUQ/values/Para%20bank!F6:I?key=AIzaSyCbRwifccXG8NxW4zIK_wbbHSgEskoSkp4'
    const response = await axios.get(sheetsUrl)
    const { data: {values = [] } } = response;
    const filteredValues = values.filter(value => value.length > 0);
    const data = filteredValues.map( (value, index) => {
        const dataPoint = {
            id: index.toString(10),
            paragraph: value[0],
            verticalHeight: value[3],
            topic: value[2]
        }
        return dataPoint;
    })
    return data;
}
