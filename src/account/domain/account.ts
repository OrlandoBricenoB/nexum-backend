export class Account {
  public id: string
  public username: string
  public password: string
  public email: string
  public image: string
  public is_verified: string

  constructor(id: string, username: string, password: string, email: string, image: string, is_verified: string) {
    this.id = id
    this.username = username
    this.password = password
    this.email = email
    this.image = image
    this.is_verified = is_verified
  }

  private static fields: (keyof Account)[] = ['id', 'username', 'password', 'email', 'image', 'is_verified']
  private static privateFields: (keyof Account)[] = ['password']

  public static getPublicFields(): (keyof Account)[] {
    return this.fields.filter(field => !this.privateFields.includes(field)) as (keyof Account)[]
  }
}
