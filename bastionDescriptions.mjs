/* bastionDescriptions.mjs
   A module for managing Bastion Descriptions & Bastion Quirks.
   - BASTION_DESCRIPTIONS: Array of 100 objects { roll, name, text }
   - BASTION_QUIRKS:       Array of 100 objects { roll, text }
   - getBastionDescriptionByRoll(num)
   - getRandomBastionDescription()
   - getBastionQuirkByRoll(num)
   - getRandomBastionQuirk()
   - addCustomDescription(descObj)
   - addCustomQuirk(quirkObj)
*/

// Full table of 100 Bastion Descriptions
export const BASTION_DESCRIPTIONS = [
  {
    roll: 1,
    name: "Crumbling Watchtower",
    text: "A crumbling watchtower atop a windswept cliff. Its winding staircase creaks ominously in the sea-borne winds."
  },
  {
    roll: 2,
    name: "Converted Windmill",
    text: "Found in a quiet valley, its sails long since broken. A family of ravens roosts in the rafters."
  },
  {
    roll: 3,
    name: "Submerged Lighthouse",
    text: "Partially sunk in a swamp, its beacon now fueled by bioluminescent moss."
  },
  {
    roll: 4,
    name: "Mushroom-Trunk Cottage",
    text: "A deserted cottage built into a colossal mushroom trunk. Faint glowing spores illuminate the interior at dusk."
  },
  {
    roll: 5,
    name: "Roadside Inn",
    text: "A once-thriving rest stop now deserted. Collapsed stables and a squeaky signboard hint at past revelries. The floor still bears scuff marks from countless dances."
  },
  {
    roll: 6,
    name: "Dwarven Brewery",
    text: "Tucked under a rocky hill, its fermentation vats toppled and crystal lanterns flickering faintly."
  },
  {
    roll: 7,
    name: "Treehouse Village",
    text: "A cluster of interlinked huts high among ancient oaks. Abandoned by wood elves centuries ago, now only rope bridges sway in the breeze."
  },
  {
    roll: 8,
    name: "Silent Watermill",
    text: "Along a quiet, slow-moving stream, the waterwheel is jammed with river weeds. The upstairs loft smells faintly of old bread and lavender."
  },
  {
    roll: 9,
    name: "Forgotten Chapel",
    text: "Dedicated to a forgotten goddess, with shattered stained-glass windows still hinting at old tales. Ivy creeps over broken pews as solemn hymns still echo within."
  },
  {
    roll: 10,
    name: "Canyon Fortress",
    text: "A hidden structure built right into the canyon wall with arrow slits repurposed by nesting birds."
  },
  {
    roll: 11,
    name: "Leaning Wizard’s Tower",
    text: "The tower stands precariously near the edge of a cliff just outside of an old city. Its floors are warped and burned by chaotic arcana."
  },
  {
    roll: 12,
    name: "Grand Townhouse",
    text: "An impressive home presides over an abandoned street. Faded murals line cracked walls and splintered balconies overlook the interior."
  },
  {
    roll: 13,
    name: "Abandoned Ballroom",
    text: "Once the jewel of opulent events, now broken chandeliers dangle dangerously, their crystals chiming in the cold breeze."
  },
  {
    roll: 14,
    name: "Barn Hideout",
    text: "A large, unassuming barn repurposed for shelter. Old haylofts serve as cramped bunkrooms as dust motes dance in morning sunbeams."
  },
  {
    roll: 15,
    name: "Seaside Boathouse",
    text: "Sitting on rotten and barnacled pilings, the boathouse remarkably remains. Fishing nets hang from rafters while weather-worn charts pinned to walls hint at past adventures."
  },
  {
    roll: 16,
    name: "Forgotten Guildhall",
    text: "An ancient hall once home to artisans, now claimed by various overgrowth. Torn fragments of banners and flags depict the lost pride of master craftspeople."
  },
  {
    roll: 17,
    name: "Barbarian Mead Hall",
    text: "A massive wooden lodge with carved pillars depicting heroic battles. Long tables scarred by feasts and brawls span the length of it."
  },
  {
    roll: 18,
    name: "Giant Tortoise Shell",
    text: "Deep in the jungle and hollowed out by tribes long gone, the shell’s natural dome forms a surprisingly sturdy roof."
  },
  {
    roll: 19,
    name: "Skyship Wreck",
    text: "The hull of a once-majestic sky vessel lies embedded in a grassy hill. Tattered sails have been repurposed into hammocks and faintly glowing runes light up the shattered helm."
  },
  {
    roll: 20,
    name: "Underground Bunker",
    text: "Concealed behind thick foliage on a wooded slope, rusting metal doors hide a small network of rooms that feature a defunct periscope offering a blurry glimpse of the outside world."
  },
  {
    roll: 21,
    name: "Driftwood Fort",
    text: "Perched on a remote beach and built from debris that washed ashore, these old crates stand in for walls and floor."
  },
  {
    roll: 22,
    name: "Gravekeeper’s Cottage",
    text: "A small dwelling near leaning headstones. Garden tools are strewn across the grounds and a rain barrel sits out back, tasting faintly of rosemary from the herb-laden soil."
  },
  {
    roll: 23,
    name: "Abandoned Granary",
    text: "On the edge of abandoned farmland, sacks of spoiled grain host rodents, while a lofted perch is ideal for watch duty."
  },
  {
    roll: 24,
    name: "Ruined Amphitheater",
    text: "Vines crawl over tiered stone seating, and a stage lies strewn with broken props. Even a whisper on one side of the structure carries hundreds of feet away."
  },
  {
    roll: 25,
    name: "Druid’s Earthen Lodge",
    text: "Within a hidden burrow, living roots shape the walls, moss carpets the floors, and glowing mushrooms provide soft illumination."
  },
  {
    roll: 26,
    name: "Sunken Merchant Ship",
    text: "Resting in a shallow reef, the lower decks of an old ship remain submerged while the upper deck is dried and patched. Bright reef fish dart past portholes where cargo once lay."
  },
  {
    roll: 27,
    name: "Old Spice Warehouse",
    text: "Nestled in a once-thriving port, the building’s wooden beams still carry traces of exotic aromas. Faded trade signs and rope pulleys hint at once bustling commerce."
  },
  {
    roll: 28,
    name: "Rundown Bell Tower",
    text: "Part of an old chapel or city gate, its tarnished bronze bell is cracked. Pigeons roost in the rafters, and the echo of ringing can occasionally be heard on stormy nights."
  },
  {
    roll: 29,
    name: "Collapsed Bridge House",
    text: "Perched above a rocky ravine, half of the bridge is gone. Some planks have been replaced by webs of rope, and a constant roar of rushing water echoes below."
  },
  {
    roll: 30,
    name: "Blacksmith’s Forge",
    text: "The anvil is silent, and iron slag lies scattered. The smell of burnt coal lingers."
  },
  {
    roll: 31,
    name: "Stone Bakery",
    text: "Built from sturdy clay bricks, a massive oven sits cold. Flour bins are now repurposed for storage, and the lingering scent of bread crust haunts the corners."
  },
  {
    roll: 32,
    name: "Goblin Trading Post",
    text: "A ramshackle collection of debris marks a seldom-used road. Torn bunting flutters in the breeze, and crude graffiti in Goblin-speech mark the walls with warnings and jokes."
  },
  {
    roll: 33,
    name: "Ruined Monastery",
    text: "Clinging to a cliff edge, the monastery’s prayer halls are open to the sky. Tattered flags flutter and the few remaining scrolls in a rack detail lost martial arts secrets."
  },
  {
    roll: 34,
    name: "Waterlogged Cavern",
    text: "Fungal lanterns glow gently upon the damp walls—pulsing in response to a constant drip that echoes through the hidden hollows."
  },
  {
    roll: 35,
    name: "Forester’s Lodge",
    text: "Carved animal masks line the walls, a lookout tower of woven branches stands nearby, and the building carries the scent of pine resin."
  },
  {
    roll: 36,
    name: "Collapsed Mineshaft",
    text: "An entrance propped open by rotting timbers, old rails end abruptly inside. The occasional sparkle of embedded ore twinkles in the light."
  },
  {
    roll: 37,
    name: "Fey Tea House",
    text: "Once a cozy hideaway for sprites, tiny mismatched chairs and chipped porcelain teapots decorate the inside of a brightly painted wooden structure."
  },
  {
    roll: 38,
    name: "Elven Greenhouse",
    text: "Cracks in glass domes allow in the overgrowth of vines and rare plants. Nearly unseen irrigation channels built into the architecture trickle faintly in the background."
  },
  {
    roll: 39,
    name: "Warrior’s Longhouse",
    text: "A rough-hewn hall scarred by innumerable sparring matches. Split timbers, battered shields, and a fire pit scorched into the central floor speak to its past battles."
  },
  {
    roll: 40,
    name: "Floating Platform",
    text: "Solid timbers are loosely lashed into a broad raft moored at a calm lake’s center. Makeshift huts stand atop the foundation, gently bobbing up and down."
  },
  {
    roll: 41,
    name: "Kobold Warren",
    text: "A small network of tunnels widened (with difficulty) for taller folk. Shiny trinkets adorn the walls—some carrying a dragon’s visage, others just shiny."
  },
  {
    roll: 42,
    name: "Lavish Summer Villa",
    text: "A splendid countryside estate with marble floors, ornate columns, and wide verandas. The place was gifted to an unknown heir, then forgotten, leaving peacocks and toads free roam."
  },
  {
    roll: 43,
    name: "Old Printing Press",
    text: "High ceilings support pulley systems for lifting crates of movable type. Inky footprints still stain the floor, and half-completed posters call for an uprising no one remembers."
  },
  {
    roll: 44,
    name: "Crab-Cage Hut",
    text: "Elevated on stilts in a brackish bay, this dwelling is pieced together from rusted iron cages. Seagulls squabble on the roof, and the tide sloshes beneath the holes in the floor."
  },
  {
    roll: 45,
    name: "Gargoyle-Roofed Townhouse",
    text: "Grim stone gargoyles loom from a steep roof in a quiet village. Cracked shutters and chipped mortar hint at once-great wealth, now long faded."
  },
  {
    roll: 46,
    name: "Thorned Chapel",
    text: "Hidden behind thick, tangled briars lies a mostly natural shelter. Stained-glass windows framed by branches depict a goddess of unknown origins."
  },
  {
    roll: 47,
    name: "Fallen Lord’s Estate",
    text: "A grandiose manor once owned by a corrupt aristocrat, now vacant since the lord was deposed. His taste was lavish, though his reputation was poor."
  },
  {
    roll: 48,
    name: "Mage’s Ivy-Shrouded Hut",
    text: "Twisting creepers cling to every board of this hut—seemingly holding it together. Alchemical glassware rattles in old cabinets and faint magical wards still spark with weak arcs of light."
  },
  {
    roll: 49,
    name: "Lumber Mill",
    text: "Abandoned when the saw jammed, sawdust piles have become nesting spots for woodland creatures. The massive circular blade stands idle, rusting by a clogged waterwheel."
  },
  {
    roll: 50,
    name: "Minotaur’s Maze-Lair",
    text: "A winding underground maze partially destroyed to form open rooms. Faded glyphs carved into stone walls display labyrinth guardians, and scattered bones have been swept aside."
  },
  {
    roll: 51,
    name: "Mountain Retreat",
    text: "Perched high on a scenic ridge, spacious balconies overlook rolling valleys. Polished hardwood floors, luxurious rugs, and ornate fireplaces reflect old wealth."
  },
  {
    roll: 52,
    name: "Water Pavilion",
    text: "Columns of polished stone stand amid a ruined estate. A magical fountain at the center seems endless, with water spilling over the marble floor."
  },
  {
    roll: 53,
    name: "Enlarged Caravan Wagon",
    text: "A fortune-teller’s wagon, now stationary, expanded into a cozy cabin. Velvet curtains are moth-eaten but still colorful, and half-dealt tarot decks lie scattered about."
  },
  {
    roll: 54,
    name: "Sunken Cellar",
    text: "Beneath a ruined mansion, stairs lead to damp stone rooms. Walls glow with faint red scribblings that are impossible to read, and a decaying family crest stands above a collapsed arch."
  },
  {
    roll: 55,
    name: "Circus Caravan Cluster",
    text: "Several bright wagons left to rot in a clearing. Torn posters announce daring acts, metal animal cages stand empty, and faded paint peels to reveal the bare wood."
  },
  {
    roll: 56,
    name: "Hollow Asteroid Keep",
    text: "A massive chunk of star-metal that fell from the sky, resting in a crater. Inside is a hollow core lined with glowing crystals and echoing cosmic winds."
  },
  {
    roll: 57,
    name: "Bog Witch’s Hut",
    text: "A shack raised on gnarly tree roots above a murky swamp. Jars of pickled oddities line countless shelves and patchwork quilts adorn every piece of furniture."
  },
  {
    roll: 58,
    name: "Inverted Gravity House",
    text: "A seemingly ordinary cottage hiding a gravitational anomaly. Once inside, “down” becomes “up”—furniture clings to the ceiling, and occupants must tread carefully."
  },
  {
    roll: 59,
    name: "Living Maze Tower",
    text: "This tower’s interior constantly reconfigures itself, twisting halls and revealing hidden doors. Stairways vanish and reappear, as though the architecture were alive."
  },
  {
    roll: 60,
    name: "Planar Rift Cottage",
    text: "A small stone home built over a minor tear in reality. Rooms occasionally flicker with visions of other planes, and ambient magical energy warps items stored here long-term."
  },
  {
    roll: 61,
    name: "Merchant’s Townhouse",
    text: "A stately home with ornate doors, faint perfume on velvet drapes, and hidden compartments that once saw clandestine trade deals."
  },
  {
    roll: 62,
    name: "Mirrored Sanctuary",
    text: "Walls, floors, and ceilings polished to a near-perfect shine. Reflections sometimes move on their own, offering cryptic counsel or warnings."
  },
  {
    roll: 63,
    name: "Crystal Cavern",
    text: "Glittering quartz and gemstone veins reflect torchlight. Occasional small tremors cause a soothing chime to echo through the crystals."
  },
  {
    roll: 64,
    name: "Ever-Bloom Grotto",
    text: "An underground chamber draped in continually blossoming flowers under a faint, otherworldly light. The flora shifts patterns and colors each sunrise."
  },
  {
    roll: 65,
    name: "Scorched Herbalist’s Hut",
    text: "Charred beams and ashen mortar show signs of a devastating fire. Amid the blackened shelves, a single sprout thrives defiantly, quickly growing enormous."
  },
  {
    roll: 66,
    name: "Shimmering Foam Palace",
    text: "A waterfront estate constructed from pearlescent shells and solidified sea foam. When moonlight hits, dazzling ripples spread across floors."
  },
  {
    roll: 67,
    name: "Submerged Stone Ruin",
    text: "Half submerged in a forest pond, water laps at the bas-relief carvings while aquatic plants grow thick inside."
  },
  {
    roll: 68,
    name: "Desolate Orchard Shed",
    text: "Apple trees twisted by neglect, with a shed whose walls bow under the branches. A broken cider press hints at its past livelihood."
  },
  {
    roll: 69,
    name: "Obsidian Volcano Spire",
    text: "A jagged tower of obsidian rising on the lip of an active volcano. Lava rivers flow below, and sulfurous fumes wreath the base."
  },
  {
    roll: 70,
    name: "Bleeding Manor",
    text: "A mansion whose wooden walls weep crimson sap, staining floors and walkways. The cause is unknown, rumored to be a malevolent spirit."
  },
  {
    roll: 71,
    name: "Giant Mushroom Ring",
    text: "Massive fungi grown in a perfect circle form a sheltered clearing. Soft bioluminescence glows, giving it a fairy-tale ambiance."
  },
  {
    roll: 72,
    name: "Desert Caravanserai",
    text: "Empty arched corridors once bustled with merchants. Sand piles drift in corners, half-buried mosaics recall wealthier times."
  },
  {
    roll: 73,
    name: "Boneyard Fortress",
    text: "Constructed from the bones of massive creatures, fused with necromantic magic. Whispers on the wind imply it’s partially sentient and hungry for more bones."
  },
  {
    roll: 74,
    name: "Vacant Basilica",
    text: "Towering columns and grand arches stand in hushed silence. Broken benches litter the floor, and sunlight filters through the vaulted ceiling."
  },
  {
    roll: 75,
    name: "Devil’s Maw Keep",
    text: "Resembling a wide stone mouth carved into a mountainside, the entrance is flanked by horned statues. Greenish flame flickers behind slit-like windows."
  },
  {
    roll: 76,
    name: "Sunken Bathhouse",
    text: "Once serviced by a hot spring that has dried up, a magical mist still clings to the air and keeps surfaces unnaturally clean."
  },
  {
    roll: 77,
    name: "Toy Maker’s Workshop",
    text: "The structure resembles a large music box. Paint flakes from whimsical decor, and squeaky floors remain the only audience to the box’s quiet tunes."
  },
  {
    roll: 78,
    name: "Wrecker’s Beacon Hut",
    text: "A tower built on a rocky shore cursed by constant storms. Lantern hooks hang from rafters, ropes left frayed, and the wind howls through broken shutters."
  },
  {
    roll: 79,
    name: "Alchemical Warehouse",
    text: "Once held exotic reagents, now shelves stand empty, stained with residue of potions. Broken flasks litter the floor amid faint aromas of sulfur and herbs."
  },
  {
    roll: 80,
    name: "Amphora Storehouse",
    text: "Carved into a hillside, rows of clay containers remain stacked in alcoves. The faint smell of old wine and oil lingers."
  },
  {
    roll: 81,
    name: "Plague-Touched Temple",
    text: "A once-holy site defiled by a spreading blight. Statues of divine figures stand defaced, stagnant pools bloom with toxic fungus."
  },
  {
    roll: 82,
    name: "Ranger’s Lookout Platform",
    text: "High in ancient pines, rope ladders and wooden platforms form a small nest. Exotic animals nest nearby, and a single whistle dangles from a hook."
  },
  {
    roll: 83,
    name: "Charred Iron Tower",
    text: "A scorched stronghold of twisted iron at the heart of a barren wasteland. Whatever unholy experiment happened here poisoned the land."
  },
  {
    roll: 84,
    name: "Mountaintop Shrine",
    text: "Exposed to bitter winds, prayer wheels line the perimeter, some jammed with ice. A central brazier gives warmth, flags snap in the gale."
  },
  {
    roll: 85,
    name: "Phantasmal Dome",
    text: "A crystalline hemisphere in a quiet clearing. Stepping through its walls reveals illusions of floating lights and chanting that never repeats the same way twice."
  },
  {
    roll: 86,
    name: "Lumina Fane",
    text: "A secluded shrine set in a hidden glade, ringed by glowing crystals that shine brightest under moonlight. Strange motes of light drift among the trees."
  },
  {
    roll: 87,
    name: "Mechanist’s Watchtower",
    text: "An austere tower of brass and iron in perfectly symmetrical gardens. Clockwork drones patrol halls lined with gears, all ticking in cosmic synchronization."
  },
  {
    roll: 88,
    name: "Starbound Birch Tower",
    text: "A gracefully winding tower grown from living birch trees. At night, star-shaped leaves glow with stored starlight, guiding travelers along spiral walkways."
  },
  {
    roll: 89,
    name: "Amberlight Villa",
    text: "An upscale manor encased in natural amber deposits, creating translucent, honey-hued walls. Evenings make the amber glow with soothing warmth."
  },
  {
    roll: 90,
    name: "Floating Chaos Forge",
    text: "A cluster of warped metal platforms bound by living strands of raw magic. Pools of molten slag bubble unpredictably, forging bizarre shapes that rise into the air."
  },
  {
    roll: 91,
    name: "Halfling Burrow",
    text: "A cozy halfling burrow enlarged for taller folk. Round door, warm hearth, and faint smell of fresh pies still cling to the cupboards."
  },
  {
    roll: 92,
    name: "Shattered Glass Observatory",
    text: "Missing its dome. Star charts are scattered, the telescope broken. Shards of colored glass crunch underfoot as moonlight pours in."
  },
  {
    roll: 93,
    name: "Shadowsworn Fortress",
    text: "A melancholic fortress shrouded in perpetual dusk. Surrounding marshland saps color. Low moans drift through half-flooded corridors."
  },
  {
    roll: 94,
    name: "Giant’s Pantry",
    text: "An abode within oversized cupboards carved by enormous hands. Massive clay jugs and a faint honey-and-grain scent waft through the old stores."
  },
  {
    roll: 95,
    name: "Whispering Cumulus Temple",
    text: "A sanctuary floating on a cloud chunk, anchored by a spiral staircase. Fog rolls through open archways, occasionally forming angelic or draconic shapes."
  },
  {
    roll: 96,
    name: "Desert Tent Encampment",
    text: "Sun-bleached canopies flow together into one giant tent. Poles lean in shifting sands, tattered rugs bearing patterns that were once bright with color."
  },
  {
    roll: 97,
    name: "Psionic Cascade Citadel",
    text: "A small castle of shifting halls where psychic storms flare, forging kaleidoscopic lights. Walls rearrange as if shaped by swirling astral energies."
  },
  {
    roll: 98,
    name: "Large Statue Interior",
    text: "A colossal stone figure with a secret hollowed chamber inside. A narrow stair leads into the head, where the eye sockets serve as windows."
  },
  {
    roll: 99,
    name: "Silver Strand Outpost",
    text: "A serene monastery woven from crystallized mental energy, partly transparent. Silver psionic threads form spectral banners that wave in ghostly fashion."
  },
  {
    roll: 100,
    name: "Bleak March Citadel",
    text: "A fortress built of stark metallic blocks that clank with every footstep. Armor lines echoing corridors, and a ceaseless distant battle drum lingers."
  }
];

