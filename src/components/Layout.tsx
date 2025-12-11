import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTACT, NAV_LINKS, ASSETS } from '../constants';
import { Button } from './Components';
import FloatingCallButton from './FloatingCallButton';

const LocationBar = () => (
    <div className="bg-slate-900 text-amber-400 text-center py-3 text-base font-serif relative overflow-hidden tracking-wider">
        <NavLink to="/sultanpur-special" className="block">
            {/* A subtle pattern could be added here as a background image */}
            <div 
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23eab308' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundPosition: 'center'
                }}
            ></div>
            <span className="relative z-10 animate-pulse">
                Bridal & Party Mehendi — Now Available in Sultanpur, UP (Home Visits)
            </span>
        </NavLink>
    </div>
);

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => setMobileOpen(false), [location]);

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/5 shadow-lg' : 'bg-transparent'
                }`}
            >
                <LocationBar />
                <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
                    <NavLink to="/">
                        {location.pathname === '/' ? (
                            <span className="text-xl md:text-2xl font-display font-bold text-white tracking-widest uppercase">
                                RAJU MEHENDI<span className="text-amber-500">.</span>ARTIST
                            </span>
                        ) : (
                            <img src={ASSETS.branding.logo} alt="Raju Mehendi Artist Logo" className="h-10 w-10 rounded-full object-cover" style={{ transform: 'scale(1.3225)' }} />
                        )}
                    </NavLink>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map(link => (
                            <NavLink 
                                key={link.path} 
                                to={link.path}
                                className={({isActive}) => `text-sm uppercase tracking-widest transition-colors ${isActive ? 'text-amber-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                        <Button variant="outline" className="ml-4 !px-4 !py-2 text-xs" href={CONTACT.whatsappLink}>
                            Book Now
                        </Button>
                    </div>

                    {/* Mobile Toggle */}
                    <button 
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden text-white p-2 focus:outline-none"
                    >
                        <div className="w-6 h-5 relative flex flex-col justify-between">
                            <span className={`w-full h-0.5 bg-current transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                            <span className={`w-full h-0.5 bg-current transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
                            <span className={`w-full h-0.5 bg-current transition-all ${mobileOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
                        </div>
                    </button>
                </nav>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="fixed inset-0 z-40 bg-slate-950 pt-32 px-6 md:hidden overflow-hidden"
                    >
                        <div className="flex flex-col gap-6 text-center">
                            {NAV_LINKS.map(link => (
                                <NavLink 
                                    key={link.path} 
                                    to={link.path}
                                    className="text-2xl font-display text-slate-200 hover:text-amber-400 transition-colors"
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                            <div className="mt-8">
                                <Button href={CONTACT.whatsappLink}>Chat on WhatsApp</Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const Footer = () => (
    <footer className="bg-slate-950 border-t border-white/5 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div>
                <NavLink to="/" className="mb-6 inline-block">
                    <img src={ASSETS.branding.logo} alt="Raju Mehendi Artist Logo" className="h-14 w-14 rounded-full object-cover" style={{ transform: 'scale(1.3225)' }} />
                </NavLink>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                    Transforming traditions into timeless art. Specialized in Bridal, Arabic, and custom detailed Mehendi designs for every auspicious occasion.
                </p>
            </div>
            <div>
                <h4 className="text-lg font-serif text-white mb-6">Explore</h4>
                <ul className="space-y-3 text-slate-400 text-sm">
                    {NAV_LINKS.map(l => (
                        <li key={l.path}><NavLink to={l.path} className="hover:text-amber-400 transition-colors">{l.name}</NavLink></li>
                    ))}
                </ul>
            </div>
            <div>
                <h4 className="text-lg font-serif text-white mb-6">Contact</h4>
                <ul className="space-y-3 text-slate-400 text-sm">
                    <li><a href={`tel:${CONTACT.phone}`} className="hover:text-amber-400">+91 99180 48575</a></li>
                    <li><a href={`tel:${CONTACT.whatsapp}`} className="hover:text-amber-400">+91 99189 28267</a> (WhatsApp)</li>
                    <li><a href={`mailto:${CONTACT.email}`} className="hover:text-amber-400">{CONTACT.email}</a></li>
                    <li className="flex gap-4 mt-6">
                        {/* Social Icons Placeholder */}
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-all cursor-pointer">IG</div>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-all cursor-pointer">FB</div>
                    </li>
                </ul>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center border-t border-white/5 pt-8">
            <p className="text-slate-600 text-xs">© 2025 Raju Mehendi Artist. All rights reserved. Created by <a href="https://instagram.com/nixx.curse" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">nixx</a> ❤️</p>
        </div>
    </footer>
);

export const Layout = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <div className="min-h-screen flex flex-col bg-slate-950">
            <Navbar />
            <main className={`flex-grow ${!isHomePage ? 'pt-32' : ''}`}>
                <Outlet />
            </main>
            <Footer />
            <FloatingCallButton />
        </div>
    );
};