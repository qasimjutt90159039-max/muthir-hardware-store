const categoriesData = [
  {
    name: 'Tools',
    slug: 'tools',
    description: 'Professional grade power tools, workshop machinery, precision hand tools, and cutting equipment.',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
    displayOrder: 1,
    subcategories: [
      { name: 'Hand Tools', slug: 'hand-tools', description: 'Wrenches, pliers, screwdrivers, hammers, and manual workshop essentials.' },
      { name: 'Power Tools', slug: 'power-tools', description: 'Corded and cordless drills, angle grinders, circular saws, and rotary kits.' },
      { name: 'Measuring Tools', slug: 'measuring-tools', description: 'Laser measures, steel tapes, calipers, spirit levels, and squares.' },
      { name: 'Cutting Tools', slug: 'cutting-tools', description: 'Hacksaws, utility blades, diamond discs, and heavy-duty cutters.' },
      { name: 'Drilling Tools', slug: 'drilling-tools', description: 'Rotary hammers, SDS bits, drill bit sets, and hole saws.' },
      { name: 'Workshop Tools', slug: 'workshop-tools', description: 'Bench vises, toolboxes, clamps, and workbench accessories.' },
    ],
  },
  {
    name: 'Hardware',
    slug: 'hardware',
    description: 'Fasteners, structural brackets, locks, security fittings, architectural hinges, and anchors.',
    image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80',
    displayOrder: 2,
    subcategories: [
      { name: 'Screws & Nails', slug: 'screws-nails', description: 'Drywall, wood, self-tapping screws and wire nails.' },
      { name: 'Bolts & Nuts', slug: 'bolts-nuts', description: 'Hex bolts, carriage bolts, nylon lock nuts, and washers.' },
      { name: 'Hinges & Handles', slug: 'hinges-handles', description: 'Stainless steel hinges, cabinet pulls, and door latches.' },
      { name: 'Locks & Security', slug: 'locks-security', description: 'Solid brass padlocks, rim night latches, and deadbolts.' },
      { name: 'Brackets & Anchors', slug: 'brackets-anchors', description: 'Heavy duty angle brackets, drop-in anchors, and wall plugs.' },
    ],
  },
  {
    name: 'Electrical',
    slug: 'electrical',
    description: 'Industrial and domestic switches, copper wiring, circuit protection, insulation, and test instruments.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    displayOrder: 3,
    subcategories: [
      { name: 'Switches & Sockets', slug: 'switches-sockets', description: 'Modular wall switches, gang boxes, and power plugs.' },
      { name: 'Cables & Wiring', slug: 'cables-wiring', description: 'Single-core, twin-core pure copper flexible cables.' },
      { name: 'Connectors & Terminals', slug: 'connectors-terminals', description: 'Wire connectors, terminal blocks, and crimp lugs.' },
      { name: 'Electrical Accessories', slug: 'electrical-accessories', description: 'Insulation tape, test pens, multimeter tools, and conduit boxes.' },
    ],
  },
  {
    name: 'Plumbing',
    slug: 'plumbing',
    description: 'Pipes, compression fittings, brass valves, taps, seals, and reliable drainage hardware.',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
    displayOrder: 4,
    subcategories: [
      { name: 'Pipes & Fittings', slug: 'pipes-fittings', description: 'PPRC, CPVC, PVC elbows, tees, unions, and reducers.' },
      { name: 'Valves & Taps', slug: 'valves-taps', description: 'Brass ball valves, gate valves, bibcocks, and stop cocks.' },
      { name: 'Plumbing Accessories', slug: 'plumbing-accessories', description: 'PTFE Teflon tape, pipe wrenches, silicone sealants, and gaskets.' },
    ],
  },
  {
    name: 'Paint & Accessories',
    slug: 'paint',
    description: 'Commercial bristle brushes, rollers, masking tapes, abrasives, and surface preparation consumables.',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    displayOrder: 5,
    subcategories: [
      { name: 'Brushes & Rollers', slug: 'brushes-rollers', description: 'Synthetic and natural bristle brushes, roller cages, and sleeves.' },
      { name: 'Sandpaper & Abrasives', slug: 'sandpaper-abrasives', description: 'Waterproof silicon carbide paper, sanding blocks, and discs.' },
      { name: 'Tapes & Adhesives', slug: 'tapes-adhesives', description: 'High-adhesion masking tape, contact adhesive, and epoxy.' },
    ],
  },
  {
    name: 'Safety',
    slug: 'safety',
    description: 'Personal protective equipment (PPE), heavy-duty gloves, impact eyewear, ear protection, and helmets.',
    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
    displayOrder: 6,
    subcategories: [
      { name: 'Work Gloves', slug: 'work-gloves', description: 'Nitrile coated, leather welding, and anti-cut safety gloves.' },
      { name: 'Eye & Ear Protection', slug: 'eye-ear-protection', description: 'Polycarbonate safety goggles, face shields, and earplugs.' },
      { name: 'Helmets & Masks', slug: 'helmets-masks', description: 'Industrial hard hats and particulate dust respirators.' },
    ],
  },
];

const brandsData = [
  {
    name: 'INGCO',
    slug: 'ingco',
    description: 'Global manufacturer of professional quality tools made affordable.',
    logo: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'TOTAL',
    slug: 'total',
    description: 'Top-tier power tools and workshop equipment designed for tradesmen and professionals.',
    logo: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Bosch',
    slug: 'bosch',
    description: 'Engineering excellence in rotary hammers, angle grinders, and precision measuring devices.',
    logo: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Stanley',
    slug: 'stanley',
    description: 'Historic benchmark in measuring tapes, hand planes, utility knives, and mechanics tools.',
    logo: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Makita',
    slug: 'makita',
    description: 'Renowned Japanese power tool craftsmanship, durability, and cordless motor technology.',
    logo: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'DeWalt',
    slug: 'dewalt',
    description: 'Guaranteed Tough high-performance construction and woodworking tools.',
    logo: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Knipex',
    slug: 'knipex',
    description: 'World-renowned German pliers and gripping tools for mechanics and technicians.',
    logo: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'WD-40',
    slug: 'wd-40',
    description: 'Multi-use penetrant, lubricant, rust prevention, and corrosion inhibitor.',
    logo: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=200&q=80',
  },
];

