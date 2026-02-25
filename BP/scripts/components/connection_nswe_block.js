import { PrePosType } from "./help/enums";
import { setConnectionPreset } from "./help/functions";

const Directions4 = [
    {x: 0, y: 0, z: -1},
    {x: 0, y: 0, z: 1},
    {x: -1, y: 0, z: 0},
    {x: 1, y: 0, z: 0}
];

export class ConnectionNSWEBlock {
    onPlace(e) {
        const bl = e.block;
        const dim = e.dimension;
        const pos = bl.location;
        let perm = bl.permutation;
        const face = perm.getState("minecraft:cardinal_direction");
        const facePreset = setConnectionPreset(face, PrePosType.NSWE);

        for (let i = 0; i < Directions4.length; i++) {
            const dir = Directions4[i];
            const nbl = dim.getBlock({x:pos.x+dir.x, y:pos.y+dir.y, z:pos.z+dir.z});
            if (nbl.getComponent("engineerplus:connection4_block")) {
                let nperm = nbl.permutation;
                const nface = nperm.getState("minecraft:cardinal_direction");
                const nfacePreset = setConnectionPreset(nface, PrePosType.NSWE);

                if (i==0) {
                    if (face == "north" || nface == "south") {
                        perm = perm.withState(facePreset.north, true);
                        nperm = nperm.withState(nfacePreset.south, true);
                    }
                }
                if (i==1) {
                    if (face == "south" || nface == "north") {
                        perm = perm.withState(facePreset.south, true);
                        nperm = nperm.withState(nfacePreset.north, true);
                    }
                }
                if (i==2) {
                    if (face == "west" || nface == "east") {
                        perm = perm.withState(facePreset.west, true);
                        nperm = nperm.withState(nfacePreset.east, true);
                    }
                }
                if (i==3) {
                    if (face == "east" || nface == "west") {
                        perm = perm.withState(facePreset.east, true);
                        nperm = nperm.withState(nfacePreset.west, true);
                    }
                }
                bl.setPermutation(perm);
                nbl.setPermutation(nperm);
            } else continue;
        }
    }
    onPlayerBreak(e) {
        const bl = e.block;
        const dim = e.dimension;
        const pos = bl.location;

        for (let i = 0; i < Directions4.length; i++) {
            const dir = Directions4[i];
            const nbl = dim.getBlock({x:pos.x+dir.x, y:pos.y+dir.y, z:pos.z+dir.z});
            if (nbl.getComponent("engineerplus:connection4_block")) {
                let nperm = nbl.permutation;
                const nface = nperm.getState("minecraft:cardinal_direction");
                const nfacePreset = setConnectionPreset(nface, PrePosType.NSWE);

                if (i==0) {
                    if (nface == "north") nperm = nperm.withState(nfacePreset.south, false);
                    if (nface == "south") nperm = nperm.withState(nfacePreset.south, false);
                    if (nface == "west") nperm = nperm.withState(nfacePreset.south, false);
                    if (nface == "east") nperm = nperm.withState(nfacePreset.south, false);
                }
                if (i==1) {
                    if (nface == "north") nperm = nperm.withState(nfacePreset.north, false);
                    if (nface == "south") nperm = nperm.withState(nfacePreset.north, false);
                    if (nface == "west") nperm = nperm.withState(nfacePreset.north, false);
                    if (nface == "east") nperm = nperm.withState(nfacePreset.north, false);
                }
                if (i==2) {
                    if (nface == "north") nperm = nperm.withState(nfacePreset.east, false);
                    if (nface == "south") nperm = nperm.withState(nfacePreset.east, false);
                    if (nface == "west") nperm = nperm.withState(nfacePreset.east, false);
                    if (nface == "east") nperm = nperm.withState(nfacePreset.east, false);
                }
                if (i==3) {
                    if (nface == "north") nperm = nperm.withState(nfacePreset.west, false);
                    if (nface == "south") nperm = nperm.withState(nfacePreset.west, false);
                    if (nface == "west") nperm = nperm.withState(nfacePreset.west, false);
                    if (nface == "east") nperm = nperm.withState(nfacePreset.west, false);
                }
                nbl.setPermutation(nperm);
            } else continue;
        }
    }
}