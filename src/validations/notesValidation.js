import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid('Work',
  'Personal',
  'Meeting',
  'Shopping',
  'Ideas',
  'Travel',
  'Finance',
  'Health',
  'Important',
  'Todo'),
  search: Joi.string().default(""),
  }),
};

const noteIdSchema = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const getNoteParamNoteid = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(noteIdSchema).required(),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().trim().min(1).max(30).required,
    content: Joi.string().trim().max(150),
    tag: Joi.string().valid(
      'Work',
      'Personal',
      'Meeting',
      'Shopping',
      'Ideas',
      'Travel',
      'Finance',
      'Health',
      'Important',
      'Todo',
    ),
  }),
};

export const updateNoteSchema = {
  ...getNoteParamNoteid,
  [Segments.BODY]: Joi.object({
    title: Joi.string().trim().min(1).max(30),
    content: Joi.string().trim().max(150),
    tag: Joi.string().valid(
      'Work',
      'Personal',
      'Meeting',
      'Shopping',
      'Ideas',
      'Travel',
      'Finance',
      'Health',
      'Important',
      'Todo',
    ),
  }).min(1),
}
