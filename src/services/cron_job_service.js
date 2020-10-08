const CronJob = require('cron');
const userService = require('../services/users_service');
require('dotenv').config();

const cronJobService = {};

const startService = function (bot) {
    let job = new CronJob.CronJob(
        process.env.CRON_JOB_TIME,
        async function () {
            try {
                await userService.firesDealsToAllUsers({
                    botInstance: bot
                });
                console.info('se terminó el proceso de notificación para el bot telegram');
            } catch (error) {
                console.error('Ocurrió un error al proceso de notificación para el bot telegram');
                console.error(`mensaje de error: ${error.message}`);
            }
        },
        null,
        false,
        'Europe/Madrid'
    );
    job.start();
}

cronJobService.initializeCronJob = startService;

module.exports = cronJobService;