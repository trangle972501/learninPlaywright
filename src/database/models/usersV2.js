const { getEnv } = require('../../helper/env/env');
const { findADocument } = require('../database.service')

getEnv();
const collectionName = "users-v2";
// const dbStaging = process.env.DB_NAME_QUIZRR_STAGING;
const dbStaging = "quizrr-staging";

exports.UsersV2 = class UsersV2 {

    async getUserV2ByEmailAdress(emailAdrress) {
        const query = { email: emailAdrress };
        const results = await findADocument(dbStaging, collectionName, query);
        return results;
    }

    async getOptObjectIdByEmailAddress(emailAdrress) {
        const usersV2Data = await this.getUserV2ByEmailAdress(emailAdrress);
        console.log("OPTS of user",usersV2Data['otp'] );
        return usersV2Data['otp'];
    }
}