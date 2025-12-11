
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Testimonial } from '../data/testimonials';

interface TestimonialCardProps {
    testimonial: Testimonial;
    onClick: () => void;
}

const starVariants = {
    hidden: { fill: "#475569" }, // slate-600
    visible: { fill: "#FBBF24" }, // amber-400
};

// A simple component to render the star rating
const StarRating = ({ rating }: { rating: number }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(
            <motion.svg
                key={i}
                ref={ref}
                className="w-4 h-4"
                viewBox="0 0 20 20"
                variants={starVariants}
                initial="hidden"
                animate={inView && i < rating ? "visible" : "hidden"}
                transition={{ duration: 0.3, delay: i * 0.1 }}
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.175 0l-3.368 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.073 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
            </motion.svg>
        );
    }
    return <div className="flex items-center gap-1">{stars}</div>;
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, onClick }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            onClick={onClick}
            className="bg-slate-900 border border-white/10 rounded-2xl p-6 md:p-8 h-full flex flex-col cursor-pointer"
        >
            <div className="flex items-center gap-4 mb-6">
                <img 
                    src={testimonial.clientImage} 
                    alt={`Photo of ${testimonial.name}`} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-amber-400/50"
                />
                <div>
                    <h3 className="font-display text-white text-lg">{testimonial.name}</h3>
                    <p className="text-sm text-slate-400">{testimonial.context}</p>
                </div>
            </div>
            <div className="mb-4">
                <StarRating rating={testimonial.rating} />
            </div>
            <blockquote className="text-slate-300 italic mb-6 flex-grow">
                <p>"{testimonial.quote}"</p>
            </blockquote>
            <div className="text-xs text-slate-500 mt-auto">
                {testimonial.date}
            </div>
        </motion.div>
    );
};

export default TestimonialCard;

