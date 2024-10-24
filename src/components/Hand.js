import { useStore } from "@nanostores/react"
import { $decks, $hands, flip } from "../stores/players"
import Spot from "./Spot";
import { useEffect, useState } from "react";

export default () => {
    const handCount = 7;

    const deck = useStore($decks[0]);
    const hand = useStore($hands[0]);

    let i = 0;
    const flipCard = () => {
        if (i < handCount) {
            const cardId = hand[i];
            flip(cardId);
            i++;

            setTimeout(flipCard, 200);
        }
    }

    useEffect(() => {
        i = 0;
        setTimeout(flipCard, 1000);
    }, []);

    return (
        <div className="hand">
            { hand.map((card) => (
                <Spot card={card} />
            ))}
        </div>
    )
}