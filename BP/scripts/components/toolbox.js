export class Toolbox {
    onUseOn(e) {
        const pl = e.source;
        const it = e.itemStack;
        const bl = e.block;

        if (bl.typeId == "engineerplus:conveyor_iron") {
            const inv = pl.getComponent("minecraft:inventory");
            const slot = inv.container.find(it);
            let lores = it.getRawLore();
            let end = false;

            let perm = bl.permutation;

            lores.forEach(l => {
                if (l.rawtext[0].translate == "translate.cou") {
                    let counts = parseInt(l.rawtext[1].text.slice(2));

                    if (counts >= 1) {
                        counts--;
                        l.rawtext[1].text = `: ${counts}`;
                    }
                    if (counts == 0) end = true;
                }
            });

            if (!end) {
                if (!perm.getState("toggle:enabled")) {
                    it.setLore(lores);
                    inv.container.setItem(slot);
                    inv.container.setItem(slot, it);
                }
            } else {
                if (!perm.getState("toggle:enabled")) inv.container.setItem(slot);
            }

            if (!perm.getState("toggle:enabled")) {
                perm = perm.withState("toggle:enabled", true);
                bl.setPermutation(perm);
            }
        }
    }
}