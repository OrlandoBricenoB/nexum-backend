import { Entity } from '../../entity'

export type AccountSessionData = {
  id: string
  accountId: string
  name: string
  ip: string
  characterId: string | null
  lastSeenAt: Date
  expiredAt: Date
  createdAt: Date
  updatedAt: Date
}

export function AccountSession(values: Partial<AccountSessionData>) {
  const privateFields: string[] = ['password']
  const uniqueFields: string[] = ['email', 'username']

  const data: AccountSessionData = {
    id: values.id || '',
    accountId: values.accountId || '',
    name: values.name || '',
    ip: values.ip || '',
    characterId: values.characterId || '',
    lastSeenAt: values.lastSeenAt ? new Date(values.lastSeenAt) : new Date(),
    expiredAt: values.expiredAt ? new Date(values.expiredAt) : new Date(),
    createdAt: values.createdAt ? new Date(values.createdAt) : new Date(),
    updatedAt: values.updatedAt ? new Date(values.updatedAt) : new Date(),
  }

  const supEntity = Entity<'AccountSession'>({
    privateFields,
    uniqueFields,
    data,
  })

  return Object.assign({}, data, supEntity)
}
