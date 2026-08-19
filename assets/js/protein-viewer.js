(function () {
  if (!document.body.classList.contains("home")) {
    return;
  }

  var PROTEINS = [
    { id: "1CRN", name: "Crambin", fn: "Antifungal plant seed protein" },
    { id: "1UBQ", name: "Ubiquitin", fn: "Tags proteins for degradation" },
    { id: "2LYZ", name: "Lysozyme", fn: "Breaks down bacterial cell walls" },
    { id: "1MBN", name: "Myoglobin", fn: "Stores oxygen in muscle tissue" },
    { id: "4HHB", name: "Hemoglobin", fn: "Carries oxygen in red blood cells" },
    { id: "1GFL", name: "Green Fluorescent Protein", fn: "Glows green — used to label cells" },
    { id: "1TIM", name: "Triose Phosphate Isomerase", fn: "Catalyzes a key step in glycolysis" },
    { id: "1IGT", name: "Immunoglobulin G (Antibody)", fn: "Neutralizes pathogens for the immune system" },
    { id: "2PTC", name: "Trypsin–Inhibitor Complex", fn: "Digestive enzyme bound to its inhibitor" },
    { id: "1AKE", name: "Adenylate Kinase", fn: "Balances cellular energy (ATP/AMP)" },
    { id: "6VXX", name: "SARS-CoV-2 Spike Glycoprotein", fn: "Lets the virus enter host cells" },
    { id: "3LZM", name: "T4 Lysozyme", fn: "Viral enzyme that lyses bacteria" },
    { id: "1ATP", name: "Protein Kinase A", fn: "Adds phosphates to regulate signaling" },
    { id: "6LU7", name: "SARS-CoV-2 Main Protease", fn: "Cleaves viral proteins for replication" },
    { id: "1RNH", name: "Ribonuclease H", fn: "Degrades RNA in RNA–DNA hybrids" },
    { id: "3CHY", name: "CheY", fn: "Relays signals in bacterial movement" },
    { id: "1HRC", name: "Cytochrome C", fn: "Shuttles electrons in respiration" },
    { id: "2TRX", name: "Thioredoxin", fn: "Regulates cellular redox balance" },
    { id: "1FKB", name: "FKBP12", fn: "Binds immunosuppressant drugs" },
    { id: "1STN", name: "Staphylococcal Nuclease", fn: "Degrades DNA and RNA" },
    { id: "1CHO", name: "Chymotrypsin", fn: "Digestive enzyme that cleaves proteins" },
    { id: "1SBT", name: "Subtilisin", fn: "Bacterial protein-degrading enzyme" },
    { id: "3DFR", name: "Dihydrofolate Reductase", fn: "Key enzyme in DNA synthesis" },
    { id: "2GBP", name: "Glucose/Galactose Binding Protein", fn: "Senses sugars for bacterial transport" },
    { id: "1ANF", name: "Maltose Binding Protein", fn: "Transports sugar across membranes" },
    { id: "4FXN", name: "Flavodoxin", fn: "Shuttles electrons via a flavin cofactor" },
    { id: "6LDH", name: "Lactate Dehydrogenase", fn: "Converts lactate to pyruvate" },
    { id: "1ALC", name: "Alpha-Lactalbumin", fn: "Helps synthesize lactose in milk" },
    { id: "2PAB", name: "Transthyretin", fn: "Transports thyroid hormone in blood" },
    { id: "1CA2", name: "Carbonic Anhydrase II", fn: "Interconverts CO2 and bicarbonate" },
    { id: "1RBP", name: "Retinol Binding Protein", fn: "Transports vitamin A in blood" },
    { id: "1PYP", name: "Inorganic Pyrophosphatase", fn: "Powers biosynthesis reactions" },
    { id: "6ADH", name: "Alcohol Dehydrogenase", fn: "Breaks down alcohol in metabolism" },
    { id: "1HGU", name: "Human Growth Hormone", fn: "Stimulates growth and cell reproduction" },
    { id: "5P21", name: "Ras p21 Protein", fn: "Molecular switch in cell-growth signaling" },
    { id: "5CHA", name: "Chymotrypsinogen A", fn: "Inactive precursor of chymotrypsin" },
    { id: "1LZ1", name: "Human Lysozyme", fn: "Antibacterial enzyme in tears and saliva" },
    { id: "2SGA", name: "Streptomyces Griseus Protease A", fn: "Bacterial digestive enzyme" },
    { id: "1RHD", name: "Rhodanese", fn: "Detoxifies cyanide in cells" },
    { id: "1GCR", name: "Gamma-Crystallin", fn: "Keeps the eye lens transparent" },
    { id: "1PAZ", name: "Pseudoazurin", fn: "Transfers electrons via a copper center" },
    { id: "1OVA", name: "Ovalbumin", fn: "Major storage protein in egg white" },
    { id: "7API", name: "Alpha-1-Antitrypsin", fn: "Protects lung tissue from enzyme damage" },
    { id: "1REI", name: "Immunoglobulin Light Chain", fn: "Antibody fragment that binds antigens" },
    { id: "1WSY", name: "Tryptophan Synthase", fn: "Synthesizes the amino acid tryptophan" },
    { id: "1CTS", name: "Citrate Synthase", fn: "First step of the citric acid cycle" },
    { id: "3PGK", name: "Phosphoglycerate Kinase", fn: "Generates ATP during glycolysis" },
    { id: "1GPB", name: "Glycogen Phosphorylase", fn: "Releases glucose from glycogen stores" },
    { id: "7CAT", name: "Catalase", fn: "Breaks down toxic hydrogen peroxide" },
    { id: "1DPI", name: "DNA Polymerase I (Klenow Fragment)", fn: "Copies and repairs DNA" },
    { id: "1PKN", name: "Pyruvate Kinase", fn: "Final step of glycolysis, makes ATP" },
    { id: "4ALD", name: "Fructose-Bisphosphate Aldolase", fn: "Splits sugar in half during glycolysis" },
    { id: "1AO6", name: "Human Serum Albumin", fn: "Most abundant protein in blood plasma" },
    { id: "2ACE", name: "Acetylcholinesterase", fn: "Terminates nerve signal transmission" },
    { id: "2MYS", name: "Myosin", fn: "Molecular motor that powers muscle contraction" },
    { id: "1J4N", name: "Aquaporin", fn: "Water channel across cell membranes" },
    { id: "1QLN", name: "T7 RNA Polymerase", fn: "Transcribes DNA into RNA" },
    { id: "1LCI", name: "Firefly Luciferase", fn: "Produces bioluminescent light" },
    { id: "8ATC", name: "Aspartate Transcarbamoylase", fn: "Classic model of allosteric regulation" },
    { id: "1EJ9", name: "Topoisomerase", fn: "Untangles DNA during replication" },
    { id: "1EFT", name: "Elongation Factor Tu", fn: "Delivers amino acids during protein synthesis" },
    { id: "3CNA", name: "Concanavalin A", fn: "Plant lectin that binds sugars" },
    { id: "1AMA", name: "Aspartate Aminotransferase", fn: "Shuttles nitrogen between amino acids" },
    { id: "1DNP", name: "Photolyase", fn: "Repairs UV damage in DNA" },
    { id: "1PPB", name: "Thrombin", fn: "Triggers blood clot formation" },
    { id: "1JNF", name: "Serotransferrin", fn: "Transports iron through the bloodstream" },
    { id: "2CPP", name: "Cytochrome P450cam", fn: "Metabolizes drugs and other compounds" },
    { id: "7ACN", name: "Aconitase", fn: "Citric acid cycle enzyme with an iron-sulfur core" },
    { id: "1BTL", name: "Beta-Lactamase", fn: "Breaks down penicillin-type antibiotics" },
    { id: "1HSA", name: "MHC Class I", fn: "Displays cell contents to the immune system" }
  ];

  var BUBBLE_COUNT = 1;

  var container = document.querySelector("[data-protein-widgets]");

  if (!container || typeof $3Dmol === "undefined") {
    return;
  }

  pickRandom(PROTEINS, BUBBLE_COUNT).forEach(function (protein) {
    var bubble = document.createElement("div");
    bubble.className = "protein-bubble";
    bubble.style.opacity = "0";
    bubble.style.transition = "opacity 0.8s ease";

    var label = document.createElement("a");
    label.className = "protein-label";
    label.href = "https://www.rcsb.org/structure/" + protein.id;
    label.target = "_blank";
    label.rel = "noopener noreferrer";

    var nameEl = document.createElement("span");
    nameEl.className = "protein-label-name";
    nameEl.textContent = protein.name;
    label.appendChild(nameEl);

    var fnEl = document.createElement("span");
    fnEl.className = "protein-label-fn";
    fnEl.textContent = protein.fn;
    label.appendChild(fnEl);

    bubble.appendChild(label);

    container.appendChild(bubble);
    renderProtein(bubble, protein);
  });

  function pickRandom(list, count) {
    var pool = list.slice();
    var picked = [];

    while (picked.length < count && pool.length) {
      var i = Math.floor(Math.random() * pool.length);
      picked.push(pool.splice(i, 1)[0]);
    }

    return picked;
  }

  var GRADIENT_START = hexToRgb("#F5D8C1");
  var GRADIENT_END = hexToRgb("#CDEDF9");

  function restrictToRotateOnly(bubble) {
    ["wheel", "contextmenu"].forEach(function (eventName) {
      bubble.addEventListener(eventName, function (event) {
        event.stopPropagation();
      }, { capture: true, passive: false });
    });

    bubble.addEventListener("mousedown", function (event) {
      if (event.button !== 0 || event.ctrlKey || event.shiftKey || event.metaKey) {
        event.stopPropagation();
      }
    }, { capture: true });

    ["touchstart", "touchmove"].forEach(function (eventName) {
      bubble.addEventListener(eventName, function (event) {
        if (event.touches.length > 1) {
          event.stopPropagation();
        }
      }, { capture: true, passive: false });
    });
  }

  function renderProtein(bubble, protein) {
    restrictToRotateOnly(bubble);

    var modelReady = false;
    var introBgRevealed = false;

    document.addEventListener("intro:bg-revealed", function () {
      introBgRevealed = true;
      revealIfReady();
    });

    function revealIfReady() {
      if (modelReady && introBgRevealed) {
        bubble.style.opacity = "1";
      }
    }

    var viewer = $3Dmol.createViewer(bubble, { backgroundColor: "white", backgroundAlpha: 0 });
    viewer.setBackgroundColor(0x000000, 0);

    $3Dmol.download("pdb:" + protein.id, viewer, {}, function () {
      var atoms = viewer.getModel().selectedAtoms({ hetflag: false });
      var minResi = Infinity;
      var maxResi = -Infinity;

      atoms.forEach(function (atom) {
        if (atom.resi < minResi) minResi = atom.resi;
        if (atom.resi > maxResi) maxResi = atom.resi;
      });

      var range = maxResi - minResi || 1;

      viewer.setStyle({}, {
        cartoon: {
          colorfunc: function (atom) {
            var t = (atom.resi - minResi) / range;
            return rgbToHex(lerpColor(GRADIENT_START, GRADIENT_END, t));
          }
        }
      });
      viewer.zoomTo();
      viewer.render();
      modelReady = true;
      revealIfReady();
    });
  }

  function hexToRgb(hex) {
    var n = parseInt(hex.replace("#", ""), 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }

  function lerpColor(a, b, t) {
    return {
      r: a.r + (b.r - a.r) * t,
      g: a.g + (b.g - a.g) * t,
      b: a.b + (b.b - a.b) * t
    };
  }

  function rgbToHex(rgb) {
    return "#" + ["r", "g", "b"].map(function (channel) {
      return ("0" + Math.round(rgb[channel]).toString(16)).slice(-2);
    }).join("");
  }
})();
