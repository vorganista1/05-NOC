import {  PrismaClient } from './generated/prisma';
import { envs } from './config/plugins/envs.plugin';
import {  MongoDatabase } from './data/mongo';
import  {Server} from './presentation/server';

(async () => {
   main();
})();


async function main(){


    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName:envs.MONGO_DB_NAME
    });

    //todo se crea un servidor
    // postgresql,

//    const prisma = new PrismaClient();
//     const newLog = await prisma.logModel.create({
//         data: {
//             level: 'HIGH',
//             message: 'Test message desde Prisma',
//             origin: 'App.ts'
//         }
//     });
//  console.log(newLog);

// const prisma = new PrismaClient();
// const logs = await prisma.logModel.findMany(
//     {
//         where: {
//             level: 'MEDIUM'
//         }
//     }
// )
// console.log(logs);

    //todo fin 
    //todo se generan correos y llenan archivos 
   Server.start();
    // todo fin 

    //todo se crea un registro 
    // Crear un coleccion  =  tabla, documento = registro
    // const newLog = await LogModel.create({
    //     message : 'Test message desde Mongo 2',
    //     origin  : 'App.ts',
    //     level   : 'low'
    // });
    // await newLog.save();
    // console.log(newLog);


    

    //todo  se buscan tooos los registros 
    // const logs = await LogModel.find();
    // console.log(logs[0]);

}      