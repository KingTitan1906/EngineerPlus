export class SoundLoopBlock {
    onTick(e, arg) {
        const bl = e.block;
        const dim = e.dimension;
        let perm = bl.permutation;
        const sid = arg.params.sound;
        const v = arg.params.volume;
        const max = arg.params.max_time;

        const pos = {
            x: bl.location.x + 0.5,
            y: bl.location.y,
            z: bl.location.z + 0.5
        }

        let time = perm.getState("time:sound");

        if (time == 0) dim.playSound(sid, pos, {volume: v});
        if (time >= 0 || time < max) perm = perm.withState("time:sound", ++time);
        if (time == max) perm = perm.withState("time:sound", 0);

        bl.setPermutation(perm);
    }
}