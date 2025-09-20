import dynamic from "next/dynamic";
import type { LazyMapProps } from "./LazyMap";

const LazyMap = dynamic(() => import("./LazyMap").then((mod) => mod.LazyMap), {
  ssr: false,
});

export function Map(props: LazyMapProps): React.JSX.Element {
  return <LazyMap {...props} />;
}
