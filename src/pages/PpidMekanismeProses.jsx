import { useState, useEffect } from 'react';
import { fetchJson } from '../lib/api';
import { Sidebar } from '../components/BeritaTerbaru/BeritaTerbaruSection';
import PpidTable from '../components/PpidTable/PpidTable';
import '../components/BeritaTerbaru/BeritaTerbaruSection.css';
import './Profil.css';
import './PpidPage.css';

/**
 * PpidMekanismeProses — /mekanisme-proses
 *
 * Fetches SOP data from /ppid/dokumen/sop (kategori SOP, id_jenis_dokumen = 28)
 * and displays it as a PpidTable (No | Informasi | Tautan).
 * Keeps the 2-column layout with sidebar (foto gedung + video).
 */
export default function PpidMekanismeProses() {
  /* ── SOP data ── */
  const [items, setItems]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  /* ── Sidebar video ── */
  const [videos, setVideos]         = useState([]);
  const [videoLoading, setVLoading] = useState(true);
  const [videoError, setVError]     = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();

    /* Fetch SOP items */
    setLoading(true);
    setError(null);
    fetchJson('/ppid/dokumen/sop', { signal: ctrl.signal })
      .then((data) => {
        const raw = data?.data ?? data;
        setItems(Array.isArray(raw) ? raw : []);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => setLoading(false));

    /* Fetch sidebar videos */
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
    <main className="pr-page" aria-label="Mekanisme/Proses PPID Bakorwil I Madiun">
      <div className="pr-page__inner">
        <div className="pr-layout">

          {/* ── Kolom kiri: konten ── */}
          <div className="pr-content">

            {/* ── Page header ── */}
            <header className="pr-header">
              <h1 className="pr-header__title">Mekanisme/Proses</h1>
              <div className="pr-header__bar" aria-hidden="true" />
            </header>

            {/* ═══════════════════════════════════════════════════════════
                SECTION — SOP / Mekanisme Proses (data dinamis)
            ════════════════════════════════════════════════════════════ */}
            <section className="pr-section" aria-labelledby="heading-mekanisme-proses">
              <h2 className="pr-section__heading" id="heading-mekanisme-proses">
                SOP LAYANAN INFORMASI PUBLIK
              </h2>

              {loading && (
                <div className="ppid-loading" role="status" aria-live="polite">
                  <div className="ppid-spinner" aria-hidden="true" />
                  Memuat data…
                </div>
              )}

              {!loading && error && (
                <div className="ppid-error" role="alert">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <circle cx="9" cy="9" r="8" stroke="#ef4444" strokeWidth="1.5"/>
                    <path d="M9 5v4M9 12v.5" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                  {error}
                </div>
              )}

              {!loading && !error && (
                <PpidTable items={items} standalone />
              )}
            </section>

          </div>

          {/* ── Kolom kanan: sidebar reuse dari halaman Profil lainnya ── */}
          <div className="bts pr-visimisi-sidebar-wrap">
            <Sidebar
              videos={videos}
              videoLoading={videoLoading}
              videoError={videoError}
            />
          </div>

        </div>
      </div>
    </main>
  );
}
