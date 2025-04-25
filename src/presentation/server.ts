import { LogRepository } from '../domain/repository/log.repository';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import {CronService} from './cron/cron-service';

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
); // Assuming you have a file system log repository implementation

export class Server {
    public static start(){
        console.log("Server started....");

        CronService.createJob(
            '*/5 * * * * *', // cronTime
            () => {
                const url = 'http://google.com'; // url to check
               new CheckService(
                fileSystemLogRepository,
                    () => console.log(`Success callback: ${url}`),
                    (error) => console.log(`Error callback: ${error}`),
               ).execute(url);
            } // onTick
        );

    }
}

