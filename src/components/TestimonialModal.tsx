
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Testimonial } from '../data/testimonials';
import { Button } from './Components';
import { CONTACT } from '../constants';

interface TestimonialModalProps {
    testimonial: Testimonial | null;
    onClose: () => void;
}

const TestimonialModal: React.FC<TestimonialModalProps> = ({ testimonial, onClose }) => {
    return (
        <AnimatePresence>
            {testimonial && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20, opacity: 0 }}
                        transition={{ ease: "easeOut", duration: 0.3 }}
                        className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-4xl mx-auto overflow-hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="bg-black">
                                <img 
                                    src={testimonial.clientImage} 
                                    alt={`Photo of ${testimonial.name}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-8 flex flex-col">
                                <div className="flex items-center gap-4 mb-4">
                                    <div>
                                        <h3 className="font-display text-white text-2xl">{testimonial.name}</h3>
                                        <p className="text-sm text-slate-400">{testimonial.context}</p>
                                    </div>
                                </div>
                                <blockquote className="text-slate-300 italic text-lg my-4 flex-grow">
                                    <p>"{testimonial.quote}"</p>
                                </blockquote>
                                <div className="text-xs text-slate-500 mt-4">
                                    {testimonial.date}
                                </div>
                                <Button href={CONTACT.whatsappLink} className="mt-8 justify-center">
                                    Message on WhatsApp
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default TestimonialModal;
