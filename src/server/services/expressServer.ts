import express, { Express } from "express";
import cors from "cors";
import { connect } from "../../config/databaseConfig";
import { CharacterService } from "../../character/services/characterService";
import { v4 } from "uuid";

export class ExpressServer {
  private app: Express;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
  }

  public getApp(): Express {
    return this.app;
  }

  public async listen(port: number): Promise<void> {
    try {
      await connect();

      this.app.listen(port, async () => {
        console.log(`Server running on port ${port}`)

        const characterService = new CharacterService()
        const characters = await characterService.getAllCharacters()
        console.log({ characters })

        const createResponse = await characterService.createCharacter({
          description: 'Prueba de char',
          id: v4(),
          name: 'Random xd'
        })
        console.log({
          createResponse
        })
      })
    } catch (error) {
      console.error(error)
    }
  }
}
