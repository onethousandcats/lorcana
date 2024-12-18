import data from './cards.json' with { type: 'json' };

export const allCards = () => {
    return data;
}

export const shuffle = (cards) => {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]]; // Swap elements
      }
      return cards;
}