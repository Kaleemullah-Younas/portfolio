import { useRouter } from 'next/router';
import { Container, DomHead, Footer, NavBar } from "../components";
import { FaArrowLeft } from 'react-icons/fa';
import { ResponsiveNavbar } from '../components/Navbar';
import { useState, useEffect } from 'react';

export default function ComingSoon() {
    const router = useRouter();
    const { mediumUrl } = router.query;
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="min-h-screen bg-dark-100">
            <DomHead pageName="Coming Soon" />
            <Container>
                <NavBar />
            </Container>

            {/* Header Section */}
            <div className="relative w-full bg-dark-400 p-3">
                <Container className="relative">
                    <button 
                        onClick={() => router.back()}
                        className="px-3 py-1 text-white-200 text-[35px] bg-dark-100 rounded-[4px] cursor-pointer"
                    >
                        <FaArrowLeft />
                    </button>
                </Container>
            </div>

            {/* Main Content */}
            <Container>
                <div className="min-h-[70vh] flex flex-col items-center justify-center text-center py-20">
                    <h1 className="text-4xl font-bold text-white-200 mb-6">
                        🚧 Article Under Construction
                    </h1>
                    
                    <p className="text-white-300 text-lg mb-8 max-w-2xl mx-auto">
                        We're working hard to bring you this amazing content! 
                        In the meantime, you can read this same article on Medium.
                    </p>

                    {mediumUrl && (
                        <a
                            href={mediumUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-200 text-dark-100 px-6 py-3 rounded-md hover:bg-green-300 transition-colors text-lg font-medium"
                        >
                            Read on Medium
                        </a>
                    )}
                </div>
            </Container>

            <Footer />
            {windowWidth <= 700 && <ResponsiveNavbar pageName="blog" />}
        </div>
    );
}