// Full table of 100 Bastion Quirks
export const BASTION_QUIRKS = [
  { roll: 1, text: "Shadows move slightly at all times, as if cast by a flickering unseen light." },
  { roll: 2, text: "Chairs, tables, and shelves occasionally shuffle a few inches on their own." },
  { roll: 3, text: "Footsteps or spoken words echo longer than normal, granting an impression of grandeur." },
  { roll: 4, text: "Tiny glowing mushrooms or vines grow on walls, casting a soft, eerie glow." },
  { roll: 5, text: "An unseen force tidies the space at night, stacking objects neatly or sweeping floors." },
  { roll: 6, text: "At dusk, clouds of fireflies gather, lighting the property in flickering dance." },
  { roll: 7, text: "Some corners are ice-cold, while others are uncomfortably warm without explanation." },
  { roll: 8, text: "Hidden under peeling paint or moss, a mural depicts scenes of a lost civilization." },
  { roll: 9, text: "Doors swing shut and lock themselves if left unattended for too long." },
  { roll: 10, text: "Wind chimes or bells hidden in rafters make soft music when breezes pass." },
  { roll: 11, text: "A faint but distinct smell—lavender, brimstone, pine, or ozone—comes and goes unpredictably." },
  { roll: 12, text: "Pressing an ear to any wall reveals soft murmurs that can’t be clearly understood." },
  { roll: 13, text: "Strange symbols occasionally appear in corners or floors, glowing faintly before fading away." },
  { roll: 14, text: "Once a day, illusions of people or objects briefly appear then vanish." },
  { roll: 15, text: "Topiaries around the structure move slowly, rearranging themselves into new shapes each dawn." },
  { roll: 16, text: "A grandfather clock or device keeps perfect time, ticking eerily like a heartbeat." },
  { roll: 17, text: "A single window appears shattered but is locked in time, shards twisting and rattling in place." },
  { roll: 18, text: "Each evening, a lantern lights itself, then extinguishes at dawn." },
  { roll: 19, text: "Clocks, sundials, or hourglasses run fast, slow, or backward without reason." },
  { roll: 20, text: "Visitors hear distant laughter of children or revelers, though nobody is present." },
  { roll: 21, text: "Wind, water, or flames form a whispering voice in Sylvan or Primordial tongues." },
  { roll: 22, text: "One staircase leads to a door you can never reach—distance stretches indefinitely." },
  { roll: 23, text: "Existing portraits blink or shift expression when no one is looking." },
  { roll: 24, text: "A small patch of light always forms a rainbow on one wall or window, regardless of weather." },
  { roll: 25, text: "Occasional scrawlings predict minor future events before fading away." },
  { roll: 26, text: "A small torch or brazier burns without fuel, providing abnormally colored light." },
  { roll: 27, text: "Extreme gusts of wind rush through corridors at random intervals, though no open windows exist." },
  { roll: 28, text: "Surfaces have a faint tackiness, causing small items to cling a moment too long." },
  { roll: 29, text: "Muddy or dusty prints of unknown creatures appear then vanish soon after." },
  { roll: 30, text: "Cups, spoons, or forks rattle softly at random intervals, as if by ghostly diners." },
  { roll: 31, text: "Moss, mushrooms, or crystals grow upside-down from the ceiling." },
  { roll: 32, text: "Hair or fur stands on end in certain spots, hinting at latent magical energy." },
  { roll: 33, text: "One hears occasional knocks and flowing liquid in walls or floors, despite no plumbing." },
  { roll: 34, text: "One door whispers cryptic comments or jokes whenever opened or closed." },
  { roll: 35, text: "Loose floorboards shift, hinting at hidden compartments that relocate themselves." },
  { roll: 36, text: "Stonework or wallpaper subtly rearranges overnight, forming ephemeral faces or words." },
  { roll: 37, text: "One room (or courtyard) is always in a different season, sometimes raining or snowing indoors." },
  { roll: 38, text: "Subtle pastel shimmers appear, briefly tinting hair or clothes in rainbows." },
  { roll: 39, text: "Puddles or pools glow faintly at night, shimmering with unknown radiance." },
  { roll: 40, text: "Sometimes a door opens to an illusion of another faraway location before reverting to normal." },
  { roll: 41, text: "Metal objects hum softly when touched, resonating like distant chimes." },
  { roll: 42, text: "A tiny spiral of sparkling dust occasionally dances across rooms with high-pitched chimes." },
  { roll: 43, text: "A low-hanging mist seeps in at certain hours, making everything hazy for a short time." },
  { roll: 44, text: "Odd echoes of pickaxes or chanting come from below ground, even if no mine exists." },
  { roll: 45, text: "A broom or brush sweeps by itself at night, leaving bizarre patterns on dusty floors." },
  { roll: 46, text: "Tiled or mosaic floors shift subtly, forming abstract images that reset by morning." },
  { roll: 47, text: "A small statue or figurine changes pose each morning, sometimes appearing in odd places." },
  { roll: 48, text: "If cut away, ivy around the building regrows fully overnight, creeping further inside." },
  { roll: 49, text: "The distant clashing of swords or battle cries echoes through the halls at random times." },
  { roll: 50, text: "Doorframes sprout tiny blossoms that fall away when doors open, leaving a sweet aroma." },
  { roll: 51, text: "Candles never remain lit for long, blowing out as if by an invisible breath." },
  { roll: 52, text: "Stepping on certain floor spots creates musical notes, forming a tune if walked in sequence." },
  { roll: 53, text: "Water droplets turn into jittering quartz-like crystals upon hitting the floor, dissolving hours later." },
  { roll: 54, text: "Mirrors reflect details or individuals not present, like glimpses of parallel realities." },
  { roll: 55, text: "Stones near the entrance rearrange themselves at dawn, spelling cryptic patterns or words." },
  { roll: 56, text: "Anything said within these walls may be repeated back in an eerie whisper hours later." },
  { roll: 57, text: "Faint floating calligraphy appears, depicting cryptic phrases in unknown languages." },
  { roll: 58, text: "Flowers near the bastion have mirrorlike petals that dazzle under sunlight or moonlight." },
  { roll: 59, text: "A fountain or water source murmurs gentle, half-formed words to anyone who listens closely." },
  { roll: 60, text: "Dust in sunbeams forms shapes resembling animals or humanoids before dispersing." },
  { roll: 61, text: "Touching certain walls triggers echoes of past conversations or laughter." },
  { roll: 62, text: "Thin veins of light trace floors or beams at night, pulsing gently like a heartbeat." },
  { roll: 63, text: "Sparkles drift down in moonlight, as though stardust gently falling from the sky." },
  { roll: 64, text: "Decor magically morphs each day, as though celebrating an obscure holiday." },
  { roll: 65, text: "Walls gently expand and contract at times, as though the building itself is breathing." },
  { roll: 66, text: "During lightning storms or meteor showers, runes briefly shimmer on glass surfaces." },
  { roll: 67, text: "A friendly ghost is sometimes seen humming or tidying, vanishing when spotted." },
  { roll: 68, text: "A sprite-like creature lives here, occasionally pranking residents with harmless tricks." },
  { roll: 69, text: "Tiny glowing crystals embed themselves in cracks, shifting color by mood or presence." },
  { roll: 70, text: "Gears or clockwork spin aimlessly without a power source, quietly ticking in corners." },
  { roll: 71, text: "Translucent vines or flowers appear on walls at night, fading by sunrise." },
  { roll: 72, text: "Silvery web strands appear in corners, nearly impossible to remove, glimmering faintly." },
  { roll: 73, text: "Ethereal birdlike shapes visit each morning, singing songs that sound reversed." },
  { roll: 74, text: "Smoke in the chimney forms moving silhouettes, retelling overheard stories in sequence." },
  { roll: 75, text: "Ash in the fireplace never diminishes, resetting every dawn as though the fire never dies." },
  { roll: 76, text: "A distant string instrument or flute plays a melancholic tune with no visible musician." },
  { roll: 77, text: "Placing a hand on certain walls leaves a glowing imprint that lingers about a minute." },
  { roll: 78, text: "In dim light, a fast-moving person leaves a trailing afterimage for a moment." },
  { roll: 79, text: "Crossing the main entrance at dawn or dusk resonates a soft, bell-like chord." },
  { roll: 80, text: "Curtains or rugs change color overnight, as if rewoven by unseen dreamers." },
  { roll: 81, text: "A small fountain or stream flows backward or upward, defying normal gravity." },
  { roll: 82, text: "Moonlight through certain windows is unnaturally cold, forming frost inside." },
  { roll: 83, text: "White feathers occasionally float by, dissolving into motes of light upon landing." },
  { roll: 84, text: "Walls ripple gently when someone daydreams, returning to normal upon waking." },
  { roll: 85, text: "Tiny sparks of light arise from the floor at dusk, giving it a flickering aura." },
  { roll: 86, text: "Exactly one hour after midnight, a faint bell rings three times, though no bell exists." },
  { roll: 87, text: "Puddles reflect a starry sky or other strange scenery even during daylight hours." },
  { roll: 88, text: "Unusually large, colorful moths gather around lamps, vanishing by morning." },
  { roll: 89, text: "Carved knockers on doors occasionally greet visitors or demand passwords that don’t exist." },
  { roll: 90, text: "Breezes around corners hum old music box tunes, hauntingly sweet and slightly off-key." },
  { roll: 91, text: "Certain spots cause all noise to vanish, as though stepping into a vacuum of silence." },
  { roll: 92, text: "A shimmering, star-filled portal briefly appears on walls or floors, then fades without opening." },
  { roll: 93, text: "When multiple people breathe in unison, a soft harmonic hum resonates through the building." },
  { roll: 94, text: "Figures or patterns in stained glass shift posture slightly between viewings." },
  { roll: 95, text: "Plants inside subtly turn to face passing creatures, as though observing them." },
  { roll: 96, text: "Any hearty laugh is echoed back by a faint second wave of mirth from above." },
  { roll: 97, text: "Surfaces shimmer at certain angles, as though coated with dew or crystals." },
  { roll: 98, text: "A single bell-like tone resonates each sunrise, lingering for several seconds." },
  { roll: 99, text: "At night, ceilings show faint star patterns drifting slowly, mirroring unknown constellations." },
  { roll: 100, text: "A separate courtyard hosts spectral flowers that wilt in daylight." }
];

