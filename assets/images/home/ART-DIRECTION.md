# Homepage research visuals

Four conceptual scientific sculptures generated with the built-in imagegen tool: protein, cell, artificial neural network, and leaves. These are artistic illustrations, not experimentally determined structures or scientific data.

## Visual direction

Muted blue `#6BA6BE` and warm ivory `#F1E6DE`, with the same satin matte porcelain material, broad soft highlights, gentle shadows, and three-quarter product perspective. Protein ribbons, simplified cell organelles, a moderately connected four-layer neural network, and botanical leaves share a restrained sculptural treatment. The neural network contains fourteen nodes and individually readable connections. All four objects appear together in a staggered composition.

## Final assets

- `assets/images/home/protein.webp`
- `assets/images/home/cell.webp`
- `assets/images/home/network.webp`
- `assets/images/home/leaf.webp`

All four are 1254 × 1254 images with genuine alpha transparency. Browser-native WebP encoding preserves dimensions and alpha; generated PNG originals remain in the imagegen output directory.

## Integration

`index.html` loads `assets/css/home-hero.css` and `assets/js/hero-parallax.js`. The four objects have gentle floating motion and different scroll depths. The original homepage text, navigation, backgrounds, and footer remain intact. Below 1200px, the scene is hidden and the image files are not requested. Reduced-motion and data-saving preferences disable the new animation; rendering pauses offscreen.

The existing GitHub Pages workflow already copies these assets. No build step or new runtime dependency is needed. Update image query versions when replacing assets and homepage CSS/JS query versions when changing their implementation.

## Generation prompts

### protein

Current replacement (built-in imagegen): a moderately richer fold with four readable alpha helices, a four-strand beta sheet, and additional open connector loops. Genuine alpha transparency was verified before and after WebP export.

Current prompt:

Use case: stylized-concept.
Create one premium 3D protein ribbon sculpture as an isolated transparent homepage asset.

SUBJECT: one coherent asymmetric globular protein fold, moderately detailed and scientifically recognizable. Include exactly FOUR clearly readable alpha helices with varied lengths, one compact FOUR-strand pleated beta sheet, and six to eight smooth connector loops and beta turns. Use a few elegant crossings and multiple depth planes, while keeping generous open gaps and a clean traceable ribbon flow. It should look only about 20% more complex than a minimal protein icon: refined and sophisticated, never dense, tangled, chaotic or spaghetti-like. No DNA, atoms, molecular spheres, cell parts or extra objects.

ART DIRECTION: high-end collectible sculpture made from fine satin MATTE porcelain. Palette only muted medium blue #6BA6BE and warm ivory #F1E6DE, balanced across helices, sheet strands and loops. Broad soft highlights, subtle ceramic texture, gentle ambient occlusion, soft upper-left studio illumination, restrained contrast. No glass, glossy plastic, chrome, metal, glow or noisy micro-detail. Elegant orthographic three-quarter product view with real ribbon thickness and beautifully rounded edges.

COMPOSITION: square 1254-style canvas, centered compact silhouette, whole sculpture visible with 8–10% breathing room.

CRITICAL TRANSPARENCY: output an actual RGBA PNG with alpha=0 outside the sculpture and through every opening. The background itself must be transparent. Do not draw or simulate checkerboard squares. Do not include any white, gray, black, colored or textured field, floor, cast shadow, pedestal, text, labels, symbols, border or background decorations.

Previous prompt (superseded):

