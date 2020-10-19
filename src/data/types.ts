export interface ParagraphState {
    allParagraphs: any[],
    filteredParagraphs: any[],
    selectedParagraphs: any[]
}

export interface Paragraph {
  id: string,
  paragraph: string,
  verticalHeight: number,
  topic: string[]
}