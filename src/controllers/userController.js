import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import { Session } from "../models/session.js"
import { sendEmail } from '../utils/sendMail.js';
import createHttpError from 'http-errors';
import bcrypt from "bcrypt"

export const requestResetEmail = async (req, res) => {
 const { email } = req.body;

 const user = await User.findOne({ email })

 if(!user){
    return res.staus(200).json({
    message: 'Password reset email sent successfully',
 });
 }

 const resetToken = jwt.sign(
   { sub: user._id, email },
   process.env.JWT_SECRET,
   { expiresIn: "15m" },
);

const frontendUrl = `${process.env.FRONTEND_URL}?token=${resetToken}`    ;

 try {
 await sendEmail({
         from: process.env.SMTP_FROM,
      to: email,
      subject: "Reset your password",
      html: `<p>Click <a href="${frontendUrl}">here</a> to reset your password!</p>`,
    });
}catch(error){
 throw createHttpError(502, "Failed to send email, please try again later")
}

 res.staus(200).json({
    message: 'Password reset email sent successfully',
 });
}

export const resetPassword = async (req, res) => {
   const { password, token } = req.body;

   let payload;
   try{
      payload = jwt.verify( token, process.env.JWT_SECRET);
   } catch(error){
      throw createHttpError(401, "Invalid or expired token");
   }

const user = await User.findOne({ _id: payload.sub, email: payload.email });

if(!user){
   throw createHttpError(404, "User not found");
}

const hashedPassword = await bcrypt.hash(password, 10);
await User.updateOne({ _id: user._id }, { password: hashedPassword });

await Session.deleteMany({ userId: user._id });

res.status(200).json({
   message: "Password reset successfuly. Please log again",
})

}

