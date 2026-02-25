import { system } from '@minecraft/server';

import { SoundLoopBlock } from './components/sound_loop_block';
import { ConnectionNSWEBlock } from './components/connection_nswe_block';

system.beforeEvents.startup.subscribe(init => {
    init.blockComponentRegistry.registerCustomComponent("engineerplus:sound_loop_block", new SoundLoopBlock());
    init.blockComponentRegistry.registerCustomComponent("engineerplus:connection4_block", new ConnectionNSWEBlock());
});