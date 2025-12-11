
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import { testimonials, Testimonial } from '../data/testimonials';
import TestimonialCard from './TestimonialCard';
import TestimonialModal from './TestimonialModal';
import { Section, Heading } from './Components';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TestimonialSlider = () => {
    const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

    const handleCardClick = (testimonial: Testimonial) => {
        setSelectedTestimonial(testimonial);
    };

    const handleCloseModal = () => {
        setSelectedTestimonial(null);
    };

    return (
        <>
            <Section className="bg-slate-900/50">
                <Heading 
                    title="What Our Brides Say"
                    subtitle="Real brides. Real stories. Real designs."
                />
                <div className="relative">
                    <Swiper
                        modules={[Pagination, Autoplay, A11y]}
                        spaceBetween={30}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                            delay: 6000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        pagination={{ 
                            el: '.swiper-pagination',
                            clickable: true 
                        }}
                        keyboard={{
                            enabled: true,
                        }}
                        breakpoints={{
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 40,
                            },
                        }}
                        className="pb-12" // Padding bottom for pagination
                    >
                        {testimonials.map(testimonial => (
                            <SwiperSlide key={testimonial.id} className="h-full">
                                <TestimonialCard 
                                    testimonial={testimonial} 
                                    onClick={() => handleCardClick(testimonial)}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Pagination */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10">
                        <div className="swiper-pagination !relative !bottom-0 !w-auto"></div>
                    </div>
                </div>
            </Section>
            <TestimonialModal testimonial={selectedTestimonial} onClose={handleCloseModal} />
        </>
    );
};

export default TestimonialSlider;
