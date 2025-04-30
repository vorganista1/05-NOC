import { envs } from './config/plugins/envs.plugin';
import { LogModel, MongoDatabase } from './data/mongo';
import  {Server} from './presentation/server';


(async () => {
   main();
})();


async function main(){


    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName:envs.MONGO_DB_NAME
    });

     Server.start();

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
    // console.log(logs[0].message);

}      