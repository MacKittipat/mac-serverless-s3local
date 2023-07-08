	
const AWS = require("aws-sdk");

const S3 = new AWS.S3({
  s3ForcePathStyle: true,
  accessKeyId: "S3RVER", // This specific key is required when working offline
  secretAccessKey: "S3RVER",
  endpoint: new AWS.Endpoint("http://localhost:8080"),
});
 
module.exports.handler = (event, context, callback) => {

  // Upload file to S3
  S3.putObject({
    Bucket: "local-bucket",
    Key: "1234",
    Body: new Buffer("abcd")
  }, () => callback(null, "ok"));

};


module.exports.s3hook = async (event, context) => {
  console.log('event >>> ' + JSON.stringify(event));
  console.log('context >>> ' + JSON.stringify(context));
  console.log('process >>> ' + JSON.stringify(process.env));

  // Log file content if event is an ObjectCreated:Put.
  if(event.Records[0].eventName === 'ObjectCreated:Put') {
    const bucketName = event.Records[0].s3.bucket.name;
    const bucketKey = event.Records[0].s3.object.key;
    const params = {
        Bucket: bucketName,
        Key: bucketKey
    };
    var file = await S3.getObject(params).promise();
    console.log("File content = ", file.Body.toString("UTF-8"));
  }

};