Use case: stylized-concept. Create one asset in a coordinated set of four premium scientific 3D sculptures for the Digital Biology Lab homepage. ART DIRECTION SHARED BY THE WHOLE SET: refined minimal collectible sculpture, physically rendered satin porcelain, exceptionally clean sculpting, restrained fine detail, confident readable silhouette, beautiful soft depth. The dominant surface colors are precisely inspired by muted medium blue #6BA6BE (about 60%) and warm ivory porcelain #F1E6DE (about 40%). Blue surfaces must visibly read as #6BA6BE, not the previous very pale icy blue. Use ONLY tonal variations of these two colors, natural soft shadows and off-white highlights. Material: smooth fine-grained matte satin ceramic with a very subtle waxy subsurface softness and gentle broad highlights, NOT chrome, NOT shiny metal, NOT clear glass, NOT plastic toy. Lighting: very large softbox upper left, quiet soft fill, soft subtle right rim; low contrast with enough shading to read the three-dimensional form. Camera: elegant orthographic three-quarter product view, centered, square canvas, whole object visible with 8-10% breathing room. Background: genuine transparent RGBA PNG cutout with alpha=0 around the object and through its gaps, no painted checkerboard or white/gray square. No floor, no cast shadow on a floor, no base or pedestal, no text, symbols, border, labels, glow, background decorations, or extra objects. This should look like one element from an exceptionally coherent high-end visual identity.

SUBJECT: one globular protein ribbon sculpture, elegantly folded with three clearly defined alpha helices, a small three-strand pleated beta-sheet and a few smooth thin connecting loops. A compact asymmetric sculptural protein, not DNA and not a ball-and-stick molecule. Broad curved ribbons have clean real thickness. Most ribbons in muted medium blue #6BA6BE, selected ribbons and loops in warm ivory #F1E6DE. Let the ribbon folds have clear breathing space between them. Scientific structure-inspired, refined and artistically simplified; a few legible structural features rather than a tangled mass.

### cell

Current replacement (built-in imagegen): the cell uses a cleaner, brighter #6BA6BE blue with lifted shadows to match the protein and neural-network sculptures. The simplified cutaway anatomy and warm ivory structures remain intact. Genuine alpha transparency was verified before and after WebP export.

Current prompt:

Use case: stylized-concept.
Create one premium eukaryotic cell cutaway sculpture as an isolated transparent homepage asset, coordinated with matte porcelain protein and neural-network sculptures.

SUBJECT: a near-spherical animal cell with the front quarter cleanly opened. Show one large warm-ivory nucleus with a muted-blue nucleolus, a thin nuclear envelope with restrained pores, three calm folded rough-endoplasmic-reticulum sheets with a small number of ivory ribosome dots, three smooth Golgi-like folded membranes, and exactly three ivory-rimmed bean-shaped mitochondria with blue inner folds. Keep the anatomy recognizable, elegant and simplified; preserve open space and avoid packing it with tiny organelles, excessive dots, tubes, spikes or clutter.

COLOR MATCH IS CRITICAL: all blue midtone surfaces must clearly read as muted medium blue #6BA6BE, matching a refined porcelain protein ribbon and neural-network sculpture. The outer membrane should be a clean, softly luminous #6BA6BE rather than gray, dusty, dark, slate, navy or muddy teal. Interior blue may be only moderately deeper for depth, with lifted shadows and no near-black areas. Warm ivory elements use #F1E6DE. Use only tonal variations of these two colors.

ART DIRECTION: fine satin MATTE porcelain/ceramic, broad soft highlights, subtle fine ceramic grain, gentle ambient occlusion, soft upper-left studio illumination and quiet right rim. Low-to-medium contrast with enough shading to read the cutaway. No glossy plastic, glass, chrome, metal, glow or wet biological texture. Elegant orthographic three-quarter product view.

COMPOSITION: square 1254-style canvas, centered full cell with 8–10% breathing room.

CRITICAL TRANSPARENCY: output an actual RGBA PNG with alpha=0 around the cell and through any open gaps. Do not draw or simulate checkerboard squares. Do not include white, gray, black, colored or textured background, floor, cast shadow, pedestal, text, labels, border or decorations.

Previous prompt (superseded):

