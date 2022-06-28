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

const consts = {
    Page: {
        SidebarNotLoggedIn: `<div class="brand">
        <img src="https://cdn.7tv.app/emote/60ae69a686fc40d488b1033d/4x" width="64">
        <h3><span id="underline">i</span>Lotterytea's <span id="underline">T</span>witch <span id="underline">B</span>ot <span id="underline" style="color: rgb(255, 43, 43);">2</span></h3>
        </div>
        <hr>
        <a href="/" id="button"><i class="fa-solid fa-house"></i> Home</a>
        <a href="/commands" id="button"><i class="fa-solid fa-terminal"></i> Commands</a>`,

        SidebarCommands: `<div class="brand">
        <img src="https://cdn.7tv.app/emote/60ae69a686fc40d488b1033d/4x" width="64">
        <h3><span id="underline">i</span>Lotterytea's <span id="underline">T</span>witch <span id="underline">B</span>ot <span id="underline" style="color: rgb(255, 43, 43);">2</span></h3>
        </div>
        <hr>
        <a href="/" id="button"><i class="fa-solid fa-house"></i> Home</a>
        <a href="/commands" id="button"><i class="fa-solid fa-terminal"></i> Commands</a><!--%COMMANDSLIST%-->`
    }
}
module.exports = consts;