// File: src/pages/LanguagesByCategory/LanguagesByCategory.js

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import styles from './Languages.module.css'; 
import { MdOutlineNavigateNext } from "react-icons/md";
import Layout from '../../../../components/Layout/Layout';

const API_URL = import.meta.env.VITE_API;

const Languages = () => {
  const { slug } = useParams(); 
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/v1/language/languages/by-category/${slug}`);
        if (data?.success) {
          setLanguages(data.data || []);
        } else {
          toast.error('Không thể tải dữ liệu bài học.');
        }
      } catch {
        toast.error('Lỗi kết nối máy chủ!');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchLanguages();
    }
  }, [slug]);

  return (
    <Layout title={`Bài học`}>
      <div className={styles.containerLanguages}>
        <h1 className={styles.titleLanguages}>
          Các bài học trong danh mục:
        </h1>

        <p className={styles.resultCountLanguages}>
          {loading
            ? 'Đang tải dữ liệu...'
            : `Tìm thấy ${languages.length} bài học về ngôn ngữ lập trình.`}
        </p>

        <div className={styles.languagesGrid}>
          {!loading && languages.length === 0 && (
            <p>Chưa có bài học nào trong danh mục này.</p>
          )}

          {!loading &&
            languages.map((lang, index) => (
              <div
                key={lang._id}
                className={styles.languageCard}
                data-aos="zoom-in-up"
                data-aos-delay={`${index * 50}`}
              >
                <h3 className={styles.languageName}>
                  {index + 1}. {lang.name}
                </h3>

                <img
                  src={lang.image}
                  alt={`Ảnh ngôn ngữ ${lang.name}`}
                  className={styles.languageImage}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/default-image.png'; // Đường dẫn ảnh mặc định nếu lỗi
                  }}
                />

                <div className={styles.languageContent}>
                  <p className={styles.languageDescription}>
                    {(lang.description || 'Không có mô tả').substring(0, 180)}...
                  </p>
                  <Link to={`/language_detail/${lang.slug}`} className={styles.detailButton}>
                    Xem chi tiết tại đây <MdOutlineNavigateNext />
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Languages;
