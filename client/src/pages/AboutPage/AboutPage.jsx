import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "./AboutPage.module.css";
import { FaCircleCheck } from "react-icons/fa6";
import { IoCodeSlashOutline } from "react-icons/io5";
import { IoIosGitBranch } from "react-icons/io";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { LiaSitemapSolid } from "react-icons/lia";

// Counter with Intersection Observer
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

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [to, duration, from]);

    return <span className={styles.countNumber} ref={ref}>{count.toLocaleString()}+</span>;
};

const AboutPage = () => {
    const [countUsers, setCountUsers] = useState(0);
    const [countBrands, setCountBrands] = useState(0);
    const [countLanguages, setCountLanguages] = useState(0);
    const [countCategories, setCountCategories] = useState(0);
    const API_URL = import.meta.env.VITE_API;

    useEffect(() => {
        fetchCounts();
    }, []);

    const fetchCounts = async () => {
        try {
            const [
                resUsers,
                resBrands,
                resLanguages,
                resCategories
            ] = await Promise.all([
                axios.get(`${API_URL}/api/v1/auth/count-users`),
                axios.get(`${API_URL}/api/v1/brand/count-brandLanguages`),
                axios.get(`${API_URL}/api/v1/language/count-languages`),
                axios.get(`${API_URL}/api/v1/category/count-categoryLanguages`)
            ]);

            if (resUsers.data.success) {
                setCountUsers(resUsers.data.count?.count ?? resUsers.data.count ?? 0);
            }

            if (resBrands.data.success) {
                setCountBrands(resBrands.data.data?.count ?? resBrands.data.data ?? 0);
            }

            if (resLanguages.data.success) {
                setCountLanguages(resLanguages.data.count ?? 0);
            }

            if (resCategories.data.success) {
                setCountCategories(resCategories.data.data?.count ?? resCategories.data.data ?? 0);
            }

        } catch (error) {
            console.error("Error fetching counts:", error);
        }
    };

    return (
        <div className={styles.containerAbout}>
            <div className={styles.inContainerAbout}>
                <h2>About The Algorithms</h2>

                <div className={styles.aboutContentFlex}>
                    {/* Count blocks */}
                    <div className={styles.aboutBox}>
                        <div className={styles.iconWrapper} title="Programming Languages">
                            <IoIosGitBranch className={styles.icon} />
                        </div>
                        <Counter to={countLanguages || 30} duration={1500} />
                        <h4>Programming Languages</h4>
                    </div>

                    <div className={styles.aboutBox}>
                        <div className={styles.iconWrapper} title="Brands">
                            <IoCodeSlashOutline className={styles.icon} />
                        </div>
                        <Counter to={countBrands || 30} duration={1500} />
                        <h4>Brands</h4>
                    </div>

                    <div className={styles.aboutBox}>
                        <div className={styles.iconWrapper} title="Members & Contributors">
                            <HiOutlineUserGroup className={styles.icon} />
                        </div>
                        <Counter to={countUsers || 1000} duration={1500} />
                        <h4>Members & Contributors</h4>
                    </div>

                    <div className={styles.aboutBox}>
                        <div className={styles.iconWrapper} title="Categories">
                            <LiaSitemapSolid className={styles.icon} />
                        </div>
                        <Counter to={countCategories || 1000} duration={1500} />
                        <h4>Categories</h4>
                    </div>

                    {/* Description */}
                    <div className={styles.aboutDescription}>
                        <p>
                            The Algorithms is the largest open-source algorithm library on GitHub, backed by an <br />
                            active community of developers worldwide.
                        </p>
                    </div>

                    {/* Feature list */}
                    <div data-aos="zoom-in" className={styles.flexAboutBox}>
                        {[
                            "Clear, well-documented implementations in multiple programming languages",
                            "Beginner-friendly explanations and step-by-step guides",
                            "Active community support and code reviews",
                            "Educational resources for computer science students",
                            "Regular updates and maintenance by expert developers",
                            "Cross-platform compatibility and optimized implementations"
                        ].map((text, index) => (
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
