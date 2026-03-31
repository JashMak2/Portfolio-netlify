import React, { useState, useEffect, useRef } from 'react';
import { Code2, Database, Wrench, Laptop, Zap, TrendingUp, Award, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const Skills = ({ skills }) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [visibleCards, setVisibleCards] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setTimeout(() => {
              setVisibleCards(prev => [...prev, index]);
            }, index * 150);
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
    {
      id: 'aiml',
      title: 'AI / ML',
      icon: <Zap className="w-7 h-7" />,
      items: skills.aiml,
      color: 'from-pink-500/20 to-rose-600/20',
      borderColor: 'border-pink-500/30',
      iconColor: 'text-pink-500',
      bgColor: 'bg-pink-500/5',
      displayLimit: 6
    },
    {
      id: 'languages',
      title: 'Programming Languages',
      icon: <Code2 className="w-7 h-7" />,
      items: skills.languages,
      color: 'from-primary/20 to-primary/30',
      borderColor: 'border-primary/30',
      iconColor: 'text-primary',
      bgColor: 'bg-primary/5',
      displayLimit: 6
    },
    {
      id: 'libraries',
      title: 'Libraries & Frameworks',
      icon: <Laptop className="w-7 h-7" />,
      items: skills.libraries,
      color: 'from-indigo-500/20 to-indigo-600/20',
      borderColor: 'border-indigo-500/30',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-500/5',
      displayLimit: 6
    },
    {
      id: 'databases',
      title: 'Databases',
      icon: <Database className="w-7 h-7" />,
      items: skills.databases,
      color: 'from-emerald-500/20 to-emerald-600/20',
      borderColor: 'border-emerald-500/30',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-500/5',
      displayLimit: 4
    },
    {
      id: 'tools',
      title: 'Development Tools',
      icon: <Wrench className="w-7 h-7" />,
      items: skills.tools,
      color: 'from-violet-500/20 to-violet-600/20',
      borderColor: 'border-violet-500/30',
      iconColor: 'text-violet-600 dark:text-violet-400',
      bgColor: 'bg-violet-500/5',
      displayLimit: 6
    },
    {
      id: 'methodologies',
      title: 'Development Methodologies',
      icon: <TrendingUp className="w-7 h-7" />,
      items: skills.methodologies,
      color: 'from-orange-500/20 to-orange-600/20',
      borderColor: 'border-orange-500/30',
      iconColor: 'text-orange-500',
      bgColor: 'bg-orange-500/5',
      displayLimit: 6
    },
    {
      id: 'management',
      title: 'Management Tools',
      icon: <Wrench className="w-7 h-7" />,
      items: skills.management,
      color: 'from-cyan-500/20 to-cyan-600/20',
      borderColor: 'border-cyan-500/30',
      iconColor: 'text-cyan-500',
      bgColor: 'bg-cyan-500/5',
      displayLimit: 10
    }
  ];

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  return (
    <section id="skills" className="py-12 lg:py-16 px-4 bg-gradient-to-b from-muted/20 via-background to-muted/20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-500/5 to-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10" ref={sectionRef}>
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-6 backdrop-blur-sm">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-sm text-primary font-semibold uppercase tracking-wider">Expertise</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Technical{' '}
            <span className="bg-gradient-to-r from-primary via-slate-400 to-amber-600/70 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A comprehensive overview of my technical expertise across various domains 
            <br className="hidden md:block" />
            of software engineering and emerging technologies.
          </p>
        </div>

        {/* Skills Categories Grid - Row 1: AI/ML, Languages, Libraries */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {skillCategories.slice(0, 3).map((category, index) => (
            <Card 
              key={index} 
              className={`skill-card group relative overflow-hidden transition-all duration-500 hover:shadow-2xl card-hover-effect cursor-pointer ${
                visibleCards.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              data-index={index}
              onMouseEnter={() => setHoveredCategory(index)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Card Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Animated Border */}
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse`} />

              <CardHeader className="pb-4 relative z-10">
                <div className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-500 ${category.bgColor} ${category.borderColor} border ${
                  hoveredCategory === index ? 'scale-105' : ''
                }`}>
                  <div className={`${category.iconColor} transition-colors duration-300`}>
                    {category.icon}
                  </div>
                  <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors duration-300">
                    {category.title}
                  </CardTitle>
                </div>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <div className="flex flex-wrap gap-2 justify-center">
                  {category.items.map((item, idx) => (
                    <Badge 
                      key={idx} 
                      variant="secondary" 
                      className={`skill-badge text-xs px-3 py-1 transition-all duration-300 ${category.bgColor} ${category.borderColor} border group-hover:scale-105`}
                      style={{ 
                        animationDelay: `${idx * 0.1}s`,
                        transitionDelay: `${idx * 0.05}s`
                      }}
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Skills Categories Grid - Row 2: Databases, Tools, Methodologies */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {skillCategories.slice(3, 6).map((category, index) => (
            <Card 
              key={index + 3} 
              className={`skill-card group relative overflow-hidden transition-all duration-500 hover:shadow-2xl card-hover-effect cursor-pointer opacity-100 translate-y-0`}
              data-index={index + 3}
              onMouseEnter={() => setHoveredCategory(index + 3)}
              onMouseLeave={() => setHoveredCategory(null)}
              onClick={() => toggleCategory(category.id)}
            >
              {/* Card Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Animated Border */}
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse`} />

              <CardHeader className="pb-4 relative z-10">
                <div className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-500 ${category.bgColor} ${category.borderColor} border ${
                  hoveredCategory === index + 3 ? 'scale-105' : ''
                }`}>
                  <div className={`${category.iconColor} transition-colors duration-300`}>
                    {category.icon}
                  </div>
                  <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors duration-300">
                    {category.title}
                  </CardTitle>
                </div>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <div className="flex flex-wrap gap-2 justify-center">
                  {category.items.map((item, idx) => (
                    <Badge 
                      key={idx} 
                      variant="secondary" 
                      className={`skill-badge text-xs px-3 py-1 transition-all duration-300 ${category.bgColor} ${category.borderColor} border group-hover:scale-105`}
                      style={{ 
                        animationDelay: `${idx * 0.1}s`,
                        transitionDelay: `${idx * 0.05}s`
                      }}
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
{/* Skills Categories Grid - Row 3: Management */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div></div>
          {skillCategories.slice(6, 7).map((category, index) => (
            <Card
              key={index + 6}
              className={`skill-card group relative overflow-hidden transition-all duration-500 hover:shadow-2xl card-hover-effect cursor-pointer opacity-100 translate-y-0`}
              data-index={index + 6}
              onMouseEnter={() => setHoveredCategory(index + 6)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse`} />
              <CardHeader className="pb-4 relative z-10">
                <div className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-500 ${category.bgColor} ${category.borderColor} border ${hoveredCategory === index + 6 ? 'scale-105' : ''}`}>
                  <div className={`${category.iconColor} transition-colors duration-300`}>
                    {category.icon}
                  </div>
                  <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors duration-300">
                    {category.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="flex flex-wrap gap-2 justify-center">
                  {category.items.map((item, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className={`skill-badge text-xs px-3 py-1 transition-all duration-300 ${category.bgColor} ${category.borderColor} border group-hover:scale-105`}
                      style={{ animationDelay: `${idx * 0.1}s`, transitionDelay: `${idx * 0.05}s` }}
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
          <div></div>
        </div>

        {/* Skills Summary Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-8 bg-gradient-to-br from-primary/5 via-muted/30 to-indigo-500/5 rounded-2xl border border-primary/20 backdrop-blur-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Code2 className="w-8 h-8 text-primary" />
            </div>
            <h4 className="text-3xl font-bold text-primary mb-2">
              {skills.aiml.length + skills.languages.length + skills.libraries.length}+
            </h4>
            <p className="text-muted-foreground font-medium">Programming Technologies</p>
          </div>
          
          <div className="text-center p-8 bg-gradient-to-br from-emerald-500/5 via-muted/30 to-violet-500/5 rounded-2xl border border-emerald-500/20 backdrop-blur-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/10 rounded-full mb-4">
              <Database className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h4 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
              {skills.databases.length + skills.tools.length}+
            </h4>
            <p className="text-muted-foreground font-medium">Tools & Databases</p>
          </div>
          
          <div className="text-center p-8 bg-gradient-to-br from-violet-500/5 via-muted/30 to-indigo-500/5 rounded-2xl border border-violet-500/20 backdrop-blur-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-violet-500/10 rounded-full mb-4">
              <Lightbulb className="w-8 h-8 text-violet-600 dark:text-violet-400" />
            </div>
            <h4 className="text-3xl font-bold text-violet-600 dark:text-violet-400 mb-2">
              {skills.methodologies.length + skills.management.length}+
            </h4>
            <p className="text-muted-foreground font-medium">Methodologies & Management</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-4 bg-gradient-to-br from-primary/5 via-muted/50 to-blue-500/5 border border-primary/20 rounded-2xl px-8 py-8 backdrop-blur-sm">
            <div className="text-4xl mb-2">🚀</div>
            <h3 className="text-2xl font-bold mb-2">Ready to innovate together?</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Let's leverage these technologies to build something extraordinary.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-primary/10 border border-primary/30 rounded-lg text-primary font-medium hover:bg-primary/20 transition-all duration-300"
              >
                View Projects
              </button>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-muted/30 border border-border/50 rounded-lg font-medium hover:bg-muted/50 hover:border-primary/30 transition-all duration-300"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
