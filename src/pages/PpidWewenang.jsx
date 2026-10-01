import { useState, useEffect } from 'react';
import { fetchJson } from '../lib/api';
import { Sidebar } from '../components/BeritaTerbaru/BeritaTerbaruSection';
import '../components/BeritaTerbaru/BeritaTerbaruSection.css';
import './Profil.css';
import './PpidWewenang.css';

/* Data stepper alur pengaduan */
const ALUR_STEPS = [
  'PENGADUAN DITERIMA',
  'REGISTRASI',
  'VERIFIKASI',
  'PENELAAHAN/KLARIFIKASI',
  'TINDAK LANJUT',
  'PENYAMPAIAN HASIL',
];

export default function PpidWewenang() {
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
    <main className="pr-page" aria-label="Tata Cara Pengaduan Penyalahgunaan Wewenang PPID Bakorwil I Madiun">
      <div className="pr-page__inner">
        <div className="pr-layout">

          {/* ── Kolom kiri: konten ── */}
          <div className="pr-content">

            {/* ── Page header ── */}
            <header className="pr-header">
              <h1 className="pr-header__title">
                Tata Cara Pengaduan Penyalahgunaan Wewenang atau Pelanggaran oleh Pihak yang Mendapatkan Izin atau Perjanjian Kerja dari Bakorwil I Madiun
              </h1>
              <div className="pr-header__bar" aria-hidden="true" />

              {/* Meta: badge kategori */}
              <div className="faq-meta" role="contentinfo" aria-label="Informasi dokumen" style={{ marginTop: '16px' }}>
                <span className="faq-meta__badge" aria-label="Kategori: PPID">PPID</span>
              </div>
            </header>

            {/* ═══════════════════════════════════════════════════════════
                SECTION A — Ketentuan Umum
            ════════════════════════════════════════════════════════════ */}
            <section className="pr-section" aria-labelledby="heading-a">
              <h2 className="pr-section__heading" id="heading-a">
                A. Ketentuan Umum
              </h2>

              <div className="pr-info-card">
                <p className="pr-section__text">
                  Dalam rangka mewujudkan penyelenggaraan pemerintahan yang transparan, akuntabel, profesional, dan berintegritas, masyarakat dapat menyampaikan pengaduan apabila mengetahui atau menemukan dugaan penyalahgunaan wewenang atau pelanggaran yang dilakukan oleh pihak yang mendapatkan izin, menggunakan fasilitas, atau memiliki perjanjian kerja dengan Badan Koordinasi Wilayah Pemerintahan dan Pembangunan I Madiun (Bakorwil I Madiun).
                </p>
                <p className="pr-section__text">
                  Pengaduan akan ditindaklanjuti sesuai dengan kewenangan Bakorwil I Madiun dan ketentuan peraturan perundang-undangan yang berlaku.
                </p>
              </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                SECTION B — Ruang Lingkup Pengaduan
            ════════════════════════════════════════════════════════════ */}
            <section className="pr-section" aria-labelledby="heading-b">
              <h2 className="pr-section__heading" id="heading-b">
                B. Ruang Lingkup Pengaduan
              </h2>

              <div className="pr-info-card">
                <p className="pr-section__text">
                  Pengaduan dapat disampaikan terhadap dugaan:
                </p>

                <ol className="pr-misi-plain" aria-label="Ruang Lingkup Pengaduan">
                  <li className="pr-misi-plain__item">
                    Penyalahgunaan izin atau fasilitas yang diberikan oleh Bakorwil I Madiun;
                  </li>
                  <li className="pr-misi-plain__item">
                    Pelaksanaan pekerjaan yang tidak sesuai dengan perjanjian atau ketentuan yang telah disepakati;
                  </li>
                  <li className="pr-misi-plain__item">
                    Penyalahgunaan kewenangan dalam pelaksanaan pekerjaan atau kegiatan;
                  </li>
                  <li className="pr-misi-plain__item">
                    Pelanggaran terhadap ketentuan administrasi, prosedur, atau kewajiban yang tercantum dalam izin/perjanjian;
                  </li>
                  <li className="pr-misi-plain__item">
                    Tindakan yang berpotensi menimbulkan kerugian terhadap barang milik daerah, keuangan daerah, atau kepentingan masyarakat;
                  </li>
                  <li className="pr-misi-plain__item">
                    Perbuatan yang mengarah pada benturan kepentingan, gratifikasi, pungutan yang tidak sesuai ketentuan, atau bentuk pelanggaran lainnya; dan
                  </li>
                  <li className="pr-misi-plain__item">
                    Dugaan pelanggaran lain yang berkaitan dengan pelaksanaan izin atau perjanjian kerja dengan Bakorwil I Madiun.
                  </li>
                </ol>
              </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                SECTION C — Persyaratan Pengaduan
            ════════════════════════════════════════════════════════════ */}
            <section className="pr-section" aria-labelledby="heading-c">
              <h2 className="pr-section__heading" id="heading-c">
                C. Persyaratan Pengaduan
              </h2>

              <div className="pr-info-card">
                <p className="pr-section__text">
                  Pengaduan sekurang-kurangnya memuat:
                </p>

                {/* Sub-judul 1: Identitas Pelapor */}
                <h3 className="pr-info-card__name pr-card-subheading">
                  1. Identitas Pelapor
                </h3>
                <ul className="pr-contact-list" aria-label="Identitas Pelapor">
                  <li className="pr-contact-list__item">Nama lengkap;</li>
                  <li className="pr-contact-list__item">Alamat atau domisili;</li>
                  <li className="pr-contact-list__item">Nomor telepon/e-mail yang dapat dihubungi, apabila diperlukan.</li>
                </ul>

                <hr className="pr-card-divider" />

                {/* Sub-judul 2: Informasi Pengaduan */}
                <h3 className="pr-info-card__name pr-card-subheading">
                  2. Informasi Pengaduan
                </h3>
                <ul className="pr-contact-list" aria-label="Informasi Pengaduan">
                  <li className="pr-contact-list__item">Identitas pihak yang dilaporkan, apabila diketahui;</li>
                  <li className="pr-contact-list__item">Uraian secara jelas mengenai dugaan penyalahgunaan wewenang atau pelanggaran;</li>
                  <li className="pr-contact-list__item">Waktu dan tempat kejadian;</li>
                  <li className="pr-contact-list__item">Bentuk izin, kerja sama, atau perjanjian yang berkaitan dengan pengaduan, apabila diketahui; dan</li>
                  <li className="pr-contact-list__item">Bukti atau dokumen pendukung, apabila tersedia.</li>
                </ul>
              </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                SECTION D — Tata Cara Penyampaian Pengaduan
            ════════════════════════════════════════════════════════════ */}
            <section className="pr-section" aria-labelledby="heading-d">
              <h2 className="pr-section__heading" id="heading-d">
                D. Tata Cara Penyampaian Pengaduan
              </h2>

              <div className="pr-info-card">
                <p className="pr-section__text">
                  Pengaduan dapat disampaikan melalui saluran resmi yang disediakan oleh Bakorwil I Madiun, antara lain:
                </p>

                {/* Secara Langsung */}
                <h3 className="pr-info-card__name pr-card-subheading">
                  Secara Langsung
                </h3>
                <p className="pr-section__text">
                  Pelapor dapat datang ke kantor Bakorwil I Madiun dan menyampaikan pengaduan kepada petugas/unit yang menangani pengaduan.
                </p>

                <hr className="pr-card-divider" />

                {/* Secara Tertulis */}
                <h3 className="pr-info-card__name pr-card-subheading">
                  Secara Tertulis
                </h3>
                <p className="pr-section__text">
                  Pengaduan dapat disampaikan melalui surat resmi yang ditujukan kepada:
                </p>
                <address className="pr-address-block">
                  Kepala Bakorwil I Madiun<br />
                  Badan Koordinasi Wilayah Pemerintahan dan Pembangunan I Madiun<br />
                  Pemerintah Provinsi Jawa Timur.
                </address>

                <hr className="pr-card-divider" />

                {/* Secara Elektronik */}
                <h3 className="pr-info-card__name pr-card-subheading">
                  Secara Elektronik
                </h3>
                <p className="pr-section__text">
                  Pengaduan dapat disampaikan melalui kanal pengaduan atau media elektronik resmi Bakorwil I Madiun dan/atau kanal pengaduan resmi Pemerintah Provinsi Jawa Timur yang tersedia.
                </p>
              </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                SECTION E — Alur Penanganan Pengaduan
            ════════════════════════════════════════════════════════════ */}
            <section className="pr-section" aria-labelledby="heading-e">
              <h2 className="pr-section__heading" id="heading-e">
                E. Alur Penanganan Pengaduan
              </h2>

              {/* Stepper diagram */}
              <div className="pr-stepper" role="list" aria-label="Alur penanganan pengaduan">
                {ALUR_STEPS.map((step, idx) => (
                  <div className="pr-stepper__step" key={step} role="listitem">
                    <div className="pr-stepper__label">{step}</div>
                    {idx < ALUR_STEPS.length - 1 && (
                      <span className="pr-stepper__arrow" aria-hidden="true">→</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Penjelasan alur */}
              <div className="pr-info-card">
                <div className="pr-alur-block">
                  <h3 className="pr-alur-block__title">Penerimaan Pengaduan</h3>
                  <p className="pr-alur-block__text">
                    Petugas menerima pengaduan yang disampaikan masyarakat melalui saluran resmi.
                  </p>
                </div>

                <hr className="pr-card-divider" />

                <div className="pr-alur-block">
                  <h3 className="pr-alur-block__title">Registrasi Pengaduan</h3>
                  <p className="pr-alur-block__text">
                    Pengaduan dicatat dan diregistrasi sebagai bahan administrasi serta pemantauan tindak lanjut.
                  </p>
                </div>

                <hr className="pr-card-divider" />

                <div className="pr-alur-block">
                  <h3 className="pr-alur-block__title">Verifikasi</h3>
                  <p className="pr-alur-block__text">
                    Petugas melakukan pemeriksaan awal terhadap kelengkapan identitas, substansi laporan, dan bukti pendukung.
                  </p>
                </div>

                <hr className="pr-card-divider" />

                <div className="pr-alur-block">
                  <h3 className="pr-alur-block__title">Penelaahan dan Klarifikasi</h3>
                  <p className="pr-alur-block__text">
                    Pengaduan yang memenuhi persyaratan selanjutnya ditelaah dan, apabila diperlukan, dilakukan klarifikasi kepada pihak terkait.
                  </p>
                </div>

                <hr className="pr-card-divider" />

                <div className="pr-alur-block">
                  <h3 className="pr-alur-block__title">Tindak Lanjut</h3>
                  <p className="pr-alur-block__text">
                    Apabila pengaduan berada dalam kewenangan Bakorwil I Madiun, pengaduan ditindaklanjuti sesuai ketentuan. Apabila substansi pengaduan berada di luar kewenangan Bakorwil I Madiun, pengaduan dapat diteruskan atau dikoordinasikan kepada perangkat daerah/instansi yang berwenang sesuai ketentuan.
                  </p>
                </div>

                <hr className="pr-card-divider" />

                <div className="pr-alur-block">
                  <h3 className="pr-alur-block__title">Penyampaian Hasil</h3>
                  <p className="pr-alur-block__text">
                    Hasil tindak lanjut dapat disampaikan kepada pelapor melalui sarana komunikasi yang tersedia dengan tetap memperhatikan ketentuan mengenai kerahasiaan dan informasi yang dikecualikan.
                  </p>
                </div>
              </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                SECTION F — Perlindungan dan Kerahasiaan
            ════════════════════════════════════════════════════════════ */}
            <section className="pr-section" aria-labelledby="heading-f">
              <h2 className="pr-section__heading" id="heading-f">
                F. Perlindungan dan Kerahasiaan
              </h2>

              <div className="pr-info-card">
                <p className="pr-section__text">
                  Identitas pelapor dan informasi dalam pengaduan dikelola dengan memperhatikan ketentuan mengenai perlindungan data pribadi, kerahasiaan, serta peraturan perundang-undangan yang berlaku.
                </p>
                <p className="pr-section__text">
                  Pelapor diharapkan menyampaikan informasi secara benar, jelas, bertanggung jawab, dan tidak memberikan laporan atau bukti yang diketahui tidak benar.
                </p>
              </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                SECTION G — Penutup
            ════════════════════════════════════════════════════════════ */}
            <section className="pr-section" aria-labelledby="heading-g">
              <h2 className="pr-section__heading" id="heading-g">
                G. Penutup
              </h2>

              <div className="pr-info-card">
                <p className="pr-section__text">
                  Tata cara pengaduan ini merupakan bentuk komitmen Bakorwil I Madiun dalam mendukung penyelenggaraan pemerintahan yang transparan, akuntabel, serta responsif terhadap laporan masyarakat.
                </p>
                <p className="pr-section__text">
                  Setiap pengaduan yang diterima akan ditangani secara objektif dan sesuai dengan kewenangan serta ketentuan peraturan perundang-undangan yang berlaku.
                </p>
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
