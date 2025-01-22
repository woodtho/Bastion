/* 
  FILE: main.js

  This version modifies handleAllIsWell so that it selects 1-3 messages from among 
  the actual facilities present in the Bastion. Each facility type has 15 distinct 
  “All Is Well” messages, stored in FACILITY_ALL_IS_WELL_MESSAGES.

  The rest of the code is shown in full with no truncation. 
  Inline comments clarify changes.
*/

import { BASIC_FACILITIES_DEFINITIONS } from "./facilities/basic/basicFacilitiesIndex.mjs";
import { SPECIAL_FACILITIES_FULL } from "./facilities/special/specialFacilitiesIndex.mjs";
import {
  BASTION_DESCRIPTIONS,
  BASTION_QUIRKS,
  getBastionDescriptionByRoll,
  getRandomBastionDescription,
  getBastionQuirkByRoll,
  getRandomBastionQuirk
} from "./bastionDescriptions.mjs"; 

/* 
  Utility: store and retrieve cookie values to retain Bastion description/quirk across reloads.
*/
function setCookie(name, value, days = 30) {
  const d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  const expires = "expires="+ d.toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/`;
}
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let c of ca) {
    c = c.trim();
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }
  return "";
}

/* Bastion description & quirk UI population. */
function populateBastionDescDropdown() {
  const selectEl = document.getElementById("bastionDescDropdown");
  while (selectEl.options.length > 1) {
    selectEl.remove(1);
  }
  BASTION_DESCRIPTIONS.forEach(entry => {
    const opt = document.createElement("option");
    opt.value = entry.roll;
    opt.textContent = `${entry.roll}: ${entry.name}`;
    selectEl.appendChild(opt);
  });
}
function populateBastionQuirkDropdown() {
  const selectEl = document.getElementById("bastionQuirkDropdown");
  while (selectEl.options.length > 1) {
    selectEl.remove(1);
  }
  BASTION_QUIRKS.forEach(entry => {
    const opt = document.createElement("option");
    opt.value = entry.roll;
    opt.textContent = `${entry.roll}: ${entry.text.substring(0,40)}...`;
    selectEl.appendChild(opt);
  });
}

let chosenBastionDescription = "";
let chosenBastionQuirk = "";

function loadBastionDescAndQuirkFromCookie() {
  const savedDesc = getCookie("bastionDescription");
  if (savedDesc) {
    chosenBastionDescription = savedDesc;
    document.getElementById("bastionDescOutput").textContent = chosenBastionDescription;
  }
  const savedQuirk = getCookie("bastionQuirk");
  if (savedQuirk) {
    chosenBastionQuirk = savedQuirk;
    document.getElementById("bastionQuirkOutput").textContent = chosenBastionQuirk;
  }
}

/* Bastion Description handlers. */
function handleBastionDescRollOrPick() {
  const numInput = document.getElementById("bastionDescNumber").value;
  let rollNum = parseInt(numInput, 10);
  if (Number.isNaN(rollNum) || rollNum < 1 || rollNum > 100) {
    const randomEntry = getRandomBastionDescription();
    chosenBastionDescription = `${randomEntry.name}\n\n${randomEntry.text}`;
  } else {
    const entry = getBastionDescriptionByRoll(rollNum);
    chosenBastionDescription = entry ? `${entry.name}\n\n${entry.text}` : "No matching entry found.";
  }
  document.getElementById("bastionDescOutput").textContent = chosenBastionDescription;
  setCookie("bastionDescription", chosenBastionDescription);
}
function handleBastionDescDropdownChange() {
  const ddVal = document.getElementById("bastionDescDropdown").value;
  if (!ddVal) return;
  const rollNum = parseInt(ddVal, 10);
  const entry = getBastionDescriptionByRoll(rollNum);
  if (entry) {
    chosenBastionDescription = `${entry.name}\n\n${entry.text}`;
    document.getElementById("bastionDescOutput").textContent = chosenBastionDescription;
    setCookie("bastionDescription", chosenBastionDescription);
  }
}
function handleBastionDescApplyCustom() {
  const customText = document.getElementById("bastionDescCustom").value.trim();
  if (customText) {
    chosenBastionDescription = customText;
    document.getElementById("bastionDescOutput").textContent = chosenBastionDescription;
    setCookie("bastionDescription", chosenBastionDescription);
  }
}

/* Bastion Quirk handlers. */
function handleBastionQuirkRollOrPick() {
  const numInput = document.getElementById("bastionQuirkNumber").value;
  let rollNum = parseInt(numInput, 10);
  if (Number.isNaN(rollNum) || rollNum < 1 || rollNum > 100) {
    chosenBastionQuirk = getRandomBastionQuirk().text;
  } else {
    const entry = getBastionQuirkByRoll(rollNum);
    chosenBastionQuirk = entry ? entry.text : "No matching entry found.";
  }
  document.getElementById("bastionQuirkOutput").textContent = chosenBastionQuirk;
  setCookie("bastionQuirk", chosenBastionQuirk);
}
function handleBastionQuirkDropdownChange() {
  const ddVal = document.getElementById("bastionQuirkDropdown").value;
  if (!ddVal) return;
  const rollNum = parseInt(ddVal, 10);
  const entry = getBastionQuirkByRoll(rollNum);
  if (entry) {
    chosenBastionQuirk = entry.text;
    document.getElementById("bastionQuirkOutput").textContent = chosenBastionQuirk;
    setCookie("bastionQuirk", chosenBastionQuirk);
  }
}
function handleBastionQuirkApplyCustom() {
  const customText = document.getElementById("bastionQuirkCustom").value.trim();
  if (customText) {
    chosenBastionQuirk = customText;
    document.getElementById("bastionQuirkOutput").textContent = chosenBastionQuirk;
    setCookie("bastionQuirk", chosenBastionQuirk);
  }
}

/* Expand/Collapse sections in the UI. */
window.toggleCollapse = function(headerElement) {
  const parent = headerElement.parentElement;
  parent.dataset.collapsed = parent.dataset.collapsed === "true" ? "false" : "true";
};

/* Format gold with commas. */
function formatGold(gp) {
  return gp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/* 
  We define the event table for random Bastion events, each referencing a method by name.
*/
const EVENT_TABLE = [
  { rollMin: 1, rollMax: 40,  method: "handleAllIsWell" },
  { rollMin: 41, rollMax: 48, method: "handleAttack" },
  { rollMin: 49, rollMax: 52, method: "handleCriminalHireling" },
  { rollMin: 53, rollMax: 57, method: "handleExtraordinaryOpportunity" },
  { rollMin: 58, rollMax: 67, method: "handleFriendlyVisitors" },
  { rollMin: 68, rollMax: 72, method: "handleGuest" },
  { rollMin: 73, rollMax: 75, method: "handleLostHirelings" },
  { rollMin: 76, rollMax: 79, method: "handleMagicalDiscovery" },
  { rollMin: 80, rollMax: 88, method: "handleRefugees" },
  { rollMin: 89, rollMax: 97, method: "handleRequestForAid" },
  { rollMin: 98, rollMax: 100, method: "handleTreasure" }
];

/* Basic facility class. */
class BasicFacility {
  constructor(defObj, chosenSpace) {
    this.defObj = defObj;
    this.facilityType = defObj.facilityType;
    this.description = defObj.description;
    this.space = chosenSpace || defObj.defaultSpace || "Cramped";
    this.enlargeInProgress = false;
    this.enlargeTimeRemaining = 0;
  }
}

/* Special facility class (for the more complex facilities). */
class SpecialFacility {
  constructor(defObj, chosenSpace) {
    this.defObj = defObj;
    this.name = defObj.name;
    this.requiredLevel = defObj.levelReq;
    this.prerequisite = defObj.prereq;
    this.canEnlarge = defObj.canEnlarge;
    this.possibleOrders = defObj.baseOrderOptions || [];
    this.subOrders = defObj.subOrders || {};
    this.description = defObj.desc || "";
    this.space = chosenSpace || defObj.defaultSpace || "Cramped";
    this.shutDownNextTurn = false;
    this.enlargeInProgress = false;
    this.enlargeTimeRemaining = 0;
    this.orderUsedThisTurn = false;
    this.charmCooldown = 0;
  }
}

/* 
  We define 15 messages per facility type for “All Is Well.” 
  Only facilities that actually exist in the Bastion will have 
  their messages considered in handleAllIsWell.
*/
const FACILITY_ALL_IS_WELL_MESSAGES = {
  /* Basic Facilities */
  "Bedroom": [
    "Fresh linens arrived in the Bedroom, making rest more comfortable.",
    "A warm draft in the Bedroom has kept everyone in high spirits overnight.",
    "Someone placed calming flowers in the Bedroom, improving sleep quality.",
    "Sunlight fell perfectly through the Bedroom window, brightening moods.",
    "No strange noises were heard in the Bedroom at all last night.",
    "The Bedroom was tidied expertly, and everyone feels more organized.",
    "A subtle lavender scent now fills the Bedroom, improving relaxation.",
    "An old painting found in the Bedroom adds a touch of history.",
    "A traveling tailor donated new blankets for the Bedroom’s beds.",
    "The Bedroom’s squeaky door hinge was quietly oiled.",
    "A letter was found under a Bedroom pillow, containing kind words.",
    "A lullaby singer visited, enhancing rest in the Bedroom for one night.",
    "Birdsong outside the Bedroom windows gently wakes sleepers at dawn.",
    "A cat was found napping on a Bedroom window sill, purring contentedly.",
    "All who slept in the Bedroom reported particularly pleasant dreams."
  ],
  "Courtyard": [
    "The Courtyard’s flowers are in full bloom, delighting everyone passing by.",
    "A stray cat peacefully roams the Courtyard, charming visitors.",
    "Sunlight bathed the Courtyard for most of the day, raising morale.",
    "A gentle breeze cooled off the Courtyard perfectly this afternoon.",
    "Small birds nested in a quiet corner of the Courtyard, chirping happily.",
    "The Courtyard fountain’s water is exceptionally clear and refreshing.",
    "A local sculptor is adding a decorative statue in the Courtyard for free.",
    "Courtyard benches were polished, gleaming in the midday sun.",
    "Guards found the Courtyard a perfect place for quiet reflection today.",
    "Children played safely in the Courtyard, filling it with laughter.",
    "Decorative lanterns now line the Courtyard’s perimeter at dusk.",
    "A traveling minstrel performed in the Courtyard, lifting spirits.",
    "A rare flower blossomed unexpectedly in the Courtyard’s corner.",
    "A gentle rain watered the Courtyard plants without drenching visitors.",
    "The Courtyard’s stone paths were meticulously swept and look pristine."
  ],
  "Dining Room": [
    "The Dining Room’s tables were set with fresh linens and cheerful colors.",
    "Everyone complimented the new table arrangement in the Dining Room.",
    "A traveling chef left behind some exotic spices for the Dining Room staff.",
    "The Dining Room’s chairs were repaired, eliminating any wobbly seats.",
    "Fresh flowers adorn each table in the Dining Room, adding sweet aromas.",
    "A bright chandelier in the Dining Room glistens, reflecting warm light.",
    "Mealtime in the Dining Room ended with lively toasts and good cheer.",
    "The Dining Room walls were repainted in a comforting hue.",
    "A spontaneous singing broke out during dinner in the Dining Room.",
    "Cooks discovered an old family recipe that wowed everyone at mealtime.",
    "Small decorations now hang above each Dining Room table, adding whimsy.",
    "A newly woven rug gives the Dining Room a cozy, welcoming feel.",
    "Guests noted how the Dining Room somehow makes food taste better.",
    "No scraps were wasted—kitchen staff boasted perfect portion planning.",
    "Quiet music filled the Dining Room during dinner, enhancing conversation."
  ],
  "Kitchen": [
    "The Kitchen staff perfected a new stew recipe that’s pleasing the masses.",
    "Delicious aromas from the Kitchen waft through the halls.",
    "Storage containers in the Kitchen are fully stocked and well-organized.",
    "A chef’s apprentice surprised everyone with perfect pastries.",
    "The Kitchen’s hearth was cleaned, improving cooking conditions.",
    "Local farmers donated fresh produce for the Kitchen’s next meal.",
    "Someone left a rare spice blend in the Kitchen, sparking culinary ideas.",
    "A squeaky pantry door in the Kitchen was finally fixed.",
    "The Kitchen staff found a lost family cookbook among old crates.",
    "A jug of sweet honey arrived in the Kitchen, courtesy of a traveling merchant.",
    "New knives in the Kitchen make food prep faster and safer.",
    "A cheerful tune from the Kitchen staff keeps everyone’s spirits high.",
    "A wizard visitor enhanced the Kitchen’s stove with gentle warming magic.",
    "Clean-up was so efficient that the Kitchen floors almost sparkle.",
    "Every dish today turned out flawlessly, delighting Bastion residents."
  ],
  "Parlor": [
    "Visitors to the Parlor praised its comfortable chairs and welcoming vibe.",
    "The Parlor’s fireplace radiated warmth without any smoke issues.",
    "A caretaker dusted antiques in the Parlor, making them gleam.",
    "Soft music played in the Parlor all afternoon, soothing guests.",
    "The Parlor gained a lovely new tapestry from a traveling artist.",
    "A fresh bowl of fruit in the Parlor brightened everyone’s day.",
    "Arriving guests found the Parlor a charming spot for small talk.",
    "A lost ring was found under a Parlor sofa and returned to its owner.",
    "Sunbeams through the Parlor windows gave it a pleasant atmosphere.",
    "Comfortable pillows in the Parlor invite people to linger longer.",
    "A potted plant in the Parlor blossomed with unexpected flowers.",
    "A humorous anecdote was shared in the Parlor, breaking tensions.",
    "Light refreshments served in the Parlor boosted morale all around.",
    "The Parlor walls were touched up, revealing bright, clean paintwork.",
    "A traveling bard strummed a lute in the Parlor, enchanting listeners."
  ],
  "Storage": [
    "Staff reorganized the Storage neatly, discovering extra supplies.",
    "No pests were found in the Storage area for the first time in weeks.",
    "A mislabeled crate in Storage was opened to find useful building materials.",
    "Storage shelves were reinforced and now hold heavier loads safely.",
    "A local craftsman donated new boxes to better organize Storage.",
    "Old cobwebs in Storage were cleared, making the room more inviting.",
    "An air of freshness replaced the usual musty smell in Storage.",
    "A guard found a misplaced heirloom in Storage and turned it in.",
    "Additional lanterns now light up the Storage room corners.",
    "Labels were updated in Storage, reducing confusion over crates.",
    "A rare spice was discovered among old supplies in Storage.",
    "The Storage door got a new lock, ensuring better security.",
    "Stacked items in Storage form a safe and tidy arrangement.",
    "A traveling merchant left behind extra sacks of grain in Storage.",
    "It turns out Storage had more space than previously realized!"
  ],

  /* Special Facilities */
  "Aviary": [
    "A tamed hawk in the Aviary learned a new friendly greeting call.",
    "The Aviary’s nests are particularly cozy, ensuring content birds.",
    "A visiting ranger complimented the Aviary’s cleanliness and design.",
    "Feathers collected in the Aviary are being used for quills and pillows.",
    "A new ravens’ perch was installed in the Aviary, expanding capacity.",
    "Exotic birdseed was donated to the Aviary by a traveling merchant.",
    "A joyful chorus of chirps in the Aviary greeted everyone at dawn.",
    "A bright sunbeam warms the Aviary, pleasing the winged residents.",
    "The Aviary gained a gifted falcon that seems especially loyal.",
    "The caretaker discovered a hidden stash of feed, enough for weeks.",
    "A rescued owl found solace in the Aviary and quickly adapted.",
    "A mild breeze flows through the Aviary, keeping air fresh and clean.",
    "A patient raven taught a younger bird how to mimic words quietly.",
    "An aviary hatchling was born healthy, delighting onlookers.",
    "Smooth flight practice sessions brightened everyone’s mood today."
  ],
  "Arcane Study": [
    "An apprentice in the Arcane Study managed a tricky cantrip flawlessly.",
    "A dusty tome in the Arcane Study revealed a surprisingly helpful tip.",
    "Arcane symbols drawn on the Study’s walls glowed gently today.",
    "A short magical lightshow entertained the Arcane Study’s visitors.",
    "A flickering candle levitated briefly in the Arcane Study, startling no one.",
    "A traveling wizard offered to share new spell insights in the Arcane Study.",
    "The Arcane Study’s supply of parchment was neatly restocked for free.",
    "A helpful unseen servant dusted the Arcane Study’s shelves unprompted.",
    "Someone found a hidden bookmark in the Arcane Study referencing a rare spell.",
    "A warding glyph in the Arcane Study quietly repelled harmful pests.",
    "A new star chart pinned on the Arcane Study wall inspired deeper research.",
    "A visiting mage praised the Arcane Study’s tranquil atmosphere for study.",
    "Sparkling motes of light briefly danced above a lectern in the Arcane Study.",
    "A note left behind gave directions to a helpful magical reagent vendor.",
    "A shimmering illusion of a floating orb guided novices to the right shelf."
  ],
  "Archive": [
    "A lost scroll turned up in the Archive, revealing minor historical details.",
    "Archive shelves were reorganized, making research easier.",
    "Dusty tomes in the Archive were carefully brushed off.",
    "A visiting scholar left complimentary notes about the Archive’s breadth.",
    "A caretaker discovered an intact map hidden in the Archive’s back corner.",
    "The Archive’s reading desk was refinished to a soft gleam.",
    "Clever indexing now helps hirelings find documents faster in the Archive.",
    "A mild cedar scent in the Archive keeps old books well-preserved.",
    "A rare genealogical chart discovered in the Archive delighted historians.",
    "The Archive’s candles burned smokelessly all week.",
    "Fresh binding repairs keep the Archive’s older volumes from crumbling.",
    "A quiet hush fell over the Archive, ideal for focused study.",
    "A local historian praised the Archive for its meticulously sorted records.",
    "New labels on the Archive’s shelves reduce confusion among novices.",
    "Mice avoided the Archive entirely, leaving its scrolls untouched."
  ],
  "Armory": [
    "All gear in the Armory is neatly arranged, saving time during drills.",
    "Shields polished in the Armory gleam with a mirror finish.",
    "A local blacksmith donated a high-quality spear to the Armory.",
    "The Armory’s racks were upgraded, preventing any weapon damage.",
    "A stray arrow found in the Armory turned out to be just a harmless prop.",
    "Defenders found the Armory easy to navigate thanks to new labels.",
    "A decorative helmet was polished and now serves as a showpiece.",
    "A routine inspection revealed no rust or wear in the Armory’s gear.",
    "Swords from the Armory were tested and found perfectly balanced.",
    "A visiting knight praised the Armory’s readiness.",
    "New arrow bundles arrived unexpectedly, filling the Armory’s quivers.",
    "The Armory floor was waxed, preventing accidental slips.",
    "Weapon stands in the Armory were reinforced to hold heavier gear.",
    "A slight aura of protection seems to bless the Armory’s doorway.",
    "Special friction oil used in the Armory ensures no squeaky hinges remain."
  ],
  "Barrack": [
    "Barrack bunkbeds were repaired, allowing for more restful sleep.",
    "No snoring complaints were heard from the Barrack last night.",
    "The Barrack’s footlockers were reorganized with fresh cedar blocks.",
    "A friendly bet in the Barrack ended harmoniously, boosting camaraderie.",
    "Defenders praised the Barrack’s ventilation, keeping it fresh.",
    "New recruits commented on the Barrack’s tidy conditions.",
    "A traveling armorer dropped off extra blankets for the Barrack bunks.",
    "An old motivational banner found in the Barrack raises morale.",
    "The Barrack’s latrine is spotlessly clean, surprising everyone.",
    "An off-duty guard serenaded the Barrack with a surprisingly good tune.",
    "A missing shoe was located behind a Barrack cabinet, saving a soldier’s day.",
    "Sunbeams through the Barrack windows lit it warmly this morning.",
    "A caretaker’s daily sweep kept the Barrack free of clutter.",
    "No disputes arose in the Barrack, as everyone remained in high spirits.",
    "Fresh straw under the mattresses led to unusually restful nights."
  ],
  "Demiplane": [
    "The Demiplane’s walls shimmered faintly with stable arcane runes.",
    "A gentle hum resonates in the Demiplane, soothing its visitors.",
    "Someone found a small stash of harmless illusions dancing in one corner.",
    "The Demiplane’s lighting adjusts automatically to each occupant’s preference.",
    "A squeaky echo from the Demiplane vanished, replaced by calm silence.",
    "An unexpected swirl of color in the Demiplane brought joy, not danger.",
    "A hidden niche in the Demiplane revealed small, pleasant trinkets.",
    "Runes inside the Demiplane glowed warmly, exuding faint protective magic.",
    "A lost cat somehow wandered into the Demiplane and was easily rescued.",
    "The Demiplane’s temperature remained perfectly comfortable without effort.",
    "Quiet meditation in the Demiplane renewed everyone’s focus.",
    "A faint starry sky effect on the Demiplane ceiling enchanted onlookers.",
    "No magical mishaps occurred in the Demiplane, reassuring new visitors.",
    "A caretaker discovered the Demiplane can gently play ambient music.",
    "Time in the Demiplane felt especially restful, boosting morale for a day."
  ],
  "Gaming Hall": [
    "Laughter and cheers arose from the Gaming Hall’s friendly contests.",
    "Cards and dice in the Gaming Hall remained fair and balanced.",
    "A local gambler performed clever tricks that entertained watchers.",
    "No one was caught cheating in the Gaming Hall for once.",
    "A batch of fresh snacks arrived to keep Gaming Hall players energized.",
    "Musical accompaniment in the Gaming Hall set a jovial tone.",
    "Even small wagers in the Gaming Hall brought big smiles.",
    "A traveling puzzle master left behind a new board game for the Hall.",
    "Friendly rivalry blossomed, but with no hard feelings afterward.",
    "Someone donated comfortable cushions for the Gaming Hall’s chairs.",
    "A comedic duo performed an impromptu routine between dice rounds.",
    "New playing cards were introduced, with gorgeous painted backs.",
    "The Hall’s lighting was perfect, showing every detail of the games.",
    "A skillful dart thrower gave a free lesson, impressing onlookers.",
    "Cooperative games in the Hall improved overall Bastion camaraderie."
  ],
  "Garden": [
    "The Garden’s flowers are in full bloom, painting it with vibrant color.",
    "A rare bird visited the Garden’s birdbath, delighting onlookers.",
    "New stepping stones in the Garden make strolling more pleasant.",
    "Vegetables harvested from the Garden turned out exceptionally tasty.",
    "A gentle rain watered the Garden perfectly without over-soaking.",
    "The Garden’s caretaker found a patch of medicinal herbs thriving.",
    "No pests bothered the Garden this week, leaving plants healthy.",
    "A small fountain in the Garden trickles soothingly all day.",
    "Sunlight fell beautifully on the Garden, encouraging new blossoms.",
    "An unexpected patch of wildflowers brightens a Garden corner.",
    "The Garden’s topiary got a neat trim, revealing playful shapes.",
    "A few butterflies flitted about the Garden, enchanting passersby.",
    "An aromatic herb in the Garden helps keep insects away naturally.",
    "Soft lanterns now light the Garden paths at night, creating a serene view.",
    "A local druid complimented the Garden’s harmonious design."
  ],
  "Greenhouse": [
    "The Greenhouse’s humidity balance was perfect this week, boosting growth.",
    "Exotic buds in the Greenhouse opened into impressive blossoms.",
    "A caretaker found baby sprouts thriving in a forgotten corner of the Greenhouse.",
    "Warm sunbeams through the Greenhouse glass brightened everyone’s mood.",
    "Rare healing herbs in the Greenhouse look especially robust today.",
    "The Greenhouse’s magical fruit bore extra produce, delighting the staff.",
    "Fresh potting soil arrived for the Greenhouse, at no extra cost.",
    "Gentle condensation on the Greenhouse walls kept everything hydrated.",
    "A mild breeze circulated through the Greenhouse’s vents, preventing mold.",
    "A traveling botanist praised the Greenhouse’s top-notch care.",
    "Fruit vines in the Greenhouse show signs of bumper harvest soon.",
    "Tiny beneficial insects were introduced to the Greenhouse for pest control.",
    "A novice caretaker impressed everyone by saving a wilting plant in time.",
    "Sunset in the Greenhouse created a striking rainbow of color on the leaves.",
    "The Greenhouse door latch was repaired, making entry smoother."
  ],
  "Guildhall": [
    "Guild members hosted a mini-festival at the Guildhall, raising spirits.",
    "A newly joined specialist gave free training sessions in the Guildhall.",
    "No grievances were filed among Guild members this week, a rare peace.",
    "Guildhall notice boards were updated with fresh, exciting job postings.",
    "Craft demonstrations at the Guildhall wowed local novices.",
    "Visiting dignitaries praised the Guildhall for fostering collaboration.",
    "A philanthropic sponsor donated supplies for the Guildhall’s next event.",
    "A comedic skit improvised at the Guildhall left everyone laughing.",
    "A plaque was unveiled, honoring the Guildhall’s founding members.",
    "Stewards organized a successful membership drive at the Guildhall.",
    "Inventors displayed their contraptions in the Guildhall, drawing crowds.",
    "Guildhall kitchens provided hearty meals for all, free of charge.",
    "A storeroom reorganization uncovered forgotten but useful resources.",
    "A minor rivalry was resolved amicably in a Guildhall arbitration.",
    "Guild trainees expressed gratitude for the welcoming atmosphere."
  ],
  "Laboratory": [
    "No accidental spills happened in the Laboratory this week—astonishing!",
    "A successful experiment in the Laboratory produced harmless fireworks.",
    "Air filters in the Laboratory prevented any noxious fumes entirely.",
    "A new labeling system keeps the Laboratory’s reagents neatly sorted.",
    "An herbalist donated dried plants for the Laboratory’s experiments.",
    "All glassware in the Laboratory was found intact, none broken.",
    "A random spark of arcane energy in the Laboratory fizzled safely.",
    "A bright-minded apprentice synthesized a mild healing salve in the Lab.",
    "The Laboratory’s watersource was tested and found perfectly pure.",
    "Sunlight from a skylight brightened the Laboratory’s entire workspace.",
    "An alchemist’s journal discovered in the Lab gave valuable tips.",
    "A visiting gnome tinkered with apparatus, leaving improvements behind.",
    "A sweet scent wafted through the Laboratory from a benign experiment.",
    "Protective wards in the Laboratory performed flawlessly during tests.",
    "Glass equipment sparkles after a thorough cleaning spree."
  ],
  "Library": [
    "A quiet hush graced the Library, perfect for reading and reflection.",
    "Someone donated new volumes to the Library, expanding its collection.",
    "Patrons easily found references in the Library thanks to neat indexing.",
    "Sunbeams illuminated reading tables in the Library, comforting scholars.",
    "A traveling bard read folklore aloud in the Library, mesmerizing listeners.",
    "No pages were found torn or missing among the Library’s books.",
    "Candleholders in the Library glowed steadily without soot.",
    "An ancient bestiary in the Library contained helpful creature notes.",
    "New comfortable chairs arrived for the Library’s reading area.",
    "Scholars discovered a forgotten treatise that might prove valuable.",
    "A sweet herbal tea stand near the Library entrance keeps readers cozy.",
    "The Librarian introduced a new checkout system that runs smoothly.",
    "No dust lingered on shelves after a thorough cleaning last night.",
    "Quiet footfalls in the Library signaled respect for its studious air.",
    "A language primer found in the Library helped visitors communicate better."
  ],
  "Meditation Chamber": [
    "Soft chanting in the Meditation Chamber relaxed participants’ minds.",
    "Incense used in the Meditation Chamber had a soothing floral scent.",
    "A caretaker discovered extra cushions, ensuring comfort for all.",
    "Gentle candlelight in the Meditation Chamber created serene shadows.",
    "A sudden insight in the Meditation Chamber resolved a vexing problem.",
    "Stones in the Meditation Chamber floor felt pleasantly warm underfoot.",
    "Quiet harp music accompanied a peaceful session in the Meditation Chamber.",
    "A swirl of calming air circulated, centering those who entered.",
    "No external noise disturbed the Meditation Chamber for an entire day.",
    "Mats in the Meditation Chamber were replaced with higher-quality versions.",
    "A visiting monk praised the Chamber’s tranquility, leaving a small donation.",
    "Fresh water was provided in the Chamber, refreshing meditating souls.",
    "Participants emerged from the Meditation Chamber visibly calmer.",
    "A gentle gong in the Meditation Chamber guided breath timing for novices.",
    "Light from a single window cast a comforting pattern on the Chamber wall."
  ],
  "Menagerie": [
    "The Menagerie’s creatures appear calm and well-fed, impressing visitors.",
    "A new caretaker established a friendly rapport with the caged beasts.",
    "Fresh straw in the Menagerie enclosures brightened the animals’ day.",
    "No creature tried to escape the Menagerie this week, a welcome relief.",
    "A veterinarian offered free check-ups for the Menagerie’s creatures.",
    "Playful noises from the Menagerie delighted passersby.",
    "The creatures’ coats or scales have grown especially lustrous.",
    "No feeding mishaps occurred in the Menagerie, easing caretaker concerns.",
    "A small baby creature was safely born under caretaker supervision.",
    "The Menagerie’s air smells cleaner than usual, pleasing visitors.",
    "Defenders found the Menagerie surprisingly relaxing after patrols.",
    "A traveling druid recognized the Menagerie’s respectful habitat design.",
    "Creatures that once seemed anxious now appear at ease with each other.",
    "A hidden corner of the Menagerie was turned into a relaxing nest area.",
    "Rainy weather did not disturb the Menagerie’s enclosures thanks to tarps."
  ],
  "Observatory": [
    "Clear skies let the Observatory’s telescope reveal breathtaking stars.",
    "A faint cosmic glow reflected on the Observatory walls, enchanting onlookers.",
    "A new star map pinned in the Observatory marks a recent comet’s path.",
    "No cloud cover obstructed nightly observations in the Observatory.",
    "A visiting astronomer marveled at the Observatory’s well-calibrated lens.",
    "The telescope pivoted smoothly, thanks to fresh lubrication.",
    "A shooting star was witnessed by those in the Observatory, raising excitement.",
    "Sunset from the Observatory vantage painted the sky in striking colors.",
    "A cosmic hush seemed to fill the Observatory, aiding deep thought.",
    "A playful sprite flitted through the Observatory, but caused no trouble.",
    "Stargazers cooperated to note an unknown constellation’s movement.",
    "The Observatory’s small library now includes ephemeral cosmic charts.",
    "Gentle breezes at the dome prevented fogging of the telescope lens.",
    "A mild enchantment kept the Observatory’s temperature comfortable all night.",
    "A subtle alignment of planets gave the Observatory watchers a sense of wonder."
  ],
  "Pub": [
    "Cheerful chatter echoed through the Pub, lifting everyone’s mood.",
    "No bar brawls broke out in the Pub all night, astonishing the bartender.",
    "A visiting musician entertained Pub patrons with lively tunes.",
    "Free snacks arrived at the Pub, courtesy of a grateful traveler.",
    "The Pub’s new casks of ale taste particularly smooth this batch.",
    "A local rumor brought laughter rather than tension to the Pub’s crowd.",
    "No spilled drinks stained the Pub floors this evening—miraculously.",
    "The bartender discovered a unique cocktail recipe that patrons adore.",
    "An undercover spy congratulated the Pub on its top-notch hospitality.",
    "Patrons found comfortable seating in the Pub’s improved layout.",
    "A small victory toast in the Pub turned into a full-blown celebration.",
    "Storytellers regaled the Pub with heroic tales, mesmerizing listeners.",
    "Free coffee or tea for designated drivers improved safety, ironically.",
    "The Pub’s lighting is warm and comforting, welcoming all who enter.",
    "Generous tips flowed, keeping the Pub staff in high spirits."
  ],
  "Reliquary": [
    "A gentle glow emanated from the Reliquary’s sacred objects.",
    "No dust or tarnish marred the holy items inside the Reliquary.",
    "A supplicant found quiet solace in the Reliquary without disturbing others.",
    "Ritual candles burned purely, leaving no traces of smoke behind.",
    "A delicate relic in the Reliquary radiated a subtle warmth today.",
    "A caretaker detected faint chanting in the Reliquary, but found no cause for alarm.",
    "Visitors left the Reliquary feeling unusually hopeful.",
    "The Reliquary’s protective wards hummed softly, reassuring passersby.",
    "A lost saint’s medal reappeared on a Reliquary shelf, mystifying caretakers.",
    "No malevolent presence seemed able to approach the Reliquary.",
    "All who entered the Reliquary felt a cleansing sense of peace.",
    "A minor miracle: a crack on a relic’s casing spontaneously resealed.",
    "The Reliquary’s caretaker completed daily devotions with renewed vigor.",
    "A random pilgrim left an offering at the Reliquary’s entrance gratefully.",
    "Soft singing echoes within the Reliquary, though no singer is seen."
  ],
  "Sacristy": [
    "Vestments in the Sacristy emerged spotless from a quick wash.",
    "A gentle aura of warmth suffused the Sacristy, delighting worshipers.",
    "A newly carved holy symbol was placed on display in the Sacristy.",
    "No disputes arose regarding religious differences in the Sacristy this week.",
    "Fresh beeswax candles give the Sacristy a comforting glow.",
    "A traveling priest praised the Sacristy’s reverent atmosphere.",
    "Sacred implements in the Sacristy were polished to a bright sheen.",
    "A minor divine blessing stabilized a fragile relic in the Sacristy.",
    "Devout visitors found the Sacristy a perfect place for quiet prayer.",
    "No unholy influence dared enter the Sacristy, furthering its sanctity.",
    "The Sacristy’s caretaker reported a surprising sense of calm all day.",
    "Gentle chants were heard in the Sacristy, soothing anxious hearts.",
    "A lovely arrangement of flowers brightens the Sacristy’s altar table.",
    "No wax drips stained the floor, thanks to carefully placed candle holders.",
    "A scribbled note of gratitude was left for the Sacristy’s caretaker."
  ],
  "Sanctuary": [
    "Healing Word charms left from the Sanctuary brought comfort to many.",
    "Quiet worship in the Sanctuary eased troubled minds seamlessly.",
    "A pilgrim’s thanks echoed in the Sanctuary, praising its peaceful energy.",
    "The Sanctuary’s icons looked especially radiant in the morning light.",
    "An ailing visitor felt renewed vitality after kneeling in the Sanctuary.",
    "A caretaker replaced old tapestries, giving the Sanctuary a vibrant look.",
    "Sunbeams shone through stained glass, painting the Sanctuary in color.",
    "No disruptions or arguments arose near the Sanctuary’s holy space.",
    "A lost child found reassurance inside the Sanctuary until reunited.",
    "Flowers placed at the Sanctuary’s altar remained fresh and lively.",
    "The Sanctuary’s benches were polished, now smooth to the touch.",
    "Soft chanting in the Sanctuary created a gentle reverberation of peace.",
    "Donations in the Sanctuary box increased, reflecting gratitude.",
    "A traveling cleric commended the Sanctuary’s devotion and cleanliness.",
    "The Sanctuary’s silence offered respite to anyone seeking reflection."
  ],
  "Sanctum": [
    "A faint but uplifting hymn drifted through the Sanctum spontaneously.",
    "A caretaker found old records describing past miracles in the Sanctum.",
    "Those who prayed in the Sanctum felt a warm presence uplifting them.",
    "The Sanctum’s wards hummed gently, exuding protective energies.",
    "A quiet corner of the Sanctum offered perfect solitude for reflection.",
    "A random philanthropic visitor left a generous donation in the Sanctum.",
    "Clean floors and polished icons enhanced the Sanctum’s serene aura.",
    "A subtle breeze cleared away any stale air in the Sanctum’s corridors.",
    "A small group offered thanks for the Sanctum’s healing atmosphere.",
    "No malevolent force even approached the Sanctum’s threshold this week.",
    "Daily rites concluded with a sense of genuine community among worshipers.",
    "One devotee claimed to see a gentle divine light within the Sanctum’s hall.",
    "A traveling druid found the Sanctum’s energy surprisingly comforting.",
    "Incense in the Sanctum carried a calming, almost rejuvenating fragrance.",
    "A sleeping guard within the Sanctum woke feeling more vigorous than ever."
  ],
  "Scriptorium": [
    "A scribe in the Scriptorium finished copying a text with zero mistakes.",
    "No ink spills occurred in the Scriptorium all week, surprising everyone.",
    "A new quill set was donated to the Scriptorium by a grateful scholar.",
    "Illuminated letters from the Scriptorium gained praise for their beauty.",
    "A gentle hum of concentration filled the Scriptorium, no distractions.",
    "Scribes discovered a more efficient layout, improving writing speed.",
    "A calligraphy master taught novices in the Scriptorium free of charge.",
    "Stacks of blank parchment arrived just as the Scriptorium needed them.",
    "A new technique for making ink brightened the Scriptorium’s works.",
    "A translator uncovered a small but powerful incantation in an old letter.",
    "The Scriptorium’s reference charts remain well-maintained and legible.",
    "Sunbeams fell across a desk, inspiring a scribe’s best writing yet.",
    "No quill tips broke, and no smudges marred the Scriptorium’s pages.",
    "A traveling historian recognized the Scriptorium’s valuable archives.",
    "Minor illusions danced on a page, delighting those present."
  ],
  "Smithy": [
    "Sparks flew safely at the Smithy’s forge, forging excellent items.",
    "All anvils in the Smithy showed no signs of cracking or dents.",
    "A blacksmith’s apprentice delivered unexpectedly fine craftsmanship.",
    "No hammer mishaps occurred in the Smithy, a small miracle indeed.",
    "The Smithy’s fires burned steadily at an ideal forging temperature.",
    "Gleaming metal items lined the Smithy’s racks, impressing passersby.",
    "Extra coal arrived, keeping the Smithy fully stocked for days.",
    "A new forging technique tested in the Smithy proved efficient.",
    "Visiting dwarves complimented the Smithy’s layout and tools.",
    "A horseshoe made in the Smithy is rumored to bring good luck.",
    "The ring of hammers in the Smithy sounded almost musical at times.",
    "A traveling warrior praised the Smithy’s well-balanced weapon forging.",
    "An old hammer was replaced with a newly wrought, superior tool.",
    "No injuries or burns reported in the Smithy, relieving the medic’s worry.",
    "A cooling trough in the Smithy now sports crystal-clear water daily."
  ],
  "Stable": [
    "All horses in the Stable appear well-groomed and calm.",
    "No hoof issues arose in the Stable, pleasing the caretaker.",
    "A traveling merchant left an extra bale of hay for the Stable animals.",
    "Hitching posts in the Stable were securely reinforced.",
    "Fresh straw beddings in the Stable gave the mounts a comfortable rest.",
    "A new bridle was donated, perfectly fitting the largest horse.",
    "No horse tried to break free from the Stable, surprising the staff.",
    "Grooming sessions went flawlessly, leaving every mount shining.",
    "A well-behaved dog accompanied a traveler, befriending the Stable animals.",
    "Stable aisles are swept clean, reducing accidents and improving safety.",
    "A traveling bard sang lullabies in the Stable, calming nervous horses.",
    "All tack in the Stable is well-oiled and easy to handle.",
    "Rainstorms didn’t disturb the Stable thanks to well-maintained roofing.",
    "A new feed mix delighted the mounts, improving their coat sheen.",
    "Local children visited the Stable, happily petting the gentle ponies."
  ],
  "Storehouse": [
    "The Storehouse’s inventory checks out perfectly, no discrepancies.",
    "No sign of rodents or insects in the Storehouse—an impressive feat.",
    "A robust lock installed on the Storehouse door improved security.",
    "A mislabeled crate in the Storehouse turned out to contain useful gear.",
    "The Storehouse layout feels more spacious after reorganization.",
    "Fresh air was circulated in the Storehouse, removing musty odors.",
    "No items in the Storehouse expired or spoiled, preventing waste.",
    "An assistant found hidden compartments revealing a few bonus goods.",
    "A merchant delivered extra supplies to the Storehouse free of charge.",
    "A caretaker took inventory thoroughly, finding everything accounted for.",
    "Polite visitors found the Storehouse staff helpful and friendly.",
    "Some goods in the Storehouse were sold at a slight premium, boosting revenue.",
    "Dusting the Storehouse revealed a small coffer with petty coin inside.",
    "A new labeling system in the Storehouse reduced confusion significantly.",
    "Everything in the Storehouse is stacked neatly, preventing collapses."
  ],
  "Teleportation Circle": [
    "Runes in the Teleportation Circle glowed steadily without fluctuation.",
    "No stray energies disrupted the Teleportation Circle this week.",
    "A visiting mage found the circle’s script delightfully precise.",
    "An unexpected arrival turned out to be a friendly traveling scholar.",
    "All who used the Teleportation Circle reported smooth journeys.",
    "An artistic caretaker decorated the circle’s perimeter with chalk designs.",
    "A faint hum from the Teleportation Circle remained comforting, not ominous.",
    "Arcane motes danced briefly above the Teleportation Circle then vanished.",
    "No mishaps occurred in coordinate input for the Teleportation Circle.",
    "A harmless swirl of light delighted onlookers as the Circle powered up.",
    "A traveling wizard left a small donation to thank you for safe passage.",
    "Protective wards around the Circle prevented unauthorized intrusions.",
    "A bright flourish flared each time the Circle activated, enthralling watchers.",
    "No uninvited creatures emerged from the Circle the entire week.",
    "Coordinates on the circle floor were re-inked, ensuring clarity."
  ],
  "Theater": [
    "The Theater’s stage remains spotless after a lively performance.",
    "Acoustics in the Theater excelled, carrying every note clearly.",
    "A small comedic act in the Theater brought roaring laughter.",
    "Dancers rehearsed in the Theater without stumbling once.",
    "The Theater’s audience seating was reorganized for better viewing.",
    "A traveling troupe praised the Theater’s comfortable backstage area.",
    "Everyone applauded a stunning solo performance in the Theater.",
    "A new script circulated among Theater staff, promising a hit production.",
    "The stage curtains in the Theater were cleaned, showing vibrant colors.",
    "Spontaneous applause erupted when a child tried the stage, boosting morale.",
    "Lightning outside only enhanced the Theater’s cozy indoor ambiance.",
    "A lighting technician improved the Theater’s spotlight system dramatically.",
    "One star performer declared the Theater as the best stage they’ve used.",
    "No equipment malfunctioned, leaving the Theater’s show flawless.",
    "Posters in the Theater hall generated excitement about upcoming plays."
  ],
  "Training Area": [
    "A well-run drill in the Training Area boosted everyone’s confidence.",
    "No injuries were reported despite rigorous workouts in the Training Area.",
    "A traveling champion gave free pointers in the Training Area.",
    "New training dummies in the Training Area held up perfectly under assault.",
    "The Training Area’s padded mats prevented any bruises or sprains.",
    "Everyone left the Training Area feeling stronger than before.",
    "A short sparring tournament ended in mutual respect and no grudges.",
    "The Training Area’s air circulation kept it from becoming stuffy.",
    "Weapons used in training were all in safe, working condition.",
    "A sense of friendly competition pervaded the Training Area today.",
    "No equipment was misplaced in the Training Area, saving time.",
    "Diverse music tracks inspired trainees to reach new personal bests.",
    "Several novices advanced quickly due to focused sessions here.",
    "Enthusiasm soared as the Training Area introduced a new warm-up routine.",
    "Water pitchers in the Training Area stayed replenished, avoiding dehydration."
  ],
  "Trophy Room": [
    "A newly polished beast skull in the Trophy Room impressed onlookers.",
    "Stories behind the Trophy Room’s displays fascinated new defenders.",
    "No dust settled on the Trophy Room’s shelves overnight, oddly enough.",
    "A caretaker discovered an old plaque detailing a heroic deed among trophies.",
    "Visitors admired a legendary weapon on display, stoking Bastion pride.",
    "A faint aura of respect fills the Trophy Room, acknowledging past victories.",
    "A recently mounted trophy piece was revealed, capturing everyone’s attention.",
    "A traveling bard wrote a ballad about the exploits in this Trophy Room.",
    "Someone placed subtle lighting to highlight each trophy’s best angle.",
    "Guards felt renewed resolve seeing the Bastion’s achievements lined up.",
    "A hidden compartment in a trophy stand contained a small good-luck charm.",
    "No disputes erupted over credit for trophies—everyone is at peace.",
    "A child touring the Trophy Room vowed to become a hero one day.",
    "A bright polish on the mounted shields made them shine like new.",
    "A small plaque was corrected to properly honor the rightful hero."
  ],
  "War Room": [
    "Strategic maps in the War Room were updated, clarifying terrain intel.",
    "Officers in the War Room collaborated smoothly, no arguments at all.",
    "A quick war simulation in the War Room revealed no glaring weaknesses.",
    "The War Room’s table was refinished, sliding pieces easily on its surface.",
    "A famous veteran passing by complimented the War Room’s readiness.",
    "A newly recruited lieutenant contributed keen insights in the War Room.",
    "The War Room’s walls now bear motivational banners, boosting morale.",
    "A re-check of supply lines in the War Room confirmed enough provisions.",
    "No infiltration attempts threatened the War Room’s confidentiality.",
    "Tactical figurines in the War Room were reorganized for clarity.",
    "Everyone left the War Room feeling more prepared and united.",
    "A local cartographer donated updated region maps to the War Room.",
    "A messenger delivered encouraging news from allied forces, shared in the War Room.",
    "Commanders practiced a new formation strategy with encouraging results.",
    "Discussions ended in consensus, leaving the War Room dynamic and effective."
  ],
  "Workshop": [
    "The Workshop’s artisans completed a tricky project without error.",
    "No tools broke or jammed in the Workshop, an unexpected boon.",
    "A creative solution in the Workshop fixed a longstanding design flaw.",
    "Sunlight from a window brightened the Workshop, aiding detail work.",
    "A master artisan gave a free demonstration, enthralling novices.",
    "Neatly organized tools in the Workshop sped up every task.",
    "Someone donated a small crate of quality wood for the Workshop’s use.",
    "A broken lathe was fixed in the Workshop, now functioning perfectly.",
    "The Workshop’s new paint job inspires craftspeople to innovate.",
    "No splinters or accidental cuts were reported among the workers today.",
    "Ventilation in the Workshop improved, keeping dust levels low.",
    "A traveling gnome left behind some cunning mechanical designs.",
    "A stable worktable prevented all the usual wobbles and mishaps.",
    "Freshly sharpened chisels in the Workshop made carving a breeze.",
    "An apprentice’s first project in the Workshop turned out surprisingly well."
  ]
};

/* Bastion class (main manager). */
class Bastion {
  constructor(ownerName, bastionName, ownerLevel) {
    this.ownerName = ownerName;
    this.bastionName = bastionName;
    this.ownerLevel = ownerLevel;
    this.finance = 0;
    this.defenders = 0;
    this.basicFacilities = [];
    this.specialFacilities = [];
    this.otherStats = { totalDaysPassed: 0 };
    this.turnCount = 0;
    this.ownerPrereqs = {
      canUseArcaneFocus: false,
      canUseHolySymbol: false,
      hasFightingStyle: false,
      hasExpertise: false,
    };
  }

  /* Advance 1 Bastion turn (7 days). */
  nextTurn() {
    this.turnCount++;
    this.otherStats.totalDaysPassed += 7;
    this.specialFacilities.forEach(f => {
      f.orderUsedThisTurn = false;
      if (f.enlargeInProgress) {
        f.enlargeTimeRemaining = Math.max(0, f.enlargeTimeRemaining - 7);
        if (f.enlargeTimeRemaining <= 0) {
          f.enlargeInProgress = false;
          if (f.space === "Cramped") f.space = "Roomy";
          else if (f.space === "Roomy") f.space = "Vast";
        }
      }
      if (f.charmCooldown > 0) {
        f.charmCooldown = Math.max(0, f.charmCooldown - 7);
      }
    });
    this.basicFacilities.forEach(bf => {
      if (bf.enlargeInProgress) {
        bf.enlargeTimeRemaining = Math.max(0, bf.enlargeTimeRemaining - 7);
        if (bf.enlargeTimeRemaining <= 0) {
          bf.enlargeInProgress = false;
          if (bf.space === "Cramped") bf.space = "Roomy";
          else if (bf.space === "Roomy") bf.space = "Vast";
        }
      }
    });
  }

  /* Remove a facility by name or type. */
  removeFacility(identifier) {
    this.basicFacilities = this.basicFacilities.filter(b => b.facilityType !== identifier);
    this.specialFacilities = this.specialFacilities.filter(s => s.name !== identifier);
  }

  /* Trigger a random event from the EVENT_TABLE. */
  maintainAndTriggerEvent() {
    const roll = Math.floor(Math.random() * 100) + 1;
    const entry = EVENT_TABLE.find(e => roll >= e.rollMin && roll <= e.rollMax);
    if (!entry) return "All Is Well (no matching event).";
    return this[entry.method]();
  }

  /* handleAllIsWell: now references existing facilities and returns 1-3 random messages about them. */
  handleAllIsWell() {
    // Gather the names of all existing facilities in the Bastion:
    // Basic ones use "bf.facilityType", special ones use "sf.name".
    const existingFacilityNames = this.basicFacilities.map(b => b.facilityType).concat(
      this.specialFacilities.map(s => s.name)
    );

    if (!existingFacilityNames.length) {
      // No facilities at all, return a simple fallback.
      return "All Is Well: No facilities are built yet, so there's not much to report.";
    }

    // We'll randomly choose 1 to 3 facility references. 
    // If there are fewer than 3, we only pick from the ones that exist.
    let numMessages = Math.floor(Math.random() * 3) + 1; // 1 to 3
    if (numMessages > existingFacilityNames.length) {
      numMessages = existingFacilityNames.length;
    }

    // We'll copy the array so we can remove or pick from it:
    let facilityPool = [...existingFacilityNames];
    let selectedMessages = [];

    for (let i = 0; i < numMessages; i++) {
      // If the pool is empty, break:
      if (!facilityPool.length) break;
      // Pick a random facility from facilityPool:
      const idx = Math.floor(Math.random() * facilityPool.length);
      const facilityName = facilityPool[idx];
      // Retrieve up to 15 messages from FACILITY_ALL_IS_WELL_MESSAGES:
      const messages = FACILITY_ALL_IS_WELL_MESSAGES[facilityName] || null;

      if (messages && messages.length) {
        // Pick one random message from that array:
        const mIdx = Math.floor(Math.random() * messages.length);
        selectedMessages.push(messages[mIdx]);
      } else {
        // If no messages for this facility, skip
        selectedMessages.push(`The facility "${facilityName}" is calm and trouble-free today.`);
      }

      // Remove that facility from the pool so we don't pick it again this time:
      facilityPool.splice(idx, 1);
    }

    // Combine them into a single "All Is Well" output:
    let output = "All Is Well:";
    selectedMessages.forEach(msg => {
      output += " " + msg;
    });
    return output;
  }

  handleAttack() {
    let defendersLost = 0;
    for (let i = 0; i < 6; i++) {
      if (Math.floor(Math.random() * 6) + 1 === 1) defendersLost++;
    }
    this.defenders = Math.max(0, this.defenders - defendersLost);
    let msg = `Attack! 6d6 were rolled, losing ${defendersLost} defenders.`;
    if (this.defenders <= 0 && this.specialFacilities.length > 0) {
      const idx = Math.floor(Math.random() * this.specialFacilities.length);
      this.specialFacilities[idx].shutDownNextTurn = true;
      msg += ` All defenders gone; ${this.specialFacilities[idx].name} is damaged.`;
    }
    return msg;
  }

  handleCriminalHireling() {
    const d6 = Math.floor(Math.random() * 6) + 1;
    const cost = d6 * 100;
    if (this.finance >= cost) {
      this.finance -= cost;
      return `Criminal Hireling discovered. Paid ${formatGold(cost)} GP bribe to keep them.`;
    } else {
      return `Criminal Hireling discovered. Insufficient funds (${formatGold(cost)} GP) for bribe; they were arrested and removed.`;
    }
  }
  handleExtraordinaryOpportunity() {
    if (this.finance >= 500) {
      this.finance -= 500;
      let secondEvt = this.handleAllIsWell();
      return `Paid ${formatGold(500)} GP to seize an Extraordinary Opportunity. Additional effect: ${secondEvt}`;
    } else {
      return `Extraordinary Opportunity requires 500 GP, but you lack the funds.`;
    }
  }
  handleFriendlyVisitors() {
    const d6 = Math.floor(Math.random() * 6) + 1;
    const gold = d6 * 100;
    this.finance += gold;
    let usedFacility = this.specialFacilities.length
      ? this.specialFacilities[Math.floor(Math.random() * this.specialFacilities.length)].name
      : "No special facility found";
    return `Friendly Visitors used ${usedFacility}, paying ${formatGold(gold)} GP.`;
  }
  handleGuest() {
    const roll = Math.floor(Math.random() * 4) + 1;
    if (roll === 1) {
      return "A famous bard visited, leaving a letter of recommendation.";
    } else if (roll === 2) {
      const d6 = Math.floor(Math.random() * 6) + 1;
      const gold = d6 * 100;
      this.finance += gold;
      return `A guest sought sanctuary, left a gift of ${formatGold(gold)} GP.`;
    } else if (roll === 3) {
      this.defenders += 2;
      return "A pair of mercenaries joined, increasing defenders by 2.";
    } else {
      return "A friendly creature is visiting. It will prevent your next Attack's defender losses once.";
    }
  }
  handleLostHirelings() {
    if (!this.specialFacilities.length) {
      return "Lost Hirelings event, but no special facilities to affect.";
    }
    const idx = Math.floor(Math.random() * this.specialFacilities.length);
    this.specialFacilities[idx].shutDownNextTurn = true;
    return `Hirelings at ${this.specialFacilities[idx].name} vanished; it shuts down next turn.`;
  }
  handleMagicalDiscovery() {
    return "Magical Discovery: You gained an Uncommon potion/scroll for free.";
  }
  handleRefugees() {
    const d4_1 = Math.floor(Math.random() * 4) + 1;
    const d4_2 = Math.floor(Math.random() * 4) + 1;
    const groupSize = d4_1 + d4_2;
    const d6 = Math.floor(Math.random() * 6) + 1;
    const gold = d6 * 100;
    this.finance += gold;
    return `Refugees: ${groupSize} arrived, paying ${formatGold(gold)} GP for sanctuary.`;
  }
  handleRequestForAid() {
    const defendersSent = Math.floor(this.defenders / 2);
    if (!defendersSent) return "Request for Aid ignored: no defenders to spare.";
    let total = 0;
    for (let i = 0; i < defendersSent; i++) {
      total += Math.floor(Math.random() * 6) + 1;
    }
    if (total >= 10) {
      const d6 = Math.floor(Math.random() * 6) + 1;
      const reward = d6 * 100;
      this.finance += reward;
      return `Sent ${defendersSent} defenders. Rolled ${total} >= 10 => success! Gained ${formatGold(reward)} GP.`;
    } else {
      const d6 = Math.floor(Math.random() * 6) + 1;
      const half = (d6 * 100) / 2;
      this.defenders = Math.max(0, this.defenders - 1);
      this.finance += half;
      return `Sent ${defendersSent} defenders. Rolled ${total} < 10 => partial success; gained ${formatGold(half)} GP, lost 1 defender.`;
    }
  }
  handleTreasure() {
    const roll = Math.floor(Math.random() * 100) + 1;
    let result = "";
    let detail = "";
    if (roll <= 40) {
      result = "25 GP art object";
      detail = this.rollOnTable("25 GP Art Objects");
    } else if (roll <= 63) {
      result = "250 GP art object";
      detail = this.rollOnTable("250 GP Art Objects");
    } else if (roll <= 73) {
      result = "750 GP art object";
      detail = this.rollOnTable("750 GP Art Objects");
    } else if (roll <= 75) {
      result = "2,500 GP art object";
      detail = this.rollOnTable("2,500 GP Art Objects");
    } else if (roll <= 90) {
      result = "Common Magic Items (4 options)";
      detail = this.rollMagicItems("Common", 4);
    } else if (roll <= 98) {
      result = "Uncommon Magic Items (4 options)";
      detail = this.rollMagicItems("Uncommon", 4);
    } else {
      result = "Rare Magic Items (4 options)";
      detail = this.rollMagicItems("Rare", 4);
    }
    return `Treasure found: ${result} (roll ${roll}). <li>${detail}`;
  }
  rollOnTable(tableName) {
    // Provide or load your own tables. Example partial placeholder:
    const tables = {
      "25 GP Art Objects": [
        "Silver ewer",
        "Carved bone statuette",
        "Gold bracelet",
        "Cloth-of-gold vestments",
        "Black velvet mask stitched with silver thread",
        "Copper chalice with silver filigree",
        "Pair of engraved bone dice",
        "Handheld mirror set in a painted wooden frame",
        "Embroidered silk handkerchief",
        "Gold locket with a painted portrait inside"
      ],
      "250 GP Art Objects": [
        "Gold ring set with bloodstones",
        "Carved ivory statuette",
        "Bejeweled gold bracelet",
        "Silver necklace with a gemstone pendant",
        "Bronze crown",
        "Silk vestments with gold embroidery",
        "Well-made tapestry (10 ft x 10 ft)",
        "Brass mug with jade inlay",
        "Box of turquoise animal figurines",
        "Gold birdcage with electrum filigree"
      ],
      "750 GP Art Objects": [
        "Silver chalice set with moonstones",
        "Bundle of lost dirges from a famous composer",
        "Carved wooden harp with ivory inlay and zircon gems",
        "Gold idol",
        "Gold comb shaped like a dragon with red garnets for eyes",
        "Bottle stopper cork embossed with gold leaf and set with amethysts",
        "Life-sized dragonborn skull cast in electrum",
        "Silver and gold brooch",
        "Obsidian statuette with gold fittings and inlay",
        "Painted gold war mask"
      ],
      "2,500 GP Art Objects": [
        "Fine gold chain set with a fire opal",
        "Old masterpiece painting",
        "Embroidered silk mantle set with numerous moonstones",
        "Platinum bracelet set with an emerald",
        "Embroidered glove set with jewel chips",
        "Jeweled anklet",
        "Gold music box",
        "Gold circlet set with aquamarines",
        "Eye patch with blue sapphires and moonstones",
        "A necklace string of small pink pearls"
      ]
    };
    const table = tables[tableName];
    if (!table) return "No table found.";
    const itemRoll = Math.floor(Math.random() * table.length);
    return table[itemRoll];
  }
  rollMagicItems(rarity, count = 1) {
    // Example placeholders:
    const exampleList = [
      `${rarity} Magic Item #1`,
      `${rarity} Magic Item #2`,
      `${rarity} Magic Item #3`,
      `${rarity} Magic Item #4`,
      `${rarity} Magic Item #5`
    ];
    let results = [];
    for (let i = 0; i < count; i++) {
      let idx = Math.floor(Math.random() * exampleList.length);
      results.push(exampleList[idx]);
    }
    return results.join(", ");
  }
}

