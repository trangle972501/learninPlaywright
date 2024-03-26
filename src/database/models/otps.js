const { getEnv } = require('../../helper/env/env');
const { findADocument } = require('../database.service');
const { UsersV2 } = require('./usersV2');
const ObjectId = require('mongodb').ObjectId;

getEnv();
const collectionName = "otps";
// const dbStaging = process.env.DB_NAME_QUIZRR_STAGING;
const dbStaging = "quizrr-staging";

const usersV2 = new UsersV2();

exports.Otps = class Otps {

    async getCodeByEmailAdress(emailAdrress) {
        const objectIdOpt = await usersV2.getOptObjectIdByEmailAddress(emailAdrress);
        const query = {
            "_id": new ObjectId(objectIdOpt)
        }
        const otpsData = await findADocument(dbStaging, collectionName, query);
        console.log("CODE==========", otpsData['code']);
        return otpsData['code']
    }
}