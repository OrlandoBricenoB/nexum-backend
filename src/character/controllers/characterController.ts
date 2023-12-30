import { Request, Response } from "express";
import { CharacterService } from "../services/characterService";

const characterService = new CharacterService();

export class CharacterController {
  public async getAllCharacters(req: Request, res: Response): Promise<void> {
    const characters = await characterService.getAllCharacters();
    res.json(characters);
  }

  public async getCharacter(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    const character = await characterService.getCharacter(id);
    res.json(character);
  }
}