/* A single global Bastion reference. */
let currentBastion = null;

/* Initialize a default Bastion with example data. */
function initializeBastion() {
  currentBastion = new Bastion("Adventurer", "My Bastion", 5);
  currentBastion.finance = 2000;
  currentBastion.defenders = 10;

  const kitchenDef = BASIC_FACILITIES_DEFINITIONS.find(d => d.facilityType === "Kitchen");
  const b1 = new BasicFacility(kitchenDef, "Roomy");
  currentBastion.basicFacilities.push(b1);

  const firstSpecialDef = SPECIAL_FACILITIES_FULL[0];
  if (firstSpecialDef) {
    const s1 = new SpecialFacility(firstSpecialDef, "Roomy");
    currentBastion.specialFacilities.push(s1);
  }

  updateUI();
  updateSpecialFacilityDropdown();
  updateOrderFacilityDropdown();
}

/* Update the main display of Bastion info. */
function updateUI() {
  if (!currentBastion) return;
  const infoDiv = document.getElementById("bastion-info-container");
  const { ownerName, bastionName, ownerLevel, finance, defenders, turnCount, otherStats } = currentBastion;

  let anniMsg = "";
  if (otherStats.totalDaysPassed && otherStats.totalDaysPassed % 365 === 0) {
    let years = otherStats.totalDaysPassed / 365;
    anniMsg = `<p><strong>It's been ${years} year(s) since founding!</strong></p>`;
  }
  infoDiv.innerHTML = `
    <p><strong>Owner:</strong> ${ownerName}</p>
    <p><strong>Bastion:</strong> ${bastionName}</p>
    <p><strong>Level:</strong> ${ownerLevel}</p>
    <p><strong>Defenders:</strong> ${defenders}</p>
    <p><strong>Turn:</strong> ${turnCount}</p>
    <p><strong>Days Passed:</strong> ${otherStats.totalDaysPassed}</p>
    ${anniMsg}
  `;

  document.getElementById("ownerNameInput").value = ownerName;
  document.getElementById("bastionNameInput").value = bastionName;
  document.getElementById("ownerLevelInput").value = ownerLevel;
  document.getElementById("canUseArcaneFocus").checked = currentBastion.ownerPrereqs.canUseArcaneFocus;
  document.getElementById("canUseHolySymbol").checked = currentBastion.ownerPrereqs.canUseHolySymbol;
  document.getElementById("hasFightingStyle").checked = currentBastion.ownerPrereqs.hasFightingStyle;
  document.getElementById("hasExpertise").checked = currentBastion.ownerPrereqs.hasExpertise;

  document.getElementById("finances-info").textContent = `Current Gold: ${formatGold(finance)} GP`;

  const facListDiv = document.getElementById("facilities-list");
  let basicHTML = "<ul>";
  currentBastion.basicFacilities.forEach(bf => {
    let enlargeNote = bf.enlargeInProgress ? ` (Enlarging: ${bf.enlargeTimeRemaining} days left)` : "";
    basicHTML += `
      <li>
        <strong>${bf.facilityType}</strong> (Space: ${bf.space})${enlargeNote}
        <div class="facility-description" style="margin:0.25rem 0;">${bf.description}</div>
        <button onclick="startBasicEnlargement('${bf.facilityType}')">Enlarge</button>
        <button onclick="removeFacility('${bf.facilityType}')">Remove</button>
      </li>`;
  });
  basicHTML += "</ul>";

  let specialHTML = "<ul>";
  currentBastion.specialFacilities.forEach(sf => {
    let enlargeNote = sf.enlargeInProgress ? ` (Enlarging: ${sf.enlargeTimeRemaining} days left)` : "";
    let shutMsg = sf.shutDownNextTurn ? " (Shut next turn)" : "";
    let usedMsg = sf.orderUsedThisTurn ? " [Order used]" : "";
    specialHTML += `
      <li>
        <strong>${sf.name}</strong> (Space: ${sf.space})${shutMsg}${enlargeNote}${usedMsg}
        <div class="facility-description" style="margin:0.25rem 0;">${sf.description}</div>
        <button onclick="startSpecialEnlargement('${sf.name}')">Enlarge</button>
        <button onclick="removeFacility('${sf.name}')">Remove</button>
      </li>
    `;
  });
  specialHTML += "</ul>";

  facListDiv.innerHTML = `
    <h3>Basic</h3>
    ${basicHTML}
    <h3>Special</h3>
    ${specialHTML}
  `;
}

