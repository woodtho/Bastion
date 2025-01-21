/* Inline comments clarify what is happening and why, referencing new facility imports. */

/******************************************************************
  We now import our facility definitions from separate files:
  - BASIC_FACILITIES_DEFINITIONS for the basic ones
  - SPECIAL_FACILITIES_FULL for the special ones
******************************************************************/
import { BASIC_FACILITIES_DEFINITIONS } from "./facilities/basic/basicFacilitiesIndex.mjs";
import { SPECIAL_FACILITIES_FULL } from "./facilities/special/specialFacilitiesIndex.mjs";

import {
  BASTION_DESCRIPTIONS,
  BASTION_QUIRKS,
  getBastionDescriptionByRoll,
  getRandomBastionDescription,
  getBastionQuirkByRoll,
  getRandomBastionQuirk
} from "./bastionDescriptions.mjs"; // adjust path to match your setup

// Global or module-level variables to store user’s chosen text
let chosenBastionDescription = "";
let chosenBastionQuirk = "";

/******************************************************************
  Helpers for Cookies
  (Alternatively, consider localStorage; but here’s simple cookie usage)
******************************************************************/
function setCookie(name, value, days = 30) {
  // Creates/updates a cookie with an expiration in X days
  const d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  const expires = "expires="+ d.toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/`;
}

function getCookie(name) {
  // Returns the cookie string if found, else empty string
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

/******************************************************************
  UI Setup: Populate dropdowns, load from cookie
******************************************************************/
function populateBastionDescDropdown() {
  const selectEl = document.getElementById("bastionDescDropdown");
  // Clear existing options (besides placeholder)
  while (selectEl.options.length > 1) {
    selectEl.remove(1);
  }
  // Populate
  BASTION_DESCRIPTIONS.forEach(entry => {
    const opt = document.createElement("option");
    opt.value = entry.roll; // store the roll number
    opt.textContent = `${entry.roll}: ${entry.name}`;
    selectEl.appendChild(opt);
  });
}

function populateBastionQuirkDropdown() {
  const selectEl = document.getElementById("bastionQuirkDropdown");
  // Clear existing
  while (selectEl.options.length > 1) {
    selectEl.remove(1);
  }
  // Populate
  BASTION_QUIRKS.forEach(entry => {
    const opt = document.createElement("option");
    opt.value = entry.roll;
    opt.textContent = `${entry.roll}: ${entry.text.substring(0,40)}...`; 
    // trim text for brevity in dropdown
    selectEl.appendChild(opt);
  });
}

// load saved user data from cookie
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

/******************************************************************
  Event Handlers for Bastion Description
******************************************************************/
function handleBastionDescRollOrPick() {
  const numInput = document.getElementById("bastionDescNumber").value;
  let rollNum = parseInt(numInput, 10);
  if (Number.isNaN(rollNum) || rollNum < 1 || rollNum > 100) {
    // If invalid or zero, do a random pick
    const randomEntry = getRandomBastionDescription();
    chosenBastionDescription = `${randomEntry.name}\n\n${randomEntry.text}`;
  } else {
    // manual roll (1..100)
    const entry = getBastionDescriptionByRoll(rollNum);
    if (entry) {
      chosenBastionDescription = `${entry.name}\n\n${entry.text}`;
    } else {
      chosenBastionDescription = "No matching entry found for that roll.";
    }
  }
  // Update UI, store cookie
  document.getElementById("bastionDescOutput").textContent = chosenBastionDescription;
  setCookie("bastionDescription", chosenBastionDescription);
}

function handleBastionDescDropdownChange() {
  const ddVal = document.getElementById("bastionDescDropdown").value;
  if (!ddVal) return; // user picked placeholder
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

/******************************************************************
  Event Handlers for Bastion Quirk
******************************************************************/
function handleBastionQuirkRollOrPick() {
  const numInput = document.getElementById("bastionQuirkNumber").value;
  let rollNum = parseInt(numInput, 10);
  if (Number.isNaN(rollNum) || rollNum < 1 || rollNum > 100) {
    const randomEntry = getRandomBastionQuirk();
    chosenBastionQuirk = randomEntry.text;
  } else {
    const entry = getBastionQuirkByRoll(rollNum);
    if (entry) {
      chosenBastionQuirk = entry.text;
    } else {
      chosenBastionQuirk = "No matching entry found for that roll.";
    }
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


/* Toggles collapsible sections on click */
window.toggleCollapse  = function toggleCollapse(headerElement) {
  // Retrieve the parent section to toggle its collapsed state
  const parent = headerElement.parentElement;
  // Check the current state and flip the value
  if (parent.dataset.collapsed === "true") {
    parent.dataset.collapsed = "false"; // Expand the content
  } else {
    parent.dataset.collapsed = "true"; // Collapse the content
  }
}

/*
  Helper: format gold amounts with commas, e.g. 1,234 instead of 1234
*/
function formatGold(gp) {
  return gp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/******************************************************************
  Random Event Table
******************************************************************/
const EVENT_TABLE = [
  // Weighted by occurrences in the array
  { rollMin: 1, rollMax: 40, method: "handleAllIsWell" },
  { rollMin: 41, rollMax: 48, method: "handleAttack" },
  { rollMin: 49, rollMax: 52, method: "handleCriminalHireling" },
  { rollMin: 53, rollMax: 57, method: "handleExtraordinaryOpportunity" },
  { rollMin: 58, rollMax: 67, method: "handleFriendlyVisitors" },
  { rollMin: 68, rollMax: 72, method: "handleGuest" },
  { rollMin: 73, rollMax: 75, method: "handleLostHirelings" },
  { rollMin: 76, rollMax: 79, method: "handleMagicalDiscovery" },
  { rollMin: 80, rollMax: 88, method: "handleRefugees" },
  { rollMin: 89, rollMax: 97, method: "handleRequestForAid" },
  { rollMin: 98, rollMax: 100, method: "handleTreasure" },
];

/******************************************************************
  Basic costs/times for new facilities, enlargement
******************************************************************/
const ADD_FACILITY_COSTS = {
  Cramped: { cost: 500, time: 20 },
  Roomy: { cost: 1000, time: 45 },
  Vast: { cost: 3000, time: 125 },
};

const ENLARGE_FACILITY_COSTS = {
  "Cramped->Roomy": { cost: 500, time: 25 },
  "Roomy->Vast": { cost: 2000, time: 80 },
};

/******************************************************************
  BasicFacility class
  Now we accept a definition object instead of just a type string.
******************************************************************/
class BasicFacility {
  constructor(defObj, chosenSpace) {
    // Use data from the definition object
    this.facilityType = defObj.facilityType;
    this.description = defObj.description; 
    this.space = chosenSpace;
    this.enlargeInProgress = false;
    this.enlargeTimeRemaining = 0;
  }
}

/******************************************************************
  SpecialFacility class
  - track enlargement
  - track once-per-turn usage
  - store possible orders and any daily/weekly bonuses
******************************************************************/
class SpecialFacility {
  constructor(defObj, chosenSpace) {
    // The new definitions use defObj.name, defObj.levelReq, etc.
    this.name = defObj.name;
    this.requiredLevel = defObj.levelReq;
    this.prerequisite = defObj.prereq;
    this.canEnlarge = defObj.canEnlarge;
    // The new definitions have baseOrderOptions
    this.possibleOrders = defObj.baseOrderOptions || [];
    // Additional optional data if needed
    this.description = defObj.desc || "";
    this.subOrders = defObj.subOrders || {};

    this.space = chosenSpace;
    this.shutDownNextTurn = false;
    this.enlargeInProgress = false;
    this.enlargeTimeRemaining = 0;
    this.orderUsedThisTurn = false;
    this.charmCooldown = 0; // e.g. once per 7 days usage
  }
}

/******************************************************************
  Bastion class
******************************************************************/
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

  nextTurn() {
    this.turnCount++;
    this.otherStats.totalDaysPassed += 7;
    // Reset each facility's order usage, reduce enlargement time, reduce charm cooldown
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
    // Basic facilities: handle enlargement
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

  removeFacility(identifier) {
    this.basicFacilities = this.basicFacilities.filter(b => b.facilityType !== identifier);
    this.specialFacilities = this.specialFacilities.filter(s => s.name !== identifier);
  }

  // Bastion events
  maintainAndTriggerEvent() {
    const roll = Math.floor(Math.random() * 100) + 1;
    const entry = EVENT_TABLE.find(e => roll >= e.rollMin && roll <= e.rollMax);
    if (!entry) return "All Is Well (no matching event).";
    return this[entry.method](); // calls e.g. handleAllIsWell()
  }

  handleAllIsWell() {
    const details = [
      "Accident reports are way down.",
      "The leak in the roof has been fixed.",
      "No vermin infestations to report.",
      "A lost cat was found wandering the halls.",
      "Someone discovered a hidden storeroom.",
      "A local minstrel wrote a song about your Bastion.",
      "A bright comet was seen overhead at night.",
      "A pair of traveling monks blessed the grounds for free.",
    ];
    const r = Math.floor(Math.random() * details.length);
    return `All Is Well: ${details[r]}`;
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
    // bribe 1d6 * 100
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
    // cost 500
    if (this.finance >= 500) {
      this.finance -= 500;
      let secondEvt = this.handleAllIsWell();
      return `Paid ${formatGold(500)} GP to seize an Extraordinary Opportunity. Additional effect: ${secondEvt}`;
    } else {
      return `Extraordinary Opportunity requires 500 GP, but you lack the funds.`;
    }
  }

  handleFriendlyVisitors() {
    // 1d6 x 100
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
    if (roll <= 40) result = "25 GP art object";
    else if (roll <= 63) result = "250 GP art object";
    else if (roll <= 73) result = "750 GP art object";
    else if (roll <= 75) result = "2,500 GP art object";
    else if (roll <= 90) result = "Common Magic Item";
    else if (roll <= 98) result = "Uncommon Magic Item";
    else result = "Rare Magic Item";
    return `Treasure found: ${result} (roll ${roll}).`;
  }
}

/******************************************************************
  Global reference to our current Bastion
******************************************************************/
let currentBastion = null;

/******************************************************************
  Initialize with a sample Bastion
******************************************************************/
function initializeBastion() {
  currentBastion = new Bastion("Adventurer", "My Bastion", 5);
  currentBastion.finance = 2000;
  currentBastion.defenders = 10;

  // Add one Basic facility from the imported definitions for demonstration
  const kitchenDef = BASIC_FACILITIES_DEFINITIONS.find(d => d.facilityType === "Kitchen");
  const b1 = new BasicFacility(kitchenDef, "Roomy");
  currentBastion.basicFacilities.push(b1);

  // Add one Special facility from the imported definitions for demonstration
  // This grabs the first special facility in the array (could be ArcaneStudy, etc.)
  const firstSpecialDef = SPECIAL_FACILITIES_FULL[0]; 
  if (firstSpecialDef) {
    const s1 = new SpecialFacility(firstSpecialDef, "Roomy");
    currentBastion.specialFacilities.push(s1);
  }

  updateUI();
  updateSpecialFacilityDropdown();
  updateOrderFacilityDropdown();
}

/******************************************************************
  Updating the UI
******************************************************************/
function updateUI() {
  if (!currentBastion) return;

  // Bastion Info
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

  // Set form fields
  document.getElementById("ownerNameInput").value = ownerName;
  document.getElementById("bastionNameInput").value = bastionName;
  document.getElementById("ownerLevelInput").value = ownerLevel;

  document.getElementById("canUseArcaneFocus").checked = currentBastion.ownerPrereqs.canUseArcaneFocus;
  document.getElementById("canUseHolySymbol").checked = currentBastion.ownerPrereqs.canUseHolySymbol;
  document.getElementById("hasFightingStyle").checked = currentBastion.ownerPrereqs.hasFightingStyle;
  document.getElementById("hasExpertise").checked = currentBastion.ownerPrereqs.hasExpertise;

  // Finances
  document.getElementById("finances-info").textContent = `Current Gold: ${formatGold(finance)} GP`;

  // Facilities
  const facListDiv = document.getElementById("facilities-list");
  let basicHTML = "<ul>";
  currentBastion.basicFacilities.forEach(bf => {
    let enlargeNote = bf.enlargeInProgress ? ` (Enlarging: ${bf.enlargeTimeRemaining} days left)` : "";
    basicHTML += `
      <li>
        <strong>${bf.facilityType}</strong> (Space: ${bf.space})${enlargeNote}
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

/******************************************************************
  Collapsible toggles are handled by toggleCollapse
******************************************************************/

/******************************************************************
  Updating the special facility dropdown
  - Now uses SPECIAL_FACILITIES_FULL
  - Checks levelReq / prereq
******************************************************************/
function updateSpecialFacilityDropdown() {
  if (!currentBastion) return;
  const sfSel = document.getElementById("specialFacilitySelect");
  sfSel.innerHTML = "";

  SPECIAL_FACILITIES_FULL.forEach(def => {
    // Filter based on owner level
    if (currentBastion.ownerLevel < def.levelReq) return;
    // Filter based on prerequisite
    if (def.prereq === "ArcaneFocus" && !currentBastion.ownerPrereqs.canUseArcaneFocus) return;
    if (def.prereq === "HolySymbol" && !currentBastion.ownerPrereqs.canUseHolySymbol) return;
    if (def.prereq === "FightingStyle" && !currentBastion.ownerPrereqs.hasFightingStyle) return;
    if (def.prereq === "Expertise" && !currentBastion.ownerPrereqs.hasExpertise) return;

    let opt = document.createElement("option");
    opt.value = def.name;
    opt.textContent = `${def.name} (Lv ${def.levelReq})`;
    sfSel.appendChild(opt);
  });
}

/******************************************************************
  Updating the orders dropdown to show only valid orders for the chosen facility
******************************************************************/
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

/******************************************************************
  EVENT HANDLERS
******************************************************************/
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
  const path = bf.space === "Cramped" ? "Cramped->Roomy" : "Roomy->Vast";
  const { cost, time } = ENLARGE_FACILITY_COSTS[path];
  if (currentBastion.finance < cost) {
    logEvent(`Not enough gold to enlarge ${bf.facilityType}. Need ${formatGold(cost)} GP.`);
    return;
  }
  currentBastion.finance -= cost;
  bf.enlargeInProgress = true;
  bf.enlargeTimeRemaining = time;
  logEvent(`Enlarging ${bf.facilityType} from ${bf.space} -> next size. Paid ${formatGold(cost)} GP. Will complete in ~${time} days.`);
  updateUI();
};

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
  const path = sf.space === "Cramped" ? "Cramped->Roomy" : "Roomy->Vast";
  const { cost, time } = ENLARGE_FACILITY_COSTS[path];
  if (currentBastion.finance < cost) {
    logEvent(`Not enough gold to enlarge ${sf.name}. Need ${formatGold(cost)} GP.`);
    return;
  }
  currentBastion.finance -= cost;
  sf.enlargeInProgress = true;
  sf.enlargeTimeRemaining = time;
  logEvent(`Enlarging ${sf.name} from ${sf.space} -> next size. Paid ${formatGold(cost)} GP. Will complete in ~${time} days.`);
  updateUI();
};

