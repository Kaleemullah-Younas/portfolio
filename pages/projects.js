import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Container, DomHead, Footer, NavBar } from "../components"
import { FaArrowLeft } from 'react-icons/fa'
import { ResponsiveNavbar } from '../components/Navbar'
import { FaStar, FaArrowRight, FaQuoteRight } from "react-icons/fa"
import { AiFillGithub } from "react-icons/ai"

import { projects } from "../data/projects.json"
import userInfo from "../data/usersInfo.json"

function Projects() {
    const [windowWidth, setWindowWidth] = useState(0)

    useEffect(() => {
        setWindowWidth(window.innerWidth)
        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth)
        })
    }, [])

    return (
        (<div>
            <DomHead pageName='Projects' />
            <Container>
                <NavBar />
            </Container>
            <div id="top-head" className="relative w-full h-[35vh] bg-dark-400 p-3 flex flex-col items-start justify-start ">
                <Container className="relative">
                    <Link href={"/"} legacyBehavior>
                        <FaArrowLeft className='px-3 py-1 text-white-200 text-[35px] bg-dark-100 rounded-[4px] cursor-pointer' />
                    </Link>
                    <br />
                    <h1 className="text-[50px] font-bold ">
                        Projects
                    </h1>
                    <p className="text-[15px] text-white-300 ">
                        Here are my completed projects.
                    </p>
                </Container>
            </div>
            {/* Added gap-y-16 for proper spacing between projects and repos sections */}
            <div className="w-screen h-auto space-y-16">
                {/* <br /> */}
                <Container>
                    <div id="head" className="w-full mt-10 py-0 mx-auto flex flex-row justify-center items-start">
                        <h2 className="text-[25px] text-white-200 px-4 md:px-4 font-bold">Personal Projects</h2>
                    </div>
                    {/* Modified to add gap-5 for proper spacing between cards */}
                    <div className="w-full mt-1 mx-auto p-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-3">
                    <ProjectsCard />
                    </div>
                    <div id="head" className="w-full mt-10 py-0 mx-auto flex flex-row justify-center items-start">
                        <h2 className=" text-[25px] text-white-200 p-4 md:px-4 font-bold">Github Repos</h2>
                    </div>
                    {/* Modified to add gap-5 for proper spacing between repo cards */}
                    <div id="head" className="w-full space-x-0 py-4 p-4 mx-auto flex flex-row justify-start items-start flex-wrap mb-[50px] gap-5 md:flex-row md:space-x-0">
                        <GithubRepo />
                    </div>
                </Container>
            </div>
            <Footer />
            {windowWidth <= 700 && <ResponsiveNavbar pageName={"projects"} />}
        </div>)
    );
}

export default Projects

function ProjectsCard() {
    // Added githubUrl constant
    const githubUrl = `https://github.com/${userInfo.full_name}`;

    return (
        <>
            {/* Modified to only show first 12 projects */}
            {projects.slice(0, 12).map((list, i) => (
                <div key={i} className="box w-full h-auto bg-dark-200 rounded-[5px] relative top-[50px] transition-all mb-[50px] mr-[5px] opacity-[.7] md:w-[280px] md:ml-0 hover:opacity-[1]">
                    <div className="imgCont"></div>
                    <style jsx>{`
                        .imgCont {
                            width: 100%;
                            height: 190px;
                            background-image: url(${list.imageUrl === "" || list.imageUrl === null ? "https://www.wallpapertip.com/wmimgs/136-1369543_laptop-coding.jpg" : list.imageUrl});
                            background-size: cover;
                            background-repeat: no-repeat;
                            background-position: center;
                            border-radius: 5px;
                        }
                    `}</style>
                    <div className={`w-full p-[10px] bottom-[5px]`}>
                        <div className="w-full h-auto">
                            <p className={`text-[15px] text-white-200 my-[10px]`}>{list.title === "" ? "Project Title" : list.title}</p>
                            <small>{list.description === "" ? "some dummy description" : list.description.length > 150 ? list.description.slice(0, 100) + "..." : list.description}</small>
                        </div>
                        <div className={`my-[20px]`}></div>
                        <div className={`bottom-[5px] left-[5px] p-0 flex items-start justify-start`}>
                            {list.tags.length > 0 ?
                                list.tags.slice(0, 3).map((tag, i) => (
                                    <span key={i} className={`text-[10px] py-[3px] px-[9px] bg-dark-100 mr-[2px] rounded-[2px] text-white-100`}>{tag}</span>
                                ))
                                : ""}
                        <span className={`absolute my-[0px] right-[10px] text-[12px] flex items-center justify-start`}>
                            {list.project_url !== "" ?
                                <>
                                    <a href={list.project_url} className={`text-white-200 mr-[0px] hover:underline hover:text-white-100`}>
                                        View
                                    </a>
                                    <ion-icon name="arrow-forward-outline" className={`ml-[5px] `}></ion-icon>
                                </>
                                : ""}
                        </span>
                        </div>
                    </div>
                </div>
            ))}
            {/* Added More Projects link if there are more than 12 projects */}
            {projects.length > 100 && (
                <div className="w-full text-center mt-8">
                    <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-center text-green-200 underline">
                        More Projects
                    </a>
                </div>
            )}
        </>
    );
}


