import {Paragraph} from '../data/types';

export const filterByExactTopicMatch  = (data: Paragraph[] , topic: string) => {
    return data.filter((value: any) => value.topic === topic);

}


