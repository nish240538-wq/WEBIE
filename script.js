// script.js
// ================================================
// PhysicsVerse Calculators – Real-time & Addictive
// Clean, well-commented, zero external dependencies
// ================================================

// ====================== FORGOTTEN UNITS CONVERTER ======================
const unitData = {
    length: {
        "Meter (m)": 1,
        "Furlong": 201.168,
        "Kilometer (km)": 1000,
        "Nautical Mile": 1852,
        "Chain": 20.1168
    },
    mass: {
        "Kilogram (kg)": 1,
        "Slug": 14.5939,
        "Pound (lb)": 0.453592
    },
    area: {
        "Square Meter (m²)": 1,
        "Barn": 1e-28,
        "Hectare": 10000,
        "Square Kilometer (km²)": 1e6
    },
    charge: {
        "Coulomb (C)": 1,
        "Franklin (Fr)": 3.33564e-10,
        "Ampere-hour (Ah)": 3600
    }
};

let currentCategory = "length";

function populateUnitSelects() {
    const fromSelect = document.getElementById("from-unit");
    const toSelect = document.getElementById("to-unit");
    const units = unitData[currentCategory];

    // Clear previous options
    fromSelect.innerHTML = "";
    toSelect.innerHTML = "";

    Object.keys(units).forEach(unitName => {
        const factor = units[unitName];
        
        const opt1 = document.createElement("option");
        opt1.value = factor;
        opt1.textContent = unitName;
        fromSelect.appendChild(opt1);

        const opt2 = document.createElement("option");
        opt2.value = factor;
        opt2.textContent = unitName;
        toSelect.appendChild(opt2);
    });

    // Default selections
    fromSelect.selectedIndex = 0;
    toSelect.selectedIndex = 1; // different unit
}

function calculateConversion() {
    const value = parseFloat(document.getElementById("input-value").value) || 0;
    const fromFactor = parseFloat(document.getElementById("from-unit").value);
    const toFactor = parseFloat(document.getElementById("to-unit").value);
    const resultEl = document.getElementById("conversion-result");
    const unitEl = document.getElementById("result-unit");

    if (fromFactor && toFactor) {
        const result = value * (fromFactor / toFactor);
        resultEl.textContent = `= ${result.toFixed(6)}`;
        
        const toUnitName = document.getElementById("to-unit").options[document.getElementById("to-unit").selectedIndex].textContent;
        unitEl.textContent = toUnitName;
    }
}

// Event listeners for Forgotten Converter
document.getElementById("category").addEventListener("change", (e) => {
    currentCategory = e.target.value;
    populateUnitSelects();
    calculateConversion();
});

document.getElementById("input-value").addEventListener("input", calculateConversion);
document.getElementById("from-unit").addEventListener("change", calculateConversion);
document.getElementById("to-unit").addEventListener("change", calculateConversion);

// ====================== KINEMATICS SOLVER ======================
function updateKinematics() {
    const force = parseFloat(document.getElementById("force-kin").value) || 0;
    const mass = parseFloat(document.getElementById("mass-kin").value) || 1;
    const time = parseFloat(document.getElementById("time-kin").value) || 0;

    const acc = force / mass;
    const vel = acc * time;

    document.getElementById("acc-result").textContent = `${acc.toFixed(2)} m/s²`;
    document.getElementById("vel-kin-result").textContent = `${vel.toFixed(2)} m/s`;
}

document.getElementById("force-kin").addEventListener("input", updateKinematics);
document.getElementById("mass-kin").addEventListener("input", updateKinematics);
document.getElementById("time-kin").addEventListener("input", updateKinematics);

// ====================== ORBITAL DELTA-V SOLVER ======================
function updateDeltaV() {
    const thrust = parseFloat(document.getElementById("thrust").value) || 0;
    const mass = parseFloat(document.getElementById("mass-dv").value) || 1;
    const time = parseFloat(document.getElementById("time-dv").value) || 0;

    const deltaV = (thrust * time) / mass;
    document.getElementById("delta-v-result").textContent = `${deltaV.toFixed(2)} m/s`;
}

document.getElementById("thrust").addEventListener("input", updateDeltaV);
document.getElementById("mass-dv").addEventListener("input", updateDeltaV);
document.getElementById("time-dv").addEventListener("input", updateDeltaV);

// ====================== INITIALISE EVERYTHING ======================
window.onload = () => {
    // Populate units
    populateUnitSelects();
    
    // Run initial calculations
    calculateConversion();
    updateKinematics();
    updateDeltaV();

    // SEO bonus: console message for developers
    console.log("%c🚀 PhysicsVerse Calculators loaded – real-time & SEO optimized!", "color:#00f3ff; font-weight:bold;");
};