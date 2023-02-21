import { PlayerPhysicsData } from "../Data/PlayerPhysicsData.js";
import { DivineVoxelEngineWorld } from "divine-voxel-engine/World";
export declare const WorldPlayer: {
    manager: {
        currentDimension: string;
        physics: PlayerPhysicsData;
        stats: import("../index.js").PlayerStatsData;
        $INIt(data: any[]): void;
    };
    playerDataBuffer: SharedArrayBuffer;
    data: DataView;
    position: Float32Array;
    onAdd: ((raw: number[], x: number, y: number, z: number) => void)[];
    onRemove: ((x: number, y: number, z: number) => void)[];
    onExplode: ((x: number, y: number, z: number, radius: number) => void)[];
    onUpdate: (() => void)[];
    dimension: string;
    getDimension(): string;
    update(): void;
};
export declare const GetWorldPlayer: (DVEW: DivineVoxelEngineWorld) => Promise<{
    manager: {
        currentDimension: string;
        physics: PlayerPhysicsData;
        stats: import("../index.js").PlayerStatsData;
        $INIt(data: any[]): void;
    };
    playerDataBuffer: SharedArrayBuffer;
    data: DataView;
    position: Float32Array;
    onAdd: ((raw: number[], x: number, y: number, z: number) => void)[];
    onRemove: ((x: number, y: number, z: number) => void)[];
    onExplode: ((x: number, y: number, z: number, radius: number) => void)[];
    onUpdate: (() => void)[];
    dimension: string;
    getDimension(): string;
    update(): void;
}>;
