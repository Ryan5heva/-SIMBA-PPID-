import { Link } from 'react-router-dom';
import './Home.css';

/**
 * Home — Landing page PPID Bakorwil I Madiun
 *
 * Berisi:
 *  1. Hero section dengan branding PPID
 *  2. Quick-link cards ke 4 menu utama
 */

const QUICK_LINKS = [
  {
    to: '/profil',
    icon: '🏛️',
    iconClass: 'ppid-ql-card__icon--teal',
    title: 'Profil PPID',
    desc: 'Seputar PPID, visi & misi, kelembagaan, dan maklumat pelayanan informasi.',
  },
  {
    to: '/layanan-informasi',
    icon: '📋',
    iconClass: 'ppid-ql-card__icon--blue',
    title: 'Layanan Informasi',
    desc: 'Tata cara permohonan informasi publik dan alur layanan PPID.',
  },
  {
    to: '/dokumen/sk-ppid',
    icon: '📁',
    iconClass: 'ppid-ql-card__icon--indigo',
    title: 'Dokumen PPID',
    desc: 'SK PPID, Daftar Informasi Publik (DIP), dan Laporan Layanan Informasi Daerah (LLID).',
  },
  {
    to: '/klasifikasi/berkala',
    icon: '📊',
    iconClass: 'ppid-ql-card__icon--green',
    title: 'Klasifikasi Informasi',
    desc: 'Informasi berkala, serta merta, setiap saat, dikecualikan, dan laporan akses.',
  },
];


export default function Home() {
  return (
    <main aria-label="Beranda PPID Bakorwil I Madiun">

      {/* ══ HERO ══ */}
      <section className="ppid-hero" aria-labelledby="ppid-hero-title">
        <div className="ppid-hero__inner">
          <div className="ppid-hero__badge">
            <span aria-hidden="true">🏛️</span>
            Pejabat Pengelola Informasi dan Dokumentasi
          </div>

          <h1 id="ppid-hero-title" className="ppid-hero__title">
            PPID <span>Bakorwil I</span> Madiun
          </h1>

          <p className="ppid-hero__subtitle">
            Melayani hak publik atas informasi secara transparan, akuntabel,
            dan mudah diakses — sesuai amanat UU No. 14 Tahun 2008
            tentang Keterbukaan Informasi Publik.
          </p>

          <div className="ppid-hero__cta-group">
            <Link to="/layanan-informasi" className="ppid-hero__btn ppid-hero__btn--primary">
              <span aria-hidden="true">📋</span>
              Ajukan Permohonan Informasi
            </Link>
            <Link to="/profil" className="ppid-hero__btn ppid-hero__btn--secondary">
              Tentang PPID →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ QUICK LINKS ══ */}
      <section className="ppid-quicklinks" aria-labelledby="ppid-ql-title">
        <div className="ppid-quicklinks__inner">
          <div className="ppid-section-header">
            <p className="ppid-section-header__overline">Navigasi Cepat</p>
            <h2 id="ppid-ql-title" className="ppid-section-header__title">
              Layanan & Informasi PPID
            </h2>
            <p className="ppid-section-header__desc">
              Akses seluruh layanan keterbukaan informasi publik Bakorwil I Madiun
              dengan mudah dan cepat melalui menu berikut.
            </p>
          </div>

          <div className="ppid-quicklinks__grid">
            {QUICK_LINKS.map((item) => (
              <Link key={item.to} to={item.to} className="ppid-ql-card">
                <div className={`ppid-ql-card__icon ${item.iconClass}`} aria-hidden="true">
                  {item.icon}
                </div>
                <div>
                  <h3 className="ppid-ql-card__title">{item.title}</h3>
                  <p className="ppid-ql-card__desc">{item.desc}</p>
                  <span className="ppid-ql-card__arrow">Selengkapnya →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
