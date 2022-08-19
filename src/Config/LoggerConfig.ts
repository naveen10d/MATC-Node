import { createLogger, format, transports } from 'winston'

const d = new Date()

var currentWork = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
export const logger = createLogger({
    levels: { info: 0, error: 1 },
    format: format.combine(
        format.timestamp(
            { format: 'DD-MM-YYYY HH:mm:ss' }),
        format.simple(),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
        format.printf(error => `${error.timestamp} ${error.level}: ${error.message}`)
    ),


    transports: [
        new transports.File({ filename: `logs/${currentWork}.log`, level: 'error' }),
        new transports.Console()

    ]
})