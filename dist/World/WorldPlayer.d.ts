import type { DivineVoxelEngineWorld } from "divine-voxel-engine/World/index.js";
import type { DataTool } from "divine-voxel-engine/Tools/Data/DataTool.js";
import type { PlayerManager } from "../Data/PlayerManager.js";
export declare class WorldPlayer {
    DVEW: DivineVoxelEngineWorld;
    manager: typeof PlayerManager;
    start: {
        x: number;
        y: number;
        z: number;
    };
    end: {
        x: number;
        y: number;
        z: number;
    };
    reachDistance: number;
    dataTool: DataTool;
    constructor(DVEW: DivineVoxelEngineWorld, manager: typeof PlayerManager);
    update(): void;
}
