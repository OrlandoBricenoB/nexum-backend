export class BadRequest extends Error {
  status: number

  constructor() {
    super()
    this.name = 'BadRequestError'
    this.status = 400
    this.message = 'bad-request'
  }
}

export class Unauthorized extends Error {
  status: number

  constructor(message = '') {
    super()
    this.name = 'UnauthorizedError'
    this.status = 401
    this.message = message || 'unauthorized'
  }
}

export class DuplicatedError extends Error {
  fields: string[] = []
  status: number

  constructor(fields: string[]) {
    super()
    this.name = 'DuplicatedError'
    this.status = 403
    this.message = 'already-used'
    this.fields = fields
  }
}

export class NotFound extends Error {
  status: number

  constructor(message = '') {
    super()
    this.name = 'NotFoundError'
    this.status = 404
    this.message = message || 'not-found'
  }
}

export class ServerError extends Error {
  status: number

  constructor(message = '') {
    super()
    this.name = 'ServerError'
    this.status = 500
    this.message = message || 'server-error'
  }
}
