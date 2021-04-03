import { JsonController, Get, Put, Post, Delete, UseAfter } from "routing-controllers";
import { LogMiddleware } from "../middlewares/log.middleware";

@JsonController()
@UseAfter(LogMiddleware)
export class MainController { 
    
    @Get("/")
    public async get() {
        return {
            status: true
        }
    }

    @Post("/")
    public async post() {
        return {
            status: true
        }
    }

    @Delete("/")
    public async delete() {
        return {
            status: true
        }
    }

    @Put("/")
    public async put() {
        return {
            status: true
        }
    }
}