import { locations } from "../config/locations"

export default () => {
    // const deck = useStore($decks[0]);
    // const hand = useStore($hands[0]);

    // let i = 0;
    // const flipCard = () => {
    //     if (i < handCount) {
    //         const cardId = hand[i];
    //         flip(cardId);
    //         i++;

    //         setTimeout(flipCard, 200);
    //     }
    // }

    // useEffect(() => {
    //     i = 0;
    //     setTimeout(flipCard, 700);
    // }, []);

    return (
        <div 
            id={locations.HAND}
            className="hand section"
        >
        </div>
    )
}