/* Refresh special facility dropdown to only show those the Bastion qualifies for. */
function updateSpecialFacilityDropdown() {
  if (!currentBastion) return;
  const sfSel = document.getElementById("specialFacilitySelect");
  sfSel.innerHTML = "";
  SPECIAL_FACILITIES_FULL.forEach(def => {
    if (currentBastion.ownerLevel < def.levelReq) return;

    // Check broad prerequisite strings (ArcaneFocus, HolySymbol, etc.).
    if (def.prereq === "Ability to use an Arcane Focus or tool as a Spellcasting Focus" 
        && !currentBastion.ownerPrereqs.canUseArcaneFocus) return;
    if (def.prereq === "Ability to use a Holy Symbol or Druidic Focus as a Spellcasting Focus" 
        && !currentBastion.ownerPrereqs.canUseHolySymbol) return;
    if (def.prereq === "Fighting Style feature or Unarmored Defense feature" 
        && !currentBastion.ownerPrereqs.hasFightingStyle) return;
    if (def.prereq === "Expertise in a skill" 
        && !currentBastion.ownerPrereqs.hasExpertise) return;

    let opt = document.createElement("option");
    opt.value = def.name;
    opt.textContent = `${def.name} (Lv ${def.levelReq})`;
    sfSel.appendChild(opt);
  });
}

