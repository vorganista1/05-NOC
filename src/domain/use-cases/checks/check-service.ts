interface CheckServiceUseCase {
     execute(url:string ):Promise<boolean> 
}

type SuccessCallbaack = () => void;
type ErrorCallback = (error: string) => void;


export class CheckService implements CheckServiceUseCase {
    constructor(
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

            this.successCallback();
            return true;  
        }catch (error) {
            this.errorCallback(`${error}`);
        return false;  

    }
    }
}   