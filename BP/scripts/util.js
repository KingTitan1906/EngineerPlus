import { BlockTypes } from "@minecraft/server";
import { Vector3 } from "./classes/Vector3";

export function isItemBlock(item) {
    if (BlockTypes.get(item.typeId) == undefined) return false;
    else return true;
}

export function calculateDistanceInVector3(vec1, vec2) {
    let x = 0;
    let y = 0;
    let z = 0;
    x = (Math.max(vec1.x, vec2.x)) - (Math.min(vec1.x, vec2.x));
    y = (Math.max(vec1.y, vec2.y)) - (Math.min(vec1.y, vec2.y));
    z = (Math.max(vec1.z, vec2.z)) - (Math.min(vec1.z, vec2.z));

    return new Vector3(x, y, z);
}
export function calculateDistance(vec) {
    if (vec.x >= -1 && vec.x <= 1) return Math.sqrt(Math.abs(vec.y**vec.z));
    else if (vec.y >= -1 && vec.y <= 1) return Math.sqrt(Math.abs(vec.x**vec.z));
    else if (vec.z >= -1 && vec.z <= 1) return Math.sqrt(Math.abs(vec.z**vec.y));
    else return Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
}