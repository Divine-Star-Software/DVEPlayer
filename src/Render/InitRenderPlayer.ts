import type { DivineVoxelEngineRender } from "divine-voxel-engine/Render";
import type { Scene } from "@babylonjs/core/scene";
import type { Mesh } from "@babylonjs/core/Meshes/mesh";
import type { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera";

import { RenderPlayer } from "./RenderPlayer.js";
import { PlayerManager } from "../Data/PlayerManager.js";
import { PlayerStatsData } from "../Data/PlayerStatsData.js";
import { PlayerPhysicsData } from "../Data/PlayerPhysicsData.js";
import { SetUpControls } from "../Controls/SetUpControls.js";
import { DVEPBabylonSystem, DVEPlayerBabylonSystem } from "./System/Babylon.js";

async function SetUpPlayerData(DVER: DivineVoxelEngineRender) {
  let playerDataReady = false;
  let playerStats: PlayerStatsData;
  DVER.nexusComm.listenForMessage("connect-player-tags", (data: any[]) => {
    playerStats = new PlayerStatsData(data[3], data[4]);
    PlayerManager.stats = playerStats;
    PlayerManager.physics = new PlayerPhysicsData(data[1], data[2]);
    playerDataReady = true;
  });

  (window as any).data = PlayerPhysicsData;
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

export async function INIT_RENDER_PLAYER(
  scene: Scene,
  camera: UniversalCamera,
  DVER: DivineVoxelEngineRender,
  system: DVEPlayerBabylonSystem,
  playerModel: Mesh
) {
  DVEPBabylonSystem.$INIT(DVER, system);
  await SetUpPlayerData(DVER);

  PlayerManager.physics.eyeLevel = 0.7;

  playerModel.isVisible = false;
  //move camera to player's eye level
  camera.position.y = PlayerManager.physics.eyeLevel;
  camera.inputs.removeByType("FreeCameraKeyboardMoveInput");

  camera.minZ = .01;
  //set up camera
  const camNode = new DVEPBabylonSystem.DVERSystem.TransformNode(
    "camnode",
    scene as any
  );
  (camera as any).parent = camNode;
  camNode.parent = playerModel;

  //set up floating origin
  const oriign = new DVEPBabylonSystem.DVERSystem.Vector3();
  scene.onBeforeActiveMeshesEvaluationObservable.add(() => {
    oriign.x = PlayerManager.physics.position.x;
    oriign.y = PlayerManager.physics.position.y;
    oriign.z = PlayerManager.physics.position.z;
  });
  DVER.render.fo.setOriginCenter(scene as any, { position: oriign as any });

  const renderPlayer = new RenderPlayer(PlayerManager, {
    model: playerModel,
    camNode: camNode,
    camera: camera ,
    scene : scene
  });

  SetUpControls(DVER,renderPlayer);

  scene.registerBeforeRender(() => {
    renderPlayer.render();
  });

  return renderPlayer;
}