Use case: stylized-concept. Create one asset in a coordinated set of four premium scientific 3D sculptures for the Digital Biology Lab homepage. ART DIRECTION SHARED BY THE WHOLE SET: refined minimal collectible sculpture, physically rendered satin porcelain, exceptionally clean sculpting, restrained fine detail, confident readable silhouette, beautiful soft depth. The dominant surface colors are precisely inspired by muted medium blue #6BA6BE (about 60%) and warm ivory porcelain #F1E6DE (about 40%). Blue surfaces must visibly read as #6BA6BE, not the previous very pale icy blue. Use ONLY tonal variations of these two colors, natural soft shadows and off-white highlights. Material: smooth fine-grained matte satin ceramic with a very subtle waxy subsurface softness and gentle broad highlights, NOT chrome, NOT shiny metal, NOT clear glass, NOT plastic toy. Lighting: very large softbox upper left, quiet soft fill, soft subtle right rim; low contrast with enough shading to read the three-dimensional form. Camera: elegant orthographic three-quarter product view, centered, square canvas, whole object visible with 8-10% breathing room. Background: genuine transparent RGBA PNG cutout with alpha=0 around the object and through its gaps, no painted checkerboard or white/gray square. No floor, no cast shadow on a floor, no base or pedestal, no text, symbols, border, labels, glow, background decorations, or extra objects. This should look like one element from an exceptionally coherent high-end visual identity.

SUBJECT: one elegant eukaryotic cell cutaway sculpture. A near-spherical muted blue #6BA6BE membrane with the front quarter opened to show an ivory #F1E6DE nucleus, a small blue nucleolus, three or four calm folded endoplasmic-reticulum sheets, and just three small bean-shaped mitochondria. Select organelles can be ivory on the blue interior. The membrane is beautifully smooth and thin with slight organic undulation; no spikes or excessive stippling. The cell should remain scientifically recognizable and organic, but the visual is beautifully simplified and calm, not packed with dozens of tiny busy organelles. Keep the same satin porcelain finish on outer membrane and internal forms.

### network

Current replacement (built-in imagegen): complete feed-forward connectivity between adjacent layers. The 3–4–4–3 layout has 12 + 16 + 12 = 40 inter-layer strands, with no connections inside a layer. The generated PNG and exported WebP both have genuine alpha transparency.

Current prompt: Create a premium 3D artificial neural network sculpture as an isolated transparent PNG asset. Arrange exactly 14 nodes in four vertical columns, 3–4–4–3. Fully connect every node to every node in the immediately following layer: 12 strands from layer one to two, 16 from layer two to three, and 12 from layer three to four, exactly 40 strands total. Use no same-layer, skipped-layer, loop, or recurrent connections. Route slim matte ceramic curves with depth offsets and keep open gaps between nodes. Use muted blue `#6BA6BE` and warm ivory `#F1E6DE`, satin matte porcelain, soft studio lighting, three-quarter orthographic framing, and genuine RGBA transparency throughout the background and openings. No checkerboard, floor, pedestal, text, labels, arrows, glow, or border.

Previous sparse replacement (superseded): only adjacent-layer connections; no connections within any layer. Its PNG alpha channel was verified before WebP export. Previous prompt:

Create a transparent-background PNG asset: an elegant artificial neural network sculpture in matte ceramic, muted blue #6BA6BE and warm ivory #F1E6DE. Four clearly separated vertical columns, from left to right 3,4,4,3 spherical nodes. Thin smooth blue ceramic strands connect nodes ONLY BETWEEN ADJACENT COLUMNS, about 18 selective strands. Absolutely NO links between nodes within a column: vertically stacked spheres have empty gaps, no vertical rods or curved vertical bridges. Moderate complexity with readable open space. Premium satin matte porcelain, soft upper-left studio lighting, gentle three-quarter orthographic product view, alternating blue and ivory spheres, square canvas, centered full sculpture, 8% margins. No text, stand, floor, background shadow, labels or border. BACKGROUND MUST BE TRANSPARENT with actual alpha channel, including all gaps. Do not render a checkerboard pattern or any solid backdrop. Deliver only the isolated ceramic sculpture on transparency.

Previous generation prompt (superseded):