window.removeFacility = function(ident) {
  if (!currentBastion) return;
  currentBastion.removeFacility(ident);
  logEvent(`Removed facility: ${ident}`);
  updateUI();
  updateOrderFacilityDropdown();
};

window.handleAddBasicFacility = function() {
  if (!currentBastion) return;
  const typeVal = document.getElementById("basicFacilityType").value;
  const spaceVal = document.getElementById("basicFacilitySpace").value;
  // Look up the definition in BASIC_FACILITIES_DEFINITIONS
  const defObj = BASIC_FACILITIES_DEFINITIONS.find(d => d.facilityType === typeVal);
  if (!defObj) {
    logEvent(`No definition found for basic facility type: ${typeVal}`);
    return;
  }
  const bf = new BasicFacility(defObj, spaceVal);
  currentBastion.basicFacilities.push(bf);
  logEvent(`Added Basic Facility: ${spaceVal} ${typeVal}`);
  updateUI();
};

window.handleAddSpecialFacility = function() {
  if (!currentBastion) return;
  const nameSel = document.getElementById("specialFacilitySelect").value;
  const spaceSel = document.getElementById("specialFacilitySpace").value;
  // Look up the definition in SPECIAL_FACILITIES_FULL
  const def = SPECIAL_FACILITIES_FULL.find(d => d.name === nameSel);
  if (!def) {
    logEvent("No definition found or missing prereq for that special facility.");
    return;
  }
  const sf = new SpecialFacility(def, spaceSel);
  currentBastion.specialFacilities.push(sf);
  logEvent(`Added Special Facility: ${nameSel} (${spaceSel}).`);
  updateUI();
  updateOrderFacilityDropdown();
};

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
  document.getElementById("orderResult").textContent = resultText;
  logEvent(`Order: ${sf.name} (${orderVal}) => ${resultText}`);
  updateUI();
};

