import express from 'express';
import db from './database/connections';
import convertHourToMinutes from './utils/convertHourToMinutes';

interface scheduleItem{
    week_day: number,
    from: string,
    to:string
}

const routes = express.Router();

routes.post('/classes', async (request, response) => {

    const {
        name, 
        avatar,
        whatsapp,
        bio,
        subject,
        cost,
        schedule
    } = request.body;
//transaction
    const trx = await db.transaction();

    try 
    {
        const insertedUsersIds = await trx('users').insert({
            name,
            avatar,
            whatsapp,
            bio,
        });
    
        const user_id = insertedUsersIds[0];
        
        const insertedClassesIds = await trx('classes').insert(
            {
                subject,
                cost,
                user_id,
            }
        );
    
        const class_id = insertedClassesIds[0];
    
        const classSchedule = schedule.map((scheduleItem:scheduleItem) =>
            {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
    
                };
            });
            
        await trx('class_schedule').insert(classSchedule);
    
        await trx.commit();
        
    }
    catch (err)
    {
        await trx.rollback();
        console.log(err);
        return response.status(400).json(
            {
                error: 'Unexpected error while creating new class'
            }
        );
    }

}); 

export default routes;