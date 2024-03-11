import { createRouter } from "./context";
import { z } from "zod";
import nodemailer from "nodemailer";

export const mailRouter = createRouter().mutation("sendMail", {
  input: z
    .object({
      name: z.string(),
      email: z.string().email(),
      phone: z.string(),
    })
    .nullish(),
  resolve({ input }) {
    // Send email to me
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: "crackermix1@gmail.com",
        // pass: "xpdluyyyuxgfnwjk",
        pass: process.env.GMAIL_PASSWORD,
      },
      secure: true,
    });

    const mailData = {
      from: "crackermix1@gmail.com",
      to: " fg@bunsi.mx",
      subject: `Message From ${input?.name}`,
      text: `Name: ${input?.name} | Email: ${input?.email} | Phone: ${input?.phone}`,
      html: `<div>Name: ${input?.name}</div><div>Email: ${input?.email}</div><div>Phone: ${input?.phone}</div>`,
    };

    transporter.sendMail(mailData, function (err, info) {
      if (err) console.log(err);
      else console.log(info);
    });

    return {
      message: "Email sent successfully",
    };
  },
});
