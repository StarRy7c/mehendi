import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Section, Heading, Reveal } from '../components/Components';
import { blogPosts, PostMeta } from '../data/blog';

export const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<{ meta: PostMeta | undefined; content: string }>({ meta: undefined, content: '' });

    useEffect(() => {
        const postMeta = blogPosts.find(p => p.slug === slug);
        if (postMeta) {
            fetch(`/blog/${slug}.md`)
                .then(response => response.text())
                .then(text => setPost({ meta: postMeta, content: text }));
        }
    }, [slug]);

    if (!post.content) {
        // You could return a loading spinner here
        return <div className="pt-32">Loading...</div>;
    }

    return (
        <>
            <Helmet>
                <title>{post.meta?.title} | Raju Mehendi Artist</title>
                <meta name="description" content={post.meta?.excerpt} />
            </Helmet>

            <div className="pt-32 bg-slate-950">
                <Section>
                    <Reveal>
                        <Heading 
                            title={post.meta?.title || ''}
                            subtitle={post.meta?.date}
                        />
                    </Reveal>
                </Section>
                
                <Section className="!pt-0">
                    <Reveal>
                        <div className="prose prose-invert prose-lg max-w-4xl mx-auto prose-h3:text-amber-400 prose-a:text-amber-500 hover:prose-a:underline">
                            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                {post.content}
                            </ReactMarkdown>
                        </div>
                    </Reveal>
                </Section>
            </div>
        </>
    );
};
