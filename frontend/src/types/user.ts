export type AisId = {
  id: number
}

export interface GetUserDto {
  id: string // Assuming BaseEntity includes `id`
  createdAt: Date // Assuming BaseEntity includes `createdAt`
  updatedAt: Date // Assuming BaseEntity includes `updatedAt`
  email: string
  firstName: string
  lastName: string
  entries: any[] // Assuming Entry includes `id`
  userGroups: any[] // Assuming UserGroup includes `id`
  memberOf: any[] // Assuming UserGroup includes `id`
}
