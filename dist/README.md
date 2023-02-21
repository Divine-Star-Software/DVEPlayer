<h1 align="center">
  DVE Player
</h1>

<p align="center">
<img src="https://divine-star-software.github.io/DigitalAssets/images/logo-small.png">
</p>

---

A player addon for DVE.

## Render Thread

```ts
import { CreateBox } from "@babylonjs/core/Meshes/Builders/boxBuilder.js";
import { EdgesRenderer } from "@babylonjs/core/Rendering/edgesRenderer.js";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial.js";
import { INIT_RENDER_PLAYER } from "dve-plugins-player/Render/";
import { DVEN } from "divine-voxel-engine/Render";
const player = await INIT_RENDER_PLAYER(
  scene,
  camera,
  DVER,
  {
    CreateBox,
    EdgesRenderer,
    StandardMaterial,
  },
  playerModel
);

player.controls.mouse.left.down.add(() => {
//add controls
});
player.controls.mouse.right.down.add(() => {
//add controls
});
```

## World Thread
```ts
import { DVEW } from "divine-voxel-engine/World";
import { INIT_WORLD_PLAYER } from "dve-plugins-player/World";
await DVEW.$INIT();
const player = await INIT_WORLD_PLAYER(DVEW);
setInterval(()=>{
    player.update();
},17)
```

## Nexus Thread

```ts
import { DVEN } from "divine-voxel-engine/Nexus";
import {INIT_NEXUS_PLAYER} from "dve-plugins-player/Nexus"
await DVEN.$INIT();
const player = await INIT_NEXUS_PLAYER(DVEN);
player.setPosition(0,200,0);
setInterval(()=>{
    player.update();
},17)
```


