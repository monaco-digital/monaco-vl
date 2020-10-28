import {Paragraph, ParagraphTopicMapping, ParagraphTopics} from '../data/types';

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


export const filterByGeneralMatch = (data: Paragraph[], topics: string []): Paragraph[] => {
    if (!(topics?.length > 0)) {
        return data;
    }

    //if D has been passed in as list of topics then expand to [DP, DM, DS, DSy, DR, DRn, DA, DD, DMe, DG, DPI, DMI, DV]

    const index = topics.indexOf(ParagraphTopicMapping.DISCRIMINATION);
    if (index > -1) {
       topics =  topics.splice(index, 1);
    }

    topics = [...topics,
            ParagraphTopicMapping.PREGNANCY,
            ParagraphTopicMapping.MATERNITY,
            ParagraphTopicMapping.SEX,
            ParagraphTopicMapping.SEXUALITY,
            ParagraphTopicMapping.RACE,
            ParagraphTopicMapping.RELIGION_BELIEF,
            ParagraphTopicMapping.AGE,
            ParagraphTopicMapping.DISABILITY,
            ParagraphTopicMapping.MARRIAGE_CIVIL_PARTNERSHIP,
            ParagraphTopicMapping.GENDER_REASSIGNMENT,
            ParagraphTopicMapping.POLITICAL_PHILOSOPHICAL
        ]

    topics = [...new Set(topics)]

    const newData = data.filter((value: Paragraph ) => {

        const { eitherTopics, mustTopics, notTopics } = value ;

        const  eitherFlag = (eitherTopics.length>0)?eitherTopics.some(r => topics?.indexOf(r) >= 0):true;

        const mustFlag = (mustTopics.length>0)?mustTopics.every(r => topics?.indexOf(r) >= 0):true;

        const notFlag = (notTopics.length>0)?notTopics.every(r => topics?.indexOf(r) < 0):true;

        return eitherFlag && mustFlag && notFlag

    });

    return newData;
}
