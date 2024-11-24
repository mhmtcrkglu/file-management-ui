export interface Root {
  files: File[]
}

export interface File {
  selected: boolean
  id: string
  name: string
  type: string
  uploadDate: string
  thumbnailLink: string
  downloadCount: number
}
