import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "./AboutPage.module.css";
import { FaCircleCheck } from "react-icons/fa6";
import { IoCodeSlashOutline } from "react-icons/io5";
import { IoIosGitBranch } from "react-icons/io";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { LiaSitemapSolid } from "react-icons/lia";

// Counter Component
const Counter = ({ from = 0, to = 0, duration = 1000 }) => {
    const [count, setCount] = useState(from);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                const stepTime = 10;
                const steps = Math.ceil(duration / stepTime);
                const increment = (to - from) / steps;
                let current = from;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= to) {
                        current = to;
                        clearInterval(timer);
                    }
                    setCount(Math.floor(current));
                }, stepTime);

                observer.unobserve(entry.target);
                return () => clearInterval(timer);
            }
        }, { threshold: 0.5 });

        if (ref.current) observer.observe(ref.current);
        return () => ref.current && observer.unobserve(ref.current);
    }, [to, duration, from]);

    return (
        <span className={styles.countNumber} ref={ref}>
            {to > 0 ? `${count.toLocaleString()}+` : "0"}
        </span>
    );
};

const AboutPage = () => {
    const [counts, setCounts] = useState({
        users: 0,
        brands: 0,
        languages: 0,
        categories: 0
    });
    const [loading, setLoading] = useState(true);
    const API_URL = import.meta.env.VITE_API;

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const [resUsers, resBrands, resLanguages, resCategories] = await Promise.all([
                    axios.get(`${API_URL}/api/v1/auth/count-users`),
                    axios.get(`${API_URL}/api/v1/brand/count-brandLanguages`),
                    axios.get(`${API_URL}/api/v1/language/count-languages`),
                    axios.get(`${API_URL}/api/v1/category/count-categoryLanguages`)
                ]);

                setCounts({
                    users: resUsers?.data?.count?.count ?? resUsers?.data?.count ?? 0,
                    brands: resBrands?.data?.data?.count ?? resBrands?.data?.data ?? 0,
                    languages: resLanguages?.data?.count ?? 0,
                    categories: resCategories?.data?.data?.count ?? resCategories?.data?.data ?? 0
                });

            } catch (error) {
                console.error("Error fetching counts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCounts();
    }, [API_URL]);

    const aboutItems = [
        { icon: <IoIosGitBranch />, title: "Programming Languages", count: counts.languages || 30 },
        { icon: <IoCodeSlashOutline />, title: "Brands", count: counts.brands || 30 },
        { icon: <HiOutlineUserGroup />, title: "Members & Contributors", count: counts.users || 1000 },
        { icon: <LiaSitemapSolid />, title: "Categories", count: counts.categories || 1000 }
    ];

    const features = [
        "Clear, well-documented implementations in multiple programming languages",
        "Beginner-friendly explanations and step-by-step guides",
        "Active community support and code reviews",
        "Educational resources for computer science students",
        "Regular updates and maintenance by expert developers",
        "Cross-platform compatibility and optimized implementations"
    ];

    return (
        <div className={styles.containerAbout}>
            <div className={styles.inContainerAbout}>
                <h2>About The Algorithms</h2>

                <div className={styles.aboutContentFlex}>
                    {aboutItems.map((item, idx) => (
                        <div key={idx} className={styles.aboutBox}>
                            <div className={styles.iconWrapper} title={item.title}>
                                {item.icon}
                            </div>
                            {loading ? <span className={styles.countNumber}>...</span> : <Counter to={item.count} duration={1500} />}
                            <h4>{item.title}</h4>
                        </div>
                    ))}

                    <div className={styles.aboutDescription}>
                        <p>
                            The Algorithms is the largest open-source algorithm library on GitHub, backed by an <br />
                            active community of developers worldwide.
                        </p>
                    </div>

                    <div data-aos="zoom-in" className={styles.flexAboutBox}>
                        {features.map((text, index) => (
                            <div key={index} className={styles.inFlexAboutBox}>
                                <FaCircleCheck />
                                <p>{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
