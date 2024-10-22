import { useState } from "react"

export default ({ url }) => {
    const [flipped, setFlipped] = useState(false);

    const onClick = () => {
        setFlipped(!flipped);
    }

    return (
        <div
            className={`card ${flipped ? 'flipped' : ''}`}
            onClick={onClick}
        >
            <div class='inner'>
                <div 
                    class='front'
                    style={{
                        backgroundImage: `url(${url})`,
                    }}    
                >
                </div>
                <div class ='back'>
                </div>
            </div>
        </div>
    )
}