const PROTO_PATH = __dirname + '/dob.proto';
const assert = require('assert');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
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

/**
 * @param {!Object} call
 * @param {function():?} callback
 */
function getMonthAndAge(call, callback) {
  const { year, month } = call.request
  const currYear = new Date().getFullYear()
  console.log("month is ", month, new Date().getMonth())
  const ageMonth = month > new Date().getMonth()  ? Number(month) - (new Date().getMonth() + 1) : (new Date().getMonth() + 1) - Number(month)
  callback(null, { ageYear: currYear - Number(year), ageMonth });
}

/**
 * @param {!Object} call
 * @param {function():?} callback
 */
function doSayHello(call, callback) {
  console.log("inside doSayHello");
  callback(null, { message: 'Hello! ' + call.request.name });
}


/**
 * @return {!Object} gRPC server
 */
function getServer() {
  const server = new grpc.Server();
  server.addService(dob.GetDOB.service, {
    sayHello: doSayHello,
    getYearAndMonth: getMonthAndAge
  });
  return server;
}

if (require.main === module) {
  const server = getServer();
  server.bindAsync(
    '0.0.0.0:9090', grpc.ServerCredentials.createInsecure(), (err, port) => {
      assert.ifError(err);
      server.start();
      console.log("server running on port 9090");
    });
}

exports.getServer = getServer;