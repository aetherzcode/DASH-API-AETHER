require('../controllers/settings');
const nodemailer = require('nodemailer');

const mailer = {
  inboxGmailRegist: (email, codeVerify) => {
    try {
      const inboxGmail = `<div
        style="width: 600px; height: 500px;margin: auto;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
        <div
            style="line-height: 2; letter-spacing: 0.5px; position: relative; padding: 10px 20px; width: 540px;min-height: 360px; margin: auto; border: 1px solid #DDD; border-radius: 14px;">
            <h3>Selamat Datang Di Rest-APIs Prinz Eugen</h3>
            <p>
                Terima Kasih Telah Mendaftar! Kamu Harus Mengikuti Tautan Ini 
                Dalam Waktu 30 Menit Setelah Pendaftaran Untuk Mengaktifkan Akun Kamu
            </p>
            <a style="cursor: pointer;text-align: center; display: block; width: 160px; margin: 30px auto; padding: 10px 10px; border: 1px solid #00FFFA; border-radius: 14px; color: #FF5700; text-decoration: none; font-size: 1rem; font-weight: 500;"
                href="${codeVerify}">Verifikasi Akun</a>
            <span style="display: block;">Jika Kamu Tidak Melakukan Tindakan Itu,
Silakan Abaikan <br>Email Ini
<br>
<br>
Jika Kamu Memiliki Masalah, Silahkan Hubungin Saya Via <span
                    style="color: #4D96FF;"><a href="https://api.whatsapp.com/send?phone=6289652552565">WhatsApp</a></span></span>
            <span style="display: block;"><br>By,<br>ChaikalOffc</span>
        </div>
    </div>
      `;

      let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smpt.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: my_email,
          pass: my_email_password,
        },
      });

      let mailOptions = {
        from: '"ChaikalOffc" <support@chaikaloffc.com>',
        to: email,
        subject: 'Verify Email - Api Prinz Eugen',
        html: inboxGmail,
      };

      transporter.sendMail(mailOptions, (err) => {
        if (err) { console.log(err); }
      });
    } catch (error) { console.log(error); }
  },
};

module.exports = mailer;