import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogServerityLevel } from '../../domain/entities/log.entity';
import { PrismaClient,SeverityLevel } from '../../generated/prisma';
const prisma = new PrismaClient()

const prismaClient= new PrismaClient();
const severityEnum = {
    low:SeverityLevel.LOW,
    medium:SeverityLevel.MEDIUM,
    high:SeverityLevel.HIGH,
}

export class PostgresLogDatasource  implements LogDatasource {
   
    
   async  saveLog(log: LogEntity): Promise<void> {
    const level = severityEnum[log.level];

    const newLog = await prismaClient.logModel.create({
        data: {
            ...log,
            level: level,
        }
    });
     //    console.log('Posgres saved');

}


async    getLogs(severityLevel ?: LogServerityLevel): Promise<LogEntity[]> {
     const level = severityLevel ? severityEnum[severityLevel] : undefined;
        //const level = severityEnum[severityLevel];
        const dbLogs = await prismaClient.logModel.findMany({
            where: { level }
    });
    return dbLogs.map(LogEntity.fromObject);
 }
}