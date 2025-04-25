import { LogEntity, LogServerityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
     execute(url:string ):Promise<boolean> 
}

type SuccessCallbaack = (() => void)  | undefined;
type ErrorCallback = ((error: string) => void) | undefined;


export class CheckService implements CheckServiceUseCase {
    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallbaack,
        private readonly errorCallback: ErrorCallback,
    ) {

    }
    public  async execute(url:string ): Promise<boolean> {

        try {
            const req = await fetch(url);
            if(!req.ok){
                throw new Error(`Error on check service: ${url}`);
            }

            const log = new LogEntity(`Service ${url} is up`, LogServerityLevel.low);
            this.logRepository.saveLog(log);
            this.successCallback &&  this.successCallback();
            return true;  

            }catch (error) {
                const errorMessage = `Service ${url} is down:  ${error}`;
                const log = new LogEntity( errorMessage, LogServerityLevel.high);
                this.logRepository.saveLog(log);
                this.errorCallback && this.errorCallback(errorMessage);
        return false;  

    }
    }
}   