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
const { readFileSync, writeFileSync } = require("fs");
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

router.get("/", async (req, res) => {
    try {
        const code = req.query.code;
        const scopes = req.query.scope.split('+');

        res.cookie("code", code, {maxAge: 900000});
        res.cookie("scopes", scopes, {maxAge: 900000});
        console.log(process.env.TTV_CLIENT);

        const auth = new ttva.StaticAuthProvider(process.env.TTV_CLIENT, code, scopes);
        const gql = new ttv.ApiClient({authProvider: auth});
        console.log(auth);
        const user = await gql.helix.users.getMe();
        
        if (!user) return false;
        console.log(user);
        let codes = JSON.parse(readFileSync("storage/codes.json", {encoding: "utf-8"}));
        codes[user.id] = {code: code, scopes: scopes};
        
        writeFileSync("storage/codes.json", JSON.stringify(codes, null, 2), {encoding: "utf-8"});
        res.redirect("/");
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;