/* Populate the facility in the “Orders” dropdown. */
function updateOrderFacilityDropdown() {
  if (!currentBastion) return;
  const facSel = document.getElementById("facilityOrderSelect");
  facSel.innerHTML = "";
  currentBastion.specialFacilities.forEach(sf => {
    let opt = document.createElement("option");
    opt.value = sf.name;
    opt.textContent = sf.name;
    facSel.appendChild(opt);
  });
  updateOrdersForSelectedFacility();
}

/* After picking a special facility in the orders UI, fill the second dropdown with possible orders. */
function updateOrdersForSelectedFacility() {
  const orderSel = document.getElementById("orderTypeSelect");
  orderSel.innerHTML = "";
  const facSelVal = document.getElementById("facilityOrderSelect").value;
  if (!facSelVal) return;
  const facility = currentBastion.specialFacilities.find(sf => sf.name === facSelVal);
  if (!facility) return;
  facility.possibleOrders.forEach(o => {
    let opt = document.createElement("option");
    opt.value = o;
    opt.textContent = o;
    orderSel.appendChild(opt);
  });
}

/* Start enlargement on a basic facility. */
window.startBasicEnlargement = function(typeName) {
  if (!currentBastion) return;
  const bf = currentBastion.basicFacilities.find(b => b.facilityType === typeName);
  if (!bf) return;
  if (bf.enlargeInProgress) {
    logEvent(`Enlargement already in progress for ${bf.facilityType}.`);
    return;
  }
  if (bf.space === "Vast") {
    logEvent(`${bf.facilityType} is already Vast, cannot enlarge further.`);
    return;
  }
  const nextSize = (bf.space === "Cramped") ? "Roomy" : "Vast";
  const path = `${bf.space}->${nextSize}`;
  const defObj = BASIC_FACILITIES_DEFINITIONS.find(d => d.facilityType === bf.facilityType);
  if (!defObj || !defObj.enlargeCosts) {
    logEvent(`No enlarge cost defined for ${bf.facilityType}.`);
    return;
  }
  const cost = defObj.enlargeCosts[path];
  if (!cost) {
    logEvent(`No valid enlarge cost for ${bf.facilityType} going from ${bf.space} to ${nextSize}.`);
    return;
  }
  let enlargeTime = 25; 
  if (bf.space === "Roomy") enlargeTime = 80; 
  if (defObj.enlargeTimes && defObj.enlargeTimes[path]) {
    enlargeTime = defObj.enlargeTimes[path];
  }
  if (currentBastion.finance < cost) {
    logEvent(`Not enough gold to enlarge ${bf.facilityType}. Need ${formatGold(cost)} GP.`);
    return;
  }
  currentBastion.finance -= cost;
  bf.enlargeInProgress = true;
  bf.enlargeTimeRemaining = enlargeTime;
  logEvent(`Enlarging ${bf.facilityType} from ${bf.space} -> ${nextSize}. Paid ${formatGold(cost)} GP. Will complete in ~${enlargeTime} days.`);
  updateUI();
};

