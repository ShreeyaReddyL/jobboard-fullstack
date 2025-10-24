import nodemailer from "nodemailer";

/**
 * For production use a real SMTP provider.
 * For local testing you can use Ethereal (createTestAccount) - which gives you preview URLs.
 *
 * This helper returns a sendMail function: await sendMail({ to, subject, text, html });
 */

let transporterPromise = null;

async function createTransporter() {
  if (transporterPromise) return transporterPromise;
  if (process.env.NODE_ENV === "test" || !process.env.FROM_EMAIL) {
    // Create ethereal account for testing
    const testAccount = await nodemailer.createTestAccount();
    transporterPromise = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    console.log("Using ethereal test account:", testAccount);
  } else {
    // Example for Gmail (use app password), or any smtp
    transporterPromise = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  return transporterPromise;
}

export async function sendMail({ to, subject, text, html }) {
  const transporter = await createTransporter();
  const info = await transporter.sendMail({
    from: process.env.FROM_EMAIL || '"JobBoard" <no-reply@example.com>',
    to,
    subject,
    text,
    html,
  });

  // if ethereal, you can preview:
  if (nodemailer.getTestMessageUrl) {
    const url = nodemailer.getTestMessageUrl(info);
    if (url) console.log("Preview URL:", url);
  }

  return info;
}
