// Copyright (C) 2022 ilotterytea
// 
// This file is part of iLotteryteaLive.
// 
// iLotteryteaLive is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// iLotteryteaLive is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with iLotteryteaLive.  If not, see <http://www.gnu.org/licenses/>.

// Libraries:
var express = require("express");
var http = require("http");
var https = require("https");
const { readFileSync } = require("fs");
require("dotenv").config({path: "./bot.env"});

// SSL Certificate:
var certcredentials = {
    key: readFileSync(process.env.CERT_PRIKEY, {encoding: "utf-8"}),
    cert: readFileSync(process.env.CERT_CERT, {encoding: "utf-8"}),
    ca: readFileSync(process.env.CERT_CA, {encoding: "utf-8"})
};

// App:
var app = express();

// Routers:
var homepage = require("./routers/homepage");
var auth = require("./routers/auth");
var cmds = require("./routers/commands");

// Use the routers:
app.use("/", homepage);
app.use("/auth", auth);
app.use("/commands", cmds);

// Use the static files:
app.use(express.static(`${__dirname}/static`));

// Launch the express server:
var httpServer = http.createServer(app);
var httpsServer = https.createServer(certcredentials, app);

httpServer.listen(process.env.WEB_HTTPPORT, () => console.log("HTTP Server running on port ", process.env.WEB_HTTPPORT));
httpsServer.listen(process.env.WEB_HTTPSPORT, () => console.log("HTTPS Server running on port ", process.env.WEB_HTTPSPORT));