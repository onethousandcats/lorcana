import { useStore } from "@nanostores/react";
import { $detail } from "../stores/detail";

export default () => {

    const details = useStore($detail);

    if (!details)
        return null;

    console.log(details.Type);

    return (
        <div className={`details ${details.Type === 'Location' ? 'turned' : ''}`}>
            <div 
                className='card'
                style={{
                    backgroundImage: `url("${details.Image}")`,
                }}
            >
                
            </div>
        </div>
    );
}