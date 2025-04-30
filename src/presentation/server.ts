import { envs } from '../config/plugins/envs.plugin';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log-datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import {CronService} from './cron/cron-service';
import { EmailService } from './email/email.service';

const logRepository = new LogRepositoryImpl(
    // new FileSystemDatasource()
    new MongoLogDatasource(),
); // Assuming you have a file system log repository implementation

const emailService = new EmailService(    );

export class Server {
    public static start(){
      //  console.log("Server started..++++....");

    //todo 
//     new SendEmailLogs(
// emailService,
// fileSystemLogRepository,
// ).execute(['vorganista@thepalacecompany.com','victororga1@gmail.com']);
    //todo: se manda correo 
    //onst emailService = new EmailService();

    //  emailService.sendEmail ({
    //     to:'vorganista@thepalacecompany.com',
    //     subject:'Logs de sistrema',
    //     htmlBody:`
    //     <h1>Log</h1>
    //     <p>Logs de sistema - NOC  </p>
    //     <p>Ver log adjuntos  </p>`
    //  });
    // todo: se manda correo  con archivos adjuntos

    // emailService.sendEmailWithFileSystemLogs (['vorganista@thepalacecompany.com','victororga1@gmail.com']);

    //todo: se ejecuta cada 5 segundos el servicio de check

        CronService.createJob(
            '* * * * * *', // cronTime
            () => {
                const url = 'http://google.com'; // url to check
               new CheckService(
                logRepository,
                    () => console.log(`Success callback: ${url}`),
                    (error) => console.log(`Error callback: ${error}`),
               ).execute(url);
            } // onTick
        );

    }
}

