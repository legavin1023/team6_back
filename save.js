require('dotenv').config();
const mqtt = require('mqtt');
const Influx = require('influx');
// const _ = require('lodash');
// let savemqtt= {};
// const app = {};
// const storage = {};

//mqtt서버 
const mqttserver = mqtt.connect('mqtt://127.0.0.1:1883');
let savemqtt;

//토픽 구독 sub
mqttserver.on('connect', function() {
  mqttserver.subscribe("UVC-EDU-01");
  console.log("구독 성공");
});
// 메세지 받기
mqttserver.on('message', function(topic,message){
  console.log(message.toString());
  // savemqtt.connect(JSON.parse(message.toString()))
  savemqtt = JSON.parse(message.toString())
})



const client = new Influx.InfluxDB({
  database: 'dashboard',
  host: 'localhost',
  port: 8086,
  username: process.env.UNAME,
  password: process.env.PASSWORD,
  schema: [
    {
      measurement: 'uvc',
      fields: {  // 
        No1Count: Influx.FieldType.INTEGER,
        No2Count: Influx.FieldType.INTEGER,
        No3Count: Influx.FieldType.INTEGER,
        ConSpeed: Influx.FieldType.FLOAT
      },
      tags: ['connect'],
    },
  ],

  
}); 

// json_body: [
//   {
//   "measurement":"uvc",
//   "tags": "team6",
//   "fields": {  
//     "No1Count":Influx.FieldType.INTEGER,
//     "No2Count":Influx.FieldType.INTEGER,
//     "No3Count":Influx.FieldType.INTEGER,
//     "ConSpeed":Influx.FieldType.FLOAT
//   }, 
//  }]

client.getDatabaseNames()
  .then(names => {
    if (!names.includes('uvc')) {
      return influx.createDatabase('uvc');
    }
  })
  .then(() => {
    console.log('데이터 들어감')
    writeDataToInflux(No1Count);
    writeDataToInflux(No2Count);
    writeDataToInflux(No3Count);
    writeDataToInflux(ConSpeed);
  })
  .catch(error => console.log({ error }));


//디비에 정보 저장하기
client.writePoints([
    {
      measurement: 'uvc',
      fields: {
        No1Count:savemqtt.No1Count,
        No2Count:savemqtt.No2Count,
        No3Count:savemqtt.No3Count,
        ConSpeed:savemqtt.No4Count
      },
      timestamp: message.timeStamp,
    },
  ]).then(cb);
  console.log('Data stored successfully!');





// storage.influx.getDatabaseNames().then((names) => {
//     if (!names.includes(client.database)) {
//       return storage.influx.createDatabase(client.database);
//     }
//     return null;
//   }).then(cb);
// }
