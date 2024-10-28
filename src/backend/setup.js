import { allCards, shuffle } from "../libraries/data"
import { $decks, $hands } from "../stores/players";

export const setup = () => {
    const HAND_COUNT = 20; // 7;

    const cards = shuffle([...allCards()]);

    $decks[0].set(cards.slice(0, 60).map(card => ({ ...card, location: 'deck', position: { x: 0, y: 0 } })));
    $hands[0].set(Object.keys($decks[0].get()).slice(0, HAND_COUNT));
}