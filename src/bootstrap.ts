import 'reflect-metadata';
import { createKoaServer } from "routing-controllers";
import { MainController } from "./controllers/maincontroller.controller";
import { DashboardController } from "./controllers/dahboard.controller";
import { KafkaConsumerService } from "./services/kafkaConsumer.service";

import { pool, createLogsTable } from "./database/db"; 

const start = async () => {
    
    const app = createKoaServer({
        controllers: [MainController, DashboardController],
        development: true,
        cors: true
    })

    app.listen(process.env.PORT || 3000)
    .on('listening', () => {
        console.log("Started!, listening on port", (process.env.PORT || 3000));
    });
    
    const consumerService = new KafkaConsumerService()
    await consumerService.startConsumer();
    
    await createLogsTable(pool);


}

process.on('unhandledRejection', e => {
    throw e;
    process.exit(0);
})

start();