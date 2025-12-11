
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type GalleryItem = {
    id: number | string;
    src: string;
    category: string;
    title?: string;
    isDynamic?: boolean;
    storagePath?: string;
};

interface GalleryItemCardProps {
    item: GalleryItem;
    onSelect: (item: GalleryItem) => void;
    onDelete?: (item: GalleryItem, e: React.MouseEvent) => void;
    isAdmin: boolean;
}

const GalleryItemCard: React.FC<GalleryItemCardProps> = ({ item, onSelect, onDelete, isAdmin }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [isLoaded, setIsLoaded] = useState(false);

    const initial = { opacity: 0 };
    const animate = inView ? { opacity: 1 } : {};

    return (
        <motion.div
            ref={ref}
            layout
            initial={initial}
            animate={animate}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="h-[300px] relative group rounded-lg overflow-hidden cursor-zoom-in bg-slate-900 shadow-md hover:shadow-xl hover:shadow-amber-900/10 border border-white/5 hover:border-amber-500/30 transition-all duration-300"
            onClick={() => onSelect(item)}
        >
            <img
                src={inView ? item.src : ''}
                alt={item.title || 'Mehendi Design'}
                className={`w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setIsLoaded(true)}
                loading="lazy"
            />
            {!isLoaded && <div className="absolute inset-0 bg-slate-800 animate-pulse"></div>}


            {isAdmin && onDelete && (
                <button
                    onClick={(e) => onDelete(item, e)}
                    className={`absolute top-2 right-2 p-1.5 rounded-full z-20 ${item.isDynamic ? 'bg-red-500 text-white' : 'hidden'}`}
                >
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <p className="text-amber-400 text-[10px] font-bold tracking-widest uppercase mb-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{item.category}</p>
                <h3 className="text-white text-sm font-display font-medium translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">{item.title || 'Mehendi Design'}</h3>
            </div>
        </motion.div>
    );
};

export default GalleryItemCard;
