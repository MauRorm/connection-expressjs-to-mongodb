let express = require('express');
let app = express();
let DbData = require('./db-connection');
const hostName = 'localhost';
const mongoListenPort = '27017';
const databaseName = 'exampleDatabase';
const db = `mongodb://${hostName}:${mongoListenPort}/${databaseName}`;

app.get('/getData', (req, res) => {
	const collection = 'collectionExample';
	const criteria = req.query.search ? {
		search:req.query.search
	} : {};
	const dbData = new DbData();
	dbData.getData(db, collection, criteria).then( response => {
		return res.send({success:true,content:response});
	}).catch( error => {
		return res.send({success:false,content:error});
	});
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

