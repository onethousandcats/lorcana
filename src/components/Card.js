import { useEffect, useState } from "react"
import { $detail } from "../stores/detail";
import { $selected } from "../stores/selected";
import { useStore } from "@nanostores/react";
import { $decks, $inkValue, $locationCount, flip, setCardPosition, setLocation } from "../stores/players";
import { locations, hidden } from "../config/locations";

export default ({ id }) => {
    const info = useStore($decks[0], {keys: [ id ]})[id];

    const locationList = Object.values(locations);
    
    const selected = useStore($selected);
    const inkValue = useStore($inkValue(0));
    
    const locationCount = useStore($locationCount(0));

    const [zIndex, setZIndex] = useState(100);
    const [dragging, setDragging] = useState(false);
    const [dropSpot, setDropSpot] = useState({});
    const [position, setPosition] = useState(info.location);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const PADDING = 10;

    const onMouseDown = (e) => {
        if (selected)
            return;

        if (e.button === 2 && info.shown) {
            console.log(info);
            $detail.set(info);
            return;
        }

        if (e.button === 1) 
            flip(id);

        e.stopPropagation();

        setDragging(true);
        $selected.set(info);

        setOffset({ x: e.clientX - info.position.x, y: e.clientY - info.position.y });
    }

    const onMouseUp = (e) => {
        setDragging(false);
        $selected.set(null);

        if (dropSpot.spot !== undefined 
            && (dropSpot.spot !== locations.INKWELL || info.Inkable) 
            && (dropSpot.spot !== locations.IN_PLAY || info.Cost <= inkValue) 
        )   
        {
            const p = { x: dropSpot.x + PADDING, y: dropSpot.y + PADDING }

            if (dropSpot.spot === locations.IN_PLAY)
                p.x += locationCount[dropSpot.spot] * (215 * 0.6 + PADDING);

            console.log(p);

            setCardPosition(id, p);
            setPosition(p);

            setLocation(id, dropSpot.spot);
            setZIndex(locationCount[dropSpot.spot]);
        } else {
            setPosition(info.position);
        }
        
        if (e.button === 2) {
            $detail.set(null);
        }
    }

    const handleMouseMove = (e) => {
        if (!dragging)
            return;

        const el = document.elementsFromPoint(e.clientX, e.clientY).filter(l => locationList.includes(l.id));

        if (el.length < 1)
            setDropSpot({});
        else {
            setDropSpot({ spot: el[0].id, x: el[0].getBoundingClientRect().x, y: el[0].getBoundingClientRect().y });
        }

        if (dropSpot.spot !== undefined)
            console.log(dropSpot);

        setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }

    let classes = `card`;

    if (hidden.includes(info.location))
        classes += ' flipped';

    if (info.Type === 'Location' && dragging)
        classes += ' turned';

    if (dragging)
        classes += ' selected';

    if (info.inked)
        classes += ' inked';

    return (
        <div
            onMouseMove={handleMouseMove}
            onTouchMove={handleMouseMove}
            key={info.Unique_ID}
            className={classes}
            onMouseDown={onMouseDown}
            onTouchStart={onMouseDown}
            onMouseUp={onMouseUp}
            onTouchEnd={onMouseUp}
            style={{
                transform: `translateX(${position.x}px) translateY(${position.y}px) ${info.Type === 'Location' && dragging ? 'rotate(90deg)' : ''}`,
                transition: !dragging ? "transform 0.5s ease" : "none",
                zIndex: zIndex,
            }}
        >
            <div className='inner'>
                <div 
                    className='front'
                    style={{
                        backgroundImage: `url("${info?.Image}")`,
                    }}
                >
                </div>
                <div className='back'>
                </div>
            </div>
        </div>
    )
}