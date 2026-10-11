import { celebrate } from "celebrate";
import {Router}  from "express";
import { requestResetEmailSchema, resetPasswordSchema } from "../validations/authValidation.js";
import { updateUserAvatar } from "../controllers/userController.js";
import { authenticate } from "../middleware/authenticate.js";
import { upload } from "../middleware/multer.js";
import { requestResetEmail, resetPassword } from "../controllers/authController.js";

const router = Router();

router.post('/auth/request-reset-email', celebrate(requestResetEmailSchema), requestResetEmail);

router.post('/auth/reset-password', celebrate(resetPasswordSchema), resetPassword);

router.patch(
  "/users/me/avatar",
  authenticate,
  upload.single("avatar"),
  updateUserAvatar,
);

export default router;