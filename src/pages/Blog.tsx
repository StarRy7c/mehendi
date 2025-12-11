import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Section, Heading, Reveal } from '../components/Components';
import { blogPosts } from '../data/blog';

export const Blog = () => {
    return (
        <>
            <Helmet>
                <title>Blog | Raju Mehendi Artist</title>
            </Helmet>

            <div className="pt-32 bg-slate-950">
                <Section>
                    <Heading 
                        title="Our Blog"
                        subtitle="Tips, Trends & Local Guides"
                    />

                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-12">
                            {blogPosts.map((post) => (
                                <Reveal key={post.slug}>
                                    <article>
                                        <h2 className="text-3xl font-display text-white mb-2">
                                            <Link to={`/blog/${post.slug}`} className="hover:text-amber-400 transition-colors">
                                                {post.title}
                                            </Link>
                                        </h2>
                                        <div className="text-sm text-slate-500 mb-4">{post.date}</div>
                                        <p className="text-slate-400 leading-relaxed mb-6">
                                            {post.excerpt}
                                        </p>
                                        <Link to={`/blog/${post.slug}`} className="font-semibold text-amber-500 hover:underline">
                                            Read More →
                                        </Link>
                                    </article>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </Section>
            </div>
        </>
    );
};