/* Start enlargement on a special facility. */
window.startSpecialEnlargement = function(facName) {
  if (!currentBastion) return;
  const sf = currentBastion.specialFacilities.find(s => s.name === facName);
  if (!sf) return;
  if (!sf.canEnlarge) {
    logEvent(`${sf.name} cannot be enlarged by its rules.`);
    return;
  }
  if (sf.enlargeInProgress) {
    logEvent(`Enlargement already in progress for ${sf.name}.`);
    return;
  }
  if (sf.space === "Vast") {
    logEvent(`${sf.name} is already Vast, cannot enlarge further.`);
    return;
  }
  const nextSize = (sf.space === "Cramped") ? "Roomy" : "Vast";
  const path = `${sf.space}->${nextSize}`;
  if (!sf.defObj.enlargeCosts) {
    logEvent(`${sf.name} has no enlargeCosts defined, cannot enlarge.`);
    return;
  }
  const cost = sf.defObj.enlargeCosts[path];
  if (!cost) {
    logEvent(`No valid enlarge cost for ${sf.name} going from ${sf.space} to ${nextSize}.`);
    return;
  }
  let enlargeTime = 25; 
  if (sf.space === "Roomy") enlargeTime = 80; 
  if (sf.defObj.enlargeTimes && sf.defObj.enlargeTimes[path]) {
    enlargeTime = sf.defObj.enlargeTimes[path];
  }
  if (currentBastion.finance < cost) {
    logEvent(`Not enough gold to enlarge ${sf.name}. Need ${formatGold(cost)} GP.`);
    return;
  }
  currentBastion.finance -= cost;
  sf.enlargeInProgress = true;
  sf.enlargeTimeRemaining = enlargeTime;
  logEvent(`Enlarging ${sf.name} from ${sf.space} -> ${nextSize}. Paid ${formatGold(cost)} GP. Will complete in ~${enlargeTime} days.`);
  updateUI();
};

