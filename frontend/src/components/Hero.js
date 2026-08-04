import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { useTerminalSequence } from '../hooks/use-terminal-sequence';

const SKILLS_PREVIEW = ['python/', 'react/', 'tensorflow/', 'product-mgmt/', 'sql/', 'flutter/'];
const COMMANDS = ['whoami', 'cat role.txt', 'ls ./skills', 'echo $LOCATION', './contact.sh'];

const Prompt = () => (
  <>
    <span className="text-primary">visitor@portfolio</span>{' '}
    <span className="text-[hsl(var(--term-path))]">~</span> %{' '}
  </>
);

const Hero = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const { stepIndex, typedCurrent, revealedCount, isTypingStep, isDone } = useTerminalSequence(COMMANDS, {
    reducedMotion,
  });

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const commandText = (i) => (i < stepIndex || isDone ? COMMANDS[i] : typedCurrent);
  const showCursorOn = (i) => isTypingStep(i) || (isDone && i === COMMANDS.length - 1);
  const started = (i) => i <= stepIndex || isDone;
  const revealed = (i) => i < revealedCount || isDone;

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-12 px-4 overflow-hidden">
      <div className="container mx-auto max-w-4xl relative z-10 w-full">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="border border-border rounded-lg bg-card/90 backdrop-blur-sm shadow-2xl overflow-hidden">
            {/* Terminal window bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-secondary/80 border-b border-border">
              <span className="w-3 h-3 rounded-full bg-[hsl(var(--term-red))]" />
              <span className="w-3 h-3 rounded-full bg-[hsl(var(--term-yellow))]" />
              <span className="w-3 h-3 rounded-full bg-primary" />
              <span className="ml-3 text-xs text-muted-foreground truncate">jash@portfolio — zsh — 100x32</span>
            </div>

            {/* Terminal body */}
            <div className="px-5 py-7 sm:px-8 sm:py-9 md:px-10 md:py-10 text-sm md:text-base leading-relaxed min-h-[420px] sm:min-h-[440px]">
              {started(0) && (
                <div>
                  <Prompt />
                  {commandText(0)}
                  {showCursorOn(0) && <span className="term-cursor ml-0.5" />}
                </div>
              )}
              {revealed(0) && (
                <>
                  <h1 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold mt-3 mb-2 leading-tight">
                    {data.name} <span className="text-[hsl(var(--term-amber))]">&lt;/&gt;</span>
                  </h1>
                  <p className="text-muted-foreground max-w-2xl">{data.description}</p>
                </>
              )}

              {started(1) && (
                <div className="mt-6">
                  <Prompt />
                  {commandText(1)}
                  {showCursorOn(1) && <span className="term-cursor ml-0.5" />}
                </div>
              )}
              {revealed(1) && <div className="text-foreground mt-1 font-medium">{data.title}</div>}

              {started(2) && (
                <div className="mt-6">
                  <Prompt />
                  {commandText(2)}
                  {showCursorOn(2) && <span className="term-cursor ml-0.5" />}
                </div>
              )}
              {revealed(2) && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1 mt-1">
                  {SKILLS_PREVIEW.map((s) => (
                    <span key={s} className="text-[hsl(var(--term-path))]">
                      {s}
                    </span>
                  ))}
                </div>
              )}

              {started(3) && (
                <div className="mt-6">
                  <Prompt />
                  {commandText(3)}
                  {showCursorOn(3) && <span className="term-cursor ml-0.5" />}
                </div>
              )}
              {revealed(3) && (
                <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>{data.location}</span>
                </div>
              )}

              {started(4) && (
                <div className="mt-6">
                  <Prompt />
                  {commandText(4)}
                  {showCursorOn(4) && <span className="term-cursor ml-0.5" />}
                </div>
              )}

              {revealed(4) && (
                <>
                  {/* CTA */}
                  <div className="flex flex-wrap gap-3 mt-8">
                    <Button
                      onClick={() => scrollToSection('projects')}
                      className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                    >
                      run ./projects
                    </Button>
                    <Button onClick={() => scrollToSection('contact')} variant="outline" className="rounded-none">
                      cat contact.txt
                    </Button>
                  </div>

                  {/* Social links */}
                  <div className="flex gap-3 mt-6">
                    {[
                      { icon: Github, href: data.social.github, label: 'GitHub' },
                      { icon: Linkedin, href: data.social.linkedin, label: 'LinkedIn' },
                      { icon: Mail, href: `mailto:${data.email}`, label: 'Email' },
                    ].map(({ icon: Icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        target={href.startsWith('mailto:') ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                      >
                        <Icon className="w-4 h-4" />
                        <span className="sr-only">{label}</span>
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
