import { useState } from "react"
import { $detail } from "../stores/detail";

export default ({ info, flip }) => {
    const [flipped, setFlipped] = useState(!flip);

    const onClick = () => {
        setFlipped(!flipped);
    }

    const onMouseDown = (e) => {
        if (e.button === 2) {
            $detail.set(info);
        }
    }

    const onMouseUp = (e) => {
        if (e.button === 2) {
            $detail.set(null);
        }
    }

    return (
        <div
            key={info.Unique_ID}
            className={`card ${flipped ? 'flipped' : ''}`}
            onClick={onClick}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
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