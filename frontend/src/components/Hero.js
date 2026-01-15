import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, MapPin, Code, Zap } from 'lucide-react';
import { Button } from './ui/button';

const Hero = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-20 pb-8 lg:pb-12 px-4 overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`
             }} />
        <div className="grid-background"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element floating-element-1">
          <Code className="w-6 h-6 text-primary/30" />
        </div>
        <div className="floating-element floating-element-2">
          <Zap className="w-4 h-4 text-primary/20" />
        </div>
        <div className="floating-element floating-element-3">
          <div className="w-2 h-2 bg-primary/20 rounded-full" />
        </div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Content */}
          <div className={`flex-1 text-center lg:text-left transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold leading-tight">
                  Hi, I'm{' '}
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-primary to-amber-600/80 bg-clip-text text-transparent animate-gradient-x">
                      Jash
                    </span>
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-amber-600/80 rounded-full transform scale-x-0 animate-scale-x" />
                  </span>
                  <br />
                  <span className="text-muted-foreground">Makwana</span>
                </h1>
                
                <div className="relative">
                  <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold mb-6">
                    <span className="typing-animation">Product Manager & Software Engineer</span>
                  </h2>
                </div>
                
                <p className="text-base md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
                  MS Software Engineering student at Stevens Institute of Technology with expertise in product management, machine learning, and full-stack development. Currently serving as Product Manager at Community Dreams Foundation, driving sustainable community solutions.
                </p>
              </div>
            </div>

            {/* Enhanced Location */}
            <div className="flex items-center justify-center lg:justify-start mb-10 mt-8">
              <div className="flex items-center bg-muted/50 backdrop-blur-sm rounded-full px-6 py-3 border border-border/50">
                <MapPin className="w-5 h-5 text-primary mr-3" />
                <span className="text-foreground font-medium">{data.location}</span>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button 
                onClick={() => scrollToSection('projects')} 
                size="lg"
                className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold"
              >
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-amber-600/80 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </Button>
              
              <Button 
                onClick={() => scrollToSection('contact')} 
                variant="outline" 
                size="lg"
                className="group border-2 border-primary/20 hover:border-primary hover:bg-primary/5 px-8 py-4 text-lg font-semibold backdrop-blur-sm"
              >
                <span className="group-hover:text-primary transition-colors">Get In Touch</span>
              </Button>
            </div>

            {/* Enhanced Social Links */}
            <div className="flex justify-center lg:justify-start space-x-4">
              {[
                { icon: Github, href: data.social.github, label: 'GitHub' },
                { icon: Linkedin, href: data.social.linkedin, label: 'LinkedIn' },
                { icon: Mail, href: `mailto:${data.email}`, label: 'Email' }
              ].map(({ icon: Icon, href, label }, index) => (
                <Button 
                  key={label}
                  variant="ghost" 
                  size="lg"
                  className="group relative overflow-hidden bg-muted/30 hover:bg-muted/60 backdrop-blur-sm border border-border/30 hover:border-primary/50 transition-all duration-300"
                  asChild
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <a href={href} target={href.startsWith('mailto:') ? '_self' : '_blank'} rel="noopener noreferrer">
                    <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <span className="sr-only">{label}</span>
                    <div className="absolute inset-0 bg-primary/10 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Enhanced Profile Section */}
          <div className={`flex-shrink-0 transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="relative group">
              {/* Animated Ring - smaller on mobile */}
              <div className="absolute inset-0 w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full border-2 border-primary/30 animate-spin-slow" />
              <div className="absolute inset-4 w-40 h-40 md:w-64 md:h-64 lg:w-88 lg:h-88 rounded-full border border-primary/20 animate-ping-slow" />
              
              {/* Profile Circle - smaller on mobile */}
              <div className="relative w-40 h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 bg-gradient-to-br from-muted via-muted to-muted/80 rounded-full flex items-center justify-center border-4 border-border/50 backdrop-blur-sm group-hover:border-primary/50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/20">
                <div className="text-4xl md:text-6xl lg:text-8xl font-bold text-muted-foreground group-hover:text-primary transition-colors duration-500">
                  {data.name.split(' ').map(n => n[0]).join('')}
                </div>
                
                {/* Tech Stack Icons Floating Around */}
                <div className="absolute inset-0">
                  {/* Primary Languages */}
                  <div className="tech-orbit tech-orbit-1" title="Python">
                    <div className="tech-orbit-icon w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/30 hover:scale-125 transition-all duration-300 cursor-pointer shadow-lg">
                      <span className="text-xs font-bold text-primary">PY</span>
                    </div>
                  </div>
                  <div className="tech-orbit tech-orbit-2" title="JavaScript">
                    <div className="tech-orbit-icon w-9 h-9 bg-slate-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-slate-500/30 hover:scale-125 transition-all duration-300 cursor-pointer shadow-lg">
                      <span className="text-xs font-bold text-slate-300">JS</span>
                    </div>
                  </div>
                  <div className="tech-orbit tech-orbit-3" title="C/C++">
                    <div className="tech-orbit-icon w-8 h-8 bg-amber-600/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-amber-600/30 hover:scale-125 transition-all duration-300 cursor-pointer shadow-lg">
                      <span className="text-xs font-bold text-amber-400">C++</span>
                    </div>
                  </div>
                  <div className="tech-orbit tech-orbit-4" title="HTML">
                    <div className="tech-orbit-icon w-8 h-8 bg-stone-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-stone-500/30 hover:scale-125 transition-all duration-300 cursor-pointer shadow-lg">
                      <span className="text-xs font-bold text-stone-300">HTML</span>
                    </div>
                  </div>
                  <div className="tech-orbit tech-orbit-5" title="CSS">
                    <div className="tech-orbit-icon w-9 h-9 bg-neutral-600/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-neutral-600/30 hover:scale-125 transition-all duration-300 cursor-pointer shadow-lg">
                      <span className="text-xs font-bold text-neutral-300">CSS</span>
                    </div>
                  </div>
                  <div className="tech-orbit tech-orbit-6" title="TypeScript">
                    <div className="tech-orbit-icon w-8 h-8 bg-primary/25 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/35 hover:scale-125 transition-all duration-300 cursor-pointer shadow-lg">
                      <span className="text-xs font-bold text-primary">TS</span>
                    </div>
                  </div>
                  
                  {/* Libraries & Frameworks */}
                  <div className="tech-orbit tech-orbit-7" title="TensorFlow">
                    <div className="tech-orbit-icon w-9 h-9 bg-amber-600/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-amber-600/30 hover:scale-125 transition-all duration-300 cursor-pointer shadow-lg">
                      <span className="text-xs font-bold text-amber-400">TF</span>
                    </div>
                  </div>
                  <div className="tech-orbit tech-orbit-8" title="Angular">
                    <div className="tech-orbit-icon w-8 h-8 bg-slate-600/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-slate-600/30 hover:scale-125 transition-all duration-300 cursor-pointer shadow-lg">
                      <span className="text-xs font-bold text-slate-300">NG</span>
                    </div>
                  </div>
                  <div className="tech-orbit tech-orbit-9" title="React">
                    <div className="tech-orbit-icon w-9 h-9 bg-stone-600/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-stone-600/30 hover:scale-125 transition-all duration-300 cursor-pointer shadow-lg">
                      <span className="text-xs font-bold text-stone-300">RC</span>
                    </div>
                  </div>
                  <div className="tech-orbit tech-orbit-10" title="Langchain">
                    <div className="tech-orbit-icon w-8 h-8 bg-neutral-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-neutral-500/30 hover:scale-125 transition-all duration-300 cursor-pointer shadow-lg">
                      <span className="text-xs font-bold text-neutral-300">LC</span>
                    </div>
                  </div>
                  
                  {/* Databases */}
                  <div className="tech-orbit tech-orbit-11" title="MySQL">
                    <div className="tech-orbit-icon w-9 h-9 bg-amber-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-amber-500/30 hover:scale-125 transition-all duration-300 cursor-pointer shadow-lg">
                      <span className="text-xs font-bold text-amber-400">SQL</span>
                    </div>
                  </div>
                  <div className="tech-orbit tech-orbit-12" title="MongoDB">
                    <div className="tech-orbit-icon w-8 h-8 bg-stone-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-stone-500/30 hover:scale-125 transition-all duration-300 cursor-pointer shadow-lg">
                      <span className="text-xs font-bold text-stone-300">MDB</span>
                    </div>
                  </div>
                  
                  {/* Development Tools */}
                  <div className="tech-orbit tech-orbit-13" title="Docker">
                    <div className="tech-orbit-icon w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/30 hover:scale-125 transition-all duration-300 cursor-pointer shadow-lg">
                      <span className="text-xs font-bold text-primary">DC</span>
                    </div>
                  </div>
                  <div className="tech-orbit tech-orbit-14" title="Jira">
                    <div className="tech-orbit-icon w-9 h-9 bg-slate-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-slate-500/30 hover:scale-125 transition-all duration-300 cursor-pointer shadow-lg">
                      <span className="text-xs font-bold text-slate-300">JR</span>
                    </div>
                  </div>
                  <div className="tech-orbit tech-orbit-15" title="Trello">
                    <div className="tech-orbit-icon w-8 h-8 bg-neutral-600/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-neutral-600/30 hover:scale-125 transition-all duration-300 cursor-pointer shadow-lg">
                      <span className="text-xs font-bold text-neutral-300">TR</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;