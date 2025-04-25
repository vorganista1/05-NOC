import fs from 'fs';
import { LogDatasource } from "../../domain/datasources/log-datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";


export class FileSystemDatasource implements LogDatasource {

    private readonly logPath = './logs';
    private readonly allLogsPath = './logs/Logs-all.log';
    private readonly mediumLogsPath = './logs/Logs-medium.log';
    private readonly highLogsPath = './logs/Logs-high.log';

    constructor() {
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        if(!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);    
        }

        [
            this.allLogsPath, 
            this.mediumLogsPath, 
            this.highLogsPath
        ].forEach((path) => {
            if(fs.existsSync(path)) return;

            fs.writeFileSync(path, '',);

        })
    }

  async  saveLog(newlog: LogEntity): Promise<void> {

        const logAsJson = `${JSON.stringify(newlog)}\n`;


        fs.appendFileSync(this.allLogsPath, logAsJson );
       
        if(newlog.level === LogServerityLevel.low) return;

        if(newlog.level === LogServerityLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath,  logAsJson);
        }else {
            fs.appendFileSync(this.highLogsPath,  logAsJson);
        }

        
    }

    private getLogFromFile = (path: string): LogEntity[] => {
        const contest = fs.readFileSync(path, 'utf-8');
          const logs = contest.split('\n').map(
             log =>LogEntity.fromJson(log)
         );
       // const logs = contest.split('\n').map(LogEntity.fromJson);



        return logs;
    }
 async   getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
        case LogServerityLevel.low:
            return this.getLogFromFile(this.allLogsPath);
        case LogServerityLevel.medium:
            return this.getLogFromFile(this.mediumLogsPath);
        case LogServerityLevel.high:
            return this.getLogFromFile(this.highLogsPath);

        default:
            throw new Error(`Unknown severity level: ${severityLevel}`);
    }

    }

    
}