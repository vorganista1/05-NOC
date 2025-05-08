import { NumberExpression } from "mongoose";

export enum LogServerityLevel{
    low         = 'low',
    medium      = 'medium',
    high        = 'high',
} 


export interface LogEntityOptions {
    id      ?: number;
    level    : LogServerityLevel;
    message  : string;
    origin   : string;
    createdAt?: Date;

} 
export class LogEntity {
    public id      ?: number;
    public level    : LogServerityLevel;
    public message  : string;
    public createdAt: Date;
    public origin   : string;

    constructor(options: LogEntityOptions) {
        
        const {id, message, level, origin, createdAt = new Date() } = options;
        this.id = id;
        this.message = message;
        this.level = level;
        this.origin = origin;
        this.createdAt = createdAt;
    }

    static fromJson =(json:string ): LogEntity =>{
        json =( json=== '') ? '{}':json;
        const   {id,message, level, createdAt,origin  } =  JSON.parse(json);

        const log = new LogEntity({
            id, 
            message,
             level,
             createdAt,
             origin, 
             });


        return log;
    }

    static fromObject  = (object: {[key: string]:any}): LogEntity => {

        const {id , message, level, createdAt,   origin } = object;
        const log = new LogEntity({
         id,   message, level, createdAt,   origin
        }); 

        return log; 

    }
}