
import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogEntity, LogServerityLevel } from '../../domain/entities/log.entity';

interface SendEmailOptions {
    to: string | string[]; // Can be a single email or an array of emails
    subject: string;
    htmlBody: string;
    attachements?: attachements[]; // Optional: if you want to add attachements 

}

interface attachements{
    filename: string;
        path: string;
}


export class EmailService {
    private transporter =nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    constructor() {}

    async sendEmail(options: SendEmailOptions): Promise<boolean> {

        const { to, subject, htmlBody,attachements   =  [] } = options;
        try {
            const sentInformation = await this.transporter.sendMail({
               to       :   to ,
               subject  :   subject,
                html     :   htmlBody,
                attachments: attachements, // Optional: if you want to add attachements
            });

            return true;         
        } catch (error) {
            return false;
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]  ){
        const subject = 'Logs de sistrema';
        const htmlBody = ` <h1>Log</h1>
        <p>Logs de sistema - NOC  </p>
        <p>Ver log adjuntos  </p>`;

        const attachements: attachements[] = [
            { filename: 'Logs-all.log', path: './logs/Logs-all.log' },
            { filename: 'Logs-high.log', path: './logs/Logs-high.log' },
            { filename: 'Logs-medium.log', path: './logs/Logs-medium.log' },
        ];
      return  this.sendEmail({
            to,
            subject,
            htmlBody,
            attachements
        });

    }
    
}