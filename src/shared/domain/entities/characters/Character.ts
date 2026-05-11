import { Entity } from '../../entity'

export type CharacterData = {
  id: string
  accountId: string
  name: string
  kingdom: string
  division: string
  clan: string
  profession: string
  slot: string
  skinTone: string
  hairstyle: string
  facestyle: string
  gender: string
  level: number
  exp: bigint
  rebirths: number
  skillPoints: number
  rebirthPoints: number
  rank: string
  baseAttack: number
  baseDefense: number
  hp: number
  stamina: number
  mp: number
  mpReserve: number
  honor: number
  kills: number
  deaths: number
  assists: number
  deathCount: number
  hesedias: number
  nexumCoins: number
  zoneId: number
  tileX: number
  tileY: number
  createdAt: Date
  updatedAt: Date
}

export function Character(values: Partial<CharacterData>) {
  const privateFields: string[] = []
  const uniqueFields: string[] = ['name']

  const data: CharacterData = {
    id: values.id || '',
    accountId: values.accountId || '',
    name: values.name || '',
    kingdom: values.kingdom || '',
    division: values.division || '',
    clan: values.clan || '',
    profession: values.profession || '',
    slot: values.slot || '-1',
    skinTone: values.skinTone || '',
    hairstyle: values.hairstyle || '',
    facestyle: values.facestyle || '',
    gender: values.gender || '',
    level: values.level || 1,
    exp: values.exp || 0n,
    rebirths: values.rebirths || 0,
    skillPoints: values.skillPoints || 0,
    rebirthPoints: values.rebirthPoints || 0,
    rank: values.rank || '',
    baseAttack: values.baseAttack || 10,
    baseDefense: values.baseDefense || 5,
    hp: values.hp || 100,
    stamina: values.stamina || 100,
    mp: values.mp || 100,
    mpReserve: values.mpReserve || 100,
    honor: values.honor || 0,
    kills: values.kills || 0,
    deaths: values.deaths || 0,
    assists: values.assists || 0,
    deathCount: values.deathCount || 0,
    hesedias: values.hesedias || 0,
    nexumCoins: values.nexumCoins || 0,
    zoneId: values.zoneId || 1,
    tileX: values.tileX || 5,
    tileY: values.tileY || 5,
    createdAt: values.createdAt ? new Date(values.createdAt) : new Date(),
    updatedAt: values.updatedAt ? new Date(values.updatedAt) : new Date(),
  }

  const supEntity = Entity<'Character'>({
    privateFields,
    uniqueFields,
    data,
  })

  return Object.assign({}, data, supEntity)
}
