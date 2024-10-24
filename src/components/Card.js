import { useEffect, useState } from "react"
import { $detail } from "../stores/detail";

export default ({ info, flip }) => {
    const [flipped, setFlipped] = useState(!flip);
    const [dragging, setDragging] = useState(false);

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const onClick = () => {
        console.log('click');

        setFlipped(!flipped);
    }

    const onMouseDown = (e) => {
        if (e.button === 2 && !flipped) {
            $detail.set(info);
            return;
        }

        e.stopPropagation();

        setDragging(true);
        setOffset({ x: e.clientX - e.target.offsetLeft, y: e.clientY - e.target.offsetTop });
    }

    const onMouseUp = (e) => {
        if (e.button === 2) {
            $detail.set(null);
            return;
        }

        setDragging(false);
    }

    const handleDragEnd = () => {
        setDragging(false);

        console.log('drag', dragging);
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
            className={`card ${flipped ? 'flipped' : ''}`}
            onClick={onClick}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            style={{
                position: dragging ? "absolute" : "static",
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        >
            <div className='inner'>
                <div 
                    className='front'
                    style={{
                        backgroundImage: `url("${info.Image}")`,
                    }}
                >
                </div>
                <div className='back'>
                </div>
            </div>
        </div>
    )
}