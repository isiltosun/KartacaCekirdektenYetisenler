import { Kafka, Producer, logLevel } from "kafkajs";

export interface LogData {
    method: string,
    delta: number,
    timestamp?: number,
}

export class KafkaProducerService {
    private kafkaClient: Kafka;
    private producer: Producer; 

    constructor() {
        this.kafkaClient = new Kafka({
            clientId: 'web-producer',
            brokers: [process.env.KAFKA_URL as string],
            logLevel: logLevel.NOTHING
        });

        this.producer = this.kafkaClient.producer();
        this.producer.connect()
            .then(() => console.info("Producer connected..."));
        this.kafkaClient.admin().createTopics({
            topics: [{
                topic: 'logs'
            }]
        }).catch(e => {
            throw e;
        })
    }


    async sendLog(logData: LogData) {
        logData.timestamp = logData.timestamp ? logData.timestamp : new Date().getTime();
        await this.producer.send({
            topic: 'logs',
            messages: [{ value: JSON.stringify(logData) }]
        })
    }

}