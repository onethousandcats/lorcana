import { atom, computed, map } from "nanostores";

export const $decks = [
    map({}),
];

export const $hands = [
    atom([]),
];

const toggleShown = (id) => {
    const val = $decks[0].get()[id];
    $decks[0].setKey(id, { ...val, shown: !val.shown });
}

const setShown = (id, shown) => {
    const val = $decks[0].get()[id];
    $decks[0].setKey(id, { ...val, shown });
}

export const flip = (id) => toggleShown(id);
export const turnDown = (id) => setShown(id, false);
export const reveal = (id) => setShown(id, true);

export const ink = (id) => {
    const val = $decks[0].get()[id];
    $decks[0].setKey(id, { ...val, inked: true });
    turnDown(id);
}

export const setLocation = (id, location) => {
    const val = $decks[0].get()[id];
    $decks[0].setKey(id, { ...val, location });
}

export const $inkValue = (player) => computed(($decks[player]), (deck) => {
    return Object.values(deck).reduce((acc, card) => acc + (card.inked === true ? 1 : 0), 0);
});