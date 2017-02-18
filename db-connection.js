'use strict'
let MongoClient = require('mongodb').MongoClient;

class DbData{

	getData(db, collection, criteria) {
		const criteriaDb = criteria === undefined ? {} : criteria; 
		return new Promise((resolve, reject) => {
			MongoClient.connect(db, (err, dataBase) => {
				if(err) {
					reject(err);
				}
				dataBase.collection(collection).find(criteriaDb).toArray( (err, result) => {
					if(err) {
						reject(err);
					}
					if(result.length === 0){
						reject('Results not found');
					}
					resolve(result);
				});
			});
		})
	}

	setData(db, collection, criteria) {
		const criteriaDb = criteria === undefined ? {} : criteria; 
		return new Promise((resolve, reject) => {
			MongoClient.connect(db, (err, dataBase) => {
				if(err) {
					reject(err);
				}
				dataBase.collection(collection).insert(criteriaDb).toArray( (err, result) => {
					if(err) {
						reject(err);
					}
					if(result.length === 0){
						reject('Error in data set');
					}
					resolve(result);
				});
			});
		})
	}
}

module.exports = DbData;