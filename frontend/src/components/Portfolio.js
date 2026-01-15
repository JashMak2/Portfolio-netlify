import React, { useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import Experience from './Experience';
import Projects from './Projects';
import Skills from './Skills';
import Contact from './Contact';
import Footer from './Footer';
import { mockData } from '../data/mock';

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header />
      <main className="relative">
        <Hero data={mockData.personal} />
        <Experience experiences={mockData.experience} />
        <Projects projects={mockData.projects} />
        <Skills skills={mockData.skills} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;