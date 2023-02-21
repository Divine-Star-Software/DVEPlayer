import { PlayerManager } from "../Data/PlayerManager.js";
import { DVEPBabylonSystem } from "./System/Babylon.js";
/*
PICK CUBE
*/
export const GetPlayerPickCube = (DVER, player) => {
    const cubeMaterial = new DVEPBabylonSystem.system.StandardMaterial("picker-cube");
    cubeMaterial.diffuseColor = new DVEPBabylonSystem.DVERSystem.Color3(0.2, 0.2, 0.2);
    cubeMaterial.alpha = 0.3;
    const cube = DVEPBabylonSystem.system.CreateBox("playerblockdisplay", {
        size: 1.1,
    });
    cube.isPickable = true;
    cube.material = cubeMaterial;
    cube.parent = DVER.render.fo.activeNode;
    cube.enableEdgesRendering();
    cube.edgesWidth = 0.3;
    cube.edgesColor.set(0, 0, 0, 0.8);
    cube.convertToFlatShadedMesh();
    cube.updateFacetData();
    const cameraPickPostion = new DVEPBabylonSystem.DVERSystem.Vector3();
    cameraPickPostion.y = PlayerManager.physics.eyeLevel;
    const setPickNormals = () => {
        const camPick = player.nodes.scene.pickWithRay(player.nodes.camera.getForwardRay(10, undefined, cameraPickPostion));
        if (!camPick ||
            !camPick.hit ||
            !camPick.pickedMesh ||
            camPick.faceId === undefined)
            return;
        let normal = camPick.pickedMesh.getFacetNormal(camPick.faceId);
        PlayerManager.physics.pick.normal.x = normal.x;
        PlayerManager.physics.pick.normal.y = normal.y;
        PlayerManager.physics.pick.normal.z = normal.z;
    };
    player.nodes.scene.registerBeforeRender(() => {
        cube.position.x = PlayerManager.physics.pick.position.x + 0.5;
        cube.position.y = PlayerManager.physics.pick.position.y + 0.5;
        cube.position.z = PlayerManager.physics.pick.position.z + 0.5;
    });
    return { cube, setPickNormals };
};
