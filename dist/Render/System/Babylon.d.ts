import type { DivineVoxelEngineRender } from "divine-voxel-engine/Render";
import type { CreateBox } from "@babylonjs/core/Meshes/Builders/boxBuilder.js";
import type { EdgesRenderer } from "@babylonjs/core/Rendering/edgesRenderer.js";
import type { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial.js";
import type { DVEBabylonSystem } from "divine-voxel-engine/Render/Babylon/DVEBabylon";
export declare type DVEPlayerBabylonSystem = {
    StandardMaterial: typeof StandardMaterial;
    CreateBox: typeof CreateBox;
    EdgesRenderer: typeof EdgesRenderer;
};
export declare const DVEPBabylonSystem: {
    DVERSystem: DVEBabylonSystem;
    system: DVEPlayerBabylonSystem;
    $INIT(DVER: DivineVoxelEngineRender, system: DVEPlayerBabylonSystem): void;
};
