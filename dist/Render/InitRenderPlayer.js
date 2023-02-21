import { RenderPlayer } from "./RenderPlayer.js";
import { PlayerManager } from "../Data/PlayerManager.js";
import { PlayerStatsData } from "../Data/PlayerStatsData.js";
import { PlayerPhysicsData } from "../Data/PlayerPhysicsData.js";
import { SetUpControls } from "../Controls/SetUpControls.js";
import { DVEPBabylonSystem } from "./System/Babylon.js";
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
export async function INIT_RENDER_PLAYER(scene, camera, DVER, system, playerModel) {
    DVEPBabylonSystem.$INIT(DVER, system);
    await SetUpPlayerData(DVER);
    PlayerManager.physics.eyeLevel = 0.7;
    playerModel.isVisible = false;
    //move camera to player's eye level
    camera.position.y = PlayerManager.physics.eyeLevel;
    camera.inputs.removeByType("FreeCameraKeyboardMoveInput");
    camera.minZ = .01;
    //set up camera
    const camNode = new DVEPBabylonSystem.DVERSystem.TransformNode("camnode", scene);
    camera.parent = camNode;
    camNode.parent = playerModel;
    //set up floating origin
    const oriign = new DVEPBabylonSystem.DVERSystem.Vector3();
    scene.onBeforeActiveMeshesEvaluationObservable.add(() => {
        oriign.x = PlayerManager.physics.position.x;
        oriign.y = PlayerManager.physics.position.y;
        oriign.z = PlayerManager.physics.position.z;
    });
    DVER.render.fo.setOriginCenter(scene, { position: oriign });
    const renderPlayer = new RenderPlayer(PlayerManager, {
        model: playerModel,
        camNode: camNode,
        camera: camera,
        scene: scene
    });
    SetUpControls(DVER, renderPlayer);
    scene.registerBeforeRender(() => {
        renderPlayer.render();
    });
    return renderPlayer;
}