Use case: stylized-concept. A premium scientific 3D artificial neural network sculpture for the Digital Biology Lab homepage, matching a coordinated collection of sculpted protein ribbons, a cell cutaway, and botanical leaves. Visual language: elegant satin MATTE PORCELAIN with very fine ceramic texture, broad soft highlights and gentle ambient occlusion, sophisticated product photography. Dominant colors ONLY muted medium blue #6BA6BE and warm ivory #F1E6DE, with natural tonal shading. No chrome, no metallic shine, no clear glass, no glowing lights. Lighting: large softbox upper left, gentle fill, delicate right rim. Camera: orthographic three-quarter view, enough perspective to show the layers occupying distinct planes in depth.

SUBJECT: a moderately complex, beautifully organized feed-forward artificial neural network with FOUR evenly separated layers arranged left-to-right: 3 input nodes, 4 hidden nodes, 4 hidden nodes, 3 output nodes, 14 spherical nodes total. Use approximately 20 to 22 slender graceful connections distributed ONLY between adjacent layers. Selective sparse connectivity: each node links to just one or two nodes in the next layer; NEVER fully connect all nodes. This is more sophisticated than a three-layer nine-node diagram but must retain plenty of open space. Connections should be thin sculpted muted blue strands, smooth and carefully routed with minimal crossing, one individually readable curve per connection. No wire bundles, tangled web, collars, joints or thick tubing. The nodes have the same satin porcelain finish, alternating muted blue and warm ivory in a balanced pattern. A subtly receding diagonal composition gives the network real depth without hiding nodes. Clearly reads as an artificial neural network, not a molecule, biological neuron or brain. Clean purposeful silhouette, restrained artistic detail, visually polished even at 400 pixels wide.

Whole sculpture centered on a square canvas with 8-10% breathing space, fully visible. Output a true RGBA PNG with genuine alpha transparency around the object AND inside all gaps. No painted checkerboard, no white/gray rectangle, no floor, pedestal, text, labels, border, shadow on a floor, or unrelated objects. Transparent scientific object cutout only.

### leaf

Current replacement (built-in imagegen): exactly two large leaves in a balanced open V silhouette. The blue is brighter and cleaner #6BA6BE to match the updated cell and protein; stems and veins remain warm ivory #F1E6DE. Genuine alpha transparency was verified before and after WebP export.

Current prompt:

Use case: stylized-concept.
Create one premium botanical sculpture as an isolated transparent homepage asset.

SUBJECT: exactly TWO large broad leaves growing from one short, gently curved shared stem. No small leaves. One large leaf opens upward-left and slightly toward the viewer; the second large leaf reaches upward-right and recedes slightly, creating a balanced airy V-shaped silhouette. Both leaves should be similarly prominent, with a natural difference in angle and a modest difference in size. Give each leaf a realistic tapered tip, softly folded lamina, subtle edge curvature, a strong central midrib, and only six to eight clean branching side veins. Preserve generous open space between the two leaves. No flowers, buds, fruit, roots, pot, soil or extra plants.

COLOR MATCH IS CRITICAL: leaf surfaces must read as a clean, brighter muted blue #6BA6BE, matching the updated cell and protein sculptures. Do not make the blue gray, dark, dusty, slate, navy or muddy teal. Lift shadow values while keeping enough soft modeling for three-dimensional form. Use warm ivory #F1E6DE for the shared stem, central midribs and restrained veins. Use only tonal variations of these two colors.

ART DIRECTION: premium fine satin MATTE porcelain/ceramic, broad soft highlights, subtle ceramic grain, gentle ambient occlusion, soft upper-left studio light and quiet right rim. Calm high-end collectible sculpture, orthographic three-quarter product view. No glossy plastic, glass, chrome, metal, green, glow or dense vein web.

COMPOSITION: square 1254-style canvas, centered compact diagonal composition, whole stem and both large leaves fully visible with 8–10% breathing room.

CRITICAL TRANSPARENCY: output an actual RGBA PNG with alpha=0 around the sculpture and in the open gap between the leaves. Do not draw or simulate checkerboard squares. Do not include any white, gray, black, colored or textured background, floor, cast shadow, pedestal, text, symbols, border or background decoration.

Previous prompt (superseded):

