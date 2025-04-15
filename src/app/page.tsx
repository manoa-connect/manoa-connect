'use client';

import HeroSec from '@/components/HeroSec';
import LandingHome from '@/components/LandingHome';
import { Navbar } from 'react-bootstrap'

/** The Home page. */
const Home = () => (
  <main>
    <HeroSec />
    <Navbar className="pt-3 bg-manoa-green"/>
    <LandingHome />
  </main>
);

export default Home;
