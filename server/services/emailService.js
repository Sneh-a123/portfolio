import nodemailer from 'nodemailer';

let transporter = null;

// Initialize transporter
const initTransporter = async () => {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
    console.log('📧 [Email Service] Configured with custom SMTP host:', SMTP_HOST);
  } else {
    try {
      // Create Ethereal test account for instant sandbox email testing
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      console.log('📧 [Email Service] Using Ethereal sandbox SMTP. User:', testAccount.user);
    } catch (err) {
      console.warn('⚠️ [Email Service] Could not create Ethereal account, falling back to simulated mailer:', err.message);
      transporter = {
        sendMail: async (opts) => {
          console.log('\n--- SIMULATED EMAIL SENT ---');
          console.log(`To: ${opts.to}`);
          console.log(`Subject: ${opts.subject}`);
          console.log('-----------------------------\n');
          return { messageId: 'simulated_' + Date.now() };
        }
      };
    }
  }

  return transporter;
};

export const sendLeadNotificationEmail = async ({ name, email, project, budget, service, source, message }) => {
  try {
    const mailer = await initTransporter();
    const targetEmail = process.env.NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL || 'snehasinha0905@gmail.com';

    const subject = `New Project Lead — ${source === 'cupid_ai' ? 'Cupid AI ❤️' : 'SNEHA.EXE Portfolio'} [${name}]`;

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #171717; color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #DC2626; box-shadow: 0 10px 30px rgba(220, 38, 38, 0.2);">
        <div style="background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%); padding: 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px; letter-spacing: 1px; color: #FFFFFF;">SNEHA.EXE // CUPID AI</h1>
          <p style="margin: 6px 0 0; font-size: 14px; color: #FEE2E2;">New Project Lead Notification ❤️</p>
        </div>
        
        <div style="padding: 28px;">
          <p style="font-size: 16px; color: #FEE2E2; margin-top: 0;">
            Hey Sneha! 👋 A new client inquiry just landed from your portfolio.
          </p>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background: #222222; border-radius: 8px; overflow: hidden;">
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #333333; color: #9CA3AF; width: 35%;">Client Name:</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #333333; font-weight: bold; color: #FFFFFF;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #333333; color: #9CA3AF;">Email:</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #333333;">
                <a href="mailto:${email}" style="color: #F87171; text-decoration: none; font-weight: 600;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #333333; color: #9CA3AF;">Service / Focus:</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #333333; color: #FEE2E2;">${service || 'Full Stack / Custom'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #333333; color: #9CA3AF;">Budget:</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #333333; color: #10B981; font-weight: bold;">${budget || 'Flexible / To Discuss'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #333333; color: #9CA3AF;">Source:</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #333333; color: #FCA5A5;">${source === 'cupid_ai' ? 'Cupid AI Virtual Receptionist' : 'Freelance Inquiry Form'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; color: #9CA3AF; vertical-align: top;">Project Brief:</td>
              <td style="padding: 12px 16px; color: #FFFFFF; line-height: 1.5;">${project || message || 'No extra notes provided.'}</td>
            </tr>
          </table>

          <div style="background: rgba(220, 38, 38, 0.15); border-left: 4px solid #DC2626; padding: 14px 16px; border-radius: 4px; margin-top: 20px;">
            <p style="margin: 0; font-size: 13px; color: #FEE2E2;">
              <strong>Action required:</strong> Cupid AI informed the client: <em>"She's currently away from the chat... A real human reply is on the way! ❤️"</em>. You can reply directly by clicking their email link above.
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <a href="mailto:${email}?subject=Re:%20Project%20Inquiry%20-%20Sneha%20Sinha" style="display: inline-block; background-color: #DC2626; color: #FFFFFF; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: 600; letter-spacing: 0.5px;">Reply to ${name}</a>
          </div>
        </div>

        <div style="background-color: #121212; padding: 16px; text-align: center; border-top: 1px solid #222222; font-size: 12px; color: #6B7280;">
          SNEHA.EXE Portfolio Automated Notification System • Powered by Nodemailer & Cupid AI
        </div>
      </div>
    `;

    const plainText = `
New client inquiry received!
Name: ${name}
Email: ${email}
Project: ${project || message}
Budget: ${budget || 'Flexible'}
Source: ${source}

Please review and respond to the client.
    `;

    const info = await mailer.sendMail({
      from: '"Cupid AI — SNEHA.EXE" <cupid@sneha.dev>',
      to: targetEmail,
      replyTo: email,
      subject,
      text: plainText,
      html: htmlContent,
    });

    console.log(`\n💌 [Notification Sent] Email delivered to ${targetEmail} for lead: ${name}`);
    if (nodemailer.getTestMessageUrl && info) {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      if (previewUrl) {
        console.log(`🔗 [Email Preview URL]: ${previewUrl}\n`);
      }
    }

    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error('❌ [Email Service Error]:', err.message);
    // Don't crash request if email sending fails
    return { success: false, error: err.message };
  }
};

