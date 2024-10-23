import { useState } from "react"

export default ({ url, name, rarity }) => {
    const [flipped, setFlipped] = useState(false);

    const onClick = () => {
        console.log(name, rarity);
        setFlipped(!flipped);
    }

    return (
        <div
            className={`card ${flipped ? 'flipped' : ''}`}
            onClick={onClick}
        >
            <div className='inner'>
                <div 
                    className='front'
                    style={{
                        backgroundImage: `url(${url})`,
                    }}    
                >
                </div>
                <div className='back'>
                </div>
            </div>
        </div>
    )
}