import { system, world } from "@minecraft/server";
import { calculateDistance, calculateDistanceInVector3, isItemBlock } from "../util";

world.beforeEvents.playerInteractWithEntity.subscribe(e => {
    const pl = e.player;
    const ent = e.target;

    if (ent.typeId == "engineerplus:item") {
        const ppos = pl.location;
        const epos = ent.location;
        const dis = calculateDistance(calculateDistanceInVector3(ppos, epos));

        if (dis >= 1.15) {
            e.cancel = true;
            return;
        }

        const item = ent.getComponent("minecraft:inventory").container.getItem(0);

        if (item) {
            system.run(() => {
                const inv = pl.getComponent("minecraft:inventory");
                
                if (inv.container.emptySlotsCount == 0) {
                    e.cancel = true;
                    return;
                }

                inv.container.addItem(item);
                ent.remove();
            });
        }
    }
});

world.afterEvents.entitySpawn.subscribe(e => {
    const ent = e.entity;

    if (ent.typeId == "minecraft:item") {
        const dim = ent.dimension;
        system.runTimeout(() => {
            const item = ent.getComponent("minecraft:item").itemStack;
            const pos = ent.location;

            const isBlock = isItemBlock(item);

            const nitem = dim.spawnEntity("engineerplus:item", pos);
            nitem.getComponent("minecraft:inventory").container.addItem(item);
            nitem.runCommand(`replaceitem entity @s slot.weapon.mainhand 0 ${item.typeId}`);
            nitem.setRotation({x: 0, y: Math.random()*360});

            if (isBlock) nitem.setProperty("enum:type", "block");
            ent.remove();
        }, 7);
    }
});