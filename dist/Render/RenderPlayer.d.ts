import type { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import type { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import type { Scene } from "@babylonjs/core/scene";
import { ControlManager } from "../Controls/ControlManager.js";
import { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera.js";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";
import { PlayerManager } from "../Data/PlayerManager.js";
declare type PlayerRenderNodes = {
    model: Mesh;
    camera: UniversalCamera;
    camNode: TransformNode;
    scene: Scene;
};
export declare class RenderPlayer {
    manager: typeof PlayerManager;
    nodes: PlayerRenderNodes;
    settings: {
        doWalkEffect: boolean;
    };
    maanger: typeof PlayerManager;
    controls: ControlManager;
    __Vec3: typeof Vector3;
    direction: Vector3;
    sideDirection: Vector3;
    xzd: Vector3;
    cameraRotation: Vector3;
    constructor(manager: typeof PlayerManager, nodes: PlayerRenderNodes);
    render(): void;
}
export {};
