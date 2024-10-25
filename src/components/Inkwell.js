import { useStore } from "@nanostores/react";
import { $inkValue } from "../stores/players";

export default () => {

    const inkValue = useStore($inkValue(0));

    return (
        <div
            id="ink-well" 
            className="ink-well section"
        >
            <p>{ inkValue }</p>
        </div>
    );
}