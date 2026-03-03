import { world, system } from '@minecraft/server';

const itemList = [
    `engineerplus:toolbox`
];

world.afterEvents.playerInventoryItemChange.subscribe(e => {
    const it = e.itemStack;
    const pl = e.player;
    const slot = e.slot;

    if (it && itemList[0] == it.typeId) {
        let result = false;

        it.getRawLore().forEach(l => {
            if (l.rawtext[0].translate == "translate.cou") result = true;
        });

        if (!result) system.run(() => {
            it.setLore([{rawtext: [{translate: "translate.cou"}, {text: ": 10"}]}]);
            
            const inv = pl.getComponent("minecraft:inventory");

            inv.container.setItem(slot);
            inv.container.setItem(slot, it);
        });
    }
});