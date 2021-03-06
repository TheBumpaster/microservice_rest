import express, { json, NextFunction, Request, Response } from "express";
import { initialize } from "express-openapi";
import swaggerUi from 'swagger-ui-express';
import Logger from './services/logger';
import { parse } from 'yaml';
import { readFileSync } from "fs";
import { resolve } from "path";
import { RESPONSE_CODE, MEMORY_LIMIT } from './config/constants';

const server = express();

server.use(json({ limit: MEMORY_LIMIT }));

initialize({
    app: server,
    apiDoc: parse(
        readFileSync(resolve(__dirname, "api/api-doc.yml"), { encoding: "utf-8" })
        ),
    paths: resolve(__dirname, "api"),
    promiseMode: true,
    exposeApiDocs: true,
    docsPath: "/api-docs",
    routesGlob: '**/*.{ts,js}',
    routesIndexFileRegExp: /(?:index)?\.[tj]s$/,
    consumesMiddleware: {
        'application/json': json({ limit: MEMORY_LIMIT }),
    }
    
});

server.use("/docs", swaggerUi.serve, swaggerUi.setup( undefined, {
    swaggerOptions: {
        url: "/api-docs"
    }
}))

server.use(function (err: Error & {status: RESPONSE_CODE}, _req: Request, res: Response, _next: NextFunction) {
    res.status(err.status).json(err);
});

server.listen(Number(process.env.PORT), () => {
    Logger.info(`Server is up and running on http://localhost:${process.env.PORT}`);
});

export default server;