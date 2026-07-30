import React, { useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import Experience from './Experience';
import Projects from './Projects';
import Skills from './Skills';
import Contact from './Contact';
import Footer from './Footer';
import SceneBackground from './three/SceneBackground';
import ScrollReveal3D from './ScrollReveal3D';
import { mockData } from '../data/mock';

const Portfolio = () => {
  return (
    <div className="min-h-screen text-foreground transition-colors duration-300">
      <SceneBackground />
      <Header />
      <main className="relative">
        <Hero data={mockData.personal} />
        <ScrollReveal3D>
          <Experience experiences={mockData.experience} />
        </ScrollReveal3D>
        <ScrollReveal3D>
          <Projects projects={mockData.projects} />
        </ScrollReveal3D>
        <ScrollReveal3D>
          <Skills skills={mockData.skills} />
        </ScrollReveal3D>
        <ScrollReveal3D>
          <Contact />
        </ScrollReveal3D>
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;