/* 
  A place to store the specifics of each facility's order logic.
  The new definitions include subOrders, but here we do a simple fallback
  unless you want to expand it more thoroughly.
*/
function handleFacilityOrder(sf, order) {
  
  // If the order is "Move", apply the new rule text:
  if (order === "Move") {
    // Any resources spent on features that use the surrounding area remain available.
    // Those features simply pause until the move completes.
    // The facility itself remains intact; all defenders, creatures, and hirelings relocate with it.
    return "The bastion begins moving to a new location, carrying all defenders and hirelings along. Orders or features relying on local terrain are paused until the move completes.";
  }
  
    if (sf.name === "Mine" && order === "Harvest") {
    // Implementation for rolling a d100 next turn, referencing “Gemstones”/“Arcana” tables
    return "Your hirelings begin extracting ore (result determined next Bastion Turn).";
  }

  if (sf.name === "Mobile Bastion Engine" && order === "Move") {
    // Implementation for traveling 2 days, etc.
    return "Your bastion slowly relocates using mechanical or mystical methods.";
  }

  
  // Example: if the facility is "Arcane Study" and order is "Craft", we do something special
  // For now, returning a generic message:
  return `${sf.name} performed a ${order} action. (Details vary by facility.)`;
}

/******************************************************************
  Next Bastion Turn
******************************************************************/
window.handleNextTurn = function() {
  if (!currentBastion) return;
  currentBastion.nextTurn();
  // If any facility was set to shutDownNextTurn, it is now shut down for this turn
  let shutting = currentBastion.specialFacilities.filter(f => f.shutDownNextTurn);
  shutting.forEach(f => {
    logEvent(`${f.name} is offline this turn due to damage. It is repaired afterward.`);
    f.shutDownNextTurn = false;
  });
  let eventText = currentBastion.maintainAndTriggerEvent();
  logEvent(`Turn ${currentBastion.turnCount}: ${eventText}`);
  updateUI();
};