Current replacement (built-in imagegen): a five-leaf porcelain branch with two larger and three smaller leaves, varied orientations, open spacing, and restrained vein detail. Genuine alpha transparency was verified before and after WebP export.

Current prompt:

Use case: stylized-concept.
Create one premium botanical branch sculpture as an isolated transparent homepage asset.

SUBJECT: a graceful short branching stem carrying exactly FIVE broad leaves. Arrange two larger mature leaves and three smaller leaves at different heights and depth planes, forming an elegant upward diagonal silhouette. Leaves should have varied natural orientations: one opens toward the viewer, two angle gently left and right, and two smaller leaves recede slightly. Add subtle organic curvature, softly folded leaf surfaces, natural tapering tips, a clear central midrib, and a restrained set of six to eight fine branching veins per leaf. Make it only modestly more complex than a simple two-leaf sprig: richer and more dimensional, with readable overlap and generous open gaps. No flowers, buds, fruit, roots, pot, soil or extra plants.

ART DIRECTION: high-end collectible sculpture in fine satin MATTE porcelain, exactly coordinated with scientific protein, cell, and neural-network objects. Leaf surfaces use muted medium blue #6BA6BE; stems, midribs and selected restrained veins use warm ivory #F1E6DE. Allow only natural tonal shading of those two colors. Broad soft highlights, subtle ceramic texture, gentle ambient occlusion, soft upper-left studio lighting, quiet fill, refined orthographic three-quarter product view. No green, glossy plastic, glass, metal, chrome, glow or dense vein web.

COMPOSITION: square 1254-style canvas, centered compact diagonal arrangement, full branch visible with 8–10% breathing room. Keep the base of the stem near the lower center and the crown balanced above it.

CRITICAL TRANSPARENCY: output an actual RGBA PNG with alpha=0 around the entire branch and in all gaps between leaves and stems. Do not draw or simulate a checkerboard. Do not include white, gray, black, colored or textured background, floor, cast shadow, pedestal, text, symbols, border or background decoration.

Previous prompt (superseded):

Use case: stylized-concept. Create one asset in a coordinated set of four premium scientific 3D sculptures for the Digital Biology Lab homepage. ART DIRECTION SHARED BY THE WHOLE SET: refined minimal collectible sculpture, physically rendered satin porcelain, exceptionally clean sculpting, restrained fine detail, confident readable silhouette, beautiful soft depth. The dominant surface colors are precisely inspired by muted medium blue #6BA6BE (about 60%) and warm ivory porcelain #F1E6DE (about 40%). Blue surfaces must visibly read as #6BA6BE, not the previous very pale icy blue. Use ONLY tonal variations of these two colors, natural soft shadows and off-white highlights. Material: smooth fine-grained matte satin ceramic with a very subtle waxy subsurface softness and gentle broad highlights, NOT chrome, NOT shiny metal, NOT clear glass, NOT plastic toy. Lighting: very large softbox upper left, quiet soft fill, soft subtle right rim; low contrast with enough shading to read the three-dimensional form. Camera: elegant orthographic three-quarter product view, centered, square canvas, whole object visible with 8-10% breathing room. Background: genuine transparent RGBA PNG cutout with alpha=0 around the object and through its gaps, no painted checkerboard or white/gray square. No floor, no cast shadow on a floor, no base or pedestal, no text, symbols, border, labels, glow, background decorations, or extra objects. This should look like one element from an exceptionally coherent high-end visual identity.

SUBJECT: one botanical sculpture of a short gently curved stem with two broad leaves, one large leaf angled upward-left and one smaller leaf receding upward-right. The leaves have muted medium blue #6BA6BE satin surfaces; the central midribs, short stem, and a restrained set of fine branching veins use warm ivory #F1E6DE. Realistic leaf silhouette and natural tapering tips, gentle three-dimensional folds and organically curved lamina. The vein pattern must be restrained and legible rather than a dense web. The leaf surfaces use the exact same sculpted satin porcelain material as the other scientific objects. No pot, roots, flowers, green, unrelated plants, no stand. Calm elegant compact diagonal silhouette.
