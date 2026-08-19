(function () {
  if (!document.body.classList.contains("home")) {
    return;
  }

  var PROTEINS = [
    { id: "1CRN", name: "Crambin" },
    { id: "1UBQ", name: "Ubiquitin" },
    { id: "2LYZ", name: "Lysozyme" },
    { id: "1MBN", name: "Myoglobin" },
    { id: "4HHB", name: "Hemoglobin" },
    { id: "1GFL", name: "Green Fluorescent Protein" },
    { id: "1TIM", name: "Triose Phosphate Isomerase" },
    { id: "1IGT", name: "Immunoglobulin G (Antibody)" },
    { id: "2PTC", name: "Trypsin–Inhibitor Complex" },
    { id: "1AKE", name: "Adenylate Kinase" },
    { id: "6VXX", name: "SARS-CoV-2 Spike Glycoprotein" },
    { id: "3LZM", name: "T4 Lysozyme" },
    { id: "1ATP", name: "Protein Kinase A" },
    { id: "6LU7", name: "SARS-CoV-2 Main Protease" },
    { id: "1RNH", name: "Ribonuclease H" },
    { id: "3CHY", name: "CheY" },
    { id: "1HRC", name: "Cytochrome C" },
    { id: "2TRX", name: "Thioredoxin" },
    { id: "1FKB", name: "FKBP12" },
    { id: "1STN", name: "Staphylococcal Nuclease" },
    { id: "1CHO", name: "Chymotrypsin" },
    { id: "1SBT", name: "Subtilisin" },
    { id: "3DFR", name: "Dihydrofolate Reductase" },
    { id: "2GBP", name: "Glucose/Galactose Binding Protein" },
    { id: "1ANF", name: "Maltose Binding Protein" },
    { id: "4FXN", name: "Flavodoxin" },
    { id: "6LDH", name: "Lactate Dehydrogenase" },
    { id: "1ALC", name: "Alpha-Lactalbumin" },
    { id: "2PAB", name: "Transthyretin" },
    { id: "1CA2", name: "Carbonic Anhydrase II" },
    { id: "1RBP", name: "Retinol Binding Protein" },
    { id: "1PYP", name: "Inorganic Pyrophosphatase" },
    { id: "6ADH", name: "Alcohol Dehydrogenase" },
    { id: "1HGU", name: "Human Growth Hormone" },
    { id: "5P21", name: "Ras p21 Protein" },
    { id: "5CHA", name: "Chymotrypsinogen A" },
    { id: "1LZ1", name: "Human Lysozyme" },
    { id: "2SGA", name: "Streptomyces Griseus Protease A" },
    { id: "1RHD", name: "Rhodanese" },
    { id: "1GCR", name: "Gamma-Crystallin" },
    { id: "1PAZ", name: "Pseudoazurin" },
    { id: "1OVA", name: "Ovalbumin" },
    { id: "7API", name: "Alpha-1-Antitrypsin" },
    { id: "1REI", name: "Immunoglobulin Light Chain" },
    { id: "1WSY", name: "Tryptophan Synthase" }
  ];

  var BUBBLE_COUNT = 1;

  var container = document.querySelector("[data-protein-widgets]");

  if (!container || typeof $3Dmol === "undefined") {
    return;
  }

  pickRandom(PROTEINS, BUBBLE_COUNT).forEach(function (protein) {
    var bubble = document.createElement("div");
    bubble.className = "protein-bubble";

    var label = document.createElement("a");
    label.className = "protein-label";
    label.textContent = protein.name;
    label.href = "https://www.rcsb.org/structure/" + protein.id;
    label.target = "_blank";
    label.rel = "noopener noreferrer";
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

  function renderProtein(bubble, protein) {
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
