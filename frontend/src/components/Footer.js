import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { Button } from './ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold">
              <span className="text-primary">Jash</span> Makwana
            </h3>
            <p className="text-sm text-muted-foreground">
              Product Manager & Software Engineer
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <a href="https://github.com/jashmakwana" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="https://www.linkedin.com/in/jash-makwana/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="mailto:jashmakwana1003@gmail.com">
                <Mail className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center">
            © {currentYear} Jash Makwana. Built with
            <Heart className="w-4 h-4 mx-1 text-red-500" />
            and React.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;