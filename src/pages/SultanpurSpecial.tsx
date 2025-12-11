import React from 'react';
import { motion } from 'framer-motion';
import { Section, Heading, Button, Reveal } from '../components/Components';
import { CONTACT } from '../constants';

export const SultanpurSpecial = () => {
    return (
        <div className="pt-20 min-h-screen bg-slate-950">
            <Section>
                <Heading title="Sultanpur Bookings" subtitle="Special Availability" />
                
                <div className="max-w-3xl mx-auto">
                    <Reveal>
                        <div className="space-y-8 text-center">
                            <h3 className="text-3xl font-display text-white">We're coming to Sultanpur!</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Great news! Raju Mehendi Artist is now available for special bookings in Sultanpur and nearby areas. Due to high demand, we recommend contacting us in advance to secure your spot for weddings, parties, and other special occasions.
                            </p>

                            <div className="border-t border-b border-white/10 py-8 my-8">
                                <p className="text-slate-300 mb-6">For the fastest response and to discuss your design ideas, please get in touch via WhatsApp or call us.</p>
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <Button href={CONTACT.whatsappLink} variant="primary">
                                        Chat on WhatsApp
                                    </Button>
                                    <Button href={`tel:${CONTACT.phone}`} variant="outline">
                                        Call Now
                                    </Button>
                                </div>
                            </div>
                            
                            <div className="space-y-6 pt-4">
                                <a href={`mailto:${CONTACT.email}`} className="flex items-center p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/50 hover:bg-white/10 transition-all group max-w-md mx-auto">
                                    <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    </div>
                                    <div className="ml-4 text-left">
                                        <div className="text-sm text-slate-400">Email for other inquiries</div>
                                        <div className="text-lg font-medium text-white">{CONTACT.email}</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </Section>
            <div className="h-24"></div>
        </div>
    );
};
