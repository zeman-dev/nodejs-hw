import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { getCurrentUser, updateUser } from "../controllers/userController.js";
import { celebrate } from "celebrate";
import { updateUserSchema } from "../validations/userValidation.js";

const router = Router();

router.use('/users', authenticate)

router.get('/users/me', getCurrentUser);
router.patch('/users/me', celebrate(updateUserSchema), updateUser)

export default router;