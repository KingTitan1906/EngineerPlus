import { system, world } from '@minecraft/server';

import "./system/citem";

import { SoundLoopBlock } from './components/sound_loop_block';
import { ConnectionNSWEBlock } from './components/connection_nswe_block';
import { Conveyor } from './components/conveyor';

system.runInterval(() => {
    world.getAllPlayers().forEach(pl => {
        if (pl.hasTag("checkPos")) pl.runCommand(`title @s actionbar x: ${pl.location.x} y: ${pl.location.y} z: ${pl.location.z}`);
    });
});

world.beforeEvents.playerInteractWithBlock.subscribe(e => {
    if (!e.isFirstEvent) return;

    const bl = e.block;
    const pl = e.player;
    const it = e.itemStack;

    if (it && it.typeId == "engineerplus:debug") {
        pl.sendMessage(`§7--------------------`);
        pl.sendMessage(`Block: §9${bl.typeId}`)
        pl.sendMessage(`BlockStates:`);
        const states = bl.permutation.getAllStates();
        for (const [key, value] of Object.entries(states)) {
            pl.sendMessage(`- §9${key}: §3${value}`);
        }
        pl.sendMessage(`§7--------------------`);
    }
})

system.beforeEvents.startup.subscribe(init => {
    init.blockComponentRegistry.registerCustomComponent("engineerplus:sound_loop_block", new SoundLoopBlock());
    init.blockComponentRegistry.registerCustomComponent("engineerplus:connection4_block", new ConnectionNSWEBlock());
    init.blockComponentRegistry.registerCustomComponent("engineerplus:conveyor", new Conveyor());
});