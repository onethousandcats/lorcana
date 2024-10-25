import { useEffect, useState } from "react"
import { $detail } from "../stores/detail";
import { $selected } from "../stores/selected";
import { useStore } from "@nanostores/react";
import { $decks, flip, ink } from "../stores/players";

export default ({ id }) => {
    const info = useStore($decks[0], {keys: [ id ]})[id];

    const locations = [ 'ink-well' ];

    const selected = useStore($selected);

    const [dragging, setDragging] = useState(false);
    const [dropSpot, setDropSpot] = useState({});

    const [position, setPosition] = useState({ x: 0, y: 0 });
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

        if (e.button === 1) {
            flip(id);
        }

        e.stopPropagation();

        setDragging(true);
        $selected.set(info);

        setOffset({ x: e.clientX - e.target.offsetLeft, y: e.clientY - e.target.offsetTop });
    }

    const onMouseUp = (e) => {
        setDragging(false);
        $selected.set(null);

        const position = { x: 0, y: 0 };

        if (dropSpot.spot !== undefined && (dropSpot.spot !== 'ink-well' || info.Inkable)) {
            position.x = dropSpot.x + PADDING;
            position.y = dropSpot.y + PADDING;

            if (dropSpot.spot === 'ink-well') {
                flip(id);
                ink(id);
            }
        }

        setPosition(position);
        
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