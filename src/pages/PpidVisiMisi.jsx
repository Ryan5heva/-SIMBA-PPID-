import { useState, useEffect } from 'react';
import { fetchJson } from '../lib/api';
import { Sidebar } from '../components/BeritaTerbaru/BeritaTerbaruSection';
import '../components/BeritaTerbaru/BeritaTerbaruSection.css';
import './Profil.css';

export default function PpidVisiMisi() {
  const [videos, setVideos]         = useState([]);
  const [videoLoading, setVLoading] = useState(true);
  const [videoError, setVError]     = useState(null);

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
    <main className="pr-page" aria-label="Visi dan Misi PPID Bakorwil I Madiun">
      <div className="pr-page__inner">
        <div className="pr-layout">

          {/* ── Kolom kiri: konten ── */}
          <div className="pr-content">

            {/* ── Page header ── */}
            <header className="pr-header">
              <h1 className="pr-header__title">
                Visi - Misi Pejabat Pengelola Informasi dan Dokumentasi (PPID)
              </h1>
              <div className="pr-header__bar" aria-hidden="true" />

              {/* Meta: badge PPID saja (tanpa tanggal/views — data tidak tersedia) */}
              <div className="faq-meta" role="contentinfo" aria-label="Informasi dokumen" style={{ marginTop: '16px' }}>
                <span className="faq-meta__badge" aria-label="Kategori: PPID">PPID</span>
              </div>
            </header>

            {/* ═══════════════════════════════════════════
                SECTION 1 — VISI
            ═══════════════════════════════════════════ */}
            <section className="pr-section" aria-labelledby="heading-visi">
              <h2 className="pr-section__heading" id="heading-visi">
                VISI
              </h2>
              <div className="pr-info-card">

                <p className="pr-section__text">
                  Terwujudnya penyelenggaraan pemerintahan yang baik, transparan, efektif dan
                  efisien, akuntabel serta meningkatkan pengelolaan dan pelayanan informasi dan
                  dokumentasi di Pemerintah Provinsi untuk menghasilkan layanan informasi dan
                  dokumentasi yang berkualitas.
                </p>

                <ol className="pr-misi-plain" aria-label="Klasifikasi Informasi Publik dalam Visi PPID">
                  <li className="pr-misi-plain__item">Informasi yang wajib diumumkan secara berkala;</li>
                  <li className="pr-misi-plain__item">Informasi yang wajib diumumkan secara serta merta;</li>
                  <li className="pr-misi-plain__item">Informasi yang wajib tersedia setiap saat;</li>
                  <li className="pr-misi-plain__item">Informasi yang dikecualikan.</li>
                </ol>

              </div>
            </section>

            {/* ═══════════════════════════════════════════
                SECTION 2 — MISI
            ═══════════════════════════════════════════ */}
            <section className="pr-section" aria-labelledby="heading-misi">
              <h2 className="pr-section__heading" id="heading-misi">
                MISI
              </h2>
              <div className="pr-info-card">

                <ul className="pr-misi-plain" aria-label="Misi PPID">
                  <li className="pr-misi-plain__item">
                    Menghimpun informasi publik dari seluruh bidang di lingkungan instansi;
                  </li>
                  <li className="pr-misi-plain__item">
                    Menata dan menyimpan informasi publik dari seluruh bidang di instansi;
                  </li>
                  <li className="pr-misi-plain__item">
                    Melaksanakan konsultasi informasi publik kategori dikecualikan dari informasi
                    yang terbuka untuk publik;
                  </li>
                  <li className="pr-misi-plain__item">
                    Menyelesaikan sengketa informasi.
                  </li>
                </ul>

              </div>
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
      </div>
    </main>
  );
}
