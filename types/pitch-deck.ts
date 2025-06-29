export interface SlideData {
  title: string
  content: string
  image?: string
}

export interface PitchData {
  logo?: string
  problem: SlideData
  solution: SlideData
  team: SlideData
  businessModel: SlideData
  market: SlideData
}
