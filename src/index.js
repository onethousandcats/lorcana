import React, { useEffect } from 'react';
import Tableau from './components/Tableau';
import { createRoot } from 'react-dom/client';
import Card from './components/Card';
import { allCards, shuffle } from './libraries/data';

import './style/App.scss';
import { useStore } from '@nanostores/react';
import { $detail } from './stores/detail';
import Details from './components/Details';
import { $players } from './stores/players';
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

    const cards = shuffle([...allCards()]);
    $players.setKey('p1', { deck: cards.slice(0, 60) });

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
                <Tableau>
                    { cards.slice(0, 15).map((card) => (
                        <Card info={card} />
                    ))}
                </Tableau>
                <Hand />
            </div>
        </div>
    )
};

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);