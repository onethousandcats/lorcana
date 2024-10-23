import { useStore } from "@nanostores/react";
import { $detail } from "../stores/detail";

export default () => {

    const details = useStore($detail);

    if (!details)
        return null;

    return (
        <div className='details'>
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