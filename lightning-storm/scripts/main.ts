import {
  world,
  system,
  Player,
  Vector3,
  Entity,
  ItemStack,
  EntityInventoryComponent,
  EntityComponentTypes
} from "@minecraft/server";


let tickCount: number = 0;

const rainbowBlocks: string[] = [
  "minecraft:red_concrete",
  "minecraft:orange_concrete",
  "minecraft:yellow_concrete",
  "minecraft:lime_concrete",
  "minecraft:light_blue_concrete",
  "minecraft:blue_concrete",
  "minecraft:purple_concrete"
];

function getPlayerMainHandItem(player: Player): ItemStack | undefined | null {
  const inventory: EntityInventoryComponent = player.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
  if (!inventory || !inventory.container) return null;
  const heldItem: ItemStack | undefined = inventory.container.getItem(player.selectedSlotIndex);

  return heldItem;
}

/**
 * @brief The tick function runs repeatedly in the game loop.
 * 
 * @returns Void
 */
function tick(): void {
  tickCount++;

  if (tickCount % 1 === 0) {
    const players: Player[] = world.getPlayers();

    for (const player of players) {
      if (getPlayerMainHandItem(player)?.typeId === "minecraft:brush") {
        const playerPosition: Vector3 = player.location;
        const blockPosition: Vector3 = {
          x: Math.floor(playerPosition.x),
          y: Math.floor(playerPosition.y) - 1,
          z: Math.floor(playerPosition.z)
        };

        const blockType: string = rainbowBlocks[tickCount % rainbowBlocks.length];
        player.dimension.setBlockType(blockPosition, blockType);
      }
    }
  }

  system.run(tick);
  return;
}

system.run(tick);
