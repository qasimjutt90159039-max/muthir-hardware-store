// Built-in Demo / Offline Catalog for Mutahir Hardware Store
// Ensures the frontend functions seamlessly on Vercel or when backend is unreachable

export const categoriesData = [
  {
    _id: 'cat-tools',
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
    _id: 'cat-hardware',
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
    _id: 'cat-electrical',
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
    _id: 'cat-plumbing',
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
    _id: 'cat-paint',
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
    _id: 'cat-safety',
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

export const brandsData = [
  {
    _id: 'brand-ingco',
    name: 'INGCO',
    slug: 'ingco',
    description: 'Global manufacturer of professional quality tools made affordable.',
    logo: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=200&q=80',
  },
  {
    _id: 'brand-total',
    name: 'TOTAL',
    slug: 'total',
    description: 'Top-tier power tools and workshop equipment designed for tradesmen and professionals.',
    logo: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=200&q=80',
  },
  {
    _id: 'brand-bosch',
    name: 'Bosch',
    slug: 'bosch',
    description: 'Engineering excellence in rotary hammers, angle grinders, and precision measuring devices.',
    logo: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=200&q=80',
  },
  {
    _id: 'brand-stanley',
    name: 'Stanley',
    slug: 'stanley',
    description: 'Historic benchmark in measuring tapes, hand planes, utility knives, and mechanics tools.',
    logo: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=200&q=80',
  },
  {
    _id: 'brand-makita',
    name: 'Makita',
    slug: 'makita',
    description: 'Renowned Japanese power tool craftsmanship, durability, and cordless motor technology.',
    logo: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=200&q=80',
  },
  {
    _id: 'brand-knipex',
    name: 'Knipex',
    slug: 'knipex',
    description: 'World-renowned German pliers and gripping tools for mechanics and technicians.',
    logo: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=200&q=80',
  },
  {
    _id: 'brand-wd40',
    name: 'WD-40',
    slug: 'wd-40',
    description: 'Multi-use penetrant, lubricant, rust prevention, and corrosion inhibitor.',
    logo: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=200&q=80',
  },
];

export const productsData = [
  {
    _id: 'prod-001',
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
    stockStatus: 'In Stock',
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
      { key: 'Weight', value: '1.8 kg' },
    ],
    features: [
      'Powerful 550 Watt motor for demanding masonry drilling',
      'Dual mode selector: Rotary drilling and impact drilling',
      'Variable speed trigger with lock-on button for continuous operation',
    ],
    packageContents: ['1x Bosch GSB 550 Impact Drill', '1x Chuck Key', '1x Auxiliary Handle', '1x User Manual'],
    rating: 4.8,
    reviewCount: 18,
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
  },
  {
    _id: 'prod-002',
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
    stockStatus: 'In Stock',
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
    ],
    features: [
      'Cordless 20V platform compatible with all INGCO P20S tools',
      'Integrated LED work light for dark corners',
      'Mechanical 2-speed gearing with forward/reverse switch',
    ],
    packageContents: ['1x INGCO 20V Cordless Drill', '2x 2.0Ah Battery Packs', '1x Fast Charger', '1x Carry Bag'],
    rating: 4.7,
    reviewCount: 12,
    isFeatured: true,
    isNew: true,
    isBestSeller: true,
  },
  {
    _id: 'prod-003',
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
    stockStatus: 'In Stock',
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
    packageContents: ['1x TOTAL 850W Angle Grinder', '1x Auxiliary Handle', '1x Pin Spanner', '1x Wheel Guard'],
    rating: 4.6,
    reviewCount: 9,
    isFeatured: false,
    isNew: false,
    isBestSeller: true,
  },
  {
    _id: 'prod-004',
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
    stockStatus: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'Compact and lightweight Makita M Series grinder with machined bevel gears.',
    description: 'Makita MT Series M0900B delivers Japanese precision and durability in a compact form factor. Perfect for precision grinding, tile trimming, and metal surfacing.',
    specifications: [
      { key: 'Continuous Rating Input', value: '540 W' },
      { key: 'Wheel Diameter', value: '100 mm' },
      { key: 'No-Load Speed', value: '12,000 RPM' },
      { key: 'Weight', value: '1.6 kg' },
    ],
    features: [
      'High heat resistance for extended operating cycles',
      'Machined bevel gears for prolonged gear service life',
    ],
    packageContents: ['1x Makita M0900B Grinder', '1x Wheel Guard', '1x Lock Nut Wrench'],
    rating: 4.9,
    reviewCount: 15,
    isFeatured: true,
    isNew: false,
    isBestSeller: false,
  },
  {
    _id: 'prod-005',
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
    stockStatus: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'Extra-wide 32mm blade with 3.35m standout and BladeArmor coating for high jobsite durability.',
    description: 'Stanley FatMax 8m/26ft tape measure is built for professionals who require one-person measurements. Features high-impact ABS case with rubber overmold, 3-rivet hook, and anti-glare Mylar coated blade.',
    specifications: [
      { key: 'Blade Length', value: '8 Meters / 26 Feet' },
      { key: 'Blade Width', value: '32 mm' },
      { key: 'Blade Standout', value: 'Up to 3.35 m' },
    ],
    features: [
      'Massive 3.35m blade standout without buckling',
      'BladeArmor coating on the first 75mm reduces breakage by 95%',
    ],
    packageContents: ['1x Stanley FatMax 8m Tape Measure'],
    rating: 5.0,
    reviewCount: 34,
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
  },
  {
    _id: 'prod-006',
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
    stockStatus: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'German made push-button rapid adjustment pliers with self-locking gripping teeth.',
    description: 'Knipex Cobra high-tech water pump pliers feature 25 adjustment positions, box-joint design with double guide, and induction hardened teeth (~61 HRC) that eliminate slipping on pipes and nuts.',
    specifications: [
      { key: 'Length', value: '250 mm' },
      { key: 'Adjustment Positions', value: '25' },
      { key: 'Capacities for Pipes', value: '50 mm (2 Inch)' },
    ],
    features: [
      'Push-button adjustment directly on the workpiece',
      'Self-locking on pipes and nuts: no slipping on the workpiece',
    ],
    packageContents: ['1x Knipex 87 01 250 Cobra Pliers'],
    rating: 5.0,
    reviewCount: 22,
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
  },
  {
    _id: 'prod-007',
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
    stockStatus: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'Drop-forged carbon steel head with shock-absorbing fiberglass handle and curved claw.',
    description: 'The TOTAL 16oz claw hammer is balanced for precision nail driving and effortless extraction. Features induction hardened striking face and non-slip rubber grip handle.',
    specifications: [
      { key: 'Head Weight', value: '16 oz (450 g)' },
      { key: 'Handle Material', value: 'Shock-Absorbing Fiberglass' },
    ],
    features: ['Curved claw for high leverage nail pulling', 'Epoxy-sealed head prevents loosening'],
    packageContents: ['1x TOTAL 16oz Claw Hammer'],
    rating: 4.5,
    reviewCount: 16,
    isFeatured: false,
    isNew: false,
    isBestSeller: true,
  },
  {
    _id: 'prod-008',
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
    stockStatus: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'Chrome Vanadium (Cr-V) steel shafts with strong magnetic black tips and soft rubber grip.',
    description: 'The INGCO 6-piece screwdriver set includes 3 slotted and 3 Phillips drivers. Manufactured from heat-treated Cr-V steel with hardened magnetic tips for screw holding.',
    specifications: [
      { key: 'Blade Material', value: 'Chrome-Vanadium (Cr-V) Steel' },
      { key: 'Tip Finish', value: 'Black Magnetic Hardened Tip' },
    ],
    features: ['High-grade Cr-V round shank', 'Magnetic tips hold screws securely'],
    packageContents: ['6x Screwdrivers (Assorted Slotted & Phillips)'],
    rating: 4.8,
    reviewCount: 14,
    isFeatured: false,
    isNew: true,
    isBestSeller: false,
  },
  {
    _id: 'prod-009',
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
    stockStatus: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'Pair of heavy-duty SUS-304 stainless steel ball-bearing hinges with matching SS screws.',
    description: 'Engineered for smooth, silent swing on heavy wooden doors and exterior frames. Ball bearing mechanism prevents door sagging and withstands severe humidity without rusting.',
    specifications: [
      { key: 'Material', value: 'Solid Grade 304 Stainless Steel' },
      { key: 'Dimensions', value: '100 mm x 75 mm x 3.0 mm (4" x 3")' },
    ],
    features: ['Rust-proof 304 stainless steel', 'Dual ball bearings ensure whisper quiet operation'],
    packageContents: ['2x 4"x3" SS-304 Hinges', '16x Screws'],
    rating: 4.9,
    reviewCount: 20,
    isFeatured: false,
    isNew: false,
    isBestSeller: true,
  },
  {
    _id: 'prod-010',
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
    stockStatus: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'Monoblock solid brass padlock body with hardened chrome-plated boron steel shackle.',
    description: 'High security solid extruded brass padlock. Resistant to hacksaw attacks, drilling, and corrosion. Ideal for securing warehouse gates, shop shutters, and tool chests.',
    specifications: [
      { key: 'Body Width', value: '60 mm' },
      { key: 'Body Material', value: 'Solid Extruded Brass' },
    ],
    features: ['Dual ball bearing locking', 'Hardened boron steel shackle'],
    packageContents: ['1x 60mm Brass Padlock', '4x Keys'],
    rating: 4.8,
    reviewCount: 11,
    isFeatured: true,
    isNew: false,
    isBestSeller: false,
  },
  {
    _id: 'prod-011',
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
    stockStatus: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: '99.99% pure electrolytic annealed copper conductor with fire-retardant PVC insulation.',
    description: 'High-conductivity Pakistani standard 3/029 twin core cable for home wiring, light fixtures, and appliance hookups. Fire-retardant grade PVC sheath prevents electrical short-circuits.',
    specifications: [
      { key: 'Conductor Size', value: '3/0.029 Inch' },
      { key: 'Material', value: '99.99% Pure Copper' },
      { key: 'Length', value: '90 Meters' },
    ],
    features: ['Low electrical resistance', 'Flame-retardant PVC compound'],
    packageContents: ['1x 90M Sealed Coil Cable'],
    rating: 4.8,
    reviewCount: 25,
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
  },
  {
    _id: 'prod-012',
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
    stockStatus: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'Solid forged brass ball valve with PTFE seals and vinyl-coated steel lever handle.',
    description: 'Engineered for municipal water mains, rooftop tank lines, and domestic plumbing lines. Features chrome-plated brass ball, blowout-proof stem, and standard BSP female threading.',
    specifications: [
      { key: 'Size', value: '1 Inch (25 mm)' },
      { key: 'Material', value: 'Forged Heavy Brass' },
      { key: 'Pressure Rating', value: 'PN25' },
    ],
    features: ['Full-port design ensures maximum water flow', 'Quarter-turn shutoff lever'],
    packageContents: ['1x 1" Heavy Brass Valve'],
    rating: 4.9,
    reviewCount: 17,
    isFeatured: false,
    isNew: false,
    isBestSeller: true,
  },
  {
    _id: 'prod-013',
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
    stockStatus: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'Original multi-use penetrating oil, rust-loosening lubricant, and moisture displacer with dual-action Smart Straw.',
    description: 'WD-40 lubricates moving parts, penetrates frozen threads, frees rusted bolts, removes grime, and protects metal surfaces against corrosion.',
    specifications: [
      { key: 'Volume', value: '400 ml' },
      { key: 'Action', value: 'Spray & Stream Smart Straw' },
    ],
    features: ['Never lose the straw mechanism', 'Penetrates rust in seconds'],
    packageContents: ['1x WD-40 400ml Can'],
    rating: 5.0,
    reviewCount: 42,
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
  },
  {
    _id: 'prod-014',
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
    stockStatus: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'Heat and spark resistant 14" heavy split cowhide leather gloves with reinforced palm.',
    description: 'Constructed for welding, metal grinding, construction, and high-heat workshop tasks. Kevlar stitching prevents seam burn-through.',
    specifications: [
      { key: 'Length', value: '35 cm (14 Inch)' },
      { key: 'Material', value: 'Split Cowhide Leather' },
    ],
    features: ['High thermal resistance against sparks', 'Reinforced thumb saddle'],
    packageContents: ['1x Pair of Leather Safety Gloves'],
    rating: 4.8,
    reviewCount: 8,
    isFeatured: false,
    isNew: false,
    isBestSeller: true,
  },
];