/******************************************************************
  Player Info
******************************************************************/
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

/******************************************************************
  Finances
******************************************************************/
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

/******************************************************************
  Logging: new logs go on top
******************************************************************/
function logEvent(message) {
  const logDiv = document.getElementById("event-log");
  const p = document.createElement("p");
  p.textContent = message;
  if (logDiv.firstChild) {
    logDiv.insertBefore(p, logDiv.firstChild);
  } else {
    logDiv.appendChild(p);
  }
}

/******************************************************************
  On load - initialize
******************************************************************/

function initBastionDescriptionUI() {
  // 1. Populate dropdowns
  populateBastionDescDropdown();
  populateBastionQuirkDropdown();
  
  // 2. Add event listeners
  document.getElementById("bastionDescRollBtn")
    .addEventListener("click", handleBastionDescRollOrPick);
  document.getElementById("bastionDescDropdown")
    .addEventListener("change", handleBastionDescDropdownChange);
  document.getElementById("bastionDescApplyCustom")
    .addEventListener("click", handleBastionDescApplyCustom);

  document.getElementById("bastionQuirkRollBtn")
    .addEventListener("click", handleBastionQuirkRollOrPick);
  document.getElementById("bastionQuirkDropdown")
    .addEventListener("change", handleBastionQuirkDropdownChange);
  document.getElementById("bastionQuirkApplyCustom")
    .addEventListener("click", handleBastionQuirkApplyCustom);

  // 3. Load from cookie if present
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
