 import { LogEntity, LogServerityLevel } from "../../entities/log.entity";
 import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase {
     execute(url:string ):Promise<boolean> 
}

 type SuccessCallbaack = (() => void)  | undefined;
 type ErrorCallback = ((error: string) => void) | undefined;


export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallback: SuccessCallbaack,
        private readonly errorCallback: ErrorCallback,
    ) {}

private callLog(log: LogEntity) {
    this.logRepository.forEach( logRepository => {
        logRepository.saveLog(log);
        
    });

}

    public  async execute(url:string ): Promise<boolean> {

        try {
             const req = await fetch(url);
            if(!req.ok){
                throw new Error(`Error on check service: ${url}`);
            }

            const log = new LogEntity({
                message     : `Service ${url} is up`, 
                level       :  LogServerityLevel.low,
                origin      : 'Check-Service.ts',

            });
             this.callLog(log);
             this.successCallback &&  this.successCallback();
             return true;  

            }catch (error) {
                const errorMessage = `Service ${url} is down:  ${error}`;
                const log = new LogEntity({
                    message     : errorMessage,
                    level       :  LogServerityLevel.high,
                    origin      : 'Check-Service.ts'
                });
                this.callLog(log);
                this.errorCallback && this.errorCallback(errorMessage);
        return false;  

    }
    }
}   