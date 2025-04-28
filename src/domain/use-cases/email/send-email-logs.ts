import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogServerityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";


interface SendEmailUserCase{
    execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendEmailUserCase {
    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository,
    )
    {}
    
    async execute(to: string | string[]){
        try {
            const sent = this.emailService.sendEmailWithFileSystemLogs(to);

            if(!sent) {
                throw new Error('Error al enviar el correo');
            }

            const log = new LogEntity({
                message: `Se ha enviado el correo a ${to}`,
                level: LogServerityLevel.low,
                origin: 'Send-email-logs-ts',
            })

            this.logRepository.saveLog(log);

            return true

        }catch (error) {
            const log = new LogEntity({
                message: `${error}`,
                level: LogServerityLevel.high,
                origin: 'Send-email-logs-ts',
            })

            this.logRepository.saveLog(log);
            return false;

        }

    }
}