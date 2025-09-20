import data from "@/data/fall2025/rucksacks.json";
import { Page } from "@/components/Page";
import { Map } from "@/components/Map";
import { GTA_MAP_HEIGHT, GTA_MAP_WIDTH } from "@/constants/gta-map";
import styles from "@/styles/Home.module.css";

type RucksackValue = "high" | "low";

type RucksackBlipColor = "red" | "orange" | "green";

function getRucksackBlipColor(
  value: RucksackValue | string,
): RucksackBlipColor {
  switch (value) {
    case "high":
      return "red";
    case "low":
      return "green";
    default:
      return "orange";
  }
}

export default function Home() {
  return (
    <Page title="Карта Рюкзаков">
      <Map
        center={[GTA_MAP_HEIGHT / 3.25, GTA_MAP_WIDTH / 2]}
        zoom={-2}
        minZoom={-4}
        maxZoom={1}
        attributionControl={false}
        className={styles.map}
      >
        {({ ImageOverlay, Marker, Popup }, { divIcon }) => (
          <>
            {data.blips.map((blip, i) => (
              <Marker
                key={i}
                position={[blip.position[1], blip.position[0]]}
                icon={divIcon({
                  html: `<img src="blips/radar_rucksack.png" srcset="blips/radar_rucksack@2x.png 2x" width="24" height="24" alt=""/>`,
                  iconSize: [28, 28],
                  popupAnchor: [0, -8],
                  className: `blip-circle blip-circle--${getRucksackBlipColor(blip.value)}`,
                })}
              >
                <Popup>{blip.description}</Popup>
              </Marker>
            ))}
            <ImageOverlay
              url="maps/ingame/source@0.25x.webp"
              bounds={[
                [0, 0],
                [GTA_MAP_HEIGHT, GTA_MAP_WIDTH],
              ]}
            />
          </>
        )}
      </Map>
    </Page>
  );
}
