import { JsonController, Get, Controller, Render } from "routing-controllers";
import { pool, getLogsForLastHour } from "../database/db";

@JsonController()
export class DashboardController {

    @Get('/lastlogs')
    public async getDataForLastHour() {
        const data = await getLogsForLastHour(pool);
        if(data && data.rows.length > 0) {
            const anHourAgo = new Date().getTime() - (1000 * 60 * 60);
            const filtered = data.rows.filter(logData => {
                return logData.timestamp > anHourAgo;
            });
            return filtered;
        }
        return true;
    }
    
}