import type { TagManagerBase } from "divine-binary-tags";
import type { RemoteTagManagerInitData } from "divine-binary-tags";
import { RemoteTagManager } from "divine-binary-tags";
export declare const PlayerPhysicsStatesValues: {
    still: number;
    secondaryStill: number;
    walkingForward: number;
    walkingBackward: number;
    walkingLeft: number;
    walkingRight: number;
};
export declare const PlayerPhysicsTagIDs: {
    header: string;
    position: string;
    pickPosition: string;
    pickNormals: string;
    direction: string;
    sideDirection: string;
    rotation: string;
    eyeLevel: string;
    states: {
        movement: string;
        secondaryMovement: string;
        jumping: string;
        running: string;
        onGround: string;
        inWater: string;
    };
};
export declare const PlayerPhysicsTags: RemoteTagManager;
declare class DBTVec3 {
    tagId: string;
    parent: {
        tags: TagManagerBase;
    };
    constructor(tagId: string, parent?: {
        tags: TagManagerBase;
    });
    set(x: number, y: number, z: number): void;
    get x(): number;
    set x(v: number);
    get y(): number;
    set y(v: number);
    get z(): number;
    set z(v: number);
    getAsArray(): [x: number, y: number, z: number];
}
export declare class PlayerPhysicsData {
    tags: RemoteTagManager;
    constructor(buffer: SharedArrayBuffer, initData: RemoteTagManagerInitData);
    position: DBTVec3;
    pick: {
        _s: PlayerPhysicsData;
        normal: DBTVec3;
        position: DBTVec3;
        getPlacePosition(): [x: number, y: number, z: number];
        getPlaceVec3(): {
            x: number;
            y: number;
            z: number;
        };
    };
    direction: DBTVec3;
    sideDirection: DBTVec3;
    rotation: DBTVec3;
    states: {
        _s: PlayerPhysicsData;
        movement: number;
        secondaryMovement: number;
        jumping: number;
        running: number;
        onGround: boolean;
        inWater: boolean;
    };
    get eyeLevel(): number;
    set eyeLevel(v: number);
    nowIs: {
        _s: PlayerPhysicsData;
        still(): void;
        walkingForward(v?: boolean): void;
        walkingBackward(v?: boolean): void;
        walkingLeft(v?: boolean): void;
        walkingRight(v?: boolean): void;
        jumping(v?: boolean): void;
        running(v?: boolean): void;
    };
    is: {
        _s: PlayerPhysicsData;
        readonly walking: number | boolean;
        readonly running: number;
        readonly onGround: boolean;
        readonly inWater: boolean;
    };
}
export {};
