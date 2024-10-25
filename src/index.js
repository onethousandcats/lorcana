import React, { useEffect } from 'react';
import Tableau from './components/Tableau';
import { createRoot } from 'react-dom/client';
import Card from './components/Card';
import { allCards, shuffle } from './libraries/data';

import './style/App.scss';
import { useStore } from '@nanostores/react';
import { $detail } from './stores/detail';
import Details from './components/Details';
import { $decks, $hands } from './stores/players';
import Hand from './components/Hand';

const App = () => {

    const handleContextMenu = (event) => {
        event.preventDefault();
    }

    const onMouseUp = (e) => {
        if (e.button === 2) {
            $detail.set(null);
        }
    }

    const handCount = 7;

    const cards = shuffle([...allCards()]);
    $decks[0].set(cards.slice(0, 60).map(card => ({ ...card, shown: false })));
    $hands[0].set(Object.keys($decks[0].get()).slice(0, handCount));

    return (
        <div 
            className='body'
            onContextMenu={handleContextMenu}
            onMouseUp={onMouseUp}
        >
            <Details />
            <img
                className='logo' 
                style={{
                    width: 200,
                }} 
                src='https://wiki.mushureport.com/images/thumb/5/57/Disney_Lorcana_TCG_Logo_transparent.png/1200px-Disney_Lorcana_TCG_Logo_transparent.png' 
            />
            <div className='play-area'>
                {/* <Tableau>
                    { Object.keys($decks[0].get()).slice(20, 28).map((card) => (
                        <Card id={card} />
                    ))}
                </Tableau> */}
                <Hand />
            </div>
        </div>
    )
};

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);