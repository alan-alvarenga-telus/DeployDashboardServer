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
  try {
    const { stdout, stderr } = await exec("/apps/infra/ocelot/DeployDashboardServer/shell/new-deploy.sh");
    res.json({
      data: stdout,
      error: stderr
    });
  } catch (err) {
    res.json({
      data: null,
      error: err.message
    })
  }
});

app.get('/deploy/status', async (req, res, next) => {
  try {
    const { stdout, stderr } = await exec("pm2 list");
    res.json({
      data: stdout,
    });
  } catch (error) {
    res.json({
      data: null,
      error: error,
    });
  }
})

app.listen(port, () => console.log(`Listening on port ${port} ...`));