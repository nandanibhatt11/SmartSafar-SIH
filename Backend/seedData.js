export const cities = [
  {
    "name": "Mussoorie",
    "state": "Uttarakhand",
    "liveDensity": 62,
    "densityNote": "Moderate — quieter alternatives available",
    "transit": "48%",
    "weather": "18°C",
    "quietWindow": "6–8 AM",
    "experience": "8.4/10",
    "center": [
      30.4598,
      78.0667
    ],
    "stays": [
      {
        "id": "ms1",
        "name": "Hotel Mall Palace",
        "kind": "Hotel",
        "price": 2200,
        "density": 68,
        "alternative": "Landour budget homestays"
      },
      {
        "id": "ms2",
        "name": "Landour Homestay",
        "kind": "Homestay",
        "price": 1400,
        "density": 24
      },
      {
        "id": "ms3",
        "name": "Backpackers Den",
        "kind": "Hostel",
        "price": 700,
        "density": 31
      },
      {
        "id": "ms4",
        "name": "Quiet Valley Guesthouse",
        "kind": "Homestay",
        "price": 1200,
        "density": 18,
        "alternative": "Better than crowded Mall Road stays"
      }
    ],
    "food": [
      {
        "id": "mf1",
        "name": "Mall Road Dhabas",
        "kind": "Dhaba",
        "price": 250,
        "density": 86,
        "alternative": "Landour local cafés"
      },
      {
        "id": "mf2",
        "name": "Landour Local Dhaba",
        "kind": "Dhaba",
        "price": 180,
        "density": 29
      },
      {
        "id": "mf3",
        "name": "Pahadi Rasoi",
        "kind": "Local Food",
        "price": 300,
        "density": 34
      },
      {
        "id": "mf4",
        "name": "Valley View Eatery",
        "kind": "Local Food",
        "price": 220,
        "density": 19
      }
    ]
  },
  {
    "name": "Dehradun",
    "state": "Uttarakhand",
    "liveDensity": 54,
    "densityNote": "Moderate — several low-crowd options",
    "transit": "43%",
    "weather": "24°C",
    "quietWindow": "7–9 AM",
    "experience": "8.1/10",
    "center": [
      30.3165,
      78.0322
    ],
    "stays": [
      {
        "id": "ds1",
        "name": "Clock Tower Hotel",
        "kind": "Hotel",
        "price": 2100,
        "density": 72,
        "alternative": "Rajpur Road homestays"
      },
      {
        "id": "ds2",
        "name": "Rajpur Road Homestay",
        "kind": "Homestay",
        "price": 1300,
        "density": 25
      },
      {
        "id": "ds3",
        "name": "Doon Backpackers",
        "kind": "Hostel",
        "price": 650,
        "density": 28
      },
      {
        "id": "ds4",
        "name": "Green Valley Stay",
        "kind": "Homestay",
        "price": 1100,
        "density": 16
      }
    ],
    "food": [
      {
        "id": "df1",
        "name": "Paltan Bazaar Dhabas",
        "kind": "Dhaba",
        "price": 180,
        "density": 84,
        "alternative": "Rajpur local eateries"
      },
      {
        "id": "df2",
        "name": "Doon Pahadi Dhaba",
        "kind": "Dhaba",
        "price": 170,
        "density": 27
      },
      {
        "id": "df3",
        "name": "Rajpur Local Kitchen",
        "kind": "Local Food",
        "price": 240,
        "density": 22
      },
      {
        "id": "df4",
        "name": "Forest Side Café",
        "kind": "Local Food",
        "price": 280,
        "density": 18
      }
    ]
  }
];

