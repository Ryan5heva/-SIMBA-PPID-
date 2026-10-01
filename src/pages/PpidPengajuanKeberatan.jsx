import { useState, useEffect } from 'react';
import { fetchJson } from '../lib/api';
import { Sidebar } from '../components/BeritaTerbaru/BeritaTerbaruSection';
import '../components/BeritaTerbaru/BeritaTerbaruSection.css';
import './Profil.css';

export default function PpidPengajuanKeberatan() {
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
    <main className="pr-page" aria-label="Pengajuan Keberatan PPID Bakorwil I Madiun">
      <div className="pr-page__inner">
        <div className="pr-layout">

          {/* ── Kolom kiri: konten ── */}
          <div className="pr-content">

            {/* ── Page header ── */}
            <header className="pr-header">
              <h1 className="pr-header__title">Pengajuan Keberatan</h1>
              <div className="pr-header__bar" aria-hidden="true" />

              {/* Meta: badge kategori */}
              <div className="faq-meta" role="contentinfo" aria-label="Informasi dokumen" style={{ marginTop: '16px' }}>
                <span className="faq-meta__badge" aria-label="Kategori: PPID">PPID</span>
              </div>
            </header>

            {/* ═══════════════════════════════════════════════════════════
                SECTION 1 — Dasar dan Pedoman Pengajuan Keberatan
            ════════════════════════════════════════════════════════════ */}
            <section className="pr-section" aria-labelledby="heading-dasar">
              <h2 className="pr-section__heading" id="heading-dasar">
                Dasar dan Pedoman Pengajuan Keberatan
              </h2>

              <div className="pr-info-card">

                {/* ── Pasal 35 ── */}
                <h3 className="pr-info-card__name pr-card-subheading">
                  UU No 14 Tahun 2008 pasal 35
                </h3>

                <ol className="pr-misi-plain" aria-label="Pasal 35 UU No 14 Tahun 2008">
                  <li className="pr-misi-plain__item">
                    Setiap Pemohon Informasi Publik dapat mengajukan keberatan secara tertulis kepada Atasan Pejabat Pengelola Informasi dan Dokumentasi (PPID) berdasarkan alasan berikut :
                    <ol className="pr-misi-plain" style={{ marginTop: '8px' }}>
                      <li className="pr-misi-plain__item">
                        Penolakan atas permintaan informasi berdasarkan alasan pengecualian sebagaimana dimaksud pasal 17
                      </li>
                      <li className="pr-misi-plain__item">
                        Tidak disediakannya informasi berkala sebagaimana dimaksud pasal 9
                      </li>
                      <li className="pr-misi-plain__item">
                        Tidak ditanggapinya permintaan informasi
                      </li>
                      <li className="pr-misi-plain__item">
                        Permintaan informasi ditanggapi tidak sebagaimana yang diminta
                      </li>
                      <li className="pr-misi-plain__item">
                        Tidak dipenuhinya permintaan informasi
                      </li>
                      <li className="pr-misi-plain__item">
                        Pengenaan biaya yang tidak wajar, dan/atau
                      </li>
                      <li className="pr-misi-plain__item">
                        Penyampaian informasi yang melebihi waktu yang diatur dalam Undang Undang ini.
                      </li>
                    </ol>
                  </li>
                  <li className="pr-misi-plain__item">
                    Alasan sebagaimana dimaksud pada ayat (1) huruf b sampai dengan huruf g dapat diselesaikan secara musyawarah oleh kedua belah pihak.
                  </li>
                </ol>

                <hr className="pr-card-divider" />

                {/* ── Pasal 36 ── */}
                <h3 className="pr-info-card__name pr-card-subheading">
                  UU No. 14 Tahun 2008 pasal 36
                </h3>

                <ol className="pr-misi-plain" aria-label="Pasal 36 UU No. 14 Tahun 2008">
                  <li className="pr-misi-plain__item">
                    Keberatan diajukan oleh Pemohon Informasi dalam jangka waktu paling lambat 30 (tiga puluh) hari kerja setelah ditemukannya alasan sebagaimana dimaksud dalam pasal 35 ayat (1)
                  </li>
                  <li className="pr-misi-plain__item">
                    Atasan Pejabat sebagaimana dimaksud dalam pasal 35 ayat (1) memberikan tanggapan atas keberatan yang diajukan oleh Pemohon Informasi Publik dalam jangka waktu paling lambat 30 (tiga puluh) hari kerja sejak diterimanya keberatan secara tertulis
                  </li>
                  <li className="pr-misi-plain__item">
                    Alasan tertulis disertakan bersama tanggapan apabila atasan pejabat sebagaimana dimaksud pasal 35 ayat (1) menguatkan putusan yang ditetapkan oleh bawahannya.
                  </li>
                </ol>

              </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                SECTION 2 — Mekanisme Pengajuan Keberatan
            ════════════════════════════════════════════════════════════ */}
            <section className="pr-section" aria-labelledby="heading-mekanisme">
              <h2 className="pr-section__heading" id="heading-mekanisme">
                Mekanisme Pengajuan Keberatan
              </h2>

              <div className="pr-info-card">
                <ol className="pr-misi-plain" aria-label="Mekanisme Pengajuan Keberatan">
                  <li className="pr-misi-plain__item">
                    Pemohon informasi publik berhak mengajukan keberatan kepada Atasan PPID, apabila PPID:
                    <ol className="pr-misi-plain" style={{ marginTop: '8px' }}>
                      <li className="pr-misi-plain__item">
                        menolak memberikan informasi publik yang bersifat terbuka
                      </li>
                      <li className="pr-misi-plain__item">
                        tidak menyediakan informasi secara berkala
                      </li>
                      <li className="pr-misi-plain__item">
                        tidak menanggapi permohonan informasi publik
                      </li>
                      <li className="pr-misi-plain__item">
                        tidak menanggapi permohonan sebagaimana yang diminta
                      </li>
                      <li className="pr-misi-plain__item">
                        pengenaan biaya yang tidak wajar; dan/atau
                      </li>
                      <li className="pr-misi-plain__item">
                        penyampaian informasi publik melebihi waktu yang ditentukan
                      </li>
                    </ol>
                  </li>
                  <li className="pr-misi-plain__item">
                    Pengajuan keberatan disampaikan secara tertulis;
                  </li>
                  <li className="pr-misi-plain__item">
                    Petugas PPID mencatat pengajuan keberatan dalam buku register keberatan;
                  </li>
                  <li className="pr-misi-plain__item">
                    Petugas PPID memberikan salinan formulir keberatan kepada pemohon informasi publik sebagai tanda terima pengajuan keberatan
                  </li>
                  <li className="pr-misi-plain__item">
                    PPID memberikan tanggapan atas keberatan paling lambat 30 (tiga puluh) hari kerja sejak tanggal diterimanya keberatan
                  </li>
                  <li className="pr-misi-plain__item">
                    Pemohon informasi publik yang tidak menerima keputusan Atasan PPID berhak mengajukan permohonan penyelesaian sengketa informasi publik kepada Komisi Informasi paling lambat 14 (empat belas) hari kerja sejak diterimanya keputusan
                  </li>
                  <li className="pr-misi-plain__item">
                    Informasi lebih lanjut bisa menghubungi kantor Bakorwil I Madiun Jl. Pahlawan Nomor 31 Madiun, e-mail bakorwilmadiun@jatimprov.go.id
                  </li>
                </ol>
              </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                SECTION 3 — Tautan Pengajuan
            ════════════════════════════════════════════════════════════ */}
            <section className="pr-section" aria-labelledby="heading-tautan">
              <div className="pr-info-card">
                <p className="pr-section__text">
                  Pengajuan keberatan dapat dilakukan secara daring maupun luring dengan mengisi tautan berikut ini
                </p>

                <ul className="pr-contact-list" style={{ marginTop: '12px' }}>
                  <li className="pr-contact-list__item">
                    {/* // TODO: isi URL Pengajuan Keberatan Online setelah tersedia */}
                    <a
                      href="#"
                      className="pr-layanan-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Pengajuan Keberatan Online (URL belum tersedia)"
                    >
                      Pengajuan Keberatan Online
                    </a>
                  </li>
                  <li className="pr-contact-list__item">
                    Form Keberatan :{' '}
                    <a
                      href="/documents/Form_Keberatan_Madiun.pdf"
                      className="pr-layanan-link"
                      download="Form_Keberatan_Madiun.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Download Form Keberatan"
                    >
                      Download Form
                    </a>
                  </li>
                </ul>
              </div>
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
