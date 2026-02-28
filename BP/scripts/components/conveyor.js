import { checkEntityInArea } from "./help/functions";

const AreaChecking = {
    north: {
        north: {
            min: {x: 0.25, y: 0.12, z: -0.25},
            max: {x: 0.75, y: 0.25, z: 0.75}
        },
        south: {
            min: {x: 0.25, y: 0.12, z: 0.75},
            max: {x: 0.75, y: 0.25, z: 1.0}
        },
        west: {
            min: {x: 0.0, y: 0.12, z: 0.25},
            max: {x: 0.25, y: 0.25, z: 0.75}
        },
        east: {
            min: {x: 0.75, y: 0.12, z: 0.25},
            max: {x: 1.0, y: 0.25, z: 0.75}
        }
    },
    south: {
        north: {
            min: {x: 0.25, y: 0.12, z: 0.25},
            max: {x: 0.75, y: 0.25, z: 1.25}
        },
        south: {
            min: {x: 0.25, y: 0.12, z: 0.0},
            max: {x: 0.75, y: 0.25, z: 0.25}
        },
        west: {
            min: {x: 0.75, y: 0.12, z: 0.25},
            max: {x: 1.0, y: 0.25, z: 0.75}
        },
        east: {
            min: {x: 0.0, y: 0.12, z: 0.25},
            max: {x: 0.25, y: 0.25, z: 0.75}
        }
    },
    west: {
        north: {
            min: {x: -0.25, y: 0.12, z: 0.25},
            max: {x: 0.75, y: 0.25, z: 0.75}
        },
        south: {
            min: {x: 0.75, y: 0.12, z: 0.25},
            max: {x: 1.0, y: 0.25, z: 0.75}
        },
        west: {
            min: {x: 0.25, y: 0.12, z: 0.75},
            max: {x: 0.75, y: 0.25, z: 1.0}
        },
        east: {
            min: {x: 0.25, y: 0.12, z: 0.0},
            max: {x: 0.75, y: 0.25, z: 0.25}
        }
    },
    east: {
        north: {
            min: {x: 0.25, y: 0.12, z: 0.25},
            max: {x: 1.25, y: 0.25, z: 0.75}
        },
        south: {
            min: {x: 0.0, y: 0.12, z: 0.25},
            max: {x: 0.25, y: 0.25, z: 0.75}
        },
        west: {
            min: {x: 0.25, y: 0.12, z: 0.0},
            max: {x: 0.75, y: 0.25, z: 0.25}
        },
        east: {
            min: {x: 0.25, y: 0.12, z: 0.75},
            max: {x: 0.75, y: 0.25, z: 1.0}
        }
    }
}

function setAreaCheckingPreset(face) {
    if (face == "north") return AreaChecking.north;
    if (face == "south") return AreaChecking.south;
    if (face == "west") return AreaChecking.west;
    if (face == "east") return AreaChecking.east;

    return AreaChecking.north;
}

export class Conveyor {
    onTick(e, arg) {
        const bl = e.block;
        const dim = e.dimension;
        let perm = bl.permutation;
        const face = perm.getState("minecraft:cardinal_direction");
        const power = arg.params.power;
        const pos = bl.location;

        const area = setAreaCheckingPreset(face);

        const con_north = perm.getState("toggle:con_north");
        const con_south = perm.getState("toggle:con_south");
        const con_west = perm.getState("toggle:con_west");
        const con_east = perm.getState("toggle:con_east");
        const ents = dim.getEntities();

        const can = {
            min: {x: pos.x + area.north.min.x, y: pos.y + area.north.min.y, z: pos.z + area.north.min.z},
            max: {x: pos.x + area.north.max.x, y: pos.y + area.north.max.y, z: pos.z + area.north.max.z}
        }
        const cas = {
            min: {x: pos.x + area.south.min.x, y: pos.y + area.south.min.y, z: pos.z + area.south.min.z},
            max: {x: pos.x + area.south.max.x, y: pos.y + area.south.max.y, z: pos.z + area.south.max.z}
        }
        const caw = {
            min: {x: pos.x + area.west.min.x, y: pos.y + area.west.min.y, z: pos.z + area.west.min.z},
            max: {x: pos.x + area.west.max.x, y: pos.y + area.west.max.y, z: pos.z + area.west.max.z}
        }
        const cae = {
            min: {x: pos.x + area.east.min.x, y: pos.y + area.east.min.y, z: pos.z + area.east.min.z},
            max: {x: pos.x + area.east.max.x, y: pos.y + area.east.max.y, z: pos.z + area.east.max.z}
        }

        for (let i = 0; i < ents.length; i++) {
            const ent = ents[i];

            if (face == "north") {
                if (con_north && checkEntityInArea(ent, can)) ent.applyImpulse({x:0, y:0, z:-power});
                if (con_south && checkEntityInArea(ent, cas)) ent.applyImpulse({x:0, y:0, z:-power});
                if (con_west && checkEntityInArea(ent, caw)) ent.applyImpulse({x:power, y:0, z:0});
                if (con_east && checkEntityInArea(ent, cae)) ent.applyImpulse({x:-power, y:0, z:0});
            }
            if (face == "south") {
                if (con_north && checkEntityInArea(ent, can)) ent.applyImpulse({x:0, y:0, z:power});
                if (con_south && checkEntityInArea(ent, cas)) ent.applyImpulse({x:0, y:0, z:power});
                if (con_west && checkEntityInArea(ent, caw)) ent.applyImpulse({x:-power, y:0, z:0});
                if (con_east && checkEntityInArea(ent, cae)) ent.applyImpulse({x:power, y:0, z:0});
            }
            if (face == "west") {
                if (con_north && checkEntityInArea(ent, can)) ent.applyImpulse({x:-power, y:0, z:0});
                if (con_south && checkEntityInArea(ent, cas)) ent.applyImpulse({x:-power, y:0, z:0});
                if (con_west && checkEntityInArea(ent, caw)) ent.applyImpulse({x:0, y:0, z:-power});
                if (con_east && checkEntityInArea(ent, cae)) ent.applyImpulse({x:0, y:0, z:power});
            }
            if (face == "east") {
                if (con_north && checkEntityInArea(ent, can)) ent.applyImpulse({x:power, y:0, z:0});
                if (con_south && checkEntityInArea(ent, cas)) ent.applyImpulse({x:power, y:0, z:0});
                if (con_west && checkEntityInArea(ent, caw)) ent.applyImpulse({x:0, y:0, z:power});
                if (con_east && checkEntityInArea(ent, cae)) ent.applyImpulse({x:0, y:0, z:-power});
            }

            // if (con_north) ent.applyImpulse({x:0, y:0, z:-power});
            // if (con_south) ent.applyImpulse({x:0, y:0, z:power});
            // if (con_west) ent.applyImpulse({x:-power, y:0, z:0});
            // if (con_east) ent.applyImpulse({x:power, y:0, z:0});
        }
    }
}