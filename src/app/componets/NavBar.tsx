import React from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationProps {
  isScrolled: boolean;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  scrollToSection: (sectionId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  isScrolled,
  isMenuOpen,
  toggleMenu,
  scrollToSection
}) => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', id: 'home', href: '/' },
    { label: 'Rreth Nesh', id: 'about', href: '/' },
    { label: 'Ndikimi', id: 'impact', href: '/' },
    { label: 'Vizioni', id: 'vision', href: '/' },
    { label: 'Kontakt', id: 'contact', href: '/' },
    { label: 'Projekte', id: 'projekte', href: '/projects' }
  ];

  const handleNavigation = (item: typeof navItems[0]) => {
    // If we're on the home page and clicking home, scroll to section
    if (pathname === '/' && item.id === 'home') {
      scrollToSection(item.id);
      return;
    }
    
    // If we're on the home page and the section exists, scroll to it
    if (pathname === '/' && document.getElementById(item.id)) {
      scrollToSection(item.id);
      return;
    }
    
    // Otherwise, navigate to the page (Link will handle this)
    // Close mobile menu after navigation
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  return (
    <>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/90 backdrop-blur-md'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">I</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Inkubatori FTI</h1>
                <p className="text-sm text-slate-600">Innovation Hub</p>
              </div>
            </Link>
            
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  pathname={pathname}
                  onNavigation={handleNavigation}
                />
              ))}
            </div>
            
            <button className="md:hidden p-2" onClick={toggleMenu}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 md:hidden">
          <div className="p-6 mt-20">
            {navItems.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                pathname={pathname}
                onNavigation={handleNavigation}
                isMobile
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

// Separate component for navigation items to handle both Link and button behavior
const NavItem: React.FC<{
  item: { label: string; id: string; href: string };
  pathname: string;
  onNavigation: (item: { label: string; id: string; href: string }) => void;
  isMobile?: boolean;
}> = ({ item, pathname, onNavigation, isMobile = false }) => {
  const isActive = pathname === item.href;
  const baseClasses = `transition-colors font-medium ${
    isActive 
      ? 'text-blue-600' 
      : 'text-slate-700 hover:text-blue-600'
  }`;
  
  const mobileClasses = isMobile 
    ? 'block py-3 text-lg w-full text-left' 
    : '';

  // If we're on the home page, use button for potential scrolling
  // if (pathname === '/' && document.getElementById(item.id)) {
  //   return (
  //     <button
  //       onClick={() => onNavigation(item)}
  //       className={`${baseClasses} ${mobileClasses}`}
  //     >
  //       {item.label}
  //     </button>
  //   );
  // }

  // Otherwise, use Link for page navigation
  return (
    <Link
      href={item.href}
      onClick={() => onNavigation(item)}
      className={`${baseClasses} ${mobileClasses}`}
    >
      {item.label}
    </Link>
  );
};

export default Navigation;