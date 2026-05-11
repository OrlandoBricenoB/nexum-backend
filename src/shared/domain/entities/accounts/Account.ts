import { Entity } from '../../entity'

export type AccountData = {
  id: string
  username: string
  password: string
  email: string
  image: string
  isVerified: boolean
  isBanned: boolean
  banReason: string | null
  createdAt: Date
  updatedAt: Date
  lastLoginAt: Date | null
}

export function Account(values: Partial<AccountData>) {
  const privateFields: string[] = ['password']
  const uniqueFields: string[] = ['email', 'username']

  const data: AccountData = {
    id: values.id || '',
    username: values.username || '',
    password: values.password || '',
    email: values.email || '',
    image: values.image || '',
    isVerified: Boolean(values.isVerified),
    isBanned: Boolean(values.isBanned),
    banReason: values.banReason || null,
    createdAt: values.createdAt ? new Date(values.createdAt) : new Date(),
    updatedAt: values.updatedAt ? new Date(values.updatedAt) : new Date(),
    lastLoginAt: values.lastLoginAt ? new Date(values.lastLoginAt) : null,
  }

  const supEntity = Entity<'Account'>({
    privateFields,
    uniqueFields,
    data,
  })

  return Object.assign({}, data, supEntity)
}
