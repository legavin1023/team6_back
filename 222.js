require('dotenv').config();
const Influx = require('influx');
const mqtt = require('mqtt');


const influx = new Influx.InfluxDB({
  host: 'localhost',
  port: 8086,
  database: 'dashboard',
  username: process.env.UNAME,
  password: process.env.PASSWORD,
  json_body:[
    {
      "measurement":"smartdata",
      "tags": "uvc",     
      "fields": {  
        "No1Count":Influx.FieldType.INTEGER,
        "No2Count":Influx.FieldType.INTEGER,
        "No3Count":Influx.FieldType.INTEGER,
        "Lemon":Influx.FieldType.INTEGER,
      }, 
    }]
 
});
influx.getDatabaseNames()
  .then(names => {
    if (!names.includes('dashboard')) {
      return influx.createDatabase('dashboard');
    }
  })
  .then(() => {
    
  })
  // .then(() => {
  //   http.createServer(app).listen(3000, function () {
  //     console.log('Listening on port 3000')
  //   })
  // })
  .catch(err => {
    console.error(`Error creating Influx database!`);
  })

//mqtt연결
const client  = mqtt.connect('mqtt://127.0.0.1:1883');

// subscribe  topics
client.on('connect', function () {
  client.subscribe('UVC-EDU-01');
  console.log("구독 성공");
  // client.subscribe('추가가능');
  // client.subscribe('또 추가가능');
});






client.on('message', function (topic, message) {
  if(topic.startsWith('UVC-EDU-01')) {
    try {
      var data = JSON.parse(message.toString());
      console.log(data)
    } catch(e) {
      influx.writePoints([
        {
          measurement: 'errdata',
          tags: {},
          fields: {hit: 1}
        }
      ]).catch(err => {
        console.log('err saving wrong!!!');
      });      
      return;
    }
    influx.writePoints([
      {
        measurement: 'smartdata',
        tags: ['uvc'],
        fields: {  
          "No1Count": data.Wrapper.filter(p => p.tagId === '15')[0].value,
          "No2Count": data.Wrapper.filter(p => p.tagId === '16')[0].value,
          "No3Count": data.Wrapper.filter(p => p.tagId === '17')[0].value,
          "Lemon": data.Wrapper.filter(p => p.tagId === '15')[0].value-data.Wrapper.filter(p => p.tagId === '17')[0].value,
          
        }, 
        timestamp: message.timeStamp,
      }
    ]).catch(err => {
      console.log("saving err!")
      console.log(err)
    });

  } 
});


