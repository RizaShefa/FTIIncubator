"use client"
import React, { useState, useEffect } from 'react';
import { Lightbulb, Users, Zap, BookOpen, Briefcase, Globe, TrendingUp, Award, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import ContactForm from './componets/ContactDataForm';
import Navigation from './componets/NavBar';

interface CounterProps {
  end: number;
  duration?: number;
}

const Counter: React.FC<CounterProps> = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);
  
  return <span>{count}</span>;
};

const FTIIncubator: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation 
        isScrolled={isScrolled}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        scrollToSection={scrollToSection}
      />
      
      {/* Hero Section */}
      <section id="home" className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 flex items-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-24 h-24 bg-white/10 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-ping"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Inkubatori për
              <span className="block text-cyan-300 mt-2">Inovacion Teknologjik</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Krijimi i një ambienti mbështetës për studentët e Fakultetit të Teknologjisë së Informacionit 
              që kanë ide inovative teknologjike
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('about')}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                Zbulo Më Shumë
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300"
              >
                Bashkohu me Ne
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-6">
              Rreth Projektit
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Inkubatori për Fakultetin e Teknologjisë së Informacionit është një iniciativë e re 
              që synon të krijojë një ekosistem mbështetës për inovacionin studentor
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Lightbulb className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">Inovacion & Kreativitet</h3>
                </div>
                <p className="text-slate-600">Mbështetje për zhvillimin e ideve inovative teknologjike dhe kthimin e tyre në projekte të qëndrueshme.</p>
              </div>
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-2xl border border-cyan-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-cyan-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">Rrjetëzim Profesional</h3>
                </div>
                <p className="text-slate-600">Krijimi i lidhjeve me industrinë dhe profesionistët e teknologjisë për mentorim dhe bashkëpunim.</p>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl border border-green-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">Zhvillim Karriere</h3>
                </div>
                <p className="text-slate-600">Trajnime dhe mbështetje për zhvillimin e aftësive të menaxhimit të projekteve dhe sipërmarrjes.</p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-8 text-white transform hover:scale-105 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-6">Objektivat Kryesore</h3>
                <ul className="space-y-4">
                  {[
                    'Krijimi i një ambienti mbështetës për inovacionin teknologjik',
                    'Zhvillimi i aftësive sipërmarrëse të studentëve',
                    'Krijimi i lidhjeve me industrinë teknologjike',
                    'Promovimi i FTI si qendër inovacioni'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Impact Section */}
      <section id="impact" className="py-20 bg-slate-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-6">
              Ndikimi i Projektit
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Projekti synon të ketë ndikim të menjëhershëm dhe afatgjatë në zhvillimin e ekosistemit teknologjik
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Short Term Impact */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mr-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Ndikimi Afatshkurtër</h3>
              </div>
              <div className="space-y-4">
                {[
                  'Studentët fitojnë aftësi konkrete në menaxhim projekti dhe rrjetëzim profesional',
                  'Fakulteti prezantohet si institucion aktiv që promovon inovacionin dhe sipërmarrjen',
                  'Krijimi i dokumentit i jep qartësi institucionale për hapin e ardhshëm të zbatimit'
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    </div>
                    <p className="text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Long Term Impact */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Ndikimi Afatgjatë</h3>
              </div>
              <div className="space-y-4">
                {[
                  'Faza e dytë do të ndërtojë një inkubator të plotë me mentorim, trajnime dhe mbështetje për startup-e',
                  'Projektet studentore do të kenë rrugë konkrete për zhvillim nga ideja në zbatim',
                  'FTI bëhet model për fakultetet e tjera në Shqipëri në përkrahjen e inovacionit teknologjik'
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <p className="text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Vision Section */}
      <section id="vision" className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-40 h-40 bg-white/5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-32 h-32 bg-white/5 rounded-full animate-bounce"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Vizioni Ynë</h2>
            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto opacity-90">
              Të krijojmë një ekosistem të plotë inovacioni që lidh studentët, akademikët dhe industrinë 
              për të ndërtuar të ardhmen teknologjike të Shqipërisë
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              {[
                {
                  icon: <BookOpen className="w-8 h-8 text-white" />,
                  title: 'Edukimi i Avancuar',
                  description: 'Integrimi i praktikës me teorinë për një arsimim më të efektshëm'
                },
                {
                  icon: <Briefcase className="w-8 h-8 text-white" />,
                  title: 'Startup Ecosystem',
                  description: 'Krijimi i një mjedisi të favorshëm për startup-et teknologjike'
                },
                {
                  icon: <Globe className="w-8 h-8 text-white" />,
                  title: 'Ndikimi Global',
                  description: 'Pozicionimi i Shqipërisë në hartën globale të inovacionit teknologjik'
                }
              ].map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="opacity-90">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Statistics Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: 500, label: 'Studentë të Përfshirë' },
              { number: 50, label: 'Projekte Inovative' },
              { number: 25, label: 'Partnerë Industrialë' },
              { number: 10, label: 'Startup të Krijuara' }
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
                  <Counter end={stat.number} />
                </div>
                <p className="text-slate-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Bashkohu me Ne</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Jemi të gatshëm të dëgjojmë idetë tuaja dhe të punojmë së bashku për të ndërtuar të ardhmen e teknologjisë
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Kontakto Ekipin</h3>
              <div className="space-y-6">
                {[
                  { icon: <Mail className="w-6 h-6" />, title: 'Email', info: 'inkubatori@fti.edu.al' },
                  { icon: <Phone className="w-6 h-6" />, title: 'Telefon', info: '+355 4 123 4567' },
                  { icon: <MapPin className="w-6 h-6" />, title: 'Adresa', info: 'Fakulteti i Teknologjisë së Informacionit, Tiranë' }
                ].map((contact, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                      {contact.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold">{contact.title}</h4>
                      <p className="text-gray-300">{contact.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
           <ContactForm />
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">I</span>
            </div>
            <span className="text-xl font-bold">Inkubatori FTI</span>
          </div>
          <p className="text-gray-400">
            © 2024 Inkubatori për Fakultetin e Teknologjisë së Informacionit. Të gjitha të drejtat e rezervuara.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FTIIncubator;