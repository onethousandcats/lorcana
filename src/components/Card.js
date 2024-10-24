import { useEffect, useState } from "react"
import { $detail } from "../stores/detail";
import { useStore } from "@nanostores/react";
import { $decks, flip } from "../stores/players";

export default ({ id }) => {
    const info = useStore($decks[0], {keys: [ id ]})[id];

    const [dragging, setDragging] = useState(false);

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const onMouseDown = (e) => {
        if (e.button === 2 && info.shown) {
            $detail.set(info);
            return;
        }

        if (e.button === 1) {
            flip(id);
        }

        e.stopPropagation();

        setDragging(true);
        setOffset({ x: e.clientX - e.target.offsetLeft, y: e.clientY - e.target.offsetTop });
    }

    const onMouseUp = (e) => {
        setDragging(false);

        setPosition({ x: 0, y : 0 });
        
        if (e.button === 2) {
            $detail.set(null);
        }
    }

    const handleMouseMove = (e) => {
        if (!dragging)
            return;

        setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }

    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseLeave={onMouseUp}
            key={info.Unique_ID}
            className={`card ${!info.shown ? 'flipped' : ''}`}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            style={{
                transform: `translateX(${position.x}px) translateY(${position.y}px)`,
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