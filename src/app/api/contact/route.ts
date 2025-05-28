import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Të gjitha fushat janë të detyrueshme' },
        { status: 400 }
      );
    }

    // Create transporter (using Gmail as example)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your sending email
        pass: process.env.EMAIL_PASS, // App password
      },
    });

    // Email template for you (recipient)
    const recipientMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'reishefa@gmail.com',
      subject: `Mesazh i ri nga ${name} - Inkubatori FTI`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Mesazh i ri nga Inkubatori FTI</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb, #06b6d4); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #1e293b; margin-bottom: 5px; display: block; }
            .value { background: white; padding: 12px; border-radius: 6px; border-left: 4px solid #2563eb; }
            .message-box { background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #06b6d4; min-height: 100px; }
            .footer { margin-top: 20px; text-align: center; color: #64748b; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📧 Mesazh i ri nga faqja e Inkubatorit FTI</h2>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">👤 Emri:</span>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <span class="label">📧 Email:</span>
                <div class="value">
                  <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
                </div>
              </div>
              
              <div class="field">
                <span class="label">💬 Mesazhi:</span>
                <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
              </div>
              
              <div class="field">
                <span class="label">⏰ Data dhe ora:</span>
                <div class="value">${new Date().toLocaleString('sq-AL', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: 'Europe/Tirane'
                })}</div>
              </div>
            </div>
            <div class="footer">
              <p>Ky mesazh u dërgua nga forma e kontaktit në faqen e Inkubatorit FTI</p>
              <p><strong>Innovation Hub</strong> - Inkubatori FTI</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Faleminderit për mesazhin tuaj - Inkubatori FTI',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Faleminderit - Inkubatori FTI</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb, #06b6d4); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🎉 Faleminderit ${name}!</h2>
            </div>
            <div class="content">
              <p>Përshëndetje <strong>${name}</strong>,</p>
              
              <p>Faleminderit që na kontaktuat! Mesazhi juaj u mor me sukses dhe ekipi ynë do t'ju përgjigjet në kohën më të shkurtër të mundshme.</p>
              
              <p><strong>Detajet e mesazhit tuaj:</strong></p>
              <ul>
                <li><strong>Emri:</strong> ${name}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Data:</strong> ${new Date().toLocaleString('sq-AL')}</li>
              </ul>
              
              <p>Nëse keni ndonjë pyetje urgjente, mund të na kontaktoni direkt në <a href="mailto:reishefa@gmail.com">reishefa@gmail.com</a></p>
              
              <p>Me respekt,<br>
              <strong>Ekipi i Inkubatorit FTI</strong><br>
              Innovation Hub</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send both emails
    await transporter.sendMail(recipientMailOptions);
    await transporter.sendMail(autoReplyOptions);

    return NextResponse.json({ message: 'Email u dërgua me sukses!' });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Ka ndodhur një gabim gjatë dërgimit të email-it' },
      { status: 500 }
    );
  }
}