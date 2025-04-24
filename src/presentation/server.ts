import { CheckService } from '../domain/use-cases/checks/check-service';
import {CronService} from './cron/cron-service';

export class Server {
    public static start(){
        console.log("Server started....");

        CronService.createJob(
            '*/5 * * * * *', // cronTime
            () => {
                const url = 'http://google.com'; // url to check
               new CheckService(
                    () => console.log(`Success callback: ${url}`),
                    (error) => console.log(`Error callback: ${error}`),
               ).execute(url);
            } // onTick
        );

    }
}