/* 
   Retrieve a Bastion Description by exact roll (1..100).
   If the number is out of range or not found, returns undefined.
*/
export function getBastionDescriptionByRoll(num) {
  return BASTION_DESCRIPTIONS.find(entry => entry.roll === num);
}

/* 
   Retrieve a random Bastion Description from the 1..100 list.
*/
export function getRandomBastionDescription() {
  const index = Math.floor(Math.random() * BASTION_DESCRIPTIONS.length);
  return BASTION_DESCRIPTIONS[index];
}

/* 
   Retrieve a Bastion Quirk by exact roll (1..100).
*/
export function getBastionQuirkByRoll(num) {
  return BASTION_QUIRKS.find(entry => entry.roll === num);
}

/* 
   Retrieve a random Bastion Quirk from the 1..100 list.
*/
export function getRandomBastionQuirk() {
  const index = Math.floor(Math.random() * BASTION_QUIRKS.length);
  return BASTION_QUIRKS[index];
}

/* 
   Allow user-defined additions to the BASTION_DESCRIPTIONS array.
   Provide a { roll, name, text } object or any format you prefer.
*/
export function addCustomDescription(descObj) {
  BASTION_DESCRIPTIONS.push(descObj);
}

/* 
   Allow user-defined additions to the BASTION_QUIRKS array.
   Provide a { roll, text } object or any format you prefer.
*/
export function addCustomQuirk(quirkObj) {
  BASTION_QUIRKS.push(quirkObj);
}
