import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log-datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";

export class MongoLogDatasource implements LogDatasource{
  async  saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        console.log('Mongo Log Create', newLog.id);
    }
  async  getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({
            level: severityLevel
        });

        // return logs.map( MongoLog => LogEntity.fromObject(MongoLog) );
        return logs.map(LogEntity.fromObject )

    }

}