const productsData = [
  // POWER TOOLS
  {
    productId: 'MHS-001001',
    name: 'Bosch GSB 550 Professional Impact Drill 550W',
    slug: 'bosch-gsb-550-professional-impact-drill-550w',
    brand: 'Bosch',
    category: 'Tools',
    subcategory: 'Power Tools',
    sku: 'BOS-GSB550-01',
    modelNumber: 'GSB 550',
    price: 13500,
    salePrice: 12200,
    isDemoPrice: true,
    stock: 14,
    lowStockThreshold: 4,
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'Robust 550W impact drill with dual-mode operation for masonry, steel, and wood drilling.',
    description: 'The Bosch GSB 550 Professional is a compact and powerful impact drill engineered for continuous jobsite and workshop drilling. Features an ergonomic handle, forward/reverse rotation, variable speed trigger, and sturdy 13mm keyed chuck.',
    specifications: [
      { key: 'Rated Power Input', value: '550 W' },
      { key: 'No-Load Speed', value: '0 - 2,800 RPM' },
      { key: 'Impact Rate', value: '0 - 41,800 BPM' },
      { key: 'Chuck Capacity', value: '1.5 - 13 mm' },
      { key: 'Drilling Dia. Concrete', value: '13 mm' },
      { key: 'Drilling Dia. Steel', value: '10 mm' },
      { key: 'Drilling Dia. Wood', value: '25 mm' },
      { key: 'Weight', value: '1.8 kg' },
    ],
    features: [
      'Powerful 550 Watt motor for demanding masonry drilling',
      'Dual mode selector: Rotary drilling and impact drilling',
      'Variable speed trigger with lock-on button for continuous operation',
      'Metal gear housing and robust keyed 13mm chuck',
    ],
    packageContents: [
      '1x Bosch GSB 550 Impact Drill',
      '1x Chuck Key',
      '1x Auxiliary Handle',
      '1x Depth Gauge Rod',
      '1x User Manual',
    ],
    warranty: '',
    rating: 4.8,
    reviewCount: 0,
    tags: ['drill', 'impact drill', 'power tools', 'bosch', 'masonry'],
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
  },
  {
    productId: 'MHS-001002',
    name: 'INGCO CIDLI200215 20V Cordless Lithium-Ion Impact Drill',
    slug: 'ingco-cidli200215-20v-cordless-lithium-ion-impact-drill',
    brand: 'INGCO',
    category: 'Tools',
    subcategory: 'Power Tools',
    sku: 'ING-CIDLI200215',
    modelNumber: 'CIDLI200215',
    price: 18900,
    salePrice: 17500,
    isDemoPrice: true,
    stock: 9,
    lowStockThreshold: 3,
    images: [
      'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'Cordless 20V brushless impact drill with 2x 2.0Ah batteries, fast charger, and carry case.',
    description: 'The INGCO CIDLI200215 delivers cordless freedom with 45Nm max torque. Includes mechanical 2-speed gearbox, 18+1+1 torque settings, integrated LED work light, and keyless auto-lock chuck.',
    specifications: [
      { key: 'Voltage', value: '20V DC' },
      { key: 'Battery', value: '2x 2.0Ah Li-Ion included' },
      { key: 'Max Torque', value: '45 Nm' },
      { key: 'Chuck Capacity', value: '0.8 - 10 mm Keyless' },
      { key: 'No-Load Speed', value: '0-400 / 0-1500 RPM' },
      { key: 'Max Impact Rate', value: '22,500 BPM' },
    ],
    features: [
      'Cordless 20V platform compatible with all INGCO P20S tools',
      'Integrated LED work light for dark corners',
      'Mechanical 2-speed gearing with forward/reverse switch',
      'Auto-lock keyless chuck for fast bit changes',
    ],
    packageContents: [
      '1x INGCO 20V Cordless Drill',
      '2x 2.0Ah Lithium-Ion Battery Packs',
      '1x 1-Hour Fast Charger',
      '3x Masonry Bits',
      '1x Canvas Carry Bag',
    ],
    warranty: '',
    rating: 4.7,
    reviewCount: 0,
    tags: ['ingco', 'cordless drill', '20v', 'p20s', 'battery drill'],
    isFeatured: true,
    isNew: true,
    isBestSeller: true,
  },
  {
    productId: 'MHS-001003',
    name: 'TOTAL TG1081006 4.5" Angle Grinder 850W 100mm',
    slug: 'total-tg1081006-angle-grinder-850w-100mm',
    brand: 'TOTAL',
    category: 'Tools',
    subcategory: 'Power Tools',
    sku: 'TOT-TG1081006',
    modelNumber: 'TG1081006',
    price: 8500,
    salePrice: 7800,
    isDemoPrice: true,
    stock: 18,
    lowStockThreshold: 5,
    images: [
      'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'Heavy-duty 850W angle grinder designed for metal fabrication, weld dressing, and concrete cutting.',
    description: 'TOTAL TG1081006 features high-temperature copper winding, robust aluminum gear head, spindle lock for rapid disc changes, and 2-position auxiliary handle for superior stability.',
    specifications: [
      { key: 'Rated Power', value: '850 W' },
      { key: 'Disc Diameter', value: '100 mm (4 Inch)' },
      { key: 'Spindle Thread', value: 'M10' },
      { key: 'No-Load Speed', value: '11,000 RPM' },
      { key: 'Weight', value: '1.9 kg' },
    ],
    features: [
      'Slim ergonomic barrel grip for single-hand control',
      'Spindle lock button for quick wheel replacement',
      'Heavy-duty alloy gearbox with sealed ball bearings',
    ],
    packageContents: [
      '1x TOTAL 850W Angle Grinder',
      '1x Auxiliary Grip Handle',
      '1x Pin Spanner Wrench',
      '1x Protective Safety Guard',
    ],
    warranty: '',
    rating: 4.6,
    reviewCount: 0,
    tags: ['grinder', 'angle grinder', 'cutting', 'total', 'metalwork'],
    isFeatured: false,
    isNew: false,
    isBestSeller: true,
  },
  {
    productId: 'MHS-001004',
    name: 'Makita M0900B 100mm (4") Industrial Angle Grinder 540W',
    slug: 'makita-m0900b-industrial-angle-grinder-540w',
    brand: 'Makita',
    category: 'Tools',
    subcategory: 'Power Tools',
    sku: 'MAK-M0900B',
    modelNumber: 'M0900B',
    price: 11500,
    salePrice: null,
    isDemoPrice: true,
    stock: 7,
    lowStockThreshold: 2,
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'Compact and lightweight Makita M Series grinder with machined bevel gears.',
    description: 'Makita MT Series M0900B delivers Japanese precision and durability in a compact form factor. Perfect for precision grinding, tile trimming, and metal surfacing.',
    specifications: [
      { key: 'Continuous Rating Input', value: '540 W' },
      { key: 'Wheel Diameter', value: '100 mm' },
      { key: 'No-Load Speed', value: '12,000 RPM' },
      { key: 'Power Cord', value: '2.0 m' },
      { key: 'Weight', value: '1.6 kg' },
    ],
    features: [
      'High heat resistance for extended operating cycles',
      'Machined bevel gears for prolonged gear service life',
      'Toggle switch conveniently mounted at rear',
    ],
    packageContents: [
      '1x Makita M0900B Grinder',
      '1x Wheel Guard',
      '1x Lock Nut Wrench',
    ],
    warranty: '',
    rating: 4.9,
    reviewCount: 0,
    tags: ['makita', 'angle grinder', 'power tools', 'grinding'],
    isFeatured: true,
    isNew: false,
    isBestSeller: false,
  },

  // HAND TOOLS
  {
    productId: 'MHS-002001',
    name: 'Stanley FatMax 8M/26ft Metric & Imperial Tape Measure',
    slug: 'stanley-fatmax-8m-tape-measure',
    brand: 'Stanley',
    category: 'Tools',
    subcategory: 'Measuring Tools',
    sku: 'STA-FM-8M',
    modelNumber: 'FMHT33868',
    price: 3600,
    salePrice: 3200,
    isDemoPrice: true,
    stock: 25,
    lowStockThreshold: 5,
    images: [
      'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'Extra-wide 32mm blade with 3.35m standout and BladeArmor coating for high jobsite durability.',
    description: 'Stanley FatMax 8m/26ft tape measure is built for professionals who require one-person measurements. Features high-impact ABS case with rubber overmold, 3-rivet hook, and anti-glare Mylar coated blade.',
    specifications: [
      { key: 'Blade Length', value: '8 Meters / 26 Feet' },
      { key: 'Blade Width', value: '32 mm' },
      { key: 'Blade Standout', value: 'Up to 3.35 m' },
      { key: 'Coating', value: 'BladeArmor + Mylar polyester film' },
      { key: 'Hook', value: 'Tru-Zero 3-rivet corrosion-resistant hook' },
    ],
    features: [
      'Massive 3.35m blade standout without buckling',
      'BladeArmor coating on the first 75mm reduces breakage by 95%',
      'Cushioned rubber grip survives repeated drops',
    ],
    packageContents: ['1x Stanley FatMax 8m Tape Measure'],
    warranty: '',
    rating: 5.0,
    reviewCount: 0,
    tags: ['stanley', 'tape measure', 'fatmax', 'measuring', 'hand tools'],
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
  },
  {
    productId: 'MHS-002002',
    name: 'Knipex 87 01 250 Cobra Water Pump Pliers 250mm',
    slug: 'knipex-87-01-250-cobra-water-pump-pliers',
    brand: 'Knipex',
    category: 'Tools',
    subcategory: 'Hand Tools',
    sku: 'KNP-8701250',
    modelNumber: '87 01 250',
    price: 9800,
    salePrice: 9100,
    isDemoPrice: true,
    stock: 12,
    lowStockThreshold: 3,
    images: [
      'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'German made push-button rapid adjustment pliers with self-locking gripping teeth.',
    description: 'Knipex Cobra high-tech water pump pliers feature 25 adjustment positions, box-joint design with double guide, and induction hardened teeth (~61 HRC) that eliminate slipping on pipes and nuts.',
    specifications: [
      { key: 'Length', value: '250 mm' },
      { key: 'Adjustment Positions', value: '25' },
      { key: 'Capacities for Pipes', value: '50 mm (2 Inch)' },
      { key: 'Capacities for Nuts', value: '46 mm' },
      { key: 'Weight', value: '335 g' },
    ],
    features: [
      'Push-button adjustment directly on the workpiece',
      'Self-locking on pipes and nuts: no slipping on the workpiece',
      'Gripping surfaces with specially hardened teeth (hardness approx. 61 HRC)',
    ],
    packageContents: ['1x Knipex 87 01 250 Cobra Pliers'],
    warranty: '',
    rating: 5.0,
    reviewCount: 0,
    tags: ['knipex', 'pliers', 'cobra', 'hand tools', 'plumbing tools'],
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
  },
  {
    productId: 'MHS-002003',
    name: 'TOTAL 16oz Fiberglass Claw Hammer THT73166',
    slug: 'total-16oz-fiberglass-claw-hammer-tht73166',
    brand: 'TOTAL',
    category: 'Tools',
    subcategory: 'Hand Tools',
    sku: 'TOT-THT73166',
    modelNumber: 'THT73166',
    price: 1850,
    salePrice: 1650,
    isDemoPrice: true,
    stock: 35,
    lowStockThreshold: 10,
    images: [
      'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'Drop-forged carbon steel head with shock-absorbing fiberglass handle and curved claw.',
    description: 'The TOTAL 16oz claw hammer is balanced for precision nail driving and effortless extraction. Features induction hardened striking face and non-slip rubber grip handle.',
    specifications: [
      { key: 'Head Weight', value: '16 oz (450 g)' },
      { key: 'Handle Material', value: 'Shock-Absorbing Fiberglass' },
      { key: 'Head Material', value: 'Drop-Forged #45 Carbon Steel' },
    ],
    features: [
      'Curved claw for high leverage nail pulling',
      'Epoxy-sealed head prevents loosening',
      'Ergonomic TPR anti-slip grip',
    ],
    packageContents: ['1x TOTAL 16oz Claw Hammer'],
    warranty: '',
    rating: 4.5,
    reviewCount: 0,
    tags: ['hammer', 'claw hammer', 'hand tools', 'total'],
    isFeatured: false,
    isNew: false,
    isBestSeller: true,
  },
  {
    productId: 'MHS-002004',
    name: 'INGCO 6-Piece Industrial Screwdriver Set HKSD0628',
    slug: 'ingco-6-piece-industrial-screwdriver-set-hksd0628',
    brand: 'INGCO',
    category: 'Tools',
    subcategory: 'Hand Tools',
    sku: 'ING-HKSD0628',
    modelNumber: 'HKSD0628',
    price: 2450,
    salePrice: 2150,
    isDemoPrice: true,
    stock: 22,
    lowStockThreshold: 6,
    images: [
      'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'Chrome Vanadium (Cr-V) steel shafts with strong magnetic black tips and soft rubber grip.',
    description: 'The INGCO 6-piece screwdriver set includes 3 slotted and 3 Phillips drivers. Manufactured from heat-treated Cr-V steel with hardened magnetic tips for screw holding.',
    specifications: [
      { key: 'Blade Material', value: 'Chrome-Vanadium (Cr-V) Steel' },
      { key: 'Tip Finish', value: 'Black Magnetic Hardened Tip' },
      { key: 'Handle', value: 'Dual-material TPR ergonomic cushion grip' },
    ],
    features: [
      'High-grade Cr-V round shank for high torque',
      'Magnetic tips hold screws securely during assembly',
      'Color-coded handles for quick size identification',
    ],
    packageContents: [
      '1x Slotted SL5.5 x 5 x 75 mm',
      '1x Slotted SL5.5 x 5 x 100 mm',
      '1x Slotted SL6.5 x 6 x 150 mm',
      '1x Phillips PH1 x 5 x 75 mm',
      '1x Phillips PH1 x 5 x 100 mm',
      '1x Phillips PH2 x 6 x 150 mm',
    ],
    warranty: '',
    rating: 4.8,
    reviewCount: 0,
    tags: ['screwdrivers', 'ingco', 'cr-v', 'hand tools'],
    isFeatured: false,
    isNew: true,
    isBestSeller: false,
  },

  // HARDWARE & FASTENERS
  {
    productId: 'MHS-003001',
    name: 'Stainless Steel Grade 304 Ball Bearing Door Hinges 4"x3" (Pair)',
    slug: 'stainless-steel-304-ball-bearing-door-hinges-4x3-pair',
    brand: 'Stanley',
    category: 'Hardware',
    subcategory: 'Hinges & Handles',
    sku: 'HDW-HNG-SS304-43',
    modelNumber: 'BBH-4030',
    price: 1950,
    salePrice: 1750,
    isDemoPrice: true,
    stock: 40,
    lowStockThreshold: 10,
    images: [
      'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'Pair of heavy-duty SUS-304 stainless steel ball-bearing hinges with matching SS screws.',
    description: 'Engineered for smooth, silent swing on heavy wooden doors and exterior frames. Ball bearing mechanism prevents door sagging and withstands severe humidity without rusting.',
    specifications: [
      { key: 'Material', value: 'Solid Grade 304 Stainless Steel' },
      { key: 'Dimensions', value: '100 mm x 75 mm x 3.0 mm (4" x 3")' },
      { key: 'Mechanism', value: 'Dual precision ball bearings' },
      { key: 'Weight Capacity', value: 'Up to 70 kg per pair' },
    ],
    features: [
      'Rust-proof 304 stainless steel construction',
      'Dual ball bearings ensure whisper quiet operation',
      'Supplied with 16 matching stainless steel countersunk screws',
    ],
    packageContents: [
      '2x 4"x3" SS-304 Hinges',
      '16x Stainless Steel Fixing Screws',
    ],
    warranty: '',
    rating: 4.9,
    reviewCount: 0,
    tags: ['hinges', 'door hardware', 'stainless steel', 'hardware'],
    isFeatured: false,
    isNew: false,
    isBestSeller: true,
  },
  {
    productId: 'MHS-003002',
    name: 'Hardened Steel Self-Drilling Drywall Screws 1.5" (Pack of 500)',
    slug: 'hardened-steel-drywall-screws-1-5-pack-500',
    brand: 'TOTAL',
    category: 'Hardware',
    subcategory: 'Screws & Nails',
    sku: 'FAS-SCR-DW-15-500',
    modelNumber: 'DWS-3538',
    price: 1650,
    salePrice: null,
    isDemoPrice: true,
    stock: 50,
    lowStockThreshold: 15,
    images: [
      'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'Black phosphated bugle head drywall screws with sharp piercing points for gypsum and timber.',
    description: 'Commercial grade black phosphated drywall screws. High-tensile steel core ensures no head-shearing when driven with high-speed drywall screw guns.',
    specifications: [
      { key: 'Thread Size', value: '#6 (3.5 mm)' },
      { key: 'Length', value: '38 mm (1.5 Inch)' },
      { key: 'Head Type', value: 'Bugle Head with #2 Phillips Recess' },
      { key: 'Finish', value: 'Black Phosphate Corrosion Resistant Coating' },
      { key: 'Quantity', value: '500 Pieces per Box' },
    ],
    features: [
      'Sharp needle point penetrates sheet metal and timber rapidly',
      'Deep bugle head countersinks flush without tearing paper surface',
    ],
    packageContents: ['1x Sealed Box of 500 Drywall Screws'],
    warranty: '',
    rating: 4.7,
    reviewCount: 0,
    tags: ['screws', 'drywall', 'fasteners', 'hardware'],
    isFeatured: false,
    isNew: false,
    isBestSeller: true,
  },
  {
    productId: 'MHS-003003',
    name: 'Heavy Duty Solid Brass Padlock 60mm with 4 Brass Keys',
    slug: 'heavy-duty-solid-brass-padlock-60mm',
    brand: 'INGCO',
    category: 'Hardware',
    subcategory: 'Locks & Security',
    sku: 'ING-PAD-60B',
    modelNumber: 'DBPL0602',
    price: 2850,
    salePrice: 2500,
    isDemoPrice: true,
    stock: 19,
    lowStockThreshold: 5,
    images: [
      'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'Monoblock solid brass padlock body with hardened chrome-plated boron steel shackle.',
    description: 'High security solid extruded brass padlock. Resistant to hacksaw attacks, drilling, and corrosion. Ideal for securing warehouse gates, shop shutters, and tool chests.',
    specifications: [
      { key: 'Body Width', value: '60 mm' },
      { key: 'Body Material', value: 'Solid Extruded Brass' },
      { key: 'Shackle Material', value: 'Hardened Chrome-Plated Boron Steel' },
      { key: 'Lock Mechanism', value: 'Pin tumbler double-locking brass cylinder' },
    ],
    features: [
      'Dual ball bearing locking resists pulling and prying',
      'Hardened shackle resists bolt-cutter and sawing attacks',
      'Includes 4 precision-cut solid brass keys',
    ],
    packageContents: [
      '1x 60mm Solid Brass Padlock',
      '4x Solid Brass Keys',
    ],
    warranty: '',
    rating: 4.8,
    reviewCount: 0,
    tags: ['padlock', 'brass lock', 'security', 'locks', 'hardware'],
    isFeatured: true,
    isNew: false,
    isBestSeller: false,
  },

  // ELECTRICAL
  {
    productId: 'MHS-004001',
    name: 'Pure Copper Flexible Electric Cable 3/029 Twin Core 90-Meter Coil',
    slug: 'pure-copper-cable-3029-twin-core-90m',
    brand: 'TOTAL',
    category: 'Electrical',
    subcategory: 'Cables & Wiring',
    sku: 'ELC-CBL-3029-90M',
    modelNumber: 'CBL-3029-TC',
    price: 11500,
    salePrice: 10800,
    isDemoPrice: true,
    stock: 15,
    lowStockThreshold: 3,
    images: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: '99.99% pure electrolytic annealed copper conductor with fire-retardant PVC insulation.',
    description: 'High-conductivity Pakistani standard 3/029 twin core cable for home wiring, light fixtures, and appliance hookups. Fire-retardant grade PVC sheath prevents electrical short-circuits.',
    specifications: [
      { key: 'Conductor Size', value: '3/0.029 Inch' },
      { key: 'Conductor Material', value: '99.99% Pure Annealed Copper' },
      { key: 'Core Type', value: 'Twin Core Flat' },
      { key: 'Coil Length', value: '90 Meters (approx. 98 Yards)' },
      { key: 'Voltage Grade', value: '300 / 500 V' },
      { key: 'Insulation', value: 'Flame-Retardant PVC Compound' },
    ],
    features: [
      'Low electrical resistance reduces energy loss and heating',
      'Durable exterior jacket resists abrasion and aging',
    ],
    packageContents: ['1x 90-Meter Sealed Coil 3/029 Twin Core Cable'],
    warranty: '',
    rating: 4.8,
    reviewCount: 0,
    tags: ['cable', 'wire', 'pure copper', 'electrical', 'wiring'],
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
  },
  {
    productId: 'MHS-004002',
    name: 'PVC Heavy-Duty Electrical Insulation Tape 10-Pack (Multi-Color)',
    slug: 'pvc-electrical-insulation-tape-10-pack',
    brand: 'TOTAL',
    category: 'Electrical',
    subcategory: 'Electrical Accessories',
    sku: 'ELC-TPE-10PK',
    modelNumber: 'THT335101',
    price: 1250,
    salePrice: null,
    isDemoPrice: true,
    stock: 60,
    lowStockThreshold: 15,
    images: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'Flame retardant electrical tape rolls (10m each) for wire jointing and phase coding.',
    description: 'High elasticity PVC tape coated with pressure-sensitive rubber resin adhesive. Withstands up to 600V and 80°C operating conditions.',
    specifications: [
      { key: 'Width', value: '19 mm' },
      { key: 'Length per Roll', value: '10 Meters' },
      { key: 'Voltage Rating', value: 'Up to 600 V' },
      { key: 'Colors Included', value: 'Black, Red, Blue, Yellow, Green' },
    ],
    features: [
      'Excellent dielectric strength and weather resistance',
      'Strong adhesion without leaving sticky residue',
    ],
    packageContents: ['10x Assorted PVC Electrical Tape Rolls'],
    warranty: '',
    rating: 4.6,
    reviewCount: 0,
    tags: ['tape', 'electrical tape', 'pvc tape', 'insulation'],
    isFeatured: false,
    isNew: false,
    isBestSeller: false,
  },

  // PLUMBING
  {
    productId: 'MHS-005001',
    name: 'Heavy-Duty Brass Ball Valve 1" Full Bore Female Thread',
    slug: 'heavy-duty-brass-ball-valve-1-inch-full-bore',
    brand: 'TOTAL',
    category: 'Plumbing',
    subcategory: 'Valves & Taps',
    sku: 'PLM-VLV-BRS-10',
    modelNumber: 'BV-100-FB',
    price: 2450,
    salePrice: 2200,
    isDemoPrice: true,
    stock: 28,
    lowStockThreshold: 6,
    images: [
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'Solid forged brass ball valve with PTFE seals and vinyl-coated steel lever handle.',
    description: 'Engineered for municipal water mains, rooftop tank lines, and domestic plumbing lines. Features chrome-plated brass ball, blowout-proof stem, and standard BSP female threading.',
    specifications: [
      { key: 'Size', value: '1 Inch (25 mm) Nominal Bore' },
      { key: 'Body Material', value: 'Forged Heavy Brass CW617N' },
      { key: 'Pressure Rating', value: 'PN25 (up to 25 Bar)' },
      { key: 'Seal Material', value: 'Virgin PTFE Teflon Seals' },
      { key: 'Thread', value: 'ISO 228 (BSP) Female' },
    ],
    features: [
      'Full-port design ensures maximum water flow with minimal pressure drop',
      'Quarter-turn shutoff lever with corrosion-resistant vinyl grip',
    ],
    packageContents: ['1x 1" Heavy Brass Full-Port Ball Valve'],
    warranty: '',
    rating: 4.9,
    reviewCount: 0,
    tags: ['plumbing', 'valve', 'brass valve', 'water valve'],
    isFeatured: false,
    isNew: false,
    isBestSeller: true,
  },
  {
    productId: 'MHS-005002',
    name: 'PTFE High-Density Thread Sealant Tape 19mm x 15m (Box of 10)',
    slug: 'ptfe-high-density-thread-sealant-tape-10-pack',
    brand: 'TOTAL',
    category: 'Plumbing',
    subcategory: 'Plumbing Accessories',
    sku: 'PLM-TFE-10PK',
    modelNumber: 'TT-1915',
    price: 950,
    salePrice: 850,
    isDemoPrice: true,
    stock: 45,
    lowStockThreshold: 10,
    images: [
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: '100% pure PTFE teflon thread sealant tape for leak-proof water and gas threaded joints.',
    description: 'High-density plumber teflon tape designed to fill thread gaps on PVC, brass, GI, and stainless pipe fittings. Chemically inert and non-hardening.',
    specifications: [
      { key: 'Width', value: '19 mm' },
      { key: 'Length per Spool', value: '15 Meters' },
      { key: 'Thickness', value: '0.1 mm' },
      { key: 'Temperature Range', value: '-190°C to +260°C' },
    ],
    features: [
      'Creates instant airtight and watertight joint seals',
      'Clean spool casing with snap-on protective ring',
    ],
    packageContents: ['10x 15-Meter PTFE Thread Seal Tape Spools'],
    warranty: '',
    rating: 4.7,
    reviewCount: 0,
    tags: ['teflon tape', 'plumbing tape', 'ptfe', 'plumbing'],
    isFeatured: false,
    isNew: false,
    isBestSeller: false,
  },

  // PAINT & ACCESSORIES
  {
    productId: 'MHS-006001',
    name: 'Professional 4" Paint Brush with Pure Natural Bristles',
    slug: 'professional-4-inch-paint-brush-natural-bristles',
    brand: 'TOTAL',
    category: 'Paint & Accessories',
    subcategory: 'Brushes & Rollers',
    sku: 'PNT-BRS-04IN',
    modelNumber: 'THT84046',
    price: 850,
    salePrice: null,
    isDemoPrice: true,
    stock: 35,
    lowStockThreshold: 8,
    images: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'Natural white hog bristle brush with stainless ferrule and ergonomically shaped wooden handle.',
    description: 'Wide 4-inch paint brush for rapid application of enamels, distempers, primers, and varnishes. Tapered natural bristles hold maximum paint and deliver smooth streak-free finishes.',
    specifications: [
      { key: 'Brush Width', value: '100 mm (4 Inch)' },
      { key: 'Bristle Type', value: '100% Pure Natural White Bristle' },
      { key: 'Ferrule', value: 'Corrosion-resistant stainless steel band' },
      { key: 'Handle', value: 'Lacquered natural hardwood' },
    ],
    features: [
      'High paint pick-up and release capacity',
      'Epoxy-set bristles prevent shedding during painting',
    ],
    packageContents: ['1x 4" Professional Paint Brush'],
    warranty: '',
    rating: 4.6,
    reviewCount: 0,
    tags: ['paint brush', 'paint', 'painting tools', 'total'],
    isFeatured: false,
    isNew: false,
    isBestSeller: false,
  },
  {
    productId: 'MHS-006002',
    name: 'WD-40 Multi-Use Product Aerosol Can 400ml Smart Straw',
    slug: 'wd-40-multi-use-product-400ml-smart-straw',
    brand: 'WD-40',
    category: 'Paint & Accessories',
    subcategory: 'Tapes & Adhesives',
    sku: 'LUB-WD40-400',
    modelNumber: 'WD40-400SS',
    price: 1850,
    salePrice: 1650,
    isDemoPrice: true,
    stock: 30,
    lowStockThreshold: 5,
    images: [
      'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'Original multi-use penetrating oil, rust-loosening lubricant, and moisture displacer with dual-action Smart Straw.',
    description: 'WD-40 lubricates moving parts, penetrates frozen threads, frees rusted bolts, removes grime, and protects metal surfaces against corrosion. Permanent Smart Straw sprays wide or streams pinpoint.',
    specifications: [
      { key: 'Volume', value: '400 ml' },
      { key: 'Dispenser', value: 'Dual-action Smart Straw (Spray / Stream)' },
      { key: 'Key Functions', value: 'Displaces moisture, lubricates, penetrates, protects, cleans' },
    ],
    features: [
      'Never lose the straw again with integrated Smart Straw mechanism',
      'Penetrates deep into rusted threads in seconds',
      'Safe on metal, rubber, wood, and most plastics',
    ],
    packageContents: ['1x WD-40 400ml Can with Smart Straw'],
    warranty: '',
    rating: 5.0,
    reviewCount: 0,
    tags: ['wd-40', 'lubricant', 'rust remover', 'workshop', 'spray'],
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
  },

  // SAFETY
  {
    productId: 'MHS-007001',
    name: 'Heavy-Duty Split Cowhide Leather Welding & Workshop Gloves',
    slug: 'heavy-duty-split-cowhide-welding-gloves',
    brand: 'TOTAL',
    category: 'Safety',
    subcategory: 'Work Gloves',
    sku: 'SFT-GLV-LTH-01',
    modelNumber: 'TSP13101',
    price: 1450,
    salePrice: 1250,
    isDemoPrice: true,
    stock: 26,
    lowStockThreshold: 6,
    images: [
      'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'Heat and spark resistant 14" heavy split cowhide leather gloves with reinforced palm and cotton fleece lining.',
    description: 'Constructed for welding, metal grinding, construction, and high-heat workshop tasks. Kevlar stitching prevents seam burn-through.',
    specifications: [
      { key: 'Length', value: '35 cm (14 Inch) Gauntlet Cuff' },
      { key: 'Material', value: 'Grade A Split Cowhide Leather' },
      { key: 'Lining', value: 'Insulated Soft Cotton Fleece' },
      { key: 'Stitching', value: 'Flame-retardant Kevlar thread' },
    ],
    features: [
      'High thermal resistance against slag and welding sparks',
      'Reinforced thumb saddle for extended durability in heavy handling',
    ],
    packageContents: ['1x Pair of 14" Leather Safety Gloves'],
    warranty: '',
    rating: 4.8,
    reviewCount: 0,
    tags: ['gloves', 'safety gloves', 'welding', 'safety equipment'],
    isFeatured: false,
    isNew: false,
    isBestSeller: true,
  },
  {
    productId: 'MHS-007002',
    name: 'Anti-Fog Impact Resistant Polycarbonate Safety Goggles',
    slug: 'anti-fog-impact-resistant-safety-goggles',
    brand: 'INGCO',
    category: 'Safety',
    subcategory: 'Eye & Ear Protection',
    sku: 'SFT-GGL-ING-01',
    modelNumber: 'SPG01',
    price: 850,
    salePrice: 750,
    isDemoPrice: true,
    stock: 35,
    lowStockThreshold: 8,
    images: [
      'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'Wrap-around clear polycarbonate safety glasses with UV380 protection and scratch-resistant coating.',
    description: 'Designed for workshop grinding, woodworking, drilling, and masonry work. Conforms to ANSI Z87.1 high-velocity impact protection standards.',
    specifications: [
      { key: 'Lens Material', value: 'Optical Grade Polycarbonate' },
      { key: 'Standard', value: 'ANSI Z87.1 / CE EN166' },
      { key: 'UV Protection', value: '99.9% UVA/UVB Filter' },
      { key: 'Coating', value: 'Anti-Scratch & Anti-Fog' },
    ],
    features: [
      'Full panoramic vision with zero optical distortion',
      'Lightweight frame with rubberized non-slip temple tips',
    ],
    packageContents: ['1x INGCO Protective Safety Eyewear'],
    warranty: '',
    rating: 4.7,
    reviewCount: 0,
    tags: ['safety glasses', 'goggles', 'eye protection', 'ppe', 'safety'],
    isFeatured: false,
    isNew: true,
    isBestSeller: false,
  },
];

const guidesData = [
  {
    title: 'How to Choose a Drill: Rotary, Impact, or Hammer?',
    slug: 'how-to-choose-a-drill',
    category: 'Power Tools',
    summary: 'A practical breakdown comparing standard rotary drills, impact drivers, and rotary hammer drills to match your specific workshop or home renovation projects.',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
    content: `
### Understanding Drill Categories

Choosing the right drill comes down to the materials you plan to bore through:

1. **Standard Rotary Drill:**
   - Best for: Wood, soft plastics, and mild metals.
   - Mechanism: Pure rotational torque without percussive action.
   - Ideal for: Furniture assembly, light carpentry, and precision drilling.

2. **Impact / Combi Drill:**
   - Best for: Brick, lightweight aerated concrete, and general domestic masonry.
   - Mechanism: Rotates while delivering rapid, lightweight axial clicks (up to 40,000 BPM).
   - Ideal for: Hanging shelves, electrical conduit installations, and mixed materials.

3. **Rotary Hammer (SDS-Plus):**
   - Best for: Solid reinforced concrete, stone, and heavy chisel demolition.
   - Mechanism: Electro-pneumatic piston striking the back of a slotted SDS bit with genuine kinetic Joules.
   - Ideal for: Foundation work, heavy masonry anchors, and through-wall pipe routing.

### Key Factors to Check:
- **Chuck Type:** Keyless (fastest for light work) vs. Keyed (strongest grip for heavy torque).
- **Corded vs. Cordless:** Cordless offers mobility (look for 18V-20V lithium systems); corded offers non-stop raw power.
    `,
    keyTakeaways: [
      'Use standard rotary mode for timber and metal to prevent bit wandering.',
      'Use impact mode only on brick or mortar; do not use impact on brittle tiles without starting in rotary.',
      'For heavy concrete, choose an SDS-Plus rotary hammer over a standard impact drill.',
    ],
    relatedTools: ['Impact Drills', 'Rotary Hammers', 'Drill Bit Sets'],
    isFeatured: true,
  },
  {
    title: 'Hand Tools Buying Guide: Building a Reliable Kit',
    slug: 'hand-tools-buying-guide',
    category: 'Hand Tools',
    summary: 'The fundamental hand tools every homeowner, technician, and artisan needs for reliable maintenance and emergency repairs.',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80',
    content: `
### The Core Five Workshop Hand Tools

Every functional toolkit begins with high-grade hand tools forged from Chrome-Vanadium (Cr-V) steel:

1. **Claw Hammer (16oz):** A balanced carbon-steel claw hammer is the universal tool for carpentry, framing, and fixture removal.
2. **Combination & Water Pump Pliers:** High leverage gripping tools with induction-hardened teeth provide reliable grip on pipes and rounded fasteners.
3. **Screwdriver Set:** Invest in magnetic tip Phillips (PH1, PH2) and Slotted drivers with insulated ergonomic handles.
4. **Adjustable Wrench / Spanner:** A precision-machined 8" or 10" adjustable wrench eliminates the need to carry duplicate wrench sizes for quick jobs.
5. **Quality Measuring Tape:** Look for standout stability and reinforced hook rivets.
    `,
    keyTakeaways: [
      'Prioritize Chrome-Vanadium steel for resistance against twisting and rounding.',
      'Select handles with dual-material rubber overmolds for grip safety and comfort.',
      'Clean tools after work to avoid oil accumulation and surface rust.',
    ],
    relatedTools: ['Claw Hammers', 'Pliers', 'Screwdriver Sets'],
    isFeatured: true,
  },
  {
    title: 'Power Tool Safety: Critical Workshop Operating Rules',
    slug: 'power-tool-safety',
    category: 'Safety',
    summary: 'Essential safety procedures for grinders, circular saws, and drills to prevent workplace injuries and maintain equipment longevity.',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
    content: `
### Workshop Safety Protocol

Power tools spin at thousands of RPMs. Strict discipline prevents catastrophic accidents:

- **Eye Protection is Non-Negotiable:** Always wear ANSI Z87 rated safety glasses or a face shield when operating angle grinders or saws. Flying disc fragments and sparks travel at speeds capable of severe ocular injury.
- **Never Remove the Wheel Guard:** Angle grinder guards redirect shattered wheel debris away from the operator. Operating a grinder without its guard is extremely dangerous.
- **Disconnect Power Before Changing Accessories:** Always unplug corded tools or remove battery packs before swapping blades, bits, or discs.
- **Dress Appropriately:** No loose clothing, hanging neck chains, or untied long hair that can be caught in rotating spindles.
    `,
    keyTakeaways: [
      'Inspect discs and blades for hairline cracks before mounting.',
      'Secure your workpiece with clamps; never hold workpieces with one hand while cutting with the other.',
      'Allow the tool to reach full operating speed before engaging the material.',
    ],
    relatedTools: ['Safety Glasses', 'Work Gloves', 'Angle Grinders'],
    isFeatured: true,
  },
  {
    title: 'Screw Types Explained: Wood, Drywall, Machine & Self-Tapping',
    slug: 'screw-types-explained',
    category: 'Hardware',
    summary: 'A visual guide to threads, heads, and drive types so you always select the right screw for your substrate.',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80',
    content: `
### Matching Thread Geometry to Material

- **Drywall Screws:** Fine threads for metal studs; coarse threads for timber. Features a bugle head designed to countersink without breaking paper facing.
- **Wood Screws:** Smooth unthreaded shank beneath the head allows the top timber board to pull tightly against the base board without thread binding.
- **Self-Drilling / Tek Screws:** Incorporates a miniature drill flute at the tip that pierces sheet metal without pre-drilling pilot holes.
- **Machine Screws:** Uniform cylindrical thread designed to thread into pre-tapped metal holes or mate with corresponding hex nuts.
    `,
    keyTakeaways: [
      'Pre-drill pilot holes in hardwoods to prevent splitting.',
      'Use black phosphate screws indoors and zinc-plated or stainless steel screws outdoors.',
    ],
    relatedTools: ['Drywall Screws', 'Wood Screws', 'Tek Screws'],
    isFeatured: false,
  },
  {
    title: 'Choosing the Correct Screw Size and Wall Anchor',
    slug: 'choosing-the-correct-screw',
    category: 'Hardware',
    summary: 'How to calculate screw length, gauge, and wall plug pairings for brick, hollow blocks, and gypsum walls.',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80',
    content: `
### Anchor & Screw Selection Matrix

When mounting items to masonry or brick walls:
1. **Rule of Thumb for Length:** The screw should penetrate the wall plug by at least its own diameter past the plug tip.
2. **Brick & Solid Concrete:** Nylon expandable ribbed plugs (Rawlplugs) provide superior friction hold compared to cheap brittle plastic plugs.
3. **Hollow Block & Drywall:** Use butterfly toggle bolts or hollow wall metal anchors that clamp behind the hidden void.
    `,
    keyTakeaways: [
      'Drill bit diameter must match the wall plug outer diameter exactly.',
      'Blow dust out of the drilled hole before inserting the anchor plug.',
    ],
    relatedTools: ['Wall Anchors', 'Masonry Bits', 'Drywall Screws'],
    isFeatured: false,
  },
  {
    title: 'Measuring Tools Guide: Precision in Construction',
    slug: 'measuring-tools-guide',
    category: 'Measuring Tools',
    summary: 'From steel tapes and combination squares to digital calipers and torpedo levels, master the tools of layout precision.',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80',
    content: `
### The Tru-Zero Hook Secret

Did you know the metal hook at the end of every quality tape measure is intentionally loose?
The rivet play matches the exact thickness of the hook blade itself:
- When hooking onto an edge for an external measurement, the hook pulls out to account for blade thickness.
- When pushing against a wall for an internal measurement, the hook slides in.
    `,
    keyTakeaways: [
      'Never bend or hammer the tape measure hook tight—it will ruin your accuracy.',
      'Check spirit level accuracy by flipping it 180 degrees on the same surface; the bubble must remain centered.',
    ],
    relatedTools: ['Tape Measures', 'Spirit Levels', 'Calipers'],
    isFeatured: false,
  },
  {
    title: 'Basic Home Repair Tools: What Every Household Needs',
    slug: 'basic-home-repair-tools',
    category: 'Hardware',
    summary: 'Save money and resolve leaking taps, loose hinges, and wall mountings with an organized basic repair kit.',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80',
    content: `
### The Everyday Repair Checklist
1. 16oz Claw Hammer
2. Multi-bit Ratcheting Screwdriver
3. 8-inch Adjustable Spanner
4. Slip-joint Water Pump Pliers
5. Teflon Thread Seal Tape
6. WD-40 Lubricant Spray
7. LED Torch / Work Light
    `,
    keyTakeaways: [
      'Keep your emergency tools stored in a dry toolbox in an accessible location.',
      'Address minor leaks and loose hinges early before structural damage occurs.',
    ],
    relatedTools: ['Claw Hammers', 'Adjustable Wrenches', 'WD-40'],
    isFeatured: false,
  },
  {
    title: 'Plumbing Fittings Guide: PPRC, PVC, and Brass Valves',
    slug: 'plumbing-fittings-guide',
    category: 'Plumbing',
    summary: 'A clear guide to pipe materials, solvent cement, heat fusion, and valve ratings for clean water systems.',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
    content: `
### Choosing Pipe Materials
- **PPRC (Polypropylene Random Copolymer):** Heat-fused piping used for hot and cold internal pressurized water supplies. Welded joints become monolithic with zero risk of adhesive failure.
- **PVC (Polyvinyl Chloride):** Solvente-welded piping standard for drain-waste-vent (DWV) and gravity sanitation lines.
- **Forged Brass Valves:** Used at distribution points, pump inlets, and tank outlets for corrosion-proof flow isolation.
    `,
    keyTakeaways: [
      'Always wrap Teflon tape clockwise on male threads so it tightens into the fitting.',
      'Do not overtighten brass valves onto plastic threads to prevent splitting.',
    ],
    relatedTools: ['Brass Ball Valves', 'PTFE Tape', 'Pipe Wrenches'],
    isFeatured: false,
  },
  {
    title: 'Electrical Hardware Basics: Wire Gauges and Switch Ratings',
    slug: 'electrical-hardware-basics',
    category: 'Electrical',
    summary: 'Informational overview of standard wire gauges (3/029, 7/029, 7/036) and safe residential circuit ratings.',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    content: `
### Standard Copper Wire Applications in Pakistan:
- **3/0.029:** Lighting circuits, ceiling fans, and low-power LED fixtures (up to 5-10 Amps).
- **7/0.029:** General convenience power sockets, refrigerator points, and small kitchen appliances (up to 15-20 Amps).
- **7/0.036:** Heavy loads such as air conditioners, water heaters (geysers), and water pumps.
    `,
    keyTakeaways: [
      'Always shut off the main distribution board circuit breaker before touching wiring.',
      'Only use pure electrolytic copper cables; never compromise with copper-clad aluminum (CCA).',
    ],
    relatedTools: ['Copper Cables', 'Insulation Tape', 'Test Pens'],
    isFeatured: false,
  },
  {
    title: 'Workshop Essentials: Vises, Clamps, and Organization',
    slug: 'workshop-essentials',
    category: 'Tools',
    summary: 'Transform any garage or workspace into an efficient, safe fabrication bench with proper clamping and modular storage.',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
    content: `
### Workshop Ergonomics and Stability
- **Cast Iron Bench Vise:** Securely hold metal and timber for cutting, filing, and threading.
- **F-Clamps and C-Clamps:** Essential for glue-ups, welding tacking, and jig alignment.
- **Wall Louvered Panels & Bins:** Keep small fasteners, bolts, and screws sorted by size to save hours of searching.
    `,
    keyTakeaways: [
      'A solid workbench bolted to the floor improves both precision and personal safety.',
      'Store cutting blades and abrasive discs in dry, sealed containers away from humidity.',
    ],
    relatedTools: ['Clamps', 'Bench Vises', 'Toolboxes'],
    isFeatured: false,
  },
];

const couponsData = [
  {
    couponCode: 'WELCOME10',
    discountType: 'percentage',
    discountValue: 10,
    minimumOrder: 2000,
    maximumDiscount: 1000,
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
    usageLimit: 500,
    description: '10% off your initial order (Min. PKR 2,000, Max. discount PKR 1,000)',
    isActive: true,
  },
  {
    couponCode: 'WORKSHOP500',
    discountType: 'fixed',
    discountValue: 500,
    minimumOrder: 4000,
    maximumDiscount: 500,
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
    usageLimit: 300,
    description: 'PKR 500 flat discount on orders above PKR 4,000',
    isActive: true,
  },
  {
    couponCode: 'PROTOOL15',
    discountType: 'percentage',
    discountValue: 15,
    minimumOrder: 10000,
    maximumDiscount: 2500,
    expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    usageLimit: 100,
    description: '15% professional discount on orders above PKR 10,000 (Max. discount PKR 2,500)',
    isActive: true,
  },
];

module.exports = {
  categoriesData,
  brandsData,
  productsData,
  guidesData,
  couponsData,
};
