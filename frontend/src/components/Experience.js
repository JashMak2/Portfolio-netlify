import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { Badge } from './ui/badge';

const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const Experience = ({ experiences }) => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setTimeout(() => {
              setVisibleCards((prev) => [...prev, index]);
            }, index * 150);
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = sectionRef.current?.querySelectorAll('.experience-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <section id="experience" className="py-12 lg:py-16 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-4xl relative z-10" ref={sectionRef}>
        {/* Status line */}
        <div className="mb-6 text-sm">
          <span className="text-primary">visitor@portfolio</span>{' '}
          <span className="text-[hsl(var(--term-path))]">~</span> % echo $STATUS
          <div className="mt-1 text-primary">available_for_opportunities=true</div>
        </div>

        {/* Header */}
        <div className="mb-12">
          <span className="text-sm text-muted-foreground">
            <span className="text-primary">visitor@portfolio</span>{' '}
            <span className="text-[hsl(var(--term-path))]">~</span> % cat career.log
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-bold mt-3 mb-3">
            Professional <span className="text-primary">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            A chronological log of roles across product management, software engineering, and machine learning.
          </p>
        </div>

        {/* Command log entries */}
        <div className="border-l border-border">
          {experiences.map((experience, index) => {
            const file = `${String(index + 1).padStart(2, '0')}-${slugify(experience.company)}.log`;
            const isExpanded = expandedCard === experience.id;
            return (
              <div
                key={experience.id}
                data-index={index}
                className={`experience-card relative pl-6 md:pl-8 pb-10 last:pb-0 transition-all duration-500 ${
                  visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <span className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] bg-primary" />

                <div className="text-xs md:text-sm text-muted-foreground mb-2">
                  <span className="text-primary">$</span> cat experience/{file}
                </div>

                <button
                  onClick={() => toggleCard(experience.id)}
                  className="w-full text-left border border-border hover:border-primary/40 transition-colors bg-card/60"
                >
                  <div className="px-4 py-4 md:px-6 md:py-5">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="text-lg md:text-xl font-bold">{experience.position}</h3>
                        <div className="text-sm text-muted-foreground mt-1">{experience.company}</div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{experience.duration}</span>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>

                    <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{experience.description}</p>

                    {isExpanded && (
                      <div className="mt-6 space-y-6 border-t border-border pt-6">
                        <div>
                          <div className="text-xs text-[hsl(var(--term-amber))] mb-3">// ACHIEVEMENTS</div>
                          <div className="space-y-2">
                            {experience.achievements.map((achievement, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="text-primary flex-shrink-0">›</span>
                                <span className="leading-relaxed">{achievement}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-[hsl(var(--term-amber))] mb-3">// STACK</div>
                          <div className="flex flex-wrap gap-2">
                            {experience.technologies.map((tech, idx) => (
                              <Badge
                                key={idx}
                                variant="secondary"
                                className="rounded-none bg-secondary text-[hsl(var(--term-path))] border border-border font-mono text-xs px-2.5 py-1"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
