import { Entity } from '../../entity'

export type AccountData = {
  id: string
  username: string
  password: string
  email: string
  image: string
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
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
    createdAt: values.createdAt ? new Date(values.createdAt) : new Date(),
    updatedAt: values.updatedAt ? new Date(values.updatedAt) : new Date(),
  }

  const supEntity = Entity<'Account'>({
    privateFields,
    uniqueFields,
    data,
  })

  return Object.assign({}, data, supEntity)
}
