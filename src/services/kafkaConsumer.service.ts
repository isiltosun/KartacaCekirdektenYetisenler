import { Kafka, Consumer, logLevel } from "kafkajs";
import { LogData } from "./kafkaLog.service";
import { pool, insertLog } from "../database/db"

export class KafkaConsumerService {
    private kafkaClient: Kafka;
    private consumer: Consumer;

    constructor() {
        this.kafkaClient = new Kafka({
            clientId: 'web-consumer',
            brokers: [process.env.KAFKA_URL as string],
            logLevel: logLevel.NOTHING
        });

        this.consumer = this.kafkaClient.consumer({ groupId: 'log-group' });
        this.consumer.connect()
        .then(() => console.info("Consumer connected"))
    }

    public async startConsumer() {
        await this.consumer.subscribe({
            topic: 'logs',
            fromBeginning: true
        });

        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                if(message.value) {
                    const logData: LogData = JSON.parse(message.value.toString());

                    await insertLog(pool, logData);
                }
            }
        })
    }

}