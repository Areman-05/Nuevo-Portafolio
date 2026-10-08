export interface Project {
  id: string
  number: string
  title: string
  subtitle: string
  category: string
  discipline: string
  city: string
  year: string
  image: string
  secondaryImage?: string
  client: string
  role: string
  summary: string
  uxChallenge: string
  uxSolution: string
  tokens: string[]
  stack: string[]
  metrics: { label: string value: string }[]
}

export interface UrbanNode {
  id: string
  city: string
  district: string
  code: string
  coords: string
  timezone: string
  offsetHours: number
  aesthetic: string
  ethos: string
  tags: string[]
  image: string
}
