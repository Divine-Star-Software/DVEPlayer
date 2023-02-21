import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { RenderPlayer } from "./RenderPlayer.js";
import { PlayerManager } from "../Data/PlayerManager.js";
import { PlayerStatsData } from "../Data/PlayerStatsData.js";
import { PlayerPhysicsData } from "../Data/PlayerPhysicsData.js";
import { SetUpControls } from "../Controls/SetUpControls.js";
async function SetUpPlayerData(DVER) {
    let playerDataReady = false;
    let playerStats;
    DVER.nexusComm.listenForMessage("connect-player-tags", (data) => {
        playerStats = new PlayerStatsData(data[3], data[4]);
        PlayerManager.stats = playerStats;
        PlayerManager.physics = new PlayerPhysicsData(data[1], data[2]);
        playerDataReady = true;
    });
    window.data = PlayerPhysicsData;
    await DVER.UTIL.createPromiseCheck({
        check: () => {
            if (!playerDataReady) {
                DVER.nexusComm.sendMessage("request-player-tags", []);
            }
            return playerDataReady;
        },
        checkInterval: 1,
    });
    //@ts-ignore
    return { playerStats };
}
const GetPlayerModel = (scene) => {
    return new Promise((resolve, reject) => {
        resolve(MeshBuilder.CreateBox("", { width: 1, height: 2 }, scene));
        /*     SceneLoader.ImportMesh(
          null,
          "assets/player/",
          "chartest.babylon",
          scene,
          (assets) => {
            const mesh = assets[0];
            const texture = new Texture("assets/player/playertexture.png");
            texture.onLoadObservable.add(() => {
              texture.updateSamplingMode(1);
            });
            const mat = new StandardMaterial("player-mat");
            mat.backFaceCulling = false;
            mat.diffuseTexture = texture;
            mesh.material = mat;
            mesh.isPickable = false;
            resolve(mesh as any);
          }
        );
     */
    });
};
export async function $INIT_Player(scene, camera, DVER) {
    await SetUpPlayerData(DVER);
    PlayerManager.physics.eyeLevel = 0.7;
    //move camera to player's eye level
    camera.position.y = PlayerManager.physics.eyeLevel;
    camera.inputs.removeByType("FreeCameraKeyboardMoveInput");
    //set up model
    const playerModel = await GetPlayerModel(scene);
    playerModel.isVisible = false;
    //set up camera
    const camNode = new TransformNode("camnode", scene);
    camera.parent = camNode;
    camNode.parent = playerModel;
    //set up floating origin
    const oriign = new Vector3();
    scene.onBeforeActiveMeshesEvaluationObservable.add(() => {
        oriign.x = PlayerManager.physics.position.x;
        oriign.y = PlayerManager.physics.position.y;
        oriign.z = PlayerManager.physics.position.z;
    });
    DVER.render.fo.setOriginCenter(scene, { position: oriign });
    RenderPlayer.$INIT({
        model: playerModel,
        camNode: camNode,
        camera: camera,
    });
    SetUpControls(DVER, camera, scene);
    scene.registerBeforeRender(() => {
        RenderPlayer.render();
    });
}
