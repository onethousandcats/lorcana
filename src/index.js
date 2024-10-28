import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import './style/App.scss';
import { $detail } from './stores/detail';
import Details from './components/Details';
import Hand from './components/Hand';
import Inkwell from './components/Inkwell';
import { setup } from './backend/setup';
import { useStore } from '@nanostores/react';
import { $hands } from './stores/players';
import Card from './components/Card';
import Play from './components/Play';
import Deck from './components/Deck';

const App = () => {
    const hand = useStore($hands[0]);

    useEffect(() => {
        setup();
    }, []);
    
    const handleContextMenu = (event) => {
        event.preventDefault();
    }

    const onMouseUp = (e) => {
        if (e.button === 2) {
            $detail.set(null);
        }
    }

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
                <Deck />
                <Play />
                <Inkwell />
                <Hand />
                { hand.map(card => (
                    <Card id={card} />
                ))}
            </div>
        </div>
    )
};

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);