import React from 'react';

import { PhoenixHero } from '../components/PhoenixHero';
import { ProductGrid } from '../components/ProductGrid';
import { Roadmap } from '../components/Roadmap';

const App = () => (
  <div className="min-h-screen bg-gradient-to-b from-phoenixBlack via-[#111222] to-[#0B0B0C] pb-24">
    <PhoenixHero />
    <ProductGrid />
    <Roadmap />
  </div>
);

export default App;
