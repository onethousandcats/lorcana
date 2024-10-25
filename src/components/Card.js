import { useEffect, useState } from "react"
import { $detail } from "../stores/detail";
import { $selected } from "../stores/selected";
import { useStore } from "@nanostores/react";
import { $decks, $inkValue, flip, ink, setLocation, turnDown } from "../stores/players";

export default ({ id }) => {
    const info = useStore($decks[0], {keys: [ id ]})[id];
    const locations = [ 'ink-well', 'hand' ];
    
    const selected = useStore($selected);
    const inkValue = useStore($inkValue(0));

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

        setOffset({ x: e.clientX - info.location.x, y: e.clientY - info.location.y });
    }

    const onMouseUp = (e) => {
        setDragging(false);
        $selected.set(null);

        console.log(info);

        if (dropSpot.spot !== undefined 
            && (dropSpot.spot !== 'ink-well' || info.Inkable) 
            && (dropSpot.spot !== 'hand' || info.Cost <= inkValue) 
        )   
        {
            const p = { x: dropSpot.x + PADDING, y: dropSpot.y + PADDING }

            setLocation(id, p);
            setPosition(p);

            if (dropSpot.spot === 'ink-well') {
                turnDown(id);
                ink(id);
            }
        } else {
            setPosition(info.location);
        }
        
        if (e.button === 2) {
            $detail.set(null);
        }
    }

    const handleMouseMove = (e) => {
        if (!dragging)
            return;

        const el = document.elementsFromPoint(e.clientX, e.clientY).filter(l => locations.includes(l.id));

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

    if (!info.shown)
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
            key={info.Unique_ID}
            className={classes}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            style={{
                transform: `translateX(${position.x}px) translateY(${position.y}px) ${info.Type === 'Location' && dragging ? 'rotate(90deg)' : ''}`,
                transition: !dragging ? "transform 0.5s ease" : "none",
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