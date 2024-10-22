import React from 'react';
import Tableau from './components/Tableau';
import { createRoot } from 'react-dom/client';
import Card from './components/Card';

import './style/App.scss';

const App = () => (
    <div className='body'>
        <img 
            style={{
                width: 200,
            }} 
            src='https://wiki.mushureport.com/images/thumb/5/57/Disney_Lorcana_TCG_Logo_transparent.png/1200px-Disney_Lorcana_TCG_Logo_transparent.png' 
        />
        <Tableau>
            <Card url='https://images.lorcania.com/cards/tfc/216_en_tinker_bell-716.webp' />
            <Card url='https://images.lorcania.com/cards/rotf/214_en_sisu-716.webp' />
            <Card url='https://images.lorcania.com/cards/ur/217_en_anna-716.webp' />
            <Card url='https://images.lorcania.com/cards/c1/3_en_cinderella-716.webp' />
            <Card url='https://images.lorcania.com/cards/ur/220_en_ariel-716.webp' />
        </Tableau>
        <Tableau>
            <Card url='https://images.lorcania.com/cards/ur/3_en_ariel-716.webp' />
            <Card url='https://images.lorcania.com/cards/d23/1_en_mickey-716.webp' />
            <Card url='https://images.lorcania.com/cards/rotf/206_en_snow_white-716.webp' />
            <Card url='https://images.lorcania.com/cards/tfc/193_en_tinker_bell-716.webp' />
            <Card url='https://images.lorcania.com/cards/p1/34_en_mickey_mouse-716.webp' />
        </Tableau>
    </div>
);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);