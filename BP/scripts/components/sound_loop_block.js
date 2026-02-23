export class SoundLoopBlock {
    onTick(e, arg) {
        const bl = e.block;
        const dim = e.dimension;
        const sid = arg.params.sound;
        const v = arg.params.volume;

        const pos = {
            x: bl.location.x + 0.5,
            y: bl.location.y,
            z: bl.location.z + 0.5
        }

        dim.playSound(sid, pos, {volume: v});
    }
}