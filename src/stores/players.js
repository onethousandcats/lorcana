import { atom, map } from "nanostores";

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