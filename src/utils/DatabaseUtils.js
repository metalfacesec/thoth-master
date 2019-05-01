const mongo = require('mongodb').MongoClient;
const LogUtils = require('./LogUtils');

class DatabaseUtils {
    static writeToDB(data) {
        return new Promise((resolve, reject) => {
            const mongo_url = 'mongodb://127.0.0.1:27017';
            mongo.connect(mongo_url, { useNewUrlParser: true }, (err, client) => {
                if (err) {
                    LogUtils.logError('Error connecting to mongo = ' + err);
                    return reject(err);
                }

                const db = client.db('thoth');
                const collection = db.collection('device');

                collection.insertOne(data, (err, result) => {
                    if (err) {
                        LogUtils.logError('Error writing to mongo = ' + err);
                        return reject(err);
                    }
                    LogUtils.logInfo('Device written to database!');
                    client.close()
                    resolve("");
                });
              })
        });
    }
}

module.exports = DatabaseUtils;