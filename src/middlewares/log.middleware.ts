import { KoaMiddlewareInterface } from 'routing-controllers';
import { KafkaProducerService } from "../services/kafkaLog.service";

const kafka = new KafkaProducerService();

export class LogMiddleware implements KoaMiddlewareInterface {

    public use(ctx: any, next: (err?: any) => Promise<any>): Promise<any> {
        let start = ctx[Symbol.for('request-recevied.startAt')] ? ctx[Symbol.for('request-recevied.startAt')] : process.hrtime();        
        return next().then(async () => {
            let deltaArr = process.hrtime(start);

            let delta = deltaArr[0] * 1000 + deltaArr[1] / 1000000;

            await kafka.sendLog({
                delta,
                method: ctx.request.method,
                timestamp: new Date().getTime()
            });

            ctx.set('X-Response-time', `${delta} ms`);
        })
    }

}