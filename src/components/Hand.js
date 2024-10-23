import { useStore } from "@nanostores/react"
import { $players } from "../stores/players"
import Spot from "./Spot";

export default () => {

    const player = useStore($players, { keys: ['p1']})['p1'];

    const hand = player.deck.slice(0, 7);

    return (
        <div className="hand">
            { hand.map(card => (
                <Spot card={card} />
            ))}
        </div>
    )
}