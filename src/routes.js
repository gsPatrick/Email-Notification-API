const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

router.post('/notify-event', async (req, res) => {
    const { to, eventName, eventDate, message } = req.body;

    if (!to || !eventName || !eventDate || !message) {
        return res.status(400).json({ message: 'To, eventName, eventDate, and message are required' });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: `Notificação de Evento: ${eventName}`,
        text: `Olá!\n\nVocê tem um evento agendado: ${eventName}.\nData: ${eventDate}\n\nMensagem:\n${message}\n\nAtenciosamente,\nEquipe de Eventos`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Event notification sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send event notification' });
    }
});

module.exports = router;
