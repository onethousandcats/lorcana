import { useStore } from "@nanostores/react";
import { $inkValue } from "../stores/players";
import { locations } from "../config/locations";

export default () => {

    const inkValue = useStore($inkValue(0));

    return (
        <div
            id={locations.INKWELL} 
            className="ink-well section"
        >
            <p>{ inkValue }</p>
        </div>
    );
}