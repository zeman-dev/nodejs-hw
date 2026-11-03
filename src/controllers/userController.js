import createHttpError from "http-errors";
import { User } from "../models/user.js";

export const getCurrentUser = async (req, res) => {
  const user = req.user;

  res.status(200).json( user );
};

export const updateUser = async (req, res) => {

    const user = await User.findOneAndUpdate( { _id: req.user._id }, 
        req.body,
        {returnDocument: 'after'},
     );
    if(!user){
        throw createHttpError(404, "User not found");
    }
    res.status(200).json(user)
}