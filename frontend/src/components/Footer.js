import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="text-muted-foreground">
            <span className="text-primary">jash@makwana</span>
            <span>:~$</span> echo "© {currentYear} — built with React &amp; too much coffee"
          </div>

          <div className="flex items-center gap-1">
            {[
              { icon: Github, href: 'https://github.com/jashmakwana', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/jash-makwana/', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:jashmakwana1003@gmail.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon className="w-4 h-4" />
                <span className="sr-only">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
