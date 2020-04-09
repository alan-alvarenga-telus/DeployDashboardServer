const express = require('express');
const util = require('util');
const cors = require('cors');
const app = express();
const corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
};

app.use(cors(corsOptions));
const port = 8888;
const exec = util.promisify(require('child_process').exec);

app.get('/deploy/new', async (req, res, next) => {
  result = {};
  const { stdout, stderr } = await exec("./shell/new-deploy.sh");
  console.log(stdout);
  res.json(stdout);
});

app.listen(port, () => console.log(`Listening on port ${port} ...`));