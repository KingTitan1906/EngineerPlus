import { PrePosType } from "./enums";

const PrePos4 = {
    north: {
        north: "toggle:con_north",
        south: "toggle:con_south",
        west: "toggle:con_west",
        east: "toggle:con_east"
    },
    south: {
        north: "toggle:con_south",
        south: "toggle:con_north",
        west: "toggle:con_east",
        east: "toggle:con_west"
    },
    west: {
        north: "toggle:con_east",
        south: "toggle:con_west",
        west: "toggle:con_north",
        east: "toggle:con_south"
    },
    east: {
        north: "toggle:con_west",
        south: "toggle:con_east",
        west: "toggle:con_south",
        east: "toggle:con_north"
    }
}

export function setConnectionPreset(face, prePosType) {
    if (prePosType == PrePosType.NSWE) {
        if (face == "north") return PrePos4.north;
        if (face == "south") return PrePos4.south;
        if (face == "west") return PrePos4.west;
        if (face == "east") return PrePos4.east;
    }
}