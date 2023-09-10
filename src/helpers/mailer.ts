import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs, { hash } from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create hashedToken
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.NODE_MAILDER_USER_ID!,
        pass: process.env.NODE_MAILDER_USER_PASSWORD!,
      },
    });

    const mailOptions = {
      from: 'usmansoomro1234@gmail.com',
      to: email,
      subject:
        emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">
        here</a> to ${
          emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password'
        } or copy and paste the link below in your browser. <br/> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}
        </p>`,
    };
    const mailResponse = await transport.sendMail(mailOptions);
    console.log("mailResponse :",mailResponse);
    
    return mailResponse;
  } catch (error: any) {
    console.log('error in mailer.ts', error);
  }
};
