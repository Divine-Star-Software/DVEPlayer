import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
declare type PlayerRenderNodes = {
    model: Mesh;
    camera: UniversalCamera;
    camNode: TransformNode;
};
export declare const RenderPlayer: {
    settings: {
        doWalkEffect: boolean;
    };
    maanger: {
        currentDimension: string;
        physics: import("../Data/PlayerPhysicsData.js").PlayerPhysicsData;
        stats: import("../Data/PlayerStatsData.js").PlayerStatsData;
        $INIt(data: any[]): void;
    };
    nodes: PlayerRenderNodes;
    direction: Vector3;
    sideDirection: Vector3;
    xzd: Vector3;
    cameraRotation: Vector3;
    $INIT(nodes: PlayerRenderNodes): void;
    render(): void;
};
export {};
