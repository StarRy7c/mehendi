import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Section, Heading, Button, Reveal } from '../components/Components';
import TestimonialSlider from '../components/TestimonialSlider';
import { CONTACT } from '../constants';

const SultanpurLanding = () => {
    return (
        <>
            <Helmet>
                <title>Mehendi Artist in Sultanpur — Bridal & Arabic Henna | Raju Mehendi</title>
                <meta name="description" content="Top bridal mehendi artist in Sultanpur. Bridal trials, party mehendi, intricate Arabic & Indian designs. Call / WhatsApp to book." />
            </Helmet>

            <div className="pt-32 bg-slate-950">
                <Section>
                    <Reveal>
                        <Heading 
                            title="Mehendi Artist in Sultanpur"
                            subtitle="Your Local Henna Expert"
                            align="left"
                        />
                    </Reveal>
                </Section>
                
                <Section className="!pt-0">
                    <Reveal>
                        <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
                            Welcome to Raju Mehendi Art, your premier mehendi artist serving Sultanpur, UP and the surrounding areas. With over a decade of experience, we specialize in creating stunning, intricate designs for bridal, sangeet, and party events. We are available for home visits throughout the Sultanpur region.
                        </p>
                    </Reveal>
                </Section>

                {/* Services Offered */}
                <Section>
                    <Heading title="Services for Every Occasion" align="left" />
                     {/* Placeholder for services */}
                    <div className="text-slate-400">Service cards will be displayed here.</div>
                </Section>

                {/* Sample Gallery */}
                <Section>
                    <Heading title="Our Work in Sultanpur" align="left" />
                    {/* Placeholder for a gallery */}
                    <div className="text-slate-400">A sample gallery of local work will be displayed here.</div>
                </Section>
                
                {/* Pricing */}
                <Section>
                    <Heading title="Affordable Pricing" align="left" />
                    <p className="text-slate-300">Bridal packages start from ₹5,000. Contact us for a custom quote.</p>
                </Section>

                {/* Testimonials */}
                <TestimonialSlider />

                {/* FAQ */}
                <Section>
                    <Heading title="Frequently Asked Questions" align="left" />
                     {/* Placeholder for FAQ */}
                    <div className="text-slate-400">An FAQ section will be displayed here.</div>
                </Section>

                {/* CTA */}
                <Section>
                    <div className="text-center">
                        <Heading title="Ready to Book?" />
                        <Button href={CONTACT.whatsappLink} size="lg">
                            Message on WhatsApp
                        </Button>
                    </div>
                </Section>
            </div>
        </>
    );
};

export default SultanpurLanding;
