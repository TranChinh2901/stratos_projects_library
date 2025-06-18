import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Cột 1: Giới thiệu */}
        <div className={styles.column}>
          <h3 className={styles.title}>The Algorithms</h3>
          <p className={styles.description}>Open Source resource for learning DSA.</p>
          <p className={styles.text}>
            Join our community of open-source developers to learn and share algorithm implementations
            in various programming languages. Learn, share, and grow with us!
          </p>
        </div>

        {/* Cột 2: Tài nguyên */}
        <div className={styles.column}>
          <h3 className={styles.title}>Resources</h3>
          <ul className={styles.list}>
            <li><a href="#" className={styles.link}>Programming Languages</a></li>
            <li><a href="#" className={styles.link}>Algorithms</a></li>
            <li><a href="#" className={styles.link}>How to Contribute</a></li>
            <li><a href="#" className={styles.link}>Documentation</a></li>
          </ul>
        </div>

        {/* Cột 3: Cộng đồng */}
        <div className={styles.column}>
          <h3 className={styles.title}>Community</h3>
          <ul className={styles.list}>
            <li><a href="https://github.com/TheAlgorithms" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a></li>
            <li><a href="https://discord.gg/TheAlgorithms" target="_blank" rel="noopener noreferrer" className={styles.link}>Discord</a></li>
            <li><a href="https://twitter.com/TheAlgorithms" target="_blank" rel="noopener noreferrer" className={styles.link}>Twitter</a></li>
            <li><a href="#" className={styles.link}>Our Team</a></li>
          </ul>
        </div>
      </div>

      {/* Phần bản quyền */}
      <div className={styles.copyright}>
        <p>© {new Date().getFullYear()} The Algorithms. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
