import { GetUserDto } from './user'

export interface TagDto {
  id: string // Assuming BaseEntity includes `id`
  createdAt: Date // Assuming BaseEntity includes `createdAt`
  updatedAt: Date // Assuming BaseEntity includes `updatedAt`
  name: string
  description?: string
  color: string
  iconName?: string
}
