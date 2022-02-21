import { createLogger, format, transports } from "winston";
import Transport, { TransportStreamOptions } from 'winston-transport';
import { SERVER_NAME } from '../config/constants';

class CustomTransport extends Transport {
    constructor(opts?: TransportStreamOptions) {
        super(opts);
    }

    log(info: Record<string, string>, callback: () => void ) {
        setImmediate(() => {
            process.stdout.write(this.customFormat(info));
            process.stdout.write("\n");
        });

        callback()
    }

    customFormat( { level, message, metadata, label, timestamp }: Record<string, any> ) {
        const date = new Date(timestamp);
        let meta = '| ';
        if (Object.keys(metadata).length > 0) {
            meta += JSON.stringify(metadata);
        }

        return `{${label}} [${level.toUpperCase()}] ${date.toLocaleDateString()} ${date.toLocaleTimeString()} : ${message} ${meta}`;
    };
}

let level = 'info';

if (process.env.NODE_ENV === "development") {
    level = 'debug'
}

if (process.env.NODE_ENV === "production") {
    level = 'error'
}

const Logger = createLogger({
    level,
    format: format.combine(
        format.metadata(),
        format.label({ label: SERVER_NAME }),
        format.timestamp(),
    ),
    transports: [
        new CustomTransport()
    ]
});


export default Logger;