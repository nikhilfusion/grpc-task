const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const cors = require('cors')
const bodyParser = require('body-parser')

const PROTO_PATH = __dirname + '/dob.proto';
const PORT = process.env.PORT || 4001

const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const dob = protoDescriptor.dob;
const client = new dob.GetDOB('grpc-server:9090',
  grpc.credentials.createInsecure());

/**
 * @param {function():?} callback
 */
function runSayHello(callback) {
  client.sayHello({ name: 'John' }, {}, (err, res) => {
    console.log('response is ', res);
    callback();
  });
}


function main() {
  const express = require('express');
  const app = express()
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.listen(PORT, function() {
    console.log(`Server is running on: ${PORT}`)
  })

  app.get('*', (req, res) => {
    res.sendFile('public/index.html', { root: __dirname })
  })

  app.post('/api', (req, res) => {
    const { year, month } = req.body
    client.getYearAndMonth({ year, month }, {}, (err, data) => {
      if(err) return err
      res.send(data)
    });
  })
}

if (require.main === module) {
  main();
}