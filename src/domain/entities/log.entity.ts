export enum LogServerityLevel{
    low         = 'low',
    medium      = 'medium',
    high        = 'high',
} 


export interface LogEntityOptions {
    level    : LogServerityLevel;
    message  : string;
    origin   : string;
    createdAt?: Date;

} 
export class LogEntity {
    public level    : LogServerityLevel;
    public message  : string;
    public createdAt: Date;
    public origin   : string;

    constructor(options: LogEntityOptions) {
        
        const { message, level, origin, createdAt = new Date() } = options;
        this.message = message;
        this.level = level;
        this.origin = origin;
        this.createdAt = createdAt;
    }

    static fromJson =(json:string): LogEntity =>{
        const   {message, level, createdAt,origin  } =  JSON.parse(json);

        const log = new LogEntity({ 
            message,
             level,
             createdAt,
             origin, 
             });


        return log;
    }

    static fromObject  = (object: {[key: string]:any}): LogEntity => {
        const {message, level, createdAt,   origin } = object;
        const log = new LogEntity({
            message, level, createdAt,   origin
        }); 

        return log; 

    }
}