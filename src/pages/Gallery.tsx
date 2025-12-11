import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import GalleryItemCard from '../components/GalleryItemCard';
import { Section, Heading, Button } from '../components/Components';
import { ASSETS } from '../constants';

// Firebase Imports
import { auth, googleProvider, db, storage } from '../firebaseConfig';

const ALLOWED_EMAILS = ['nishsingh446@gmail.com', 'rajumehendiartist3@gmail.com'];

// --- TYPE DEFINITION ---
type GalleryItem = {
    id: number | string;
    src: string;
    category: string;
    title?: string;
    description?: string;
    isDynamic?: boolean;
    storagePath?: string;
};

// --- DYNAMICALLY GENERATE STATIC ITEMS FROM ASSETS ---
const STATIC_ITEMS: GalleryItem[] = [];
let idCounter = 1;

Object.entries(ASSETS.gallery).forEach(([category, images]) => {
    images.forEach((imgSrc) => {
        STATIC_ITEMS.push({
            id: `static-${idCounter++}`,
            src: imgSrc,
            category: category,
            title: `${category} Artistry`,
        });
    });
});

// Dynamic Categories: 'All' + whatever keys exist in ASSETS.gallery
const CATEGORIES = ['All', ...Object.keys(ASSETS.gallery)];

const ITEMS_PER_LOAD = 12;