export const locations = [
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m1",
    "name": "Lal Tibba",
    "image": "/places/laltibba.webp",
    "type": "famous",
    "category": "Nature & Scenic Viewpoints",
    "density": 58,
    "lat": 30.4548,
    "lng": 78.1026,
    "price": 300,
    "description": "Mussoorie's highest point in Landour, known for Himalayan panoramas, telescope views, and cool air.",
    "alternatives": [
      "Gun Hill",
      "George Everest House & Peak",
      "Cloud’s End"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m2",
    "name": "Gun Hill",
    "type": "famous",
    "category": "Nature & Scenic Viewpoints",
    "density": 78,
    "lat": 30.4633,
    "lng": 78.0675,
    "price": 500,
    "description": "A 360° viewpoint over the Doon Valley and Himalayas, reached by a short ropeway ride.",
    "alternatives": [
      "Lal Tibba",
      "Camel’s Back Road",
      "Hawa Ghar"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m3",
    "name": "Cloud’s End",
    "type": "famous",
    "category": "Nature & Scenic Viewpoints",
    "density": 28,
    "lat": 30.4259,
    "lng": 78.0215,
    "price": 300,
    "description": "Dense deodar forest at the end of the Mussoorie ridge, ideal for peaceful walks and a digital-detox feel.",
    "alternatives": [
      "Benog Wildlife Sanctuary",
      "George Everest House & Peak",
      "Camellia Walk"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m4",
    "name": "Mussoorie Lake",
    "type": "famous",
    "category": "Nature & Scenic Viewpoints",
    "density": 64,
    "lat": 30.4067,
    "lng": 78.0799,
    "price": 400,
    "description": "An artificial lake on the Dehradun–Mussoorie road with paddle boating and relaxed views.",
    "alternatives": [
      "Company Garden",
      "Bhatta",
      "Jharipani Falls"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m5",
    "name": "Company Garden",
    "type": "famous",
    "category": "Nature & Scenic Viewpoints",
    "density": 67,
    "lat": 30.4678,
    "lng": 78.0406,
    "price": 350,
    "description": "Flower beds, nursery, paddle boating, and a family-friendly garden setting.",
    "alternatives": [
      "Mussoorie Lake",
      "Landour Garden Spots"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m6",
    "name": "Kempty Falls",
    "type": "famous",
    "category": "Waterfalls & Picnic Spots",
    "density": 91,
    "lat": 30.4924,
    "lng": 78.0206,
    "price": 400,
    "description": "Iconic multi-tier waterfall with natural pools, ropeway access, and picnic activity.",
    "alternatives": [
      "Bhatta Falls",
      "Jharipani Falls",
      "Mossy Falls",
      "Jabarkhet Stream Falls"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m7",
    "name": "Bhatta Falls",
    "type": "alternative",
    "category": "Waterfalls & Picnic Spots",
    "density": 27,
    "lat": 30.4142,
    "lng": 78.0756,
    "price": 250,
    "description": "A quieter waterfall option with natural pools and a less commercial atmosphere.",
    "alternatives": [
      "Kempty Falls"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m8",
    "name": "Jharipani Falls",
    "type": "alternative",
    "category": "Waterfalls & Picnic Spots",
    "density": 22,
    "lat": 30.3928,
    "lng": 78.0825,
    "price": 250,
    "description": "A peaceful forest-setting waterfall reached by a short trek.",
    "alternatives": [
      "Kempty Falls",
      "Mossy Falls"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m9",
    "name": "Mossy Falls",
    "type": "alternative",
    "category": "Waterfalls & Picnic Spots",
    "density": 18,
    "lat": 30.4355,
    "lng": 78.0378,
    "price": 300,
    "description": "A quiet moss-covered waterfall experience away from the busiest tourist spots.",
    "alternatives": [
      "Kempty Falls",
      "Jharipani Falls"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m10",
    "name": "Jabarkhet Stream Falls",
    "type": "alternative",
    "category": "Waterfalls & Picnic Spots",
    "density": 14,
    "lat": 30.4359,
    "lng": 78.0915,
    "price": 300,
    "description": "A lesser-known stream-and-falls option in a nature-reserve setting.",
    "alternatives": [
      "Kempty Falls"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m11",
    "name": "Benog Wildlife Sanctuary / Benog Tibba",
    "image": "/places/Benog.png",
    "type": "famous",
    "category": "Adventure & Treks",
    "density": 24,
    "lat": 30.4118,
    "lng": 78.0067,
    "price": 500,
    "description": "Moderate trek through deodar forests with birdwatching and Himalayan views.",
    "alternatives": [
      "Bhadraj Temple Trek",
      "George Everest Peak Trail",
      "Landour / Camellia Walks"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m12",
    "name": "George Everest House & Peak",
    "type": "famous",
    "category": "Adventure & Treks",
    "density": 38,
    "lat": 30.4597,
    "lng": 78.0308,
    "price": 200,
    "description": "Historic ruins, ridge views, and a short forest walk near Hathipaon.",
    "alternatives": [
      "Cloud’s End",
      "Benog Trails",
      "Lal Tibba"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m13",
    "name": "Mussoorie Adventure Park",
    "type": "famous",
    "category": "Adventure & Treks",
    "density": 49,
    "lat": 30.4536,
    "lng": 78.0758,
    "price": 1200,
    "description": "Outdoor adventure activities such as zip-lining and rappelling.",
    "alternatives": [
      "Camel’s Back Road",
      "George Everest Peak Trail"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m14",
    "name": "Camel’s Back Road",
    "type": "famous",
    "category": "Adventure & Treks",
    "density": 52,
    "lat": 30.459,
    "lng": 78.0715,
    "price": 200,
    "description": "A scenic 2–3 km walk and ride route with a camel-shaped rock formation and sunset views.",
    "alternatives": [
      "Landour Walks",
      "Cloud’s End Trails"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m15",
    "name": "Nag Tibba Trek",
    "type": "alternative",
    "category": "Adventure & Treks",
    "density": 20,
    "lat": 30.5816,
    "lng": 78.2917,
    "price": 1800,
    "description": "A longer day or overnight trekking option beyond Mussoorie.",
    "alternatives": [
      "George Everest Peak Trail",
      "Benog Tibba"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m16",
    "name": "Bhadraj Temple Trek",
    "type": "alternative",
    "category": "Adventure & Treks",
    "density": 17,
    "lat": 30.374,
    "lng": 77.994,
    "price": 500,
    "description": "A scenic hill trek combining views with the Bhadraj Temple.",
    "alternatives": [
      "Benog Tibba",
      "George Everest Peak Trail"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m17",
    "name": "Landour / Camellia Walk",
    "type": "alternative",
    "category": "Adventure & Treks",
    "density": 16,
    "lat": 30.457,
    "lng": 78.091,
    "price": 150,
    "description": "A quieter walking option through Landour's forested lanes.",
    "alternatives": [
      "Camel’s Back Road",
      "Cloud’s End"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m18",
    "name": "Nag Devta Temple",
    "type": "famous",
    "category": "Spiritual & Temples",
    "density": 23,
    "lat": 30.4541,
    "lng": 78.0785,
    "price": 100,
    "description": "A scenic and peaceful serpent-deity temple near Camel’s Back Road.",
    "alternatives": [
      "Local Shiva / Nag Temples",
      "Shiv Mandir on Kempty Road"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m19",
    "name": "Jwala Devi (Jwalaji) Temple",
    "type": "famous",
    "category": "Spiritual & Temples",
    "density": 25,
    "lat": 30.4108,
    "lng": 78.008,
    "price": 300,
    "description": "A hilltop temple dedicated to a form of Goddess Durga, with forest views and a short trek.",
    "alternatives": [
      "Surkanda Devi",
      "Bhadraj Temple",
      "Santura Devi"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m20",
    "name": "Shedup Choepelling Temple",
    "type": "famous",
    "category": "Spiritual & Temples",
    "density": 19,
    "lat": 30.4487,
    "lng": 78.0472,
    "price": 100,
    "description": "A peaceful Tibetan Buddhist temple in Happy Valley with prayer flags and a meditation atmosphere.",
    "alternatives": [
      "Radha-Krishna Mandir",
      "Christ Church"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m21",
    "name": "Bhadraj Temple",
    "type": "alternative",
    "category": "Spiritual & Temples",
    "density": 17,
    "lat": 30.374,
    "lng": 77.994,
    "price": 300,
    "description": "Hilltop temple dedicated to Bal Bhadra, combining spirituality, trekking, and views.",
    "alternatives": [
      "Surkanda Devi",
      "Jwala Devi"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m22",
    "name": "Surkanda Devi",
    "type": "alternative",
    "category": "Spiritual & Temples",
    "density": 35,
    "lat": 30.4149,
    "lng": 78.3187,
    "price": 800,
    "description": "A panoramic temple-and-trek option near Dhanaulti.",
    "alternatives": [
      "Jwala Devi",
      "Bhadraj Temple"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m23",
    "name": "Santura Devi",
    "type": "alternative",
    "category": "Spiritual & Temples",
    "density": 15,
    "lat": 30.39,
    "lng": 78.22,
    "price": 500,
    "description": "A quieter local spiritual option associated with the same genre as Jwala Devi.",
    "alternatives": [
      "Jwala Devi"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m24",
    "name": "Shiv Mandir on Kempty Road",
    "type": "alternative",
    "category": "Spiritual & Temples",
    "density": 14,
    "lat": 30.475,
    "lng": 78.034,
    "price": 100,
    "description": "A simple local Shiva temple noted as an alternative spiritual stop.",
    "alternatives": [
      "Nag Devta Temple"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m25",
    "name": "Radha-Krishna Mandir",
    "type": "alternative",
    "category": "Spiritual & Temples",
    "density": 31,
    "lat": 30.459,
    "lng": 78.066,
    "price": 100,
    "description": "A central local temple offering a quieter alternative to busier tourist sites.",
    "alternatives": [
      "Shedup Choepelling Temple"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m26",
    "name": "Christ Church",
    "type": "alternative",
    "category": "Spiritual & Temples",
    "density": 48,
    "lat": 30.4623,
    "lng": 78.0641,
    "price": 100,
    "description": "Historic Anglican church in the Mall Road area, suited to heritage-focused visits.",
    "alternatives": [
      "Shedup Choepelling Temple"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m27",
    "name": "Mall Road",
    "type": "famous",
    "category": "Colonial Heritage, Walks & Markets",
    "density": 84,
    "lat": 30.4598,
    "lng": 78.0667,
    "price": 1200,
    "description": "Bustling colonial-era promenade for strolling, people-watching, food, shopping, and sunset.",
    "alternatives": [
      "Landour",
      "Sister’s Bazaar",
      "Char Dukan"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m28",
    "name": "Landour",
    "type": "famous",
    "category": "Colonial Heritage, Walks & Markets",
    "density": 24,
    "lat": 30.4545,
    "lng": 78.09,
    "price": 500,
    "description": "Quiet colonial cantonment with old bungalows, churches, Lal Tibba, and Char Dukan.",
    "alternatives": [
      "Mall Road",
      "Happy Valley"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m29",
    "name": "Sister’s Bazaar",
    "type": "alternative",
    "category": "Colonial Heritage, Walks & Markets",
    "density": 20,
    "lat": 30.454,
    "lng": 78.095,
    "price": 300,
    "description": "A quieter Landour shopping lane known for local preserves, cheese, and small artisan shops.",
    "alternatives": [
      "Mall Road"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m30",
    "name": "Char Dukan",
    "type": "alternative",
    "category": "Colonial Heritage, Walks & Markets",
    "density": 36,
    "lat": 30.454,
    "lng": 78.1,
    "price": 500,
    "description": "An iconic Landour café cluster with a relaxed colonial atmosphere.",
    "alternatives": [
      "Mall Road"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m31",
    "name": "Happy Valley",
    "type": "alternative",
    "category": "Colonial Heritage, Walks & Markets",
    "density": 22,
    "lat": 30.4528,
    "lng": 78.0485,
    "price": 250,
    "description": "A culturally distinct, quieter area around Tibetan Buddhist sites.",
    "alternatives": [
      "Landour",
      "Mall Road"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m32",
    "name": "Dhanaulti",
    "type": "alternative",
    "category": "Nearby Day-Trip Alternatives",
    "density": 21,
    "lat": 30.4205,
    "lng": 78.24,
    "price": 900,
    "description": "Forest-and-eco-park destination with a quieter hill experience.",
    "alternatives": [
      "Kanatal",
      "Chakrata"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m33",
    "name": "Kanatal",
    "type": "alternative",
    "category": "Nearby Day-Trip Alternatives",
    "density": 17,
    "lat": 30.4165,
    "lng": 78.327,
    "price": 1200,
    "description": "A quieter forested hill destination suited to nature and peaceful stays.",
    "alternatives": [
      "Dhanaulti",
      "Chakrata"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m34",
    "name": "Chakrata",
    "type": "alternative",
    "category": "Nearby Day-Trip Alternatives",
    "density": 18,
    "lat": 30.7037,
    "lng": 77.8697,
    "price": 1800,
    "description": "A broader nature-and-adventure shift for a longer day trip.",
    "alternatives": [
      "Dhanaulti",
      "Kanatal"
    ]
  },
  {
    "city": "Mussoorie",
    "state": "Uttarakhand",
    "id": "m35",
    "name": "Tehri Lake",
    "type": "alternative",
    "category": "Nearby Day-Trip Alternatives",
    "density": 32,
    "lat": 30.3784,
    "lng": 78.48,
    "price": 2200,
    "description": "A larger nature and adventure option around the Tehri reservoir.",
    "alternatives": [
      "Kanatal",
      "Dhanaulti"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d1",
    "name": "Robber’s Cave (Guchhupani)",
    "type": "famous",
    "category": "Nature & Scenic Spots",
    "density": 82,
    "lat": 30.3715,
    "lng": 78.0236,
    "price": 500,
    "description": "A limestone river cave and gorge where a stream disappears underground and reappears, with easy wading adventure.",
    "alternatives": [
      "Maldevta",
      "Shikhar Falls",
      "Digu/PPCL Waterfall",
      "Thano Village Forest Trails"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d2",
    "name": "Sahastradhara",
    "type": "famous",
    "category": "Nature & Scenic Spots",
    "density": 76,
    "lat": 30.3872,
    "lng": 78.131,
    "price": 500,
    "description": "Sulphur-rich springs, limestone cascades, caves, ropeway, and valley views.",
    "alternatives": [
      "Maldevta",
      "Shikhar Falls",
      "Asan Barrage",
      "Thano Village Forest Trails"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d3",
    "name": "Lachhiwala Nature Park",
    "type": "famous",
    "category": "Nature & Scenic Spots",
    "density": 62,
    "lat": 30.2155,
    "lng": 78.0935,
    "price": 400,
    "description": "Sal forest picnic area with pools, streams, and birdwatching, suited to a family-friendly outing.",
    "alternatives": [
      "Maldevta",
      "Thano Village Forest Trails",
      "Asan Barrage"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d4",
    "name": "Maldevta",
    "type": "alternative",
    "category": "Nature & Scenic Spots",
    "density": 20,
    "lat": 30.301,
    "lng": 78.146,
    "price": 300,
    "description": "Riverside Song Valley setting with streams and seasonal waterfalls.",
    "alternatives": [
      "Robber’s Cave",
      "Sahastradhara",
      "Lachhiwala Nature Park"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d5",
    "name": "Shikhar Falls",
    "type": "alternative",
    "category": "Nature & Scenic Spots",
    "density": 17,
    "lat": 30.4002,
    "lng": 78.121,
    "price": 300,
    "description": "A quieter cascade reached through a village-and-forest trail.",
    "alternatives": [
      "Robber’s Cave",
      "Sahastradhara"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d6",
    "name": "Digu/PPCL Waterfall",
    "type": "alternative",
    "category": "Nature & Scenic Spots",
    "density": 12,
    "lat": 30.282,
    "lng": 78.174,
    "price": 250,
    "description": "A very secluded cascade beyond Maldevta.",
    "alternatives": [
      "Robber’s Cave",
      "Sahastradhara"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d7",
    "name": "Thano Village Forest Trails",
    "type": "alternative",
    "category": "Nature & Scenic Spots",
    "density": 15,
    "lat": 30.255,
    "lng": 78.16,
    "price": 250,
    "description": "Dense sal forests and quiet walking loops for a slower nature experience.",
    "alternatives": [
      "Lachhiwala Nature Park",
      "Maldevta"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d8",
    "name": "Asan Barrage",
    "type": "alternative",
    "category": "Nature & Scenic Spots",
    "density": 19,
    "lat": 30.454,
    "lng": 77.671,
    "price": 300,
    "description": "A peaceful Ramsar wetland suited to birdwatching and quiet views.",
    "alternatives": [
      "Sahastradhara",
      "Lachhiwala Nature Park"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d9",
    "name": "Rajaji National Park",
    "type": "famous",
    "category": "Adventure & Outdoor Activities",
    "density": 45,
    "lat": 30.066,
    "lng": 78.3,
    "price": 1500,
    "description": "Wildlife safari destination for spotting elephants, deer, and potentially larger wildlife.",
    "alternatives": [
      "Kipling Trail",
      "Maldevta to Sahastradhara Ridge Trail",
      "Raipur to Nalapani Tibba / Kalanga Hill",
      "Shikhar Falls Short Trek"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d10",
    "name": "Kipling Trail",
    "type": "alternative",
    "category": "Adventure & Outdoor Activities",
    "density": 13,
    "lat": 30.398,
    "lng": 78.074,
    "price": 250,
    "description": "An old colonial path from Rajpur toward Jharipani, scenic and often quiet on weekdays.",
    "alternatives": [
      "Rajaji National Park"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d11",
    "name": "Maldevta to Sahastradhara Ridge Trail",
    "type": "alternative",
    "category": "Adventure & Outdoor Activities",
    "density": 12,
    "lat": 30.335,
    "lng": 78.151,
    "price": 300,
    "description": "A moderate ridge walk with valley views.",
    "alternatives": [
      "Rajaji National Park",
      "Kipling Trail"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d12",
    "name": "Raipur to Nalapani Tibba / Kalanga Hill",
    "type": "alternative",
    "category": "Adventure & Outdoor Activities",
    "density": 11,
    "lat": 30.32,
    "lng": 78.12,
    "price": 350,
    "description": "A longer historical trail option around Nalapani and Kalanga Hill.",
    "alternatives": [
      "Rajaji National Park",
      "Kipling Trail"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d13",
    "name": "Shikhar Falls Short Trek",
    "type": "alternative",
    "category": "Adventure & Outdoor Activities",
    "density": 17,
    "lat": 30.4002,
    "lng": 78.121,
    "price": 300,
    "description": "A short trek to the quieter Shikhar Falls.",
    "alternatives": [
      "Rajaji National Park",
      "Kipling Trail"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d14",
    "name": "Mindrolling Monastery / Great Stupa",
    "type": "famous",
    "category": "Spiritual & Religious Sites",
    "density": 35,
    "lat": 30.27,
    "lng": 77.995,
    "price": 200,
    "description": "A large Tibetan Buddhist complex in Clement Town with a tall stupa, prayer halls, gardens, and Tibetan culture.",
    "alternatives": [
      "Kalsi",
      "Sidh Temples",
      "Quiet Cave Shrines around Tapkeshwar"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d15",
    "name": "Tapkeshwar Mahadev Temple",
    "type": "famous",
    "category": "Spiritual & Religious Sites",
    "density": 58,
    "lat": 30.33,
    "lng": 78.031,
    "price": 150,
    "description": "An ancient cave temple where natural water drips continuously onto the Shivalinga.",
    "alternatives": [
      "Kalsi",
      "Sidh Temples",
      "Village Shrines near Maldevta/Thano"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d16",
    "name": "Kalsi",
    "type": "alternative",
    "category": "Spiritual & Religious Sites",
    "density": 16,
    "lat": 30.525,
    "lng": 77.82,
    "price": 500,
    "description": "An Ashokan Rock Edict site with a quiet Yamuna riverside village setting.",
    "alternatives": [
      "Mindrolling Monastery / Great Stupa",
      "Tapkeshwar Mahadev Temple"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d17",
    "name": "Sidh Temples",
    "type": "alternative",
    "category": "Spiritual & Religious Sites",
    "density": 14,
    "lat": 30.305,
    "lng": 78.05,
    "price": 150,
    "description": "Smaller, lesser-visited temples associated with the Char Sidh circuit.",
    "alternatives": [
      "Mindrolling Monastery / Great Stupa",
      "Tapkeshwar Mahadev Temple"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d18",
    "name": "Quiet Cave Shrines around Tapkeshwar",
    "type": "alternative",
    "category": "Spiritual & Religious Sites",
    "density": 12,
    "lat": 30.325,
    "lng": 78.025,
    "price": 100,
    "description": "Quiet local cave-shrine options around the Tapkeshwar area.",
    "alternatives": [
      "Tapkeshwar Mahadev Temple"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d19",
    "name": "Village Shrines near Maldevta/Thano",
    "type": "alternative",
    "category": "Spiritual & Religious Sites",
    "density": 10,
    "lat": 30.28,
    "lng": 78.155,
    "price": 100,
    "description": "Simple local village shrines offering a quieter spiritual experience.",
    "alternatives": [
      "Tapkeshwar Mahadev Temple"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d20",
    "name": "Forest Research Institute (FRI)",
    "type": "famous",
    "category": "Heritage, Culture & City Experiences",
    "density": 61,
    "lat": 30.342,
    "lng": 77.9963,
    "price": 1000,
    "description": "Iconic colonial Greco-Roman campus with botanical gardens, museums, and tree-lined avenues.",
    "alternatives": [
      "Kipling Trail",
      "Raipur / Nalapani",
      "Thano Village"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d21",
    "name": "Clock Tower (Ghanta Ghar)",
    "type": "famous",
    "category": "Heritage, Culture & City Experiences",
    "density": 72,
    "lat": 30.3256,
    "lng": 78.0437,
    "price": 300,
    "description": "A central city landmark and meeting point surrounded by Dehradun's urban life.",
    "alternatives": [
      "Thano Village",
      "Kipling Trail"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d22",
    "name": "Raipur / Nalapani",
    "type": "alternative",
    "category": "Heritage, Culture & City Experiences",
    "density": 20,
    "lat": 30.316,
    "lng": 78.12,
    "price": 250,
    "description": "Quieter stretches around Raipur and Nalapani with historical and local character.",
    "alternatives": [
      "Clock Tower (Ghanta Ghar)",
      "Forest Research Institute (FRI)"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d23",
    "name": "Thano Village",
    "type": "alternative",
    "category": "Heritage, Culture & City Experiences",
    "density": 15,
    "lat": 30.255,
    "lng": 78.16,
    "price": 250,
    "description": "A rural cultural setting with forests and a slower local feel.",
    "alternatives": [
      "Clock Tower (Ghanta Ghar)",
      "Forest Research Institute (FRI)"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d24",
    "name": "Malsi Deer Park / Dehradun Zoo Area",
    "type": "famous",
    "category": "Wildlife",
    "density": 26,
    "lat": 30.3604,
    "lng": 78.0722,
    "price": 300,
    "description": "Family-friendly park area on Mussoorie Road with deer, birds, and other animals.",
    "alternatives": [
      "Asan Barrage",
      "Thano Village Forests",
      "Maldevta Riverside"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d25",
    "name": "Thano Village Forests",
    "type": "alternative",
    "category": "Wildlife",
    "density": 15,
    "lat": 30.255,
    "lng": 78.16,
    "price": 250,
    "description": "Quiet forests suited to birds and casual nature observation.",
    "alternatives": [
      "Malsi Deer Park / Dehradun Zoo Area"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d26",
    "name": "Maldevta Riverside",
    "type": "alternative",
    "category": "Wildlife",
    "density": 20,
    "lat": 30.301,
    "lng": 78.146,
    "price": 300,
    "description": "Riverside setting for casual wildlife and nature sightings.",
    "alternatives": [
      "Malsi Deer Park / Dehradun Zoo Area",
      "Asan Barrage"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d27",
    "name": "Paltan Bazaar",
    "type": "famous",
    "category": "Shopping Hubs",
    "density": 80,
    "lat": 30.324,
    "lng": 78.043,
    "price": 500,
    "description": "City shopping hub for Basmati rice, spices, woolens, handicrafts, and street food.",
    "alternatives": [
      "Tibetan Market",
      "Rajpur Road / Astley Hall"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d28",
    "name": "Tibetan Market",
    "type": "famous",
    "category": "Shopping Hubs",
    "density": 68,
    "lat": 30.328,
    "lng": 78.041,
    "price": 500,
    "description": "Market near Parade Ground for woolens, jackets, handicrafts, jewellery, and Tibetan snacks.",
    "alternatives": [
      "Rajpur Road / Astley Hall"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d29",
    "name": "Rajpur Road / Astley Hall",
    "type": "famous",
    "category": "Shopping Hubs",
    "density": 55,
    "lat": 30.349,
    "lng": 78.079,
    "price": 1000,
    "description": "Modern shopping and café area with bookshops, bakeries, and clothing.",
    "alternatives": [
      "Tibetan Market",
      "Paltan Bazaar"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d30",
    "name": "Paltan Bazaar & Clock Tower Food Street",
    "type": "famous",
    "category": "Famous Food Places",
    "density": 82,
    "lat": 30.325,
    "lng": 78.043,
    "price": 250,
    "description": "Local food area for bun-tikki, chaat, and classic street food.",
    "alternatives": [
      "Rajpur Local Eateries",
      "Kalsang",
      "Amdo Samdup"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d31",
    "name": "Kalsang",
    "type": "famous",
    "category": "Famous Food Places",
    "density": 63,
    "lat": 30.329,
    "lng": 78.06,
    "price": 400,
    "description": "Tibetan and Chinese food option known for momos and thukpa.",
    "alternatives": [
      "Amdo Samdup",
      "Rajpur Local Eateries"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d32",
    "name": "Amdo Samdup",
    "type": "famous",
    "category": "Famous Food Places",
    "density": 45,
    "lat": 30.27,
    "lng": 77.995,
    "price": 350,
    "description": "Tibetan food option near Mindrolling with momos and thukpa.",
    "alternatives": [
      "Kalsang",
      "Rajpur Local Eateries"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d33",
    "name": "Ellora’s Melting Moments",
    "type": "famous",
    "category": "Famous Food Places",
    "density": 58,
    "lat": 30.35,
    "lng": 78.079,
    "price": 300,
    "description": "Bakery stop for classic pastries and rusks around Rajpur Road.",
    "alternatives": [
      "Rajpur Local Eateries"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d34",
    "name": "Rajpur Local Eateries",
    "type": "alternative",
    "category": "Famous Food Places",
    "density": 22,
    "lat": 30.349,
    "lng": 78.079,
    "price": 250,
    "description": "Quieter local eating options along Rajpur Road.",
    "alternatives": [
      "Kalsang",
      "Paltan Bazaar & Clock Tower Food Street"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d35",
    "name": "Black Pepper",
    "type": "famous",
    "category": "Famous Food Places",
    "density": 50,
    "lat": 30.349,
    "lng": 78.079,
    "price": 700,
    "description": "Multi-cuisine city dining option mentioned among Dehradun highlights.",
    "alternatives": [
      "Rajpur Local Eateries"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d36",
    "name": "Orchard",
    "type": "famous",
    "category": "Famous Food Places",
    "density": 47,
    "lat": 30.349,
    "lng": 78.079,
    "price": 800,
    "description": "Multi-cuisine dining option on the Rajpur Road side.",
    "alternatives": [
      "Rajpur Local Eateries"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d37",
    "name": "Town Table",
    "type": "famous",
    "category": "Famous Food Places",
    "density": 43,
    "lat": 30.349,
    "lng": 78.079,
    "price": 650,
    "description": "Multi-cuisine dining option mentioned among Rajpur Road food choices.",
    "alternatives": [
      "Rajpur Local Eateries"
    ]
  },
  {
    "city": "Dehradun",
    "state": "Uttarakhand",
    "id": "d38",
    "name": "Yellow Hills",
    "type": "famous",
    "category": "Famous Food Places",
    "density": 40,
    "lat": 30.349,
    "lng": 78.079,
    "price": 600,
    "description": "Food option noted for Uttarakhandi cuisine around Rajpur Road.",
    "alternatives": [
      "Rajpur Local Eateries"
    ]
  }
];
