import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
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
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const formRef = useRef();
  const { toast } = useToast();

  useEffect(() => {
    setIsVisible(true);
    // Initialize EmailJS
    emailjs.init({
      publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send email using EmailJS
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
        title: "Message Sent Successfully! 🎉",
        description: "Thank you for reaching out. I'll get back to you within 24 hours.",
      });
      
      // Clear form after successful submission
      setFormData({ name: '', email: '', message: '' });
      
    } catch (error) {
      console.error('Email sending failed:', error);
      
      toast({
        title: "Message Failed to Send",
        description: "Sorry, there was an issue sending your message. Please try again or contact me directly at jashmakwana1003@gmail.com.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "jashmakwana1003@gmail.com",
      href: "mailto:jashmakwana1003@gmail.com",
      color: "text-slate-400",
      bgColor: "bg-slate-500/10",
      borderColor: "border-slate-500/20"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: "201.284.1782",
      href: "tel:+12012841782",
      color: "text-amber-500",
      bgColor: "bg-amber-600/10",
      borderColor: "border-amber-600/20"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Location",
      value: "New York City, New York",
      href: null,
      color: "text-stone-400",
      bgColor: "bg-stone-500/10",
      borderColor: "border-stone-500/20"
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/10 to-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="grid-background opacity-20" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Enhanced Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-6 backdrop-blur-sm">
            <MessageSquare className="w-5 h-5 text-primary" />
            <span className="text-sm text-primary font-semibold uppercase tracking-wider">Let's Connect</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Get In{' '}
            <span className="bg-gradient-to-r from-primary via-slate-400 to-amber-600/70 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I'm always interested in new opportunities and collaborations. 
            <br className="hidden md:block" />
            Let's connect and discuss how we can work together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information Side */}
          <div className={`space-y-8 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            {/* Contact Information Cards */}
            <Card className="overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div 
                    key={index} 
                    className={`group flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 hover:shadow-lg ${info.bgColor} border ${info.borderColor} backdrop-blur-sm`}
                  >
                    <div className={`${info.color} group-hover:scale-110 transition-transform duration-300`}>
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-lg">{info.label}</p>
                      {info.href ? (
                        <a 
                          href={info.href} 
                          className={`${info.color} hover:underline transition-colors text-lg`}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground text-lg">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

          </div>

          {/* Contact Form Side */}
          <div className={`transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <Card className="overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Send className="w-5 h-5 text-primary" />
                  </div>
                  Send Me a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-lg font-medium">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
                        required
                        className="h-12 text-lg bg-background/50 border-border/50 focus:border-primary focus:bg-background transition-all duration-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-lg font-medium">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                        className="h-12 text-lg bg-background/50 border-border/50 focus:border-primary focus:bg-background transition-all duration-300"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-lg font-medium">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project, ideas, or just say hello..."
                      rows={6}
                      required
                      className="text-lg bg-background/50 border-border/50 focus:border-primary focus:bg-background transition-all duration-300 resize-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg font-semibold group relative overflow-hidden" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Sending Message...
                      </div>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                        <span className="relative z-10">Send Message</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-amber-600/80 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Response Time Info - Centered below the grid */}
        <div className="flex items-center justify-center mt-12">
          <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/30 rounded-2xl backdrop-blur-sm shadow-lg shadow-primary/5 max-w-md mx-auto">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div className="text-center">
              <p className="font-bold text-lg text-primary">Quick Response</p>
              <p className="text-muted-foreground">I typically respond within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;