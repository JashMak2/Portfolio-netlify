import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, Briefcase, Calendar, Trophy, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';

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
              setVisibleCards(prev => [...prev, index]);
            }, index * 200);
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
    <section id="experience" className="py-12 lg:py-16 px-4 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10" ref={sectionRef}>
        {/* Available for opportunities badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-green-400 font-medium">Available for opportunities</span>
          </div>
        </div>

        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-6 backdrop-blur-sm">
            <Briefcase className="w-5 h-5 text-primary" />
            <span className="text-sm text-primary font-semibold uppercase tracking-wider">Career Journey</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Professional{' '}
            <span className="bg-gradient-to-r from-primary via-amber-600/70 to-slate-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            My journey through various internships and projects in software engineering, 
            <br className="hidden md:block" />
            machine learning, and cybersecurity.
          </p>
        </div>

        <div className="relative">
          {/* Enhanced Timeline Line */}
          <div className="absolute left-6 lg:left-1/2 lg:transform lg:-translate-x-0.5 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/60 via-primary/30 to-primary/60 rounded-full timeline-glow"></div>

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <div 
                key={experience.id} 
                className={`experience-card flex items-start transition-all duration-700 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } ${
                  visibleCards.includes(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                data-index={index}
              >
                {/* Enhanced Timeline Node */}
                <div className="absolute left-4 lg:left-1/2 lg:transform lg:-translate-x-1/2 w-6 h-6 bg-gradient-to-br from-primary to-amber-600/80 rounded-full border-4 border-background z-10 animate-pulse">
                  <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-30" />
                </div>

                {/* Content */}
                <div className={`flex-1 ml-16 lg:ml-0 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                  <Card className={`group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 card-hover-effect project-card ${
                    expandedCard === experience.id ? 'ring-2 ring-primary/30' : ''
                  }`}>
                    {/* Card Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <CardHeader 
                      className="cursor-pointer relative z-10"
                      onClick={() => toggleCard(experience.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="space-y-3">
                          {/* Position with Icon */}
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Zap className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                              {experience.position}
                            </h3>
                          </div>
                          
                          {/* Company */}
                          <div className="flex items-center">
                            <Briefcase className="w-4 h-4 text-primary mr-3" />
                            <span className="font-semibold text-lg text-muted-foreground">
                              {experience.company}
                            </span>
                          </div>
                          
                          {/* Duration */}
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="w-4 h-4 mr-3" />
                            <span className="font-medium">{experience.duration}</span>
                          </div>
                        </div>
                        
                        {/* Expand Button */}
                        <button className="text-muted-foreground hover:text-primary transition-all duration-300 p-2 rounded-full hover:bg-primary/10">
                          {expandedCard === experience.id ? (
                            <ChevronUp className="w-6 h-6 rotate-180 transition-transform duration-300" />
                          ) : (
                            <ChevronDown className="w-6 h-6 transition-transform duration-300" />
                          )}
                        </button>
                      </div>
                    </CardHeader>

                    <CardContent className="relative z-10">
                      <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                        {experience.description}
                      </p>
                      
                      {expandedCard === experience.id && (
                        <div className="space-y-6 animate-in slide-in-from-top-2 duration-500">
                          {/* Achievements */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-3">
                              <Trophy className="w-5 h-5 text-amber-500" />
                              <h4 className="font-bold text-lg">Key Achievements</h4>
                            </div>
                            <div className="grid gap-3">
                              {experience.achievements.map((achievement, idx) => (
                                <div 
                                  key={idx}
                                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300"
                                  style={{ animationDelay: `${idx * 0.1}s` }}
                                >
                                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                  <span className="text-muted-foreground leading-relaxed">{achievement}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Technologies */}
                          <div className="space-y-4">
                            <h4 className="font-bold text-lg flex items-center gap-2">
                              <div className="w-2 h-2 bg-gradient-to-r from-primary to-blue-400 rounded-full" />
                              Technologies Used
                            </h4>
                            <div className="flex flex-wrap gap-3">
                              {experience.technologies.map((tech, idx) => (
                                <Badge 
                                  key={idx} 
                                  variant="secondary" 
                                  className="skill-badge bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 px-4 py-2 text-sm font-medium"
                                  style={{ animationDelay: `${idx * 0.05}s` }}
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden lg:block lg:flex-1"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/10 to-blue-500/10 border border-primary/20 rounded-xl px-8 py-4 backdrop-blur-sm">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
            <span className="text-primary font-semibold">Ready for new challenges and opportunities</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;