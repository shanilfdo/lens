#!/usr/bin/env node
const validatedArgs = {
  dir: ".",
  isDev: false,
  isExperimentalTestProxy: undefined,
  hostname: undefined,
  port: 3000,
  keepAliveTimeout: undefined,
};
const _startserver = require("next/dist/server/lib/start-server");
_startserver.startServer(validatedArgs).then(() => {
  console.log("started");
});
