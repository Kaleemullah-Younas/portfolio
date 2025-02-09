import { useEffect, useState } from "react";
import Link from "next/link";
import { FaStar, FaArrowRight, FaQuoteRight } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";
import projectsData from "../../data/projects.json";
import userInfo from "../../data/usersInfo.json";


function Projects() {
    const [repo, setRepo] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const projects = projectsData.projects || [];

    async function fetchRepos() {
        let res;
        let url = `https://api.github.com/users/${userInfo.github_username}/repos?sort=updated`;
        if (localStorage.getItem("user_repos") === null) {
            try {
                setLoading(true);
                res = await fetch(url);
                let data = await res.json();
                setLoading(false);
                if (data && data.length > 0) {
                    localStorage.setItem("user_repos", JSON.stringify(data));
                    setRepo(data);
                    return;
                }
                setError(`No github repos found.`);
            } catch (err) {
                console.error(`FAILED: ${err.message}`);
                setLoading(false);
                setError(`Failed fetching repo: ${err.message}`);
            }
        }
    
        let userRepos = JSON.parse(localStorage.getItem("user_repos"));
        setRepo(userRepos);
    }

    useEffect(() => {
        (async () => {
            await fetchRepos();
        })();
    }, []);

    return (
        (<div className="projectCont w-full h-auto relative top-[50px] p-10px flex flex-col items-center justify-center mb-[50px]">
            <div className="w-full flex flex-row items-center justify-center">
                <span data-aos="zoom-in" className="w-[100px] h-[2px] rounded-[30px] m-[20px] bg-green-200 md:w-[120px]"></span>
                <p data-aos="fade-up" className="text-white-200 text-[15px]">Latest Works</p>
                <span data-aos="zoom-in" className="w-[100px] h-[2px] rounded-[30px] m-[20px] bg-green-200 md:w-[120px]"></span>
            </div>
            <Link href="/projects" legacyBehavior>
                    <a data-aos="zoom-in-up" className="text-center text-green-200 underline absolute top-[50px] text-[14px]">All Projects</a>
            </Link>
            <div className="projects w-full h-auto p-3 flex flex-wrap items-center justify-between gap-3 mb-[40px]">
                {projects.slice(0, 4).map((list, i) => (
                    <div
                        data-aos="zoom-in"
                        key={i}
                        className="box w-full md:w-[22%] bg-dark-200 rounded-[5px] relative top-[50px] transition-all mb-[50px] opacity-[.7] hover:opacity-[1]">
                        <div className="imgCont"></div>
                        <style jsx>{`
                            .imgCont {
                                width: 100%;
                                height: 190px;
                                background-image: url(${list.imageUrl || "https://www.wallpapertip.com/wmimgs/136-1369543_laptop-coding.jpg"});
                                background-size: cover;
                                background-repeat: no-repeat;
                                background-position: center;
                                border-radius: 5px;
                            }
                        `}</style>
                        <div className="w-full p-[10px]">
                            <p className="text-[15px] text-white-200">{list.title || "Project Title"}</p>
                            <small>{list.description || "some dummy description"}</small>
                            <div className="flex items-start justify-start gap-1 mt-2">
                                {list.tags && list.tags.slice(0, 3).map((tag, i) => (
                                    <span key={i} className="text-[10px] py-[3px] px-[9px] bg-dark-100 rounded-[2px] text-white-100">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            {list.project_url && (
                                <a href={list.project_url} target="_blank" className="absolute right-[10px] bottom-[10px] text-white-200 text-[12px] hover:underline">
                                    Views <FaArrowRight className="inline ml-1 text-[10px]" />
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            
            {/* <div className="w-full h-auto mt-4 mb-5 p-3 flex flex-wrap items-center justify-between">
                {loading ? "Loading..." : error ? <p>{error}</p> : <GithubRepo repos={repo} />}
            </div> */}
        </div>)
    );
}

export default Projects;

// function GithubRepo({ repos }) {
//     return (
//         <>
//             {repos && repos.length > 0 ? (
//                 repos.slice(0, 3).map((rep, i) => (
//                     <div
//                         data-aos="zoom-in"
//                         key={i}
//                         className="relative w-full h-[180px] bg-dark-200 flex flex-col items-start px-4 py-3 mt-2 rounded-md md:w-[300px]"
//                     >
//                         <h2 className="text-[20px]">{rep.name}</h2>
//                         <p className="text-[15px] text-white-300 mt-2">
//                             {rep.description ? `${rep.description.slice(0, 60)}...` : "No description available."}
//                         </p>
//                         <div className="ratings flex gap-2 mt-4">
//                             <StarRatings title="Stars" count={rep.stargazers_count} />
//                             <StarRatings title="Forks" count={rep.forks} />
//                         </div>
//                         <a href={rep.html_url} target="_blank" rel="noopener noreferrer" className="absolute right-3 top-2 flex items-center">
//                             <small className="underline">View</small>
//                             <FaArrowRight className="ml-2 text-[12px]" />
//                         </a>
//                     </div>
//                 ))
//             ) : (
//                 <p>Oops, No Github Repo was found.</p>
//             )}
//         </>
//     );
// }

// function StarRatings({ count = 1, title = "Stars" }) {
//     return (
//         <span className="flex items-center gap-1 text-white-200">
//             <FaStar className="text-green-200" />
//             <small className="font-extrabold">{count}</small>
//             <small>{title}</small>
//         </span>
//     );
// }
