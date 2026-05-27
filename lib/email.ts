import nodemailer from "nodemailer";

const configured = Boolean(process.env.SMTP_USER) && Boolean(process.env.SMTP_PASS);
const FROM = process.env.EMAIL_FROM ?? "noreply@analyticspro.io";
const ADMIN = process.env.ADMIN_EMAIL ?? "admin@analyticspro.io";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://analyticspro.io";

const transporter = configured
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
  : null;

async function send(opts: nodemailer.SendMailOptions) {
  if (!transporter) {
    console.log("[EMAIL dev — SMTP not configured]", { to: opts.to, subject: opts.subject });
    return;
  }
  await transporter.sendMail(opts);
}

function base(content: string) {
  return `<div style="font-family:sans-serif;max-width:520px;margin:0 auto;background:#020817;color:#f1f5f9;padding:40px;border-radius:16px;border:1px solid rgba(255,255,255,0.08)">
    <div style="color:#a78bfa;font-size:22px;font-weight:800;margin-bottom:24px">AnalyticsPro</div>
    ${content}
    <p style="margin-top:32px;color:#334155;font-size:12px">AnalyticsPro Inc. · <a href="${APP_URL}/unsubscribe" style="color:#475569">Unsubscribe</a></p>
  </div>`;
}

export async function sendWelcomeEmail(email: string) {
  await send({
    from: `AnalyticsPro <${FROM}>`,
    to: email,
    subject: "You're subscribed to AnalyticsPro updates 🎉",
    html: base(`<h2 style="margin:0 0 12px;font-size:20px;color:#fff">You're in!</h2>
      <p style="color:#94a3b8;line-height:1.7">Thanks for subscribing. We'll keep you posted on new features and product updates.</p>
      <a href="${APP_URL}" style="display:inline-block;margin-top:20px;padding:12px 24px;background:#7c3aed;color:#fff;border-radius:10px;text-decoration:none;font-weight:600">Visit AnalyticsPro →</a>`),
  });
}

export async function sendWaitlistConfirmation(name: string, email: string) {
  await send({
    from: `AnalyticsPro <${FROM}>`,
    to: email,
    subject: "You're on the waitlist ✅",
    html: base(`<h2 style="margin:0 0 12px;font-size:20px;color:#fff">Hey ${name}, you're on the list!</h2>
      <p style="color:#94a3b8;line-height:1.7">We'll reach out with early access soon. In the meantime, reply to this email with any questions.</p>`),
  });
}

export async function sendContactNotification(name: string, email: string, message: string) {
  await send({
    from: `AnalyticsPro Contact <${FROM}>`,
    to: ADMIN,
    subject: `New contact from ${name}`,
    html: `<div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:24px">
      <h2>New Contact</h2>
      <p><b>Name:</b> ${name}</p><p><b>Email:</b> <a href="mailto:${email}">${email}</a></p>
      <blockquote style="background:#f1f5f9;padding:16px;border-radius:8px;border-left:4px solid #7c3aed">${message}</blockquote>
    </div>`,
  });
}

export async function sendAuthWelcome(name: string, email: string, verifyToken: string) {
  const verifyUrl = `${APP_URL}/api/auth/verify-email?token=${verifyToken}`;
  await send({
    from: `AnalyticsPro <${FROM}>`,
    to: email,
    subject: "Welcome to AnalyticsPro — verify your email 🚀",
    html: base(`<h2 style="margin:0 0 12px;font-size:20px;color:#fff">Welcome, ${name}!</h2>
      <p style="color:#94a3b8;line-height:1.7">Your account is ready. Verify your email to unlock all features.</p>
      <a href="${verifyUrl}" style="display:inline-block;margin-top:20px;padding:12px 24px;background:#7c3aed;color:#fff;border-radius:10px;text-decoration:none;font-weight:600">Verify Email →</a>
      <p style="color:#475569;font-size:12px;margin-top:16px">Link expires in 24 hours. If you didn't create this account, ignore this email.</p>`),
  });
}

export async function sendPasswordResetEmail(name: string, email: string, token: string) {
  const resetUrl = `${APP_URL}/reset-password?token=${token}`;
  await send({
    from: `AnalyticsPro <${FROM}>`,
    to: email,
    subject: "Reset your AnalyticsPro password",
    html: base(`<h2 style="margin:0 0 12px;font-size:20px;color:#fff">Reset your password</h2>
      <p style="color:#94a3b8;line-height:1.7">Hi ${name}, click below to reset your password. This link expires in 1 hour.</p>
      <a href="${resetUrl}" style="display:inline-block;margin-top:20px;padding:12px 24px;background:#7c3aed;color:#fff;border-radius:10px;text-decoration:none;font-weight:600">Reset Password →</a>
      <p style="color:#475569;font-size:12px;margin-top:16px">If you didn't request this, you can safely ignore this email.</p>`),
  });
}
