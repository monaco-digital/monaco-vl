import { Paragraph, ParagraphTopics} from '../data/types';

export const filterByExactTopicMatch  = (data: Paragraph[] , topic: string): Paragraph[] => {
    if (!topic) {
        return data;
    }
    return data.filter((value: any) => value.topic === topic);
}


export const filterByOrMatch = (data: Paragraph[], topic: string[]): Paragraph[] => {
    if (!(topic?.length > 0)) {
        return data;
    }

    return data.filter(({ topicList }) => {
        return topic.some(r => topicList?.indexOf(r) >= 0 )
    })
}


//export const filterByGeneralMatch = (data: Paragraph[], topics: string []): Paragraph[] => {
//    if (!(topics?.length > 0)) {
//        return data;
//    }

    //filter from must data
    //filter from
    //return null;

//}
