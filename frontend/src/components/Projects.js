import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from './ui/badge';

const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const Projects = ({ projects }) => {
  const [expandedProject, setExpandedProject] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setTimeout(() => {
              setVisibleProjects((prev) => [...prev, index]);
            }, index * 120);
          }
        });
      },
      { threshold: 0.2 }
    );

    const projectCards = sectionRef.current?.querySelectorAll('.project-card-container');
    projectCards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const toggleProject = (id) => {
    setExpandedProject(expandedProject === id ? null : id);
  };

  return (
    <section id="projects" className="py-12 lg:py-16 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-4xl relative z-10" ref={sectionRef}>
        {/* Header */}
        <div className="mb-10">
          <span className="text-sm text-muted-foreground">
            <span className="text-primary">visitor@portfolio</span>{' '}
            <span className="text-[hsl(var(--term-path))]">~</span> % ls -la ./projects
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-bold mt-3 mb-3">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            A directory of technical projects spanning mobile development, machine learning, and web applications.
          </p>
        </div>

        {/* Directory listing */}
        <div className="border border-border divide-y divide-border">
          <div className="hidden md:grid grid-cols-[1fr_auto_auto] gap-4 px-4 py-2 text-xs text-muted-foreground bg-secondary/50">
            <span>NAME</span>
            <span>MODIFIED</span>
            <span className="w-6" />
          </div>

          {projects.map((project, index) => {
            const isExpanded = expandedProject === project.id;
            const slug = slugify(project.title);
            return (
              <div
                key={project.id}
                data-index={index}
                className={`project-card-container transition-all duration-500 ${
                  visibleProjects.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <button
                  onClick={() => toggleProject(project.id)}
                  className="w-full text-left grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-1 md:gap-4 px-4 py-4 hover:bg-secondary/40 transition-colors items-start md:items-center"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[hsl(var(--term-path))]">{slug}/</span>
                    </div>
                    <p className="text-muted-foreground text-sm mt-1.5 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {project.technologies.slice(0, 5).map((tech, idx) => (
                        <span key={idx} className="text-xs text-muted-foreground border border-border px-1.5 py-0.5">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="text-xs text-muted-foreground px-1.5 py-0.5">
                          +{project.technologies.length - 5}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap hidden md:block">{project.date}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0 hidden md:block" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 hidden md:block" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-4 pb-6 md:px-4">
                    <div className="border border-border bg-secondary/30 p-4 md:p-5 text-sm">
                      <div className="text-muted-foreground mb-3">
                        <span className="text-primary">$</span> cat {slug}/README.md
                      </div>

                      <p className="text-muted-foreground leading-relaxed">{project.longDescription}</p>

                      <div className="mt-5">
                        <div className="text-xs text-[hsl(var(--term-amber))] mb-2">// KEY FEATURES</div>
                        <div className="space-y-1.5">
                          {project.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-muted-foreground">
                              <span className="text-primary flex-shrink-0">›</span>
                              <span className="leading-relaxed">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="text-xs text-[hsl(var(--term-amber))] mb-2">// STACK</div>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, idx) => (
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
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
