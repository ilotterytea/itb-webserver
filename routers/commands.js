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
const { readFileSync, existsSync } = require("fs");
const consts = require("../PageConstants");

// Router:
var router = express.Router();

// Middleware:
router.use(async (req, res, next) => {
    next();
});

router.get("/", async (req, res) => {
    let page = readFileSync("./server-apollo/static/pages/commands.html", {encoding: "utf-8"});
    let cmds = ``;

    page = page.replace("<!--%PAGENAME%-->", "Home");

    let lang = (req.query.lang != undefined) ? req.query.lang.toLowerCase() : "en";
    if(!(existsSync(`./server-apollo/static/lang/${lang}.json`))) lang = "en";

    const langf = JSON.parse(readFileSync(`./server-apollo/static/lang/${lang}.json`, {encoding: "utf-8"}));

    cmds = cmds + "<table>"
    cmds = cmds + `<tr>`;
    cmds = cmds + `<th>${langf.table.name}</th>`;
    cmds = cmds + `<th>${langf.table.description}</th>`;
    cmds = cmds + `<th>${langf.table.options}</th>`;
    cmds = cmds + `<th>${langf.table.cooldown}</th>`;
    cmds = cmds + `<th>${langf.table.notes}</th>`;
    cmds = cmds + `</tr>`;
    
    Object.keys(langf.cmds).forEach(async (value) => {
        const cmd = langf.cmds[value];

        cmds = cmds + `<tr>`;
        cmds = cmds + `<td>${cmd.name}</td>`;
        cmds = cmds + `<td>${cmd.desc}</td>`;
        cmds = cmds + `<td>${cmd.options}</td>`;
        cmds = cmds + `<td>${cmd.cooldown}</td>`;
        cmds = cmds + `<td>${cmd.notes}</td>`;
        cmds = cmds + `</tr>`;
    });
    
    page = page.replace("<!--%SIDEBAR%-->", consts.Page.SidebarNotLoggedIn);
    page = page.replace("<!--%CMDSTABLE%-->", cmds);

    return res.send(page).status(200);
});

module.exports = router;