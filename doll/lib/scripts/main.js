import { world, system, Player, } from "@minecraft/server";
// Constants
var TPS = 20;
var MAX_RAYCAST_DISTANCE = 256;
var STORM_COUNTDOWN_SECONDS = 5;
var LIGHTNING_RADIUS = 10;
var TICKS_PER_LIGHTNING = 4 + Math.random() * 6;
var STORM_DURATION_SECONDS = 16;
var EXPLOSION_POWER = 4;
var AActor = /** @class */ (function () {
    /**
     * @brief Constructor that initializes the actor and starts the ticking process.
     */
    function AActor() {
        var _this = this;
        this.lastTickTime = Date.now();
        this.currentTime = 0;
        this.deltaTime = 0;
        this.beginPlay();
        system.runInterval(function () {
            _this.currentTime = Date.now();
            _this.deltaTime = (_this.currentTime - _this.lastTickTime) / 1000; // Calculate deltaTime in seconds
            _this.lastTickTime = _this.currentTime;
            _this.tick(_this.deltaTime);
        }, 1);
    }
    /**
     * @brief Called once when the actor is first spawned or when the system starts.
     */
    AActor.prototype.beginPlay = function () {
        // Initialization logic for the actor, executed once when the actor is spawned
    };
    /**
     * @brief Called on each tick of the actor's update cycle.
     *
     * @param deltaTime Time in seconds since the last tick.
     */
    AActor.prototype.tick = function (deltaTime) {
        // Logic to be executed every tick, with deltaTime representing the time difference since the last tick.
    };
    return AActor;
}());
export { AActor };
var ALightningStorm = /** @class */ (function (_super) {
    __extends(ALightningStorm, _super);
    function ALightningStorm() {
        var _this = _super.call(this) || this;
        _this.players = [];
        _this.currentSeconds = 0;
        _this.currentDeltaTime = 0;
        return _this;
    }
    ALightningStorm.prototype.beginPlay = function () {
        _super.prototype.beginPlay.call(this);
        return;
    };
    ALightningStorm.prototype.tick = function (deltaTime) {
        _super.prototype.tick.call(this, deltaTime);
        this.currentDeltaTime = deltaTime;
        return;
    };
    /**
     * @brief Finds all valid surface blocks within the spherical radius
     *
     * @param dimension The dimension in which the search is performed.
     * @param center The center position of the sphere.
     * @param radius The radius of the sphere.
     *
     * @return An array of valid surface block positions (Vector3) within the spherical radius.
     */
    ALightningStorm.prototype.findSurfaceBlocksInSphere = function (dimension, center, radius) {
        var validPositions = [];
        for (var x = -radius; x <= radius; x++) {
            for (var y = -radius; y <= radius; y++) {
                for (var z = -radius; z <= radius; z++) {
                    // const distance: number = Math.sqrt(x * x + y * y + z * z);
                    if (Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2) <= Math.pow(radius, 2)) {
                        var targetPosition = {
                            x: center.x + x,
                            y: center.y + y,
                            z: center.z + z,
                        };
                        var aboveBlock = dimension.getBlock({
                            x: targetPosition.x,
                            y: targetPosition.y + 1,
                            z: targetPosition.z,
                        });
                        var block = dimension.getBlock(targetPosition);
                        if (block && aboveBlock && !block.isLiquid && !block.isAir && (aboveBlock.isAir || aboveBlock.isLiquid)) {
                            validPositions.push({
                                x: targetPosition.x,
                                y: targetPosition.y + 1,
                                z: targetPosition.z,
                            });
                        }
                    }
                }
            }
        }
        return validPositions;
    };
    /**
     * Summons a lightning storm at the given location
     */
    ALightningStorm.prototype.summonLightningStorm = function (player, location, power) {
        var explosionOptions = {
            allowUnderwater: true,
            causesFire: true,
            source: player,
        };
        var spawnLocation = {
            x: location.x + 0.0001,
            y: location.y + 1.0,
            z: location.z + 0.0001,
        };
        system.run(function () {
            try {
                player.runCommandAsync("summon lightning_bolt ".concat(spawnLocation.x, " ").concat(spawnLocation.y, " ").concat(spawnLocation.z));
                player.dimension.createExplosion(spawnLocation, power, explosionOptions);
                player.runCommandAsync("camerashake add @s 1.0 0.05 positional");
            }
            catch (error) {
                if (error instanceof Error) {
                    player.sendMessage("Nucleon Error >> ".concat(error.message));
                }
                else {
                    player.sendMessage("Unexpected error: ".concat(String(error)));
                }
            }
        });
        return true;
    };
    /**
     * Spawns lightning randomly within the specified spherical radius
     */
    ALightningStorm.prototype.spawnRandomLightning = function (player, centralLocation, radius, power) {
        var validPositions = this.findSurfaceBlocksInSphere(player.dimension, centralLocation, radius);
        if (validPositions.length >= 1) {
            var randomIndex = Math.floor(Math.random() * validPositions.length);
            var lightningEventLocation = validPositions[randomIndex];
            this.summonLightningStorm(player, {
                x: lightningEventLocation.x,
                y: lightningEventLocation.y - 1,
                z: lightningEventLocation.z,
            }, power);
            return true;
        }
        return false;
    };
    /**
     * Starts a countdown leading to a lightning storm
     */
    ALightningStorm.prototype.initiateCountdownStorm = function (player, centralLocation, power, countdownSeconds) {
        var _this = this;
        var remainingTime = countdownSeconds;
        player.onScreenDisplay.setTitle("§l§eWARNING", {
            stayDuration: TPS * (countdownSeconds + 1),
            fadeInDuration: 2,
            fadeOutDuration: 4,
            subtitle: "Lightning Storm Created",
        });
        player.onScreenDisplay.setActionBar("\u00A7l\u00A7cRemaining Time: ".concat(countdownSeconds, "s"));
        // The lightning storm logic
        var stormCountdownInterval = system.runInterval(function () {
            remainingTime--;
            player.onScreenDisplay.setActionBar("\u00A7l\u00A7cRemaining Time: ".concat(remainingTime, "s"));
            if (remainingTime <= 0) {
                system.clearRun(stormCountdownInterval);
                var isLightningSuccess_1 = true;
                var isStormTimeout_1 = false;
                system.runTimeout(function () {
                    isStormTimeout_1 = true;
                }, STORM_DURATION_SECONDS * TPS);
                var stormInterval_1 = system.runInterval(function () {
                    isLightningSuccess_1 = _this.spawnRandomLightning(player, centralLocation, LIGHTNING_RADIUS, power);
                }, TICKS_PER_LIGHTNING);
                var endLightningStorm_1 = system.runInterval(function () {
                    if (!isLightningSuccess_1 || isStormTimeout_1) {
                        system.clearRun(endLightningStorm_1);
                        system.clearRun(stormInterval_1);
                        player.onScreenDisplay.setActionBar("§l§aLightning Storm Ended");
                    }
                }, 1);
                player.onScreenDisplay.setActionBar("§l§eLightning Storm Started");
            }
        }, TPS);
        return true;
    };
    return ALightningStorm;
}(AActor));
var ItemEventHandler = /** @class */ (function (_super) {
    __extends(ItemEventHandler, _super);
    function ItemEventHandler() {
        return _super.call(this) || this;
    }
    ItemEventHandler.prototype.beginPlay = function () {
        _super.prototype.beginPlay.call(this);
        if (!(this.lightningStorm instanceof ALightningStorm)) {
            this.lightningStorm = new ALightningStorm();
        }
        this.registerEvents();
        return;
    };
    ItemEventHandler.prototype.registerEvents = function () {
        var _this = this;
        world.afterEvents.itemUse.subscribe(function (event) { return _this.handleItemUseAfter(event); });
        world.beforeEvents.itemUse.subscribe(function (event) { return _this.handleItemUseBefore(event); });
    };
    /**
     * Handles logic when an item is used after the event
     */
    ItemEventHandler.prototype.handleItemUseAfter = function (event) {
        var _a;
        var player = event.source;
        if (event.itemStack.typeId === "minecraft:spyglass" && !player.isSneaking) {
            system.run(function () {
                player.onScreenDisplay.setActionBar("The telescope has been completely used.");
            });
        }
        if (event.itemStack.typeId === "minecraft:spyglass" && player.isSneaking) {
            var location_1 = (_a = RaycastService.getInstance().performBlockRaycast(player)) === null || _a === void 0 ? void 0 : _a.block.location;
            if (location_1) {
                system.run(function () { return player.teleport({ x: location_1.x + 0.5, y: location_1.y + 1, z: location_1.z + 0.5 }); });
            }
        }
    };
    /**
     * Handles logic before an item is used
     */
    ItemEventHandler.prototype.handleItemUseBefore = function (event) {
        var _this = this;
        var player = event.source;
        if (!(player instanceof Player)) {
            event.cancel = false;
            return;
        }
        if (event.itemStack.typeId === "minecraft:trident") {
            var targetEntities_1 = RaycastService.getInstance().performEntityRaycast(player);
            system.run(function () {
                var _a, _b;
                if (targetEntities_1) {
                    try {
                        targetEntities_1.forEach(function (targetEntity) {
                            var _a;
                            (_a = _this.lightningStorm) === null || _a === void 0 ? void 0 : _a.summonLightningStorm(player, targetEntity.entity.location, EXPLOSION_POWER);
                            targetEntity.entity.runCommand("damage @s 128 magic entity ".concat(player.name));
                        });
                    }
                    catch (error) {
                        console.error("Hinge Error >> %d", error);
                    }
                }
                else {
                    var targetLocation = (_a = RaycastService.getInstance().performBlockRaycast(player)) === null || _a === void 0 ? void 0 : _a.block.location;
                    if (targetLocation) {
                        (_b = _this.lightningStorm) === null || _b === void 0 ? void 0 : _b.initiateCountdownStorm(player, targetLocation, EXPLOSION_POWER * 2, STORM_COUNTDOWN_SECONDS);
                    }
                }
            });
            event.cancel = true;
        }
    };
    return ItemEventHandler;
}(AActor));
var RaycastService = /** @class */ (function (_super) {
    __extends(RaycastService, _super);
    function RaycastService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Singleton instance for centralized access
     */
    RaycastService.getInstance = function () {
        if (!this._instance) {
            this._instance = new RaycastService();
        }
        return this._instance;
    };
    /**
     * Performs an entity raycast to detect entities
     */
    RaycastService.prototype.performEntityRaycast = function (player) {
        var entityOptions = {
            maxDistance: MAX_RAYCAST_DISTANCE,
            includeLiquidBlocks: false,
            includePassableBlocks: false,
            ignoreBlockCollision: false,
        };
        var results = player.getEntitiesFromViewDirection(entityOptions);
        return results.length > 0 ? results : null;
    };
    /**
     * Performs a block raycast to detect nearby blocks
     */
    RaycastService.prototype.performBlockRaycast = function (player) {
        var blockOptions = {
            maxDistance: MAX_RAYCAST_DISTANCE,
            includeLiquidBlocks: false,
            includePassableBlocks: false,
        };
        return player.getBlockFromViewDirection(blockOptions);
    };
    return RaycastService;
}(AActor));
// Main Plugin Class
var MinecraftPlugin = /** @class */ (function (_super) {
    __extends(MinecraftPlugin, _super);
    function MinecraftPlugin() {
        return _super.call(this) || this;
    }
    MinecraftPlugin.prototype.beginPlay = function () {
        _super.prototype.beginPlay.call(this);
        if (!this.itemEventHandler) {
            this.itemEventHandler = new ItemEventHandler();
        }
        return;
    };
    return MinecraftPlugin;
}(AActor));
// Entry Point
var plugin = new MinecraftPlugin();
//# sourceMappingURL=main.js.map