'use client';

import React, { useState, useEffect } from 'react';
import Navigation from '../componets/NavBar';

const NavigationWrapper: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
    }
    // Close mobile menu after scrolling
    setIsMenuOpen(false);
  };

  return (
    <Navigation
      isScrolled={isScrolled}
      isMenuOpen={isMenuOpen}
      toggleMenu={toggleMenu}
      scrollToSection={scrollToSection}
    />
  );
};

export default NavigationWrapper;