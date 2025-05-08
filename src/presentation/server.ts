import { envs } from '../config/plugins/envs.plugin';
import { LogServerityLevel } from '../domain/entities/log.entity';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log-datasource';
import { PostgresLogDatasource } from '../infrastructure/datasources/postgre-log.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import {CronService} from './cron/cron-service';
import { EmailService } from './email/email.service';
import { CronJob } from 'cron';

const logRepository = new LogRepositoryImpl(
 //  new FileSystemDatasource()
 //   new MongoLogDatasource(),
 new PostgresLogDatasource()
); // Assuming you have a file system log repository implementation


export class Server {

    
    public  static async start(){
        console.log("Server started.....");

        //todo    se crean log en archivo  en carpeta logs
        //  CronService.createJob(
        //     '* * * * * *', // cronTime
        //     () => {
        //         const url = 'http://google.com'; // url to check
        //        // const url = 'http://localhost:3000'; // url to check

        //         new CheckService(
        //          logRepository, 
                 
        //         //  undefined,
        //         //  undefined
        //             () => console.log(`Success callback: ${url}`),
        //           (error) => console.log(`Error callback: ${error}`),
        //         ).execute(url);
        //     } // onTick
        // );
        // todo Fin 

          //todo: se manda correo 
        // const emailService = new EmailService();
                
        // emailService.sendEmail ({
        //     to:'vorganista@thepalacecompany.com',
        //     subject:'Logs de sistrema',
        //     htmlBody:`<h1>Log</h1>
        //     <p>Logs de sistema - NOC  </p>
        //     <p>Ver log adjuntos  </p>`
        // });
          // todo Fin 

          //todo: se manda correo 
         // const emailService = new EmailService();
         // emailService.sendEmailWithFileSystemLogs (['vorganista@thepalacecompany.com','victororga1@gmail.com']);
        // todo Fin 

         //todo: se manda correo 
        //  const emailService = new EmailService(
        //     logRepository
        //  ); 
        //  emailService.sendEmailWithFileSystemLogs(['vorganista@thepalacecompany.com','victororga1@gmail.com']);


        // todo Fin 
         //todo: se manda correo y log en archivo 
    //  const  fileSystemLogRepository = new LogRepositoryImpl(
    //    new FileSystemDatasource(),
    //  )

    //     const emailService = new EmailService(); 

    //   new SendEmailLogs(
    //    emailService,
    //    fileSystemLogRepository,
    //    ).execute(['vorganista@thepalacecompany.com','victororga1@gmail.com']);
   // todo Fin 
   const logs = await logRepository.getLogs(LogServerityLevel.high);
   console.log(logs);
         //todo: 
 
    }
}

