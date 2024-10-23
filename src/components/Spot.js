import { useState } from "react";
import Card from "./Card";

export default ({ card }) => {

    const [hover, setHover] = useState(false);

    const onMouseEnter = () => {
        setHover(true);
    }

    const onMouseLeave = () => {
        setHover(false);
    }

    return (
        <div 
            className="spot"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <Card info={card} flip />
        </div>
    );
}