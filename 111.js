const Influx = require('influx');
const mqtt = require('mqtt');

// define metrics we want to record
const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'beacon',
  schema: [
    {
      measurement: 'beacond_ping',
      fields: {
        hit: Influx.FieldType.INTEGER
      },
      tags: [
      ]
    },
    {
      measurement: 'beacond_mobile',
      fields: {
        rssi: Influx.FieldType.INTEGER
      },
      tags: [
        'uuid',
        'major',
        'minor'
      ]
    },
    {
      measurement: 'beacond_mobile_error',
      fields: {
        hit: Influx.FieldType.INTEGER
      },
      tags: [
      ]
    },
    {
      measurement: 'beacond_app',
      fields: {
        persons: Influx.FieldType.INTEGER
      },
      tags: [
        'uuid',
        'major',
        'minor'
      ]
    }
  ]
});

// connect to mqtt
var client  = mqtt.connect('mqtt://localhost');

// subscribe to teh beacon topics
client.on('connect', function () {
  client.subscribe('debug/beacon/ping');
  client.subscribe('beacon/#');
  client.subscribe('+/+/+/engage');
});

//var garbage = '{"PersonId":,"RSSI":-54,"updated":1523420701519}';






// when we get a message, send it to influxdb
client.on('message', function (topic, message) {
  if(topic.startsWith('beacon')) {
    try {
      var data = JSON.parse(message.toString());
      //var data = JSON.parse(garbage);
    } catch(e) {
      influx.writePoints([
        {
          measurement: 'beacon_mobile_error',
          tags: {},
          fields: {hit: 1},
        }
      ]).catch(err => {

      });      
      return;
    }
    var parts = topic.split('/');
    influx.writePoints([
      {
        measurement: 'beacon_mobile',
        tags: { uuid: parts[1], major: parts[2], minor: parts[3] },
        fields: {rssi: data.RSSI},
      }
    ]).catch(err => {

    });
  } else if(topic.endsWith('engage')) {
    var parts = topic.split('/');
    var data = JSON.parse(message.toString());
    influx.writePoints([
      {
        measurement: 'beacond_app',
        tags: { uuid: parts[0], major: parts[1], minor: parts[2] },
        fields: {persons: data.length},
      }
    ]).catch(err => {

    });
  } else if(topic.endsWith('ping')) {
    influx.writePoints([
      {
        measurement: 'beacond_ping',
        fields: {hit: 1},
      }
    ]).catch(err => {

    });
  }
});