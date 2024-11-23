import { GetUserDto } from './user'

export interface UserGroupDto {
  id: string // Assuming BaseEntity includes `id`
  createdAt: Date // Assuming BaseEntity includes `createdAt`
  updatedAt: Date // Assuming BaseEntity includes `updatedAt`
  name: string
  description?: string
  color: string
  iconName?: string
  inviteCode: string
  owner: GetUserDto
  members: Array<GetUserDto>
  entries: any[]
}