/* Remove a facility from the Bastion. */
window.removeFacility = function(ident) {
  if (!currentBastion) return;
  currentBastion.removeFacility(ident);
  logEvent(`Removed facility: ${ident}`);
  updateUI();
  updateOrderFacilityDropdown();
};

/* Add a Basic Facility (using default space from the definition). */
window.handleAddBasicFacility = function() {
  if (!currentBastion) return;
  const typeVal = document.getElementById("basicFacilityType").value;
  const defObj = BASIC_FACILITIES_DEFINITIONS.find(d => d.facilityType === typeVal);
  if (!defObj) {
    logEvent(`No definition found for basic facility type: ${typeVal}`);
    return;
  }
  const bf = new BasicFacility(defObj, undefined);
  currentBastion.basicFacilities.push(bf);
  logEvent(`Added Basic Facility: (defaultSpace) ${typeVal}<br>${bf.description}`);
  updateUI();
};

/* Add a Special Facility (using default space from the definition). */
window.handleAddSpecialFacility = function() {
  if (!currentBastion) return;
  const nameSel = document.getElementById("specialFacilitySelect").value;
  const def = SPECIAL_FACILITIES_FULL.find(d => d.name === nameSel);
  if (!def) {
    logEvent("No definition found or missing prereq for that special facility.");
    return;
  }
  const sf = new SpecialFacility(def, undefined);
  currentBastion.specialFacilities.push(sf);
  logEvent(`Added Special Facility: ${nameSel} (defaultSpace)<br>${sf.description}`);
  updateUI();
  updateOrderFacilityDropdown();
};

