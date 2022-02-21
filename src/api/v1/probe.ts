import { NextFunction, Request, RequestHandler, Response } from "express";
import { RESPONSE_CODE } from '../../config/constants';


export default function() {

    const GET = async (request: Request, response: Response) => {

        return response.status(RESPONSE_CODE.SUCCESS)
        .json({ message: "Hello World!" });
    }

    GET.apiDoc = {
        summary: 'Returns hello world',
        operationId: 'HelloWorld',
        tags: [ "System" ],
        responses: {
            200: {
                description: "Success response",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string"
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    const POST = async (request: Request, response: Response ) => {

        return response.status(RESPONSE_CODE.SUCCESS)
        .json({ message: "Hello World!" });
    }

    POST.apiDoc = {
        summary: 'Returns hello world',
        operationId: 'HelloWorldPOST',
        tags: [ "System" ],
        responses: {
            200: {
                description: "Success response",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string"
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return { GET, POST }
}