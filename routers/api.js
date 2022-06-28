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
const exp = require("constants");
var cookieparser = require("cookie-parser");
var express = require("express");
const { readFileSync, writeFileSync, existsSync } = require("fs");
const ttv = require("twitch");
const ttva = require("twitch-auth");
const consts = require("../PageConstants");

// Router:
var router = express.Router();

// Middleware:
router.use(async (req, res, next) => {
    next();
});

router.use(cookieparser());

router.get("/commandInfo/:id", async (req, res) => {
    try {
        var lang = req.query.lang.toLowerCase();
        var langfile = JSON.parse(readFileSync(`./server-apollo/static/lang/${lang}.json`, {encoding: "utf-8"}));

        if (!(req.params.id.toLowerCase() in langfile.cmds)) return res.json({error: {status: 400, reason: `Command ${req.params.id} not exists!`}}).status(400);

        return res.json(langfile.cmds[req.params.id.toLowerCase()]).status(200);
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;