import React, { useState, useEffect, useRef } from 'react';

const Skills = ({ skills }) => {
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
            }, index * 100);
          }
        });
      },
      { threshold: 0.2 }
    );

    const skillCards = sectionRef.current?.querySelectorAll('.skill-card');
    skillCards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    { id: 'languages', title: 'languages', items: skills.languages },
    { id: 'libraries', title: 'libraries', items: skills.libraries },
    { id: 'databases', title: 'databases', items: skills.databases },
    { id: 'tools', title: 'tools', items: skills.tools },
    { id: 'methodologies', title: 'methodologies', items: skills.methodologies },
    { id: 'management', title: 'management', items: skills.management },
  ];

  const totalCount = skillCategories.reduce((sum, c) => sum + c.items.length, 0);

  return (
    <section id="skills" className="py-12 lg:py-16 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10" ref={sectionRef}>
        {/* Header */}
        <div className="mb-10">
          <span className="text-sm text-muted-foreground">
            <span className="text-primary">visitor@portfolio</span>{' '}
            <span className="text-[hsl(var(--term-path))]">~</span> % tree ./skills
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-bold mt-3 mb-3">
            Technical <span className="text-primary">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            {totalCount} tools and technologies across software engineering, machine learning, and product management.
          </p>
        </div>

        {/* Directory tree grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {skillCategories.map((category, index) => (
            <div
              key={category.id}
              data-index={index}
              className={`skill-card border border-border bg-card/60 transition-all duration-500 ${
                visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div className="w-full flex items-center gap-2 px-4 py-3 border-b border-border">
                <span className="text-[hsl(var(--term-path))] font-medium">{category.title}/</span>
                <span className="text-xs text-muted-foreground ml-auto">[{category.items.length}]</span>
              </div>

              <div className="px-4 py-3 font-mono text-sm">
                {category.items.map((item, idx) => {
                  const isLast = idx === category.items.length - 1;
                  return (
                    <div key={idx} className="flex items-center gap-2 text-muted-foreground py-0.5">
                      <span className="text-border select-none">{isLast ? '└──' : '├──'}</span>
                      <span>{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Summary stats */}
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          <div className="border border-border p-6">
            <div className="text-3xl font-bold text-primary">{skills.languages.length + skills.libraries.length}+</div>
            <p className="text-muted-foreground text-sm mt-1">Programming technologies</p>
          </div>
          <div className="border border-border p-6">
            <div className="text-3xl font-bold text-[hsl(var(--term-path))]">
              {skills.databases.length + skills.tools.length}+
            </div>
            <p className="text-muted-foreground text-sm mt-1">Tools &amp; databases</p>
          </div>
          <div className="border border-border p-6">
            <div className="text-3xl font-bold text-[hsl(var(--term-amber))]">
              {skills.methodologies.length + skills.management.length}+
            </div>
            <p className="text-muted-foreground text-sm mt-1">Methodologies &amp; management</p>
          </div>
        </div>

        {/* CTA */}
        <div className="border border-border p-6 md:p-8">
          <div className="text-sm text-muted-foreground mb-2">
            <span className="text-primary">visitor@portfolio</span>{' '}
            <span className="text-[hsl(var(--term-path))]">~</span> % echo "ready to build?"
          </div>
          <p className="text-muted-foreground mb-5">Let's leverage these technologies to build something extraordinary.</p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-5 py-2.5 border border-primary/40 text-primary text-sm hover:bg-primary/10 transition-colors"
            >
              run ./projects
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-5 py-2.5 border border-border text-sm hover:bg-secondary/40 transition-colors"
            >
              cat contact.txt
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
