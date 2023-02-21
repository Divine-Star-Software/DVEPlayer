import type { CollisionData } from "dve-plugins-physics/Types/";
import { EntityBase } from "dve-plugins-physics/Nexus/index.js";
import { Vector3 } from "divine-voxel-engine/Math/index.js";
import { PlayerPhysicsData } from "../Data/PlayerPhysicsData.js";
import { PlayerStatsData } from "../Data/PlayerStatsData.js";
export declare class NexusPlayer extends EntityBase {
    physics: PlayerPhysicsData;
    stats: PlayerStatsData;
    states: {
        cilmbingStair: boolean;
        inWater: boolean;
        onLadder: boolean;
        gravity: number;
        jumpMaxDefault: number;
    };
    msterialStandingOn: string;
    finalDirection: Vector3;
    sideDirection: Vector3;
    speed: number;
    runSpeed: number;
    hitBox: {
        w: number;
        h: number;
        d: number;
    };
    jumpStates: {
        count: number;
        max: number;
        jumping: boolean;
        canJump: boolean;
    };
    movementFunctions: Record<number, Function>;
    gravityAcceleration: number;
    constructor(physics: PlayerPhysicsData, stats: PlayerStatsData);
    $INIT(): void;
    controlsUpdate(): void;
    getSpeed(): number;
    beforeUpdate(): void;
    afterUpdate(): void;
    doCollision(colliderName: string, collisionData: CollisionData): void;
}
