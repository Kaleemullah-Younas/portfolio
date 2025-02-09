import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container, DomHead, Footer, NavBar } from "../components";
import { FaArrowLeft } from 'react-icons/fa';
import { ResponsiveNavbar } from '../components/Navbar';

function Blogs() {
    const [windowWidth, setWindowWidth] = useState(0);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Track window width for responsive design
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Fetch blogs data
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch('/data/blogs.json');
                if (!res.ok) {
                    throw new Error(`Failed to fetch blogs: ${res.status} ${res.statusText}`);
                }
                const data = await res.json();
                setBlogs(data);
            } catch (err) {
                console.error("Error fetching blogs:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div>
            <DomHead pageName='Blogs' />
            <Container>
                <NavBar />
            </Container>

            {/* Blog Header Section */}
            <div id="top-head" className="relative w-full h-[35vh] bg-dark-400 p-3 flex flex-col items-start justify-start">
                <Container className="relative">
                    <Link href="/" legacyBehavior>
                        <FaArrowLeft className='px-3 py-1 text-white-200 text-[35px] bg-dark-100 rounded-[4px] cursor-pointer' />
                    </Link>
                    <br />
                    <h1 className="text-[50px] font-bold">Blogs</h1>
                    <p className="text-[15px] text-white-300">
                        Explore my latest completed articles and tutorials
                    </p>
                </Container>
            </div>

            {/* Blog List Section */}
            <div className="w-screen h-auto">
                <Container>
                    <div id="head" className="w-full mt-10 py-0 mx-auto flex flex-row justify-center items-start">
                        <h2 className="text-[25px] text-white-200 px-4 md:px-4 my-10 font-bold">Latest Articles</h2>
                    </div>
                    
                    <div className="w-full mt-2 mx-auto p-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-5">
                        {blogs.map((blog) => (
                            <BlogCard key={blog.slug} blog={blog} />
                        ))}
                    </div>

                    {/* Add View More Blogs button */}
                    {blogs.length > 16 && (
                        <div className="w-full flex justify-center my-8">
                            <Link 
                                href="https://medium.com/@kaleemullahyounas123" 
                                legacyBehavior
                                passHref
                            >
                                <a 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-200 hover:text-green-300 underline text-[14px] transition-colors"
                                    data-aos="zoom-in-up"
                                >
                                    View More Blogs on Medium
                                </a>
                            </Link>
                        </div>
                    )}

                    <div className='my-20'></div>
                </Container>
            </div>

            {/* Footer and Responsive Navbar */}
            <Footer />
            {windowWidth <= 700 && <ResponsiveNavbar pageName="blogs" />}
        </div>
    );
}


// BlogCard Component
function BlogCard({ blog }) {
    return (
        <div className="w-full h-auto bg-dark-200 rounded-md overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
            {/* Blog Image */}
            <div 
                className="h-48 bg-cover bg-center" 
                style={{ backgroundImage: `url(${blog.imageUrl})` }} 
            />

            {/* Blog Content */}
            <div className="p-4 flex flex-col justify-between">
                <div>
                    <h3 className="text-white-200 text-[15px] mb-2">{blog.title}</h3>
                    <p className="text-white-300 text-[12px] mb-4">{blog.excerpt}</p>
                    
                    <div className='flex flex-row justify-between items-center mb-4'>
                        <p className="text-white-300 text-xs">
                            {new Date(blog.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                        {blog.mediumUrl && (
                            <a 
                                href={blog.mediumUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center text-green-200 hover:text-green-300 transition-colors"
                            >
                                <span className="text-[14px] mr-1">Medium</span>
                                <ion-icon name="arrow-forward-outline"></ion-icon>
                            </a>
                        )}
                    </div>
                </div>

                {/* Updated Read More Button */}
                <div className="flex justify-center">
                    <Link 
                        href={{
                            pathname: '/coming_soon',
                            query: { mediumUrl: blog.mediumUrl }
                        }} 
                        legacyBehavior
                        passHref
                    >
                        <a 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-200 text-dark-100 px-4 py-2 rounded-md hover:bg-green-300 transition-colors text-center w-full"
                        >
                            Read More
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Blogs;