function GithubRepo() {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const githubUrl = `https://github.com/${userInfo.full_name}?tab=repositories`;

    // Cache duration: 6 days in milliseconds
    const CACHE_DURATION = 6 * 24 * 60 * 60 * 1000;

    async function fetchRepos() {
        const cacheKey = "user_repos";
        const cachedData = localStorage.getItem(cacheKey);
        const now = new Date().getTime();

        try {
            // Check if we have cached data that's still valid
            if (cachedData) {
                const { data, timestamp } = JSON.parse(cachedData);
                if (now - timestamp < CACHE_DURATION) {
                    setRepos(data);
                    return;
                }
            }

            setLoading(true);
            const url = `https://api.github.com/users/${userInfo.full_name}/repos?sort=pushed&direction=desc&per_page=10`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Validate response
            if (!Array.isArray(data)) {
                throw new Error('Invalid response from GitHub API');
            }

            // Update cache with new data and timestamp
            const cacheData = {
                data: data,
                timestamp: now
            };
            localStorage.setItem(cacheKey, JSON.stringify(cacheData));

            setRepos(data);
            setError(null);
        } catch (err) {
            setError(`Failed to fetch repositories: ${err.message}`);
            // If there's cached data, use it even if it's expired
            if (cachedData) {
                const { data } = JSON.parse(cachedData);
                setRepos(data);
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchRepos();
    }, []);

return (
        <>
            {loading ? "Loading..." : error !== null ? <p>{error}</p> : (
                <>
                    {repos.slice(0, 8).map((rep, i) => (
                        <div key={i} className="relative w-full h-[180px] bg-dark-200 flex flex-col items-start justify-start px-4 py-3 mt-2 rounded-md md:w-[280px]">
                            <h2 className="w-full text-[20px] text-white-200">{rep.name}</h2>
                            <p className="w-full text-[15px] text-white-300 mt-2">
                                {rep.description && rep.description.length > 50 ? 
                                rep.description.slice(0, 80) + "..." : rep.description}
                            </p>
                            
                            {/* Updated green section */}
                            <div className="mt-auto w-full flex justify-between items-end">
                                <div className="flex gap-4">
                                    <StarRatings title="stars" count={rep.stargazers_count} />
                                    <StarRatings title="forks" count={rep.forks} />
                                </div>
                                <a href={rep.html_url} target="_blank" rel="noopener noreferrer" 
                                   className="text-green-200 hover:text-green-300 flex items-center">
                                    View <FaArrowRight className="ml-1 text-[12px]" />
                                </a>
                            </div>
                        </div>
                    ))}
    
                    {repos.length > 8 && (
                        <div className="w-full text-center mt-8">
                            <a href={githubUrl} target="_blank" rel="noopener noreferrer" 
                               className="text-center text-green-200 underline">
                                View More Projects
                            </a>
                        </div>
                    )}
                </>
            )}
        </>
    )
}
    
function StarRatings({ count = 0, title = "stars" }) {
    return (
            <div className="flex items-center gap-2 text-white-200">
                {title === "stars" ? (
                    <FaStar className="text-green-200 text-[14px]" />
                ) : (
                    <AiFillGithub className="text-green-200 text-[14px]" />
                )}
                <span className="font-medium text-[14px]">{count}</span>
            </div>
        )
}