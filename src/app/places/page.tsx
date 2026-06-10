"use client";

import RetroSubpageLayout from "@/components/RetroSubpageLayout";

const places = [
  { name: "Jogbani", visited: true },
  { name: "Biratnagar", visited: true },
  { name: "Bhedetar", visited: true },
  { name: "ilam", visited: false },
  { name: "Pathibara Temple, Kanyam", visited: false },
  { name: "Shree Antu", visited: false },
  { name: "Delhi", visited: false },
  { name: "Kanpur", visited: true },
  { name: "Mumbai", visited: false },
  { name: "Hyderabad", visited: false },
  { name: "Bengaluru", visited: false },
  { name: "Uttarakhand", visited: false },
  { name: "Kashi Vishwanath Temple", visited: true },
  { name: "Bali", visited: false },
  { name: "Thailand", visited: false },
  { name: "Dubai", visited: false },
];

export default function PlacesPage() {
  return (
    <RetroSubpageLayout>
      <div className="retroLabel">ABOUT / PLACES / 2026</div>
      <h1 className="retroSectionTitle">Places.</h1>
      <p className="retroParagraph" style={{ maxWidth: '800px' }}>
        A collection of places I&apos;ve been to and places I want to visit.
      </p>

      <div className="retroPlacesGrid">
        {places.map((place) => (
          <div className={`retroPlaceItem ${place.visited ? "visited" : ""}`} key={place.name}>
            <span className="retroPlaceCheck">
              {place.visited ? "✓" : ""}
            </span>
            <span className={`retroPlaceName ${place.visited ? "visited" : ""}`}>
              {place.name}
            </span>
          </div>
        ))}
      </div>
    </RetroSubpageLayout>
  );
}
