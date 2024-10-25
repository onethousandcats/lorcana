import { atom, computed, map } from "nanostores";

export const $decks = [
    map({}),
];

export const $hands = [
    atom([]),
];

export const flip = (id) => {
    const val = $decks[0].get()[id];
    $decks[0].setKey(id, { ...val, shown: !val.shown });
}

export const ink = (id) => {
    const val = $decks[0].get()[id];
    $decks[0].setKey(id, { ...val, inked: true });
}

export const $inkValue = (player) => computed(($decks[player]), (deck) => {
    return Object.values(deck).reduce((acc, card) => acc + (card.inked === true ? 1 : 0), 0);
});