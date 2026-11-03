import { Joi, Segments } from 'celebrate';

export const updateUserSchema = {
    [Segments.BODY]: Joi.object({
        username: Joi.string().min(3).max(64).required()
    })
};