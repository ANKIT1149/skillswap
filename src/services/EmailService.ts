import { ReportEmailInterface } from "@/interface/ReportEmailInterface";
import nodemailer from 'nodemailer';

export const EmailService = async ({email, subject, body}: ReportEmailInterface) => {
    if (!email || !subject || !body) {
        throw new Error("Please provide all fields")
    }

    try {
        const transport = nodemailer.createTransport({
            host: process.env.SMTP_HOST!,
            port: Number(process.env.SMTP_PORT!),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        } as nodemailer.SendMailOptions)

        const mailOption = {
            from: `process.env.SMTP_USER`,
            to: email,
            subject: subject,
            html: body
        }

        const sendmail = await transport.sendMail(mailOption);

        return sendmail
    } catch (error) {
        console.log('Error in Sending mail', error);
        throw new Error("Error in Sending Mail")
    }
}