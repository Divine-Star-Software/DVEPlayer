import type { DivineVoxelEngineRender } from "divine-voxel-engine/Render";
import { RenderPlayer } from "./RenderPlayer.js";
export declare const GetPlayerPickCube: (DVER: DivineVoxelEngineRender, player: RenderPlayer) => {
    cube: import("@babylonjs/core").Mesh;
    setPickNormals: () => void;
};
