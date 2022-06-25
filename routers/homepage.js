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
const { readFileSync } = require("fs");
const consts = require("../PageConstants");

// Router:
var router = express.Router();

// Middleware:
router.use(async (req, res, next) => {
    next();
});

router.get("/", async (req, res) => {
    let page = readFileSync("./server-apollo/static/pages/homepage.html", {encoding: "utf-8"});

    var commit = readFileSync("storage/commit.txt", {encoding: "utf-8"}).split("-0-g");
    var commit_branch = commit[0].replace("heads/", "");

    page = page.replace("<!--%SIDEBAR%-->", consts.Page.Sidebar);

    return res.send(page).status(200);
});

module.exports = router;