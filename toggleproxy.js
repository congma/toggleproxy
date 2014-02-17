/* Pentadactyl plugin for toggling the proxy status on and off.
 * This plugin provides the command :toggle-proxy (or :tpx)
 * that turns the manual proxy setting on and off.  In addition,
 * the :show-proxy (:spx) command can echo the current status
 * of proxy type setting.
 *
 * Installation:
 * 	Copy the .js and .penta (optional) files to ~/.pentadactyl/plugins/
 *
 * Copyright:
 * 	Copyright (c) 2013-2014, Cong Ma <cma@pmo.ac.cn> & Contributors
 * 	All rights reserved.
 *
 * License:
 * 	BSD license <http://opensource.org/licenses/BSD-2-Clause>
 */

/*
 * FIXME: Add more supported proxy types and settings.
 */
"use strict";

var show_proxy = function ()
{
    return dactyl.echo("proxy: " + prefs.get("network.proxy.type"));
};

var toggle_manual_proxy = function ()
{
    var proxtype = prefs.get("network.proxy.type");
    if ( proxtype == 0 )
	prefs.set("network.proxy.type", 1);
    else
	prefs.set("network.proxy.type", 0);
    return show_proxy();
};

var set_socks_port = function (portn)
{
    var x = parseInt(portn);
    if ( isNaN(x) || x < 0 || x > 65535 )
	return dactyl.echo("Error: invalid port number.");
    else
	return prefs.set("network.proxy.socks_port", x);
}

group.commands.add(["showproxy", "spx"],
	"Display the current proxy setting.",
	show_proxy,
	{argCount: "0"},
	true);

group.commands.add(["toggleproxy", "tpx"],
	"Toggle the current manual proxy setting.",
	toggle_manual_proxy,
	{argCount: "0"},
	true);

group.commands.add(["sxportnum", "spn"],
	"Set the SOCKS port number.",
	set_socks_port,
	{argCount: "1"},
	true);

/* Plugin manifest */
var INFO =
["plugin", {
    name:    "toggleproxy",
    version: "0.2",
    href:    "https://github.com/congma/toggleproxy",
    summary: "toggleproxy - switching proxy settings in a flash",
    xmlns:   "dactyl"},

    ["author", {
	email:  "cma@pmo.ac.cn",
	href:   "http://cma.lamost.org/"}, "Cong Ma"],

    ["license", {href: "http://opensource.org/licenses/BSD-2-Clause"},
	"BSD License"],

    ["project", {name: "Pentadactyl", "min-version": "1.0" }],

    ["p", {},
	"The ", ["str", {}, "toggleproxy"], " plugin implements the ",
	["str", {}, ":toggleproxy"],
	" command that turns the manual proxy setting on and off in Firefox.",
	"  In addition, the ", ["str", {}, ":showproxy"], " command returns",
	" the current proxy status.  SOCKS proxy port number can be set",
	" using the ", ["str", {}, ":sxportnum"], " command."],

    ["item", {},
	["tags", {}, ":spx :showproxy"],
	["strut", {}],
	["spec", {}, ":showproxy"],
	["description", {},
	    ["p", {}, "Display the current proxy setting."]]],

    ["item", {},
	["tags", {}, ":tpx :toggleproxy"],
	["strut", {}],
	["spec", {}, ":toggleproxy"],
	["description", {},
	    ["p", {},
		"Toggle the current manual proxy setting."],
	    ["p", {},
		"By default, this command is mapped to",
		" the key combo ", ["str", {}, ["k", {name: "Leader"}], "p"],
		":"],
	    ["code", {},
		["ex", {}, ":nmap"], " ", ["k", {name: "Leader"}],
		"p ", ["ex", {}, ":toggleproxy"], ["k", {name: "CR"}]]]],

    ["item", {},
	["tags", {}, ":spn :sxportnum"],
	["strut", {}],
	["spec", {}, ":sxportnum ", ["a", {}, "port"]],
	["description", {},
	    ["p", {}, "Set the SOCKS port number."],
	    ["example", {}, ["ex", {}, ":spn 9274"]]]]];
