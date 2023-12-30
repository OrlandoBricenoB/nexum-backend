import { Router } from "express";
import { CharacterController } from "../controllers/characterController";

const characterController = new CharacterController();
const router = Router();

router.get("/", characterController.getAllCharacters);
router.get("/:id", characterController.getCharacter);

export const CharacterRoutes = router;
