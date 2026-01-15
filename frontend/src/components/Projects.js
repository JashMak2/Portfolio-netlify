import React, { useState, useEffect, useRef } from 'react';
import { GitBranch, Calendar, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

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
              setVisibleProjects(prev => [...prev, index]);
            }, index * 300);
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
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="grid-background opacity-50" />
        </div>
        <div className="absolute top-10 right-10 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-br from-primary/10 to-green-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10" ref={sectionRef}>
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-6 backdrop-blur-sm">
            <GitBranch className="w-5 h-5 text-primary" />
            <span className="text-sm text-primary font-semibold uppercase tracking-wider">Portfolio</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Featured{' '}
            <span className="bg-gradient-to-r from-slate-400 via-primary to-amber-600/70 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A showcase of my technical projects spanning mobile development, 
            <br className="hidden md:block" />
            machine learning, and web applications.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className={`project-card-container transition-all duration-700 ${
                visibleProjects.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              data-index={index}
            >
              <Card className="group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 card-hover-effect project-card h-full">
                {/* Project Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-muted via-muted/80 to-muted/60 flex items-center justify-center overflow-hidden">
                  <div className="text-6xl opacity-20 group-hover:scale-110 transition-transform duration-500">
                    {project.id === 1 ? '🤖' : project.id === 2 ? '🏥' : project.id === 3 ? '💰' : project.id === 4 ? '⚽' : '🖼️'}
                  </div>
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardHeader className="space-y-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </CardTitle>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {project.description}
                  </p>
                  
                  {/* Project Meta */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{project.date}</span>
                    </div>
                  </div>
                  
                  {/* Technology Stack */}
                  <div className="flex flex-wrap gap-2">
                    {(expandedProject === project.id ? project.technologies : project.technologies.slice(0, 4)).map((tech, idx) => (
                      <Badge 
                        key={idx} 
                        variant="outline" 
                        className="skill-badge border-primary/20 text-primary hover:bg-primary/10 px-3 py-1"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && expandedProject !== project.id && (
                      <Badge 
                        variant="outline" 
                        className="border-primary/30 text-primary bg-primary/5 hover:bg-primary/15 cursor-pointer transition-all duration-300 hover:scale-105"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleProject(project.id);
                        }}
                      >
                        +{project.technologies.length - 4} more
                      </Badge>
                    )}
                  </div>

                  <Button 
                    variant="outline" 
                    onClick={() => toggleProject(project.id)}
                    className="w-full group-hover:border-primary hover:bg-primary/5 transition-all duration-300"
                  >
                    {expandedProject === project.id ? 'Show Less Details' : 'Show More Details'}
                  </Button>
                </CardHeader>

                {expandedProject === project.id && (
                  <CardContent className="pt-0 border-t border-border/50">
                    <div className="space-y-6 animate-in slide-in-from-top-2 duration-500">
                      {/* Project Overview */}
                      <div className="space-y-3">
                        <h4 className="font-bold text-lg flex items-center gap-2">
                          <div className="w-2 h-2 bg-gradient-to-r from-primary to-blue-400 rounded-full" />
                          Project Overview
                        </h4>
                        <p className="text-muted-foreground leading-relaxed bg-muted/30 p-4 rounded-lg border border-border/50">
                          {project.longDescription}
                        </p>
                      </div>
                      
                      {/* Key Features */}
                      <div className="space-y-3">
                        <h4 className="font-bold text-lg flex items-center gap-2">
                          <Star className="w-5 h-5 text-amber-500" />
                          Key Features
                        </h4>
                        <div className="grid gap-3">
                          {project.features.map((feature, idx) => (
                            <div 
                              key={idx}
                              className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300"
                              style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span className="text-muted-foreground leading-relaxed">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* All Technologies */}
                      <div className="space-y-3">
                        <h4 className="font-bold text-lg">Technology Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, idx) => (
                            <Badge 
                              key={idx} 
                              variant="secondary" 
                              className="skill-badge bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 px-3 py-2"
                              style={{ animationDelay: `${idx * 0.05}s` }}
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;