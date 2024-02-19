import net from 'net'

export class TcpClient {
  private client: net.Socket
  private host: string
  private port: number

  constructor() {
    const client = new net.Socket()
    this.client = client

    this.host = process.env.TCP_HOST || 'localhost'
    this.port = Number(process.env.TCP_PORT || 3500)
  }

  public getClient(): net.Socket {
    return this.client
  }

  public async connect(): Promise<boolean> {
    const connection = new Promise<boolean>((resolve, reject) => {
      this.client
        .connect(
          {
            host: this.host,
            port: this.port
          },
          () => {
            console.log(`TCP Client connect on ${this.host}:${this.port}`)
            resolve(true)
          }
        )
        .on('error', err => {
          console.log('Cant connect with TCP server.')
          reject(err)
        })
    })
    return await connection
  }

  public async send(data: { [key: string]: unknown }, cb?: (err: Error | undefined) => void): Promise<void> {
    this.connect()
      .then(() => {
        this.getClient().write(JSON.stringify(data), cb || (() => false))
        this.getClient().end()
      })
      .catch(err => {
        console.error(err)
      })
  }
}
