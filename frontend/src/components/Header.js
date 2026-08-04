import React, { useState } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = 'https://customer-assets.emergentagent.com/job_portfolio-maker-58/artifacts/k4aqcqhc_Jash_Makwana_Resume_TPM_SWE.pdf';
    link.download = 'Jash_Makwana_Resume_TPM_SWE.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'experience', label: 'experience' },
    { id: 'projects', label: 'projects' },
    { id: 'skills', label: 'skills' },
    { id: 'contact', label: 'contact' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <button
          onClick={() => scrollToSection('hero')}
          className="text-sm font-semibold flex items-center gap-1.5"
        >
          <span className="text-primary">jash@makwana</span>
          <span className="text-muted-foreground">:~$</span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-7 text-sm">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <span className="text-[hsl(var(--term-path))]">./</span>{item.label}
            </button>
          ))}

          <Button
            onClick={downloadResume}
            variant="outline"
            size="sm"
            className="rounded-none border-border text-xs"
          >
            <Download className="w-3.5 h-3.5 mr-2" />
            resume.pdf
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-2">
          <Button onClick={() => setIsMenuOpen(!isMenuOpen)} variant="ghost" size="sm" className="rounded-none">
            {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="container mx-auto px-4 py-4 space-y-4 text-sm">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="text-[hsl(var(--term-path))]">./</span>{item.label}
              </button>
            ))}
            <Button onClick={downloadResume} variant="outline" className="w-full rounded-none">
              <Download className="w-4 h-4 mr-2" />
              download resume.pdf
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
