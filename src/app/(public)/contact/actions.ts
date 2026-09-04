// filepath: src/app/(public)/contact/actions.ts
'use server'

import nodemailer from 'nodemailer';
import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

export async function submitContact(formData: FormData) {
  const name    = formData.get("name") as string;
  const email   = formData.get("email") as string;
  const phone   = (formData.get("phone") as string) || null;
  const type    = formData.get("type") as string;
  const message = formData.get("message") as string;

  // 1. Save to DB
  await db.insert(contactMessages).values({ name, email, phone, type, message });

  // 2. Create the SMTP Transporter configured for your Gmail account
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT, // Secure submission port utilizing STARTTLS
    secure: false, // Must be false for port 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD, // Your secret 16-character Google App Password
    },
  });

  // 3. Send email notification via Gmail Custom SMTP Alias configuration
  await transporter.sendMail({
    // Uses your professional email as the sending mask, backed by your verified alias setup
    from: `"Daksh Dynamics" <hello@akshatcodes.me>`,
    to: process.env.CONTACT_RECEIVER,
    replyTo: email, // Directly lets you reply to the user who filled out the form by hitting "Reply" in your inbox
    subject: `[${type.toUpperCase()}] New message from ${name}`,
    html: `
      <div style="font-family: monospace; background: #0a0a0a; color: #e5e5e5; padding: 32px; max-width: 600px;">
        <h1 style="color: #00E5FF; font-size: 18px; margin-bottom: 8px;">
          NEW CONTACT MESSAGE
        </h1>
        <p style="color: #666; font-size: 11px; margin-bottom: 24px;">
          TYPE: ${type.toUpperCase()} · ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
        </p>

        <table style="width:100%; border-collapse: collapse;">
          <tr>
            <td style="color:#666; font-size:11px; padding:6px 0; width:80px;">NAME</td>
            <td style="color:#fff; font-size:13px; padding:6px 0;">${name}</td>
          </tr>
          <tr>
            <td style="color:#666; font-size:11px; padding:6px 0;">EMAIL</td>
            <td style="color:#00E5FF; font-size:13px; padding:6px 0;">
              <a href="mailto:${email}" style="color:#00E5FF;">${email}</a>
            </td>
          </tr>
          ${phone ? `<tr>
            <td style="color:#666; font-size:11px; padding:6px 0;">PHONE</td>
            <td style="color:#fff; font-size:13px; padding:6px 0;">${phone}</td>
          </tr>` : ""}
        </table>

        <div style="margin-top:24px; border-left:2px solid #00E5FF; padding-left:16px;">
          <p style="color:#666; font-size:11px; margin-bottom:8px;">MESSAGE</p>
          <p style="color:#e5e5e5; font-size:13px; line-height:1.6;">${message}</p>
        </div>

        <p style="color:#333; font-size:10px; margin-top:32px;">
          — Daksh Dynamics Contact System · View in admin: /admin/inbox
        </p>
      </div>
    `,
  });

  // 4. Update Next.js Router Cache
  revalidatePath("/admin/inbox");
  revalidatePath("/admin");
}
