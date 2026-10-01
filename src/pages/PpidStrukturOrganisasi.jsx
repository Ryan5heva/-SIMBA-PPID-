import { useState, useEffect, useCallback } from 'react';
import { fetchJson } from '../lib/api';
import { Sidebar } from '../components/BeritaTerbaru/BeritaTerbaruSection';
import '../components/BeritaTerbaru/BeritaTerbaruSection.css';
import './Profil.css';
import baganSrc from '../assets/struktur-organisasi-ppid.jpeg';

export default function PpidStrukturOrganisasi() {
  /* ── Video state — reuse sidebar yang sama dengan halaman Profil lain ── */
  const [videos, setVideos]         = useState([]);
  const [videoLoading, setVLoading] = useState(true);
  const [videoError, setVError]     = useState(null);

  /* ── Lightbox state ── */
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imgError, setImgError]         = useState(false);

  const openLightbox  = useCallback(() => setLightboxOpen(true),  []);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  /* Close on Escape key */
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') closeLightbox(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, closeLightbox]);

  useEffect(() => {
    const ctrl = new AbortController();
    setVLoading(true);
    setVError(null);
    fetchJson('/videos', { signal: ctrl.signal })
      .then((data) => {
        const raw = Array.isArray(data) ? data : [];
        setVideos(raw);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setVError(err.message);
      })
      .finally(() => setVLoading(false));
    return () => ctrl.abort();
  }, []);

  return (
    <main className="pr-page" aria-label="Struktur Organisasi PPID Bakorwil I Madiun">
      <div className="pr-page__inner">
        <div className="pr-layout">

          {/* ── Kolom kiri: konten ── */}
          <div className="pr-content">

            {/* ── Page header ── */}
            <header className="pr-header">
              <h1 className="pr-header__title">
                Struktur Organisasi PPID Pelaksana Bakorwil I Madiun
              </h1>
              <div className="pr-header__bar" aria-hidden="true" />

              {/* Meta: badge PPID saja */}
              <div className="faq-meta" role="contentinfo" aria-label="Informasi dokumen" style={{ marginTop: '16px' }}>
                <span className="faq-meta__badge" aria-label="Kategori: PPID">PPID</span>
              </div>
            </header>

            {/* ── Bagan Struktur Organisasi ── */}
            <section className="pr-section" aria-labelledby="heading-bagan">
              <h2 className="pr-section__heading" id="heading-bagan">
                BAGAN STRUKTUR ORGANISASI
              </h2>

              {imgError ? (
                /* Fallback apabila gambar gagal di-load */
                <div
                  className="pr-org-chart-placeholder"
                  role="img"
                  aria-label="Bagan struktur organisasi PPID gagal dimuat"
                >
                  <div className="pr-org-chart-placeholder__icon" aria-hidden="true">🏛️</div>
                  <p className="pr-org-chart-placeholder__title">Bagan Struktur Organisasi PPID</p>
                  <p className="pr-org-chart-placeholder__sub">
                    Gambar tidak dapat dimuat. Silakan muat ulang halaman.
                  </p>
                </div>
              ) : (
                <div className="pr-org-chart-wrap">
                  <button
                    className="pr-org-chart-btn"
                    onClick={openLightbox}
                    aria-label="Klik untuk memperbesar bagan struktur organisasi PPID"
                    title="Klik untuk perbesar"
                  >
                    <img
                      src={baganSrc}
                      alt="Bagan Struktur Organisasi PPID Pelaksana Bakorwil I Madiun"
                      className="pr-org-chart-img"
                      loading="lazy"
                      onError={() => setImgError(true)}
                    />
                    <span className="pr-org-chart-zoom-hint" aria-hidden="true">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2.5"
                        strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"/>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        <line x1="11" y1="8" x2="11" y2="14"/>
                        <line x1="8" y1="11" x2="14" y2="11"/>
                      </svg>
                      Klik untuk perbesar
                    </span>
                  </button>
                </div>
              )}
            </section>

          </div>

          {/* ── Kolom kanan: sidebar (reuse banner + video) ── */}
          <div className="bts pr-visimisi-sidebar-wrap">
            <Sidebar
              videos={videos}
              videoLoading={videoLoading}
              videoError={videoError}
            />
          </div>

        </div>

        {/* ── Lightbox modal ── */}
        {lightboxOpen && (
          <div
            className="pr-lightbox-overlay"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Bagan Struktur Organisasi PPID Pelaksana Bakorwil I Madiun — tampilan penuh"
          >
            <div className="pr-lightbox-inner" onClick={(e) => e.stopPropagation()}>
              <button
                className="pr-lightbox-close"
                onClick={closeLightbox}
                aria-label="Tutup"
              >
                ×
              </button>
              <img
                src={baganSrc}
                alt="Bagan Struktur Organisasi PPID Pelaksana Bakorwil I Madiun"
                className="pr-lightbox-img"
              />
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
