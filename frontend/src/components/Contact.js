import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useToast } from '../hooks/use-toast';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const formRef = useRef();
  const { toast } = useToast();

  useEffect(() => {
    setIsVisible(true);
    emailjs.init({
      publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        {
          publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
        }
      );

      console.log('Email sent successfully:', result.text);

      toast({
        title: 'Message sent successfully',
        description: "Thank you for reaching out. I'll get back to you within 24 hours.",
      });

      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Email sending failed:', error);

      toast({
        title: 'Message failed to send',
        description: 'Sorry, there was an issue sending your message. Please try again or contact me directly at jashmakwana1003@gmail.com.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: 'email', value: 'jashmakwana1003@gmail.com', href: 'mailto:jashmakwana1003@gmail.com' },
    { icon: Phone, label: 'phone', value: '201.284.1782', href: 'tel:+12012841782' },
    { icon: MapPin, label: 'location', value: 'New York City, New York', href: null },
  ];

  return (
    <section id="contact" className="py-12 lg:py-20 px-4 relative overflow-hidden">
      <div
        className={`container mx-auto max-w-4xl relative z-10 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="mb-10">
          <span className="text-sm text-muted-foreground">
            <span className="text-primary">visitor@portfolio</span>{' '}
            <span className="text-[hsl(var(--term-path))]">~</span> % ./contact.sh --interactive
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-bold mt-3 mb-3">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Always interested in new opportunities and collaborations. Let's connect.
          </p>
        </div>

        <div className="border border-border bg-card/60">
          {/* Terminal bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-secondary/80 border-b border-border">
            <span className="w-3 h-3 rounded-full bg-[hsl(var(--term-red))]" />
            <span className="w-3 h-3 rounded-full bg-[hsl(var(--term-yellow))]" />
            <span className="w-3 h-3 rounded-full bg-primary" />
            <span className="ml-3 text-xs text-muted-foreground">contact.sh — zsh</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 p-5 sm:p-8">
            {/* Contact info */}
            <div className="text-sm">
              <div className="text-muted-foreground mb-4">
                <span className="text-primary">$</span> cat contact.txt
              </div>
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-3">
                    <info.icon className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-muted-foreground text-xs">{info.label}:</div>
                      {info.href ? (
                        <a href={info.href} className="text-[hsl(var(--term-path))] hover:underline">
                          {info.value}
                        </a>
                      ) : (
                        <span>{info.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 border border-border p-4 text-xs">
                <span className="text-primary">›</span> response_time ={' '}
                <span className="text-[hsl(var(--term-amber))]">~24 hours</span>
              </div>
            </div>

            {/* Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 text-sm">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs text-muted-foreground">
                  name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="your name"
                  required
                  className="rounded-none bg-background/50 border-border focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs text-muted-foreground">
                  email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                  className="rounded-none bg-background/50 border-border focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-xs text-muted-foreground">
                  message *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="tell me about your project, ideas, or just say hello..."
                  rows={5}
                  required
                  className="rounded-none bg-background/50 border-border focus-visible:ring-primary resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    sending...
                  </span>
                ) : (
                  'send message →'
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