/* Issue an order to a special facility. */
window.issueOrder = function() {
  if (!currentBastion) return;
  const facName = document.getElementById("facilityOrderSelect").value;
  const orderVal = document.getElementById("orderTypeSelect").value;
  if (!facName || !orderVal) return;
  const sf = currentBastion.specialFacilities.find(s => s.name === facName);
  if (!sf) {
    document.getElementById("orderResult").textContent = "No such special facility.";
    return;
  }
  if (sf.orderUsedThisTurn) {
    document.getElementById("orderResult").textContent = `${sf.name} has already used an order this turn.`;
    return;
  }
  if (sf.shutDownNextTurn) {
    document.getElementById("orderResult").textContent = `${sf.name} is shut down, cannot take orders.`;
    return;
  }
  let resultText = handleFacilityOrder(sf, orderVal);
  sf.orderUsedThisTurn = true;
  document.getElementById("orderResult").innerHTML = resultText;
  logEvent(`Order: ${sf.name} (${orderVal}) => ${resultText}`);
  updateUI();
};

/* This function reads subOrders from the facility definition and returns a textual effect. */
function handleFacilityOrder(sf, order) {
  const baseOrder = order; 
  let result = "";
  let genericMsg = `<strong>${sf.name} performed a ${baseOrder} order.</strong> 7 days pass. Refer to facility description for outcome.`;

  switch (sf.name) {
    case "Aviary":
      if (baseOrder === "Recruit") {
        result = `Training an Avian Friend takes 7 days. You can now send "Aerial Orders" via your trained companion.`;
      } else {
        result = genericMsg;
      }
      break;
    case "Arcane Study":
      if (baseOrder === "Craft") {
        result = `The Arcane Study's hireling crafts (Focus/Book/Magic Item) over ~7 days. Costs vary; see facility details.`;
      } else {
        result = genericMsg;
      }
      break;
    case "Archive":
      if (baseOrder === "Research") {
        result = `The Archive hireling spends 7 days researching. You gain <em>Legend Lore</em>-style info.`;
      } else {
        result = genericMsg;
      }
      break;
    case "Armory":
      if (baseOrder === "Trade") {
        result = `Armory is stocked in 7 days. Costs 100 GP + 100 GP/Defender (halved if Smithy present). Roll d8 instead of d6 when attacked.`;
      } else {
        result = genericMsg;
      }
      break;
    case "Barrack":
      if (baseOrder === "Recruit") {
        result = `You recruit up to four new Bastion Defenders in 7 days at no cost (if space remains).`;
      } else {
        result = genericMsg;
      }
      break;
    case "Demiplane":
      if (baseOrder === "Empower") {
        result = `Arcane Resilience runes appear for 7 days. After a Long Rest in the Demiplane, gain Temp HP = 5 x your level.`;
      } else {
        result = genericMsg;
      }
      break;
    case "Gaming Hall":
      if (baseOrder === "Trade") {
        result = `The Gaming Hall runs a gambling den for 7 days. Roll 1d100 for winnings or see randomEffects.`;
      } else {
        result = genericMsg;
      }
      break;
    case "Garden":
      if (baseOrder === "Harvest") {
        result = `Garden is harvested over 7 days. Output depends on Garden type (Decorative, Food, Herb, Poison).`;
      } else {
        result = genericMsg;
      }
      break;
    case "Greenhouse":
      if (baseOrder === "Harvest") {
        result = `Greenhouse yields either a free Potion of Healing (greater) or a Poison type in 7 days. Fruit of Restoration also available daily.`;
      } else {
        result = genericMsg;
      }
      break;
    case "Guildhall":
      if (baseOrder === "Recruit") {
        result = `Guild members do a special assignment (Adventurers, Bakers, etc.) in 7+ days, offering unique rewards.`;
      } else {
        result = genericMsg;
      }
      break;
    case "Laboratory":
      if (baseOrder === "Craft") {
        result = `Lab crafts alchemical supplies or certain poisons in 7 days, half the usual poison cost.`;
      } else {
        result = genericMsg;
      }
      break;
    case "Library":
      if (baseOrder === "Research") {
        result = `Library hireling researches a topic for 7 days, discovering up to three pieces of new information.`;
      } else {
        result = genericMsg;
      }
      break;
    case "Meditation Chamber":
      if (baseOrder === "Empower") {
        result = `Inner Peace: next Bastion event, roll twice. Also consider "Fortify Self" downtime for random saving throws.`;
      } else {
        result = genericMsg;
      }
      break;
    case "Menagerie":
      if (baseOrder === "Recruit") {
        result = `Menagerie hirelings spend 7 days acquiring a creature; costs vary by CR. Creatures can defend or remain neutral.`;
      } else {
        result = genericMsg;
      }
      break;
    case "Observatory":
      if (baseOrder === "Empower") {
        result = `Eldritch Discovery: 7 nights of star-gazing. Odd roll yields a random Charm (Darkvision, Heroism, or Vitality).`;
      } else {
        result = genericMsg;
      }
      break;
    case "Pub":
      if (baseOrder === "Research") {
        result = `Information Gathering: 7 days. The bartender's spies locate known creatures within 50 miles if unhidden by magic.`;
      } else {
        result = genericMsg;
      }
      break;
    case "Reliquary":
      if (baseOrder === "Harvest") {
        result = `Hireling prepares a Talisman in 7 days, substituting for up to 1,000 GP in consumed spell components once.`;
      } else {
        result = genericMsg;
      }
      break;
    case "Sacristy":
      if (baseOrder === "Craft") {
        result = `Create Holy Water (7 days, optionally pay GP for bonus damage) or craft a Common/Uncommon Relic.`;
      } else {
        result = genericMsg;
      }
      break;
    case "Sanctuary":
      if (baseOrder === "Craft") {
        result = `Hireling creates a Druidic Focus or Holy Symbol in 7 days at no cost. Gain a weekly Healing Word charm.`;
      } else {
        result = genericMsg;
      }
      break;
    case "Sanctum":
      if (baseOrder === "Empower") {
        result = `Fortifying Rites: 7 days, each long rest gives Temp HP = your level for 7 days. Also have Word of Recall to Sanctum.`;
      } else {
        result = genericMsg;
      }
      break;
    case "Scriptorium":
      if (baseOrder === "Craft") {
        result = `Scriptorium can copy a book in 7 days, scribe a Spell Scroll, or produce up to 50 pamphlets.`;
      } else {
        result = genericMsg;
      }
      break;
    case "Smithy":
      if (baseOrder === "Craft") {
        result = `Smithy can craft mundane items or a Common/Uncommon Armament (lvl 9+). 7+ days plus crafting cost.`;
      } else {
        result = genericMsg;
      }
      break;
    case "Stable":
      if (baseOrder === "Trade") {
        result = `Stable can buy or sell mounts in 7 days. Profit margin improves with your level.`;
      } else {
        result = genericMsg;
      }
      break;
    case "Storehouse":
      if (baseOrder === "Trade") {
        result = `Storehouse can buy or sell up to 500 GP of goods (scales with level) in 7 days, with markup 10%-100%.`;
      } else {
        result = genericMsg;
      }
      break;
    case "Teleportation Circle":
      if (baseOrder === "Recruit") {
        result = `Invite a Friendly NPC spellcaster (roll odd/even). Even means they arrive for 14 days and can cast up to 4th-level spells.`;
      } else {
        result = genericMsg;
      }
      break;
    case "Theater":
      if (baseOrder === "Empower") {
        result = `After 14 days rehearsal and 7+ days performance, each contributor who passes DC 15 Performance gains a Theater die.`;
      } else {
        result = genericMsg;
      }
      break;
    case "Training Area":
      if (baseOrder === "Empower") {
        result = `Training exercises over 7 days. Participants gain a 7-day benefit depending on the trainer type (Battle, Skills, etc.).`;
      } else {
        result = genericMsg;
      }
      break;
    case "Trophy Room":
      if (baseOrder === "Research") {
        result = `7 days of research reveals 3 new pieces of lore or you can attempt a Trinket Trophy roll for a Common item on even roll.`;
      } else {
        result = genericMsg;
      }
      break;
    case "War Room":
      if (baseOrder === "Recruit") {
        result = `Recruit a new Veteran lieutenant (max 10) or muster up to 100 Guards per lieutenant. Costs 1 GP/day each.`;
      } else {
        result = genericMsg;
      }
      break;
    case "Workshop":
      if (baseOrder === "Craft") {
        result = `Workshop crafts mundane gear or a Common/Uncommon Implement (lvl 9+). Also grants Heroic Inspiration once per Short Rest.`;
      } else {
        result = genericMsg;
      }
      break;
    default:
      result = genericMsg;
      break;
  }
  return result;
}

