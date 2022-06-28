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

    

    let lang = (req.query.lang != undefined) ? req.query.lang.toLowerCase() : "en";
    if(!(existsSync(`./server-apollo/static/lang/${lang}.json`))) lang = "en";

    const langf = JSON.parse(readFileSync(`./server-apollo/static/lang/${lang}.json`, {encoding: "utf-8"}));
    page = page.replace("<!--%PAGENAME%-->", langf.titles.commands);
    sidebar = consts.Page.SidebarCommands;
    sidebarcmds = ``;

    sidebarcmds = sidebarcmds + `<hr>`;

    Object.keys(langf.cmds).forEach(async (value) => {
        sidebarcmds = sidebarcmds + `<a href="#${langf.cmds[value].namespace_id}">--> ${langf.cmds[value].name}</a>`
    });

    sidebarcmds = sidebarcmds + `<hr>`;

    sidebar = sidebar.replace("<!--%COMMANDSLIST%-->", sidebarcmds);

    page = page.replace("<!--%SIDEBAR%-->", sidebar);

    const badges = {
        mod: {
            img: "https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/1",
            title: langf.tooltips.modRequired,
            usertitle: "Модератор"
        },
        brd: {
            img: "https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/1",
            title: langf.tooltips.brdRequired,
            usertitle: "Стример"
        },
        sup: {
            img: "https://cdn.betterttv.net/emote/5eb46d0f813f921693551877/1x",
            title: langf.tooltips.supRequired,
            usertitle: "Суперпользователь"
        }
    };

    let cmdspage = ``;

    Object.keys(langf.cmds).forEach(async (value, index, array) => {
        let cmd = langf.cmds[value];
        let examples = ``;

        Object.keys(cmd.examples).forEach(async (value) => {
            let text = `<span id="dialog_exampleheader">${value}:</span>
            <div class="msg">
                <span style="color: rgb(95, 95, 95)">00:20:38</span> ${(cmd.min_role in badges) ? "<img src=\"" + badges[cmd.min_role].img + "\" title=\"" + badges[cmd.min_role].usertitle + "\">" : ""} <span style="color: #898989;" id="name">ilotterytea:</span> ${cmd.examples[value][0]}
            </div>
            <div class="msg">
                <span style="color: rgb(95, 95, 95)">00:20:39</span> <img src="https://cdn.frankerfacez.com/badge/2/1" title="Bot" style="background-color: #3d3d3d;"> <span style="color: #FF69B4;" id="name">fembajbot:</span> ${cmd.examples[value][1]}
            </div>`

            examples = examples + text;
        });

        let template = `<hr><br><div class="commandInfo" id="${cmd.namespace_id}">
            <div id="cmd_header">
                ${cmd.name}
                ${(cmd.min_role in badges) ? "<img src=\"" + badges[cmd.min_role].img + "\" title=\"" + badges[cmd.min_role].title + "\">" : ""}
            </div>
            <div id="cmd_content">
                <div id="cmd_cmd">${cmd.cmd_template}</div><br>
                <div id="cmd_description">
                    ${cmd.desc}
                    <br><br>
                    ${(cmd.options != "") ? `<div id="cmd_options">
                    <span id="cmd_header"><i class="fa-solid fa-ellipsis"></i> ` + langf.headers.options + `</span><br>
                    <code style="padding-left: 16px;">
                        ` + cmd.options + `
                    </code>
                </div>
                <br>` : ""}
                    
                    <i class="fa-solid fa-hourglass"></i> ${langf.headers.cooldown}: <b>${cmd.cooldown}</b>
                    <br>
                    ${(cmd.notes != "") ? `<div id="cmd_notes">
                    <i class="fa-solid fa-note-sticky"></i> ` + langf.headers.notes +`: ` + cmd.notes + `
                </div><br>` : ""}
                    
                </div>
                <div id="cmd_dialog">
                    <span id="cmd_header"><i class="fa-solid fa-terminal"></i> ${langf.headers.example}:</span><br>
                    ${examples}
                </div>
            </div>
        </div>`

        cmdspage = cmdspage + template;
    });

    page = page.replace("<!--%CMDSTABLE%-->", cmdspage)

    return res.send(page).status(200);
});

module.exports = router;