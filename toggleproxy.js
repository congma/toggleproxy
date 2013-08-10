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
 * 	Copyright (c) 2013, Cong Ma <cma@mail.bnu.edu.cn>
 * 	All rights reserved.
 *
 * License:
 * 	BSD license <http://opensource.org/licenses/BSD-2-Clause>
 */

/*
 * FIXME: Add more supported proxy types and settings.
 */

var show_proxy = function ()
{
    return dactyl.echo("proxy: " + prefs.get('network.proxy.type'));
};

var toggle_manual_proxy = function ()
{
    var proxtype = prefs.get('network.proxy.type');
    if ( proxtype == 0 )
	prefs.set('network.proxy.type', 1);
    else
	prefs.set('network.proxy.type', 0);
    return show_proxy();
};

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

/* Plugin manifest */
var INFO = 
    <plugin name="toggleproxy" version="0.1"
	    summary="Toggle the current manual proxy setting."
	    xmlns={NS}>
    <author email="cma@mail.bnu.edu.cn">Cong Ma</author>
    <license href="http://opensource.org/licenses/BSD-2-Clause">BSD License</license>
    <project name="Pentadactyl" min-version="1.0"/>

    <p>
	This plugin implements the <ex>:toggleproxy</ex> command that turns the
	manual proxy setting on and off in Firefox.  In addition, the
	<ex>:showproxy</ex> command returns the current proxy status.
    </p>

    <item>
	<tags>:spx :showproxy</tags>
	<spec>:showproxy</spec>
	<description>
	    <p>
		Display current proxy setting.
	    </p>
	</description>
    </item>

    <item>
	<tags>:tpx :toggleproxy</tags>
	<spec>:toggleproxy</spec>
	<description>
	    <p>
		Toggle the manual proxy setting.
	    </p>
	</description>
    </item>

</plugin>
