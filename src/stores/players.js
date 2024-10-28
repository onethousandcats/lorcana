import { atom, computed, map } from "nanostores";
import { locations } from "../config/locations";

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
    $decks[0].setKey(id, { ...val, location: locations.INKWELL });
}

export const setLocation = (id, location) => {
    const val = $decks[0].get()[id];
    $decks[0].setKey(id, { ...val, location });
}

export const setCardPosition = (id, position) => {
    const val = $decks[0].get()[id];
    $decks[0].setKey(id, { ...val, position });
}

export const $inkValue = (player) => computed(($decks[player]), (deck) => {
    return Object.values(deck).filter(card => card.location === locations.INKWELL).length;
});

export const $locationCount = (player) => computed(($decks[player]), (deck) => {
    return Object.values(locations).reduce((acc, l) => {
        acc[l] = Object.values(deck).filter(card => card.location === l).length;
        return acc;
    }, {});
});