export const guidesData = [
  {
    _id: 'guide-01',
    title: 'How to Choose a Drill: Rotary, Impact, or Hammer?',
    slug: 'how-to-choose-a-drill',
    category: 'Power Tools',
    summary: 'A practical breakdown comparing standard rotary drills, impact drivers, and rotary hammer drills to match your specific workshop or home renovation projects.',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
    content: `
### Understanding Drill Categories

Choosing the right drill comes down to the materials you plan to bore through:

1. **Standard Rotary Drill:** Best for wood, soft plastics, and mild metals without percussive action.
2. **Impact / Combi Drill:** Delivers rapid axial micro-clicks for brick and light domestic masonry.
3. **Rotary Hammer (SDS-Plus):** Uses electro-pneumatic piston with kinetic Joules for solid reinforced concrete.
    `,
    keyTakeaways: [
      'Use standard rotary mode for timber and metal to prevent bit wandering.',
      'Use impact mode only on brick or mortar.',
      'For heavy concrete, choose an SDS-Plus rotary hammer.',
    ],
    relatedTools: ['Impact Drills', 'Rotary Hammers', 'Drill Bit Sets'],
    isFeatured: true,
  },
  {
    _id: 'guide-02',
    title: 'Hand Tools Buying Guide: Building a Reliable Kit',
    slug: 'hand-tools-buying-guide',
    category: 'Hand Tools',
    summary: 'The fundamental hand tools every homeowner, technician, and artisan needs for reliable maintenance and emergency repairs.',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80',
    content: `
### The Core Five Workshop Hand Tools

Every functional toolkit begins with high-grade hand tools forged from Chrome-Vanadium (Cr-V) steel:
1. **Claw Hammer (16oz):** Universal tool for carpentry and fixture removal.
2. **Water Pump Pliers:** High leverage gripping with induction-hardened teeth.
3. **Screwdriver Set:** Magnetic tip Phillips and Slotted drivers.
4. **Adjustable Wrench:** Precision machined jaw for quick fittings.
5. **Quality Measuring Tape:** Reliable standout and durable blade.
    `,
    keyTakeaways: [
      'Prioritize Chrome-Vanadium steel for resistance against twisting.',
      'Select handles with dual-material rubber overmolds.',
    ],
    relatedTools: ['Claw Hammers', 'Pliers', 'Screwdriver Sets'],
    isFeatured: true,
  },
  {
    _id: 'guide-03',
    title: 'Power Tool Safety: Critical Workshop Operating Rules',
    slug: 'power-tool-safety',
    category: 'Safety',
    summary: 'Essential safety procedures for grinders, circular saws, and drills to prevent workplace injuries and maintain equipment longevity.',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
    content: `
### Workshop Safety Protocol

- **Eye Protection is Non-Negotiable:** Always wear ANSI Z87 rated safety glasses.
- **Never Remove the Wheel Guard:** Angle grinder guards redirect wheel debris.
- **Disconnect Power Before Changing Accessories:** Always unplug before bit or disc changes.
    `,
    keyTakeaways: [
      'Inspect discs and blades for hairline cracks before mounting.',
      'Secure your workpiece with clamps.',
    ],
    relatedTools: ['Safety Glasses', 'Work Gloves', 'Angle Grinders'],
    isFeatured: true,
  },
];