export const Gallery = () => {
    const [activeCat, setActiveCat] = useState('All');
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
    
    // Admin State
    const [isAdmin, setIsAdmin] = useState(false);
    const [dynamicItems, setDynamicItems] = useState<GalleryItem[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadModalOpen, setUploadModalOpen] = useState(false);

    // Infinite Scroll Sentinel
    const { ref: sentinelRef, inView: sentinelInView } = useInView({
        threshold: 0,
        rootMargin: "0px 0px 500px 0px" // Trigger when 500px from bottom
    });
    
    // Auth Listener
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser && currentUser.email && ALLOWED_EMAILS.includes(currentUser.email)) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        });
        return () => unsubscribe();
    }, []);

    // Fetch Dynamic Images from Firebase
    useEffect(() => {
        try {
            const q = db.collection("gallery").orderBy("createdAt", "desc");
            const unsubscribe = q.onSnapshot((snapshot) => {
                const items: GalleryItem[] = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    isDynamic: true
                } as GalleryItem));
                setDynamicItems(items);
            }, (error: any) => {
                // Silent fail if firebase not configured
            });
            return () => unsubscribe();
        } catch (e) {
            // Ignore init errors
        }
    }, []);
    
    const handleLogin = async () => {
        try {
            await auth.signInWithPopup(googleProvider);
        } catch (error) {
            alert("Login failed. Check console.");
        }
    };

    const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const fileInput = form.elements.namedItem('imageFile') as HTMLInputElement;
        const categoryInput = form.elements.namedItem('category') as HTMLSelectElement;
        const titleInput = form.elements.namedItem('title') as HTMLInputElement;

        if (!fileInput.files || fileInput.files.length === 0) return;

        setIsUploading(true);
        const file = fileInput.files[0];
        const category = categoryInput.value;
        const title = titleInput.value;

        try {
            const storageRef = storage.ref(`gallery/${Date.now()}_${file.name}`);
            await storageRef.put(file);
            const url = await storageRef.getDownloadURL();

            await db.collection("gallery").add({
                src: url,
                category: category,
                title: title || `${category} Design`,
                storagePath: storageRef.fullPath,
                createdAt: new Date()
            });

            setUploadModalOpen(false);
            form.reset();
        } catch (error) {
            alert("Upload failed.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (item: GalleryItem, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm("Delete this image?")) return;

        try {
            if (item.isDynamic && item.storagePath) {
                const fileRef = storage.ref(item.storagePath);
                await fileRef.delete();
                await db.collection("gallery").doc(String(item.id)).delete();
            }
        } catch (error) {
            console.error(error);
        }
    };


    // Merge Items
    const combinedItems = useMemo(() => {
        return [...dynamicItems, ...STATIC_ITEMS];
    }, [dynamicItems]);

    // Filter logic
    const filteredItems = useMemo(() => {
        return activeCat === 'All' 
            ? combinedItems 
            : combinedItems.filter(item => item.category === activeCat);
    }, [activeCat, combinedItems]);

    const visibleItems = filteredItems.slice(0, visibleCount);
    const hasMore = visibleCount < filteredItems.length;

    // Effect for infinite scroll
    useEffect(() => {
        if (sentinelInView && hasMore) {
            setVisibleCount(p => p + ITEMS_PER_LOAD);
        }
    }, [sentinelInView, hasMore]);

    // Reset visible count when category changes
    useEffect(() => {
        setVisibleCount(ITEMS_PER_LOAD);
    }, [activeCat]);


    return (
        <div className="pt-20 min-h-screen bg-slate-950 relative">
            {isAdmin && (
                <div className="fixed top-20 left-0 right-0 z-40 bg-amber-900/90 border-b border-amber-500/30 backdrop-blur-md px-6 py-3 flex items-center justify-between shadow-2xl">
                    <span className="text-amber-100 font-bold text-xs uppercase tracking-widest">Editor Mode</span>
                    <button onClick={() => setUploadModalOpen(true)} className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded text-xs uppercase">
                        + Add Image
                    </button>
                </div>
            )}

            <Section>
                <Heading title="Our Masterpieces" subtitle="The Gallery" />
                
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCat(cat)}
                            className={`relative px-6 py-2 rounded-full text-xs font-medium tracking-[0.15em] uppercase transition-all duration-300 ${
                                activeCat === cat 
                                    ? 'text-slate-900' 
                                    : 'text-slate-400 hover:text-amber-200'
                            }`}
                        >
                            {activeCat === cat && (
                                <motion.div 
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{cat}</span>
                        </button>
                    ))}
                </div>

                {/* GRID LAYOUT */}
                <motion.div layout className="grid grid-cols-2 gap-4 md:gap-8 px-2">
                    <AnimatePresence mode="popLayout">
                        {visibleItems.map((item, index) => (
                            <GalleryItemCard
                                key={item.id}
                                item={item}
                                onSelect={setSelectedImage}
                                onDelete={handleDelete}
                                isAdmin={isAdmin}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Sentinel for infinite scroll */}
                <div ref={sentinelRef} style={{ height: '1px' }} />

            </Section>
            
            {/* LIGHTBOX AND OTHER MODALS... */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-slate-950/98 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        </button>

                        <div className="flex flex-col md:flex-row h-full w-full max-w-6xl overflow-hidden rounded-2xl bg-black border-white/10" onClick={e => e.stopPropagation()}>
                           <div className="flex-1 bg-black flex items-center justify-center relative overflow-hidden">
                               <img 
                                   src={selectedImage.src} 
                                   alt={selectedImage.title} 
                                   className="max-h-full max-w-full object-contain"
                               />
                           </div>
                           <div className="w-full md:w-80 bg-slate-900/50 backdrop-blur-md border-l border-white/5 p-8 flex flex-col justify-center">
                                <span className="text-amber-500 text-xs tracking-widest uppercase font-bold mb-2">{selectedImage.category}</span>
                                <h3 className="text-2xl font-display text-white mb-6">{selectedImage.title || 'Design Detail'}</h3>
                                <div className="mt-auto">
                                    <a 
                                        href={`https://wa.me/919918928267?text=${encodeURIComponent(`Interested in this design: ${selectedImage.src}`)}`} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold transition-all text-sm uppercase tracking-wide"
                                    >
                                        Book This Design
                                    </a>
                                </div>
                           </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <div className="fixed bottom-0 left-0 w-10 h-10 z-50" onDoubleClick={handleLogin} />
            
            <AnimatePresence>
                {uploadModalOpen && (
                    <div className="fixed inset-0 z-[70] bg-black/80 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-slate-900 border border-white/10 p-8 rounded-2xl w-full max-w-sm relative"
                        >
                            <button onClick={() => setUploadModalOpen(false)} className="absolute top-4 right-4 text-slate-500">✕</button>
                            <h3 className="text-lg text-white mb-4">Upload to Gallery</h3>
                            <form onSubmit={handleFileUpload} className="space-y-4">
                                <input name="imageFile" type="file" accept="image/*" required className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:bg-amber-500 file:text-slate-900 file:font-bold hover:file:bg-amber-400" />
                                <select name="category" className="w-full bg-slate-800 border border-white/10 rounded p-2 text-white">
                                    {CATEGORIES.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                                <input name="title" type="text" placeholder="Title (Optional)" className="w-full bg-slate-800 border border-white/10 rounded p-2 text-white" />
                                <Button className="w-full justify-center">
                                    {isUploading ? 'Uploading...' : 'Upload'}
                                </Button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};