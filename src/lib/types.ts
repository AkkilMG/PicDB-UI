export interface GroupDetails {
  _id: string
  name: string
  code: string
  createdAt: string
  username: string
  memberCount: number
}

export interface Member {
  id: string
  username: string
  joinedAt: string
}

export interface ImageMessage {
  id: string
  imageUrl: string
  downloadUrl: string
  viewUrl: string
  username: string
  timestamp: string
  title?: string
  size?: number
}
