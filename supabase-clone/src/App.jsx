import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Logos from './components/Logos';
import Products from './components/Products';
import FrameworkStarters from './components/FrameworkStarters';
import Customers from './components/Customers';
import BottomCTA from './components/BottomCTA';
import Footer from './components/Footer';

function App() {
  return (
    <div id="__next">
      <Navbar />
      <main className="relative min-h-screen">
        <div className="relative -mt-[65px]">
          <Hero />
        </div>
        <Logos />
        <Products />
        <FrameworkStarters />
        <Customers />
        <BottomCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
