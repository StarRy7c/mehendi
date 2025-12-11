export interface Testimonial {
    id: number;
    name: string;
    context: string; // e.g., "Bridal, Jaipur"
    rating: number; // e.g., 5
    quote: string;
    date: string; // e.g., "October 2025"
    clientImage: string; // URL to image
    beforeImage?: string; // Optional URL
    afterImage?: string; // Optional URL
}

// Using existing assets as placeholders for client photos
import hand1 from '../assets/optimized/hand/1.webp';
import hand2 from '../assets/optimized/hand/2.webp';
import hand3 from '../assets/optimized/hand/3.webp';
import hand4 from '../assets/optimized/hand/4.webp';
import hand5 from '../assets/optimized/hand/5.webp';

export const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Priya Patel",
        context: "Bridal, Mumbai",
        rating: 5,
        quote: "Raju's work is absolutely breathtaking! The detail and precision in my bridal mehendi were beyond my expectations. It was the highlight of my wedding look.",
        date: "November 2025",
        clientImage: hand1,
    },
    {
        id: 2,
        name: "Ananya Sharma",
        context: "Sangeet, Delhi",
        rating: 5,
        quote: "The designs were so unique and elegant. All my guests were asking who my mehendi artist was. Truly a professional and hygienic service.",
        date: "October 2025",
        clientImage: hand2,
    },
    {
        id: 3,
        name: "Sameera Khan",
        context: "Guest Mehendi, Bangalore",
        rating: 5,
        quote: "Even for a guest session, the attention to detail was incredible. The organic henna gave a beautiful, dark stain that lasted for weeks.",
        date: "September 2025",
        clientImage: hand3,
    },
    {
        id: 4,
        name: "Jessica Singh",
        context: "Engagement, Chandigarh",
        rating: 5,
        quote: "I wanted a modern Arabic design and Raju delivered perfectly. It was contemporary yet timeless. I couldn't have been happier!",
        date: "August 2025",
        clientImage: hand4,
    },
    {
        id: 5,
        name: "Naina Varma",
        context: "Bridal, Jaipur",
        rating: 5,
        quote: "The entire experience was so calming and professional. Raju is not just an artist, he's a magician. My hands looked like a piece of art.",
        date: "July 2025",
        clientImage: hand5,
    }
];
