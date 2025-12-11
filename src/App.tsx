import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Gallery } from './pages/Gallery';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';
import SultanpurLanding from './pages/SultanpurLanding';
import BridalMehendi from './pages/services/BridalMehendi';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { SultanpurSpecial } from './pages/SultanpurSpecial';

// Scroll to top component
const ScrollToTop = () => {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

export default function App() {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="gallery" element={<Gallery />} />
                    <Route path="services" element={<Services />} />
                    <Route path="services/bridal-mehendi" element={<BridalMehendi />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="mehendi-artist-sultanpur" element={<SultanpurLanding />} />
                    <Route path="blog" element={<Blog />} />
                    <Route path="blog/:slug" element={<BlogPost />} />
                    <Route path="sultanpur-special" element={<SultanpurSpecial />} />
                </Route>
            </Routes>
        </Router>
    );
}