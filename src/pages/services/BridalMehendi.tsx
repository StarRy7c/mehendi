import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Section, Heading, Button, Reveal } from '../../components/Components';
import { CONTACT } from '../../constants';

const BridalMehendi = () => {
    return (
        <>
            <Helmet>
                <title>Bridal Mehendi Packages in Sultanpur | Raju Mehendi Artist</title>
                <meta name="description" content="Explore bespoke bridal mehendi packages for Sultanpur brides. We create timeless, intricate henna designs for your special day." />
            </Helmet>

            <div className="pt-32 bg-slate-950">
                <Section>
                    <Reveal>
                        <Heading 
                            title="Bridal Mehendi Packages"
                            subtitle="For Sultanpur Brides"
                            align="left"
                        />
                    </Reveal>
                </Section>
                
                <Section className="!pt-0">
                    <Reveal>
                        <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
                            Your wedding day deserves the most exquisite mehendi. We offer specialized bridal packages for brides in Sultanpur, focusing on hyper-detailed, traditional, and modern designs that tell your unique story.
                        </p>
                    </Reveal>
                </Section>

                {/* Service Details */}
                <Section>
                    <Heading title="What's Included" align="left" />
                    <div className="text-slate-400">
                        Detailed breakdown of the bridal package will be listed here.
                    </div>
                </Section>

                {/* Sample Gallery */}
                <Section>
                    <Heading title="Bridal Design Gallery" align="left" />
                    <div className="text-slate-400">
                        A gallery showcasing bridal-specific designs will be here.
                    </div>
                </Section>
                
                {/* Pricing */}
                <Section>
                    <Heading title="Package Pricing" align="left" />
                    <p className="text-slate-300">Our bridal packages are tailored to your needs. Please contact us for a personalized quote.</p>
                </Section>

                {/* CTA */}
                <Section>
                    <div className="text-center">
                        <Heading title="Book Your Bridal Session" />
                        <Button href={CONTACT.whatsappLink} size="lg">
                            Get a Quote on WhatsApp
                        </Button>
                    </div>
                </Section>
            </div>
        </>
    );
};

export default BridalMehendi;
