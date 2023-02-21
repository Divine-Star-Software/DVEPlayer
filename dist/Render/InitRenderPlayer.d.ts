import type { DivineVoxelEngineRender } from "divine-voxel-engine/Render";
import type { Scene } from "@babylonjs/core/scene";
import type { Mesh } from "@babylonjs/core/Meshes/mesh";
import type { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera";
import { RenderPlayer } from "./RenderPlayer.js";
import { DVEPlayerBabylonSystem } from "./System/Babylon.js";
export declare function INIT_RENDER_PLAYER(scene: Scene, camera: UniversalCamera, DVER: DivineVoxelEngineRender, system: DVEPlayerBabylonSystem, playerModel: Mesh): Promise<RenderPlayer>;