/* Next Turn button: progress time and run a random event. */
window.handleNextTurn = function() {
  if (!currentBastion) return;
  currentBastion.nextTurn();
  let shutting = currentBastion.specialFacilities.filter(f => f.shutDownNextTurn);
  shutting.forEach(f => {
    logEvent(`${f.name} is offline this turn due to damage. It is repaired afterward.`);
    f.shutDownNextTurn = false;
  });
  let eventText = currentBastion.maintainAndTriggerEvent();
  logEvent(`Turn ${currentBastion.turnCount}: ${eventText}`);
  updateUI();
};

/* Update Bastion details from user input. */
window.updatePlayerInfo = function() {
  if (!currentBastion) return;
  const newName = document.getElementById("ownerNameInput").value;
  const newBName = document.getElementById("bastionNameInput").value;
  const newLevel = parseInt(document.getElementById("ownerLevelInput").value, 10);
  currentBastion.ownerName = newName;
  currentBastion.bastionName = newBName;
  currentBastion.ownerLevel = isNaN(newLevel) ? currentBastion.ownerLevel : newLevel;

  currentBastion.ownerPrereqs.canUseArcaneFocus = document.getElementById("canUseArcaneFocus").checked;
  currentBastion.ownerPrereqs.canUseHolySymbol = document.getElementById("canUseHolySymbol").checked;
  currentBastion.ownerPrereqs.hasFightingStyle = document.getElementById("hasFightingStyle").checked;
  currentBastion.ownerPrereqs.hasExpertise = document.getElementById("hasExpertise").checked;

  logEvent(`Updated Info: Name=${newName}, Bastion=${newBName}, Level=${currentBastion.ownerLevel}`);
  updateUI();
  updateSpecialFacilityDropdown();
  updateOrderFacilityDropdown();
};

/* Finance operations. */
window.handleAddMoney = function() {
  if (!currentBastion) return;
  const amt = parseInt(document.getElementById("financeChange").value, 10);
  if (amt > 0) {
    currentBastion.finance += amt;
    logEvent(`Added ${formatGold(amt)} GP.`);
    updateUI();
  }
};
window.handleRemoveMoney = function() {
  if (!currentBastion) return;
  const amt = parseInt(document.getElementById("financeChange").value, 10);
  if (amt > 0 && currentBastion.finance >= amt) {
    currentBastion.finance -= amt;
    logEvent(`Removed ${formatGold(amt)} GP.`);
    updateUI();
  } else {
    logEvent(`Insufficient funds or invalid removal: ${formatGold(amt)} GP.`);
  }
};

/* Logs new events at the top of the event log. */
function logEvent(message) {
  const logDiv = document.getElementById("event-log");
  const p = document.createElement("p");
  p.innerHTML = message;
  if (logDiv.firstChild) {
    logDiv.insertBefore(p, logDiv.firstChild);
  } else {
    logDiv.appendChild(p);
  }
}

/* Initialize all UI elements on window load. */
function initBastionDescriptionUI() {
  populateBastionDescDropdown();
  populateBastionQuirkDropdown();
  document.getElementById("bastionDescRollBtn").addEventListener("click", handleBastionDescRollOrPick);
  document.getElementById("bastionDescDropdown").addEventListener("change", handleBastionDescDropdownChange);
  document.getElementById("bastionDescApplyCustom").addEventListener("click", handleBastionDescApplyCustom);
  document.getElementById("bastionQuirkRollBtn").addEventListener("click", handleBastionQuirkRollOrPick);
  document.getElementById("bastionQuirkDropdown").addEventListener("change", handleBastionQuirkDropdownChange);
  document.getElementById("bastionQuirkApplyCustom").addEventListener("click", handleBastionQuirkApplyCustom);
  loadBastionDescAndQuirkFromCookie();
}

window.onload = () => {
  initializeBastion();
  document.getElementById("updateInfoBtn").addEventListener("click", updatePlayerInfo);
  document.getElementById("addMoneyBtn").addEventListener("click", handleAddMoney);
  document.getElementById("removeMoneyBtn").addEventListener("click", handleRemoveMoney);
  document.getElementById("addBasicFacilityBtn").addEventListener("click", handleAddBasicFacility);
  document.getElementById("addSpecialFacilityBtn").addEventListener("click", handleAddSpecialFacility);
  document.getElementById("facilityOrderSelect").addEventListener("change", updateOrdersForSelectedFacility);
  document.getElementById("issueOrderBtn").addEventListener("click", issueOrder);
  document.getElementById("nextTurnBtn").addEventListener("click", handleNextTurn);
  initBastionDescriptionUI();
};
