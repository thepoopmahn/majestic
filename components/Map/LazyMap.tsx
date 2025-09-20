import { useEffect } from "react";
import Leaflet from "leaflet";
import * as ReactLeaflet from "react-leaflet";
import { type MapContainerProps } from "react-leaflet";
import ReactLeafletCustomControl from "react-leaflet-custom-control";
import "leaflet/dist/leaflet.css";
import styles from "./Map.module.css";

const { MapContainer } = ReactLeaflet;

export type ReactLeafletComponents = typeof ReactLeaflet & {
  Control: typeof ReactLeafletCustomControl;
};

export interface LazyMapProps
  extends Omit<MapContainerProps, "crs" | "children"> {
  /** Render callback */
  children: (
    components: ReactLeafletComponents,
    leaflet: typeof Leaflet,
  ) => React.ReactNode;
}

export function LazyMap({
  children,
  className,
  ...rest
}: LazyMapProps): React.JSX.Element {
  let mapClassName = styles.root;

  if (className) {
    mapClassName = `${mapClassName} ${className}`;
  }

  useEffect(() => {
    (async function init() {
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: "leaflet/images/marker-icon-2x.png",
        iconUrl: "leaflet/images/marker-icon.png",
        shadowUrl: "leaflet/images/marker-shadow.png",
      });
    })();
  }, []);

  return (
    <MapContainer crs={Leaflet.CRS.Simple} className={mapClassName} {...rest}>
      {children(
        { ...ReactLeaflet, Control: ReactLeafletCustomControl },
        Leaflet,
      )}
    </MapContainer>
  );
}