export const couponsData = [
  { code: 'WELCOME10', discountPercent: 10, minOrder: 2000, maxDiscount: 1000 },
  { code: 'WORKSHOP500', discountFixed: 500, minOrder: 4000 },
  { code: 'PROTOOL15', discountPercent: 15, minOrder: 10000, maxDiscount: 2500 },
];

// Mock API request handler that handles any URL and returns formatted JSON
export function handleMockRequest(url, method = 'get', requestData = null) {
  const cleanUrl = url.replace(/^[a-z]+:\/\/[^/]+/i, '').replace(/^\/api/, '');
  const [path, queryString] = cleanUrl.split('?');
  const params = new URLSearchParams(queryString || '');

  // 1. Categories
  if (path === '/categories' || path === '/categories/') {
    return categoriesData;
  }

  // 2. Brands
  if (path === '/brands' || path === '/brands/') {
    return brandsData;
  }

  // 3. Guides
  if (path === '/guides' || path === '/guides/') {
    return guidesData;
  }
  if (path.startsWith('/guides/')) {
    const slug = path.replace('/guides/', '');
    const guide = guidesData.find((g) => g.slug === slug || g._id === slug);
    if (guide) return guide;
    return guidesData[0];
  }

  // 4. Products - Home Collections
  if (path === '/products/home-collections') {
    return {
      featured: productsData.filter((p) => p.isFeatured),
      powerTools: productsData.filter((p) => p.subcategory === 'Power Tools'),
      handTools: productsData.filter((p) => p.subcategory === 'Hand Tools' || p.subcategory === 'Measuring Tools'),
      newArrivals: productsData.filter((p) => p.isNew),
      bestSellers: productsData.filter((p) => p.isBestSeller),
    };
  }

  // 5. Products - Suggestions
  if (path === '/products/suggestions') {
    const q = (params.get('q') || '').toLowerCase();
    if (!q) return [];
    return productsData
      .filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q))
      .slice(0, 5);
  }

  // 6. Single Product by Slug or ID
  if (path.startsWith('/products/slug/') || (path.startsWith('/products/') && !path.includes('?') && !path.includes('home-collections') && !path.includes('suggestions'))) {
    const slugOrId = path.replace('/products/slug/', '').replace('/products/', '');
    const product = productsData.find((p) => p.slug === slugOrId || p._id === slugOrId || p.productId === slugOrId) || productsData[0];
    const related = productsData.filter((p) => p._id !== product._id && p.category === product.category).slice(0, 4);
    return {
      product,
      relatedProducts: related.length > 0 ? related : productsData.slice(1, 5),
    };
  }

  // 6b. Product Reviews
  if (path.startsWith('/reviews/product/')) {
    return [];
  }

  // 7. Products List with Filters & Pagination
  if (path === '/products' || path === '/products/') {
    let filtered = [...productsData];

    const category = params.get('category');
    if (category) {
      filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    const subcategory = params.get('subcategory');
    if (subcategory) {
      filtered = filtered.filter((p) => p.subcategory?.toLowerCase() === subcategory.toLowerCase());
    }

    const brand = params.get('brand');
    if (brand) {
      filtered = filtered.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
    }

    const search = params.get('search');
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)
      );
    }

    const isFeatured = params.get('isFeatured');
    if (isFeatured === 'true') {
      filtered = filtered.filter((p) => p.isFeatured);
    }

    const isBestSeller = params.get('isBestSeller');
    if (isBestSeller === 'true') {
      filtered = filtered.filter((p) => p.isBestSeller);
    }

    const isNew = params.get('isNew');
    if (isNew === 'true') {
      filtered = filtered.filter((p) => p.isNew);
    }

    const page = parseInt(params.get('page') || '1', 10);
    const pageSize = parseInt(params.get('pageSize') || '12', 10);
    const total = filtered.length;
    const pages = Math.ceil(total / pageSize) || 1;
    const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

    return {
      products: paginated,
      total,
      page,
      pages,
    };
  }

  // 8. Auth
  if (path === '/auth/login') {
    const email = requestData?.email || 'admin@mutahirhardware.local';
    const isAdmin = email.includes('admin');
    return {
      _id: isAdmin ? 'usr-admin-01' : 'usr-cust-01',
      name: isAdmin ? 'Mutahir Store Admin' : 'Verified Customer',
      email,
      phone: '+92 308 6236092',
      role: isAdmin ? 'admin' : 'customer',
      token: 'demo-jwt-auth-token-mutahir',
    };
  }

  if (path === '/auth/register') {
    return {
      _id: 'usr-new-' + Date.now(),
      name: requestData?.name || 'Customer',
      email: requestData?.email || 'customer@mutahirhardware.local',
      phone: requestData?.phone || '+92 308 6236092',
      role: 'customer',
      token: 'demo-jwt-auth-token-mutahir',
    };
  }

  // 9. Orders
  if (path === '/orders' && method.toLowerCase() === 'post') {
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      _id: orderId,
      orderNumber: orderId,
      ...requestData,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    return newOrder;
  }

  if (path === '/orders/myorders') {
    return [
      {
        _id: 'ORD-982143',
        orderNumber: 'ORD-982143',
        createdAt: new Date().toISOString(),
        orderItems: [
          {
            name: 'Bosch GSB 550 Professional Impact Drill 550W',
            qty: 1,
            price: 12200,
            image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
          },
        ],
        totalPrice: 12200,
        paymentMethod: 'Cash on Delivery (COD)',
        status: 'Processing',
      },
    ];
  }

  // 10. Contact / Coupons / Default
  if (path === '/contact') {
    return { success: true, message: 'Your message has been received by Mutahir Hardware Store.' };
  }

  if (path === '/coupons/validate') {
    const code = (requestData?.code || '').toUpperCase();
    const coupon = couponsData.find((c) => c.code === code);
    if (coupon) {
      return { success: true, coupon };
    }
    return { success: false, message: 'Invalid or expired coupon' };
  }

  // Admin fallbacks
  if (path.startsWith('/admin')) {
    return {
      stats: { totalSales: 485000, totalOrders: 28, totalProducts: productsData.length, totalCustomers: 19 },
      products: productsData,
      categories: categoriesData,
      brands: brandsData,
      orders: [],
      customers: [],
      reviews: [],
    };
  }

  // Default fallback
  return { success: true, data: [] };
}
