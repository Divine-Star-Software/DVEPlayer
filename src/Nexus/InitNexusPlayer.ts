import { PlayerManager } from "../Data/PlayerManager.js";
import { PlayerPhysicsData } from "../Data/PlayerPhysicsData.js";
import { PlayerStatsData } from "../Data/PlayerStatsData.js";
import { $RegisterPlayerData } from "../Data/RegisterPlayerData.js";
import { DivineVoxelEngineNexus } from "divine-voxel-engine/Nexus";
import { NexusPlayer } from "./NexusPlayer.js";
async function SetUpPlayerData(DVEN: DivineVoxelEngineNexus) {
  const { playerPhysicsTagManager, playerStatesTagManger } =
    $RegisterPlayerData();
  const physicsRemoteData = playerPhysicsTagManager.initData;
  const playePhysicsrDataSAB = new SharedArrayBuffer(
    physicsRemoteData.bufferSize
  );
  playerPhysicsTagManager.setBuffer(playePhysicsrDataSAB);
  PlayerManager.physics = new PlayerPhysicsData(
    playePhysicsrDataSAB,
    physicsRemoteData
  );

  const statsRemoteData = playerStatesTagManger.initData;
  const playeStatsDataSAB = new SharedArrayBuffer(physicsRemoteData.bufferSize);
  playerPhysicsTagManager.setBuffer(playePhysicsrDataSAB);
  PlayerManager.stats = new PlayerStatsData(playeStatsDataSAB, statsRemoteData);
  let renderReady = false;
  let worldReady = false;
  DVEN.parentComm.listenForMessage("request-player-tags", (data) => {
    DVEN.parentComm.sendMessage("connect-player-tags", [
      playePhysicsrDataSAB,
      physicsRemoteData,
      playeStatsDataSAB,
      statsRemoteData,
    ]);
    renderReady = true;
  });
  DVEN.worldComm.listenForMessage("request-player-tags", (data) => {
    DVEN.worldComm.sendMessage("connect-player-tags", [
      playePhysicsrDataSAB,
      physicsRemoteData,
      playeStatsDataSAB,
      statsRemoteData,
    ]);
    worldReady = true;
  });


  await DVEN.UTIL.createPromiseCheck({
    checkInterval: 1,
    check: () => {

      return renderReady && worldReady;
    },
  });
}

export const INIT_NEXUS_PLAYER = async (DVEN: DivineVoxelEngineNexus) => {
  await SetUpPlayerData(DVEN);
  const player = new NexusPlayer(PlayerManager.physics, PlayerManager.stats);
  return player;
};
