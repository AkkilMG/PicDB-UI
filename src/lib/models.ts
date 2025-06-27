export interface GroupDocument {
  _id?: string
  name: string
  code: string
  password: string
  createdAt: Date
  createdBy: string
  members: MemberDocument[]
  messages: MessageDocument[]
}

export interface MemberDocument {
  id: string
  username: string
  joinedAt: Date
}

export interface MessageDocument {
  id: string
  imageUrl: string
  downloadUrl: string
  viewUrl: string
  username: string
  timestamp: Date
  title?: string
  size?: number
}

export interface GroupResponse {
  id: string
  name: string
  code: string
  createdAt: string
  memberCount: number
}

export interface MemberResponse {
  id: string
  username: string
  joinedAt: string
}

export interface MessageResponse {
  id: string
  imageUrl: string
  downloadUrl: string
  viewUrl: string
  username: string
  timestamp: string
  title?: string
  size?: number
}
