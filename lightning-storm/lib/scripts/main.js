import { world, system, EntityComponentTypes } from "@minecraft/server";
var tickCount = 0;
var rainbowBlocks = [
    "minecraft:red_concrete",
    "minecraft:orange_concrete",
    "minecraft:yellow_concrete",
    "minecraft:lime_concrete",
    "minecraft:light_blue_concrete",
    "minecraft:blue_concrete",
    "minecraft:purple_concrete"
];
function getPlayerMainHandItem(player) {
    var inventory = player.getComponent(EntityComponentTypes.Inventory);
    if (!inventory || !inventory.container)
        return null;
    var heldItem = inventory.container.getItem(player.selectedSlotIndex);
    return heldItem;
}
/**
 * @brief The tick function runs repeatedly in the game loop.
 *
 * @returns Void
 */
function tick() {
    var _a;
    tickCount++;
    if (tickCount % 1 === 0) {
        var players = world.getPlayers();
        for (var _i = 0, players_1 = players; _i < players_1.length; _i++) {
            var player = players_1[_i];
            if (((_a = getPlayerMainHandItem(player)) === null || _a === void 0 ? void 0 : _a.typeId) === "minecraft:brush") {
                var playerPosition = player.location;
                var blockPosition = {
                    x: Math.floor(playerPosition.x),
                    y: Math.floor(playerPosition.y) - 1,
                    z: Math.floor(playerPosition.z)
                };
                var blockType = rainbowBlocks[tickCount % rainbowBlocks.length];
                player.dimension.setBlockType(blockPosition, blockType);
            }
        }
    }
    system.run(tick);
    return;
}
system.run(tick);
//# sourceMappingURL=main.js.map