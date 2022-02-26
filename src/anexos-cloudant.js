const Cloudant = require("@cloudant/cloudant");

if (!process.env.CLOUDANT_URL) {
   console.error(
      "Please put the URL of your Cloudant instance in an environment variable 'CLOUDANT_URL'"
   );
   process.exit(1);
}

const cloudant = Cloudant({ url: process.env.CLOUDANT_URL });
const dbname = "anexos";

// get database

const db = new Cloudant({
   account: process.env.CENTRAL_CLOUDANT_ACCOUNT,
   plugins: {
      iamauth: {
         iamApiKey: process.env.CENTRAL_CLOUDANT_IAMAPIKEY,
      },
   },
}).db.use(dbname);

// create document
