import type { DivineVoxelEngineRender } from "divine-voxel-engine/Render";
import { Scene } from "@babylonjs/core/scene";
import { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera";
export declare const GetPlayerPickCube: (DVER: DivineVoxelEngineRender, camera: UniversalCamera, scene: Scene) => {
    cube: import("@babylonjs/core").Mesh;
    setPickNormals: () => void;
};
