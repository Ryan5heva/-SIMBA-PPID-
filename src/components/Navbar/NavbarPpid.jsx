import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logoBarkorwil from '../../assets/logo-bakorwil-madiun.png';
import './NavbarPpid.css';

const MAIN_SITE_URL = import.meta.env.VITE_MAIN_SITE_URL ?? 'http://localhost:5173';

/**
 * Struktur menu PPID — 4 item top-level.
 * "Profil PPID" dan "Dokumen PPID" dan "Klasifikasi Informasi" punya dropdown.
 * "Layanan Informasi" adalah link langsung.
 */
const NAV_ITEMS = [
  {
    id: 'profil-ppid',
    label: 'Profil PPID',
    children: [
      { label: 'Seputar PPID',            href: '/profil' },
      { label: 'Visi dan Misi PPID',      href: '/profil' },
      { label: 'Kelembagaan PPID',        href: '/profil/kelembagaan' },
      { label: 'Struktur Organisasi PPID', href: '/profil' },
      { label: 'Maklumat Pelayanan',      href: '/profil/maklumat-pelayanan' },
    ],
  },
  {
    id: 'layanan-informasi',
    label: 'Layanan Informasi',
    children: [
      { label: 'Permohonan Informasi Publik',           href: '/layanan-informasi' },
      { label: 'Pengajuan Keberatan',                   href: '/pengajuan-keberatan' },
      { label: 'Mekanisme/Proses',                      href: '/mekanisme-proses' },
      { label: 'Pengaduan Penyalahgunaan Wewenang',     href: '/wewenang-ppid' },
    ],
  },
  {
    id: 'dokumen-ppid',
    label: 'Dokumen PPID',
    children: [
      { label: 'SK PPID', href: '/dokumen/sk-ppid' },
      { label: 'DIP',     href: '/dokumen/dip' },
      { label: 'LLID',    href: '/dokumen/llid' },
    ],
  },
  {
    id: 'klasifikasi-informasi',
    label: 'Klasifikasi Informasi',
    children: [
      { label: 'Informasi Berkala',        href: '/klasifikasi/berkala' },
      { label: 'Informasi Serta Merta',    href: '/klasifikasi/serta-merta' },
      { label: 'Informasi Setiap Saat',    href: '/klasifikasi/setiap-saat' },
      { label: 'Informasi Dikecualikan',   href: '/klasifikasi/dikecualikan' },
      { label: 'Laporan Akses Informasi',  href: '/klasifikasi/laporan-akses' },
    ],
  },
];

/* ── Icon: arrow-left (untuk tombol Kembali) ── */
function ArrowLeftIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M9 6.5H2M4 3.5 1 6.5l3 3" stroke="currentColor" strokeWidth="1.7"
        strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ── DropdownItem — satu item dalam dropdown-menu ── */
function DropdownItem({ child, onCloseMenu }) {
  return (
    <li role="none">
      <NavLink
        className="ppid-dropdown-link"
        to={child.href}
        role="menuitem"
        onClick={onCloseMenu}
      >
        {child.label}
      </NavLink>
    </li>
  );
}

/* ── NavItem — satu item di nav-menu top-level ── */
function NavItem({ item, isMobile, mobileOpen, onMobileToggle, onCloseMenu }) {
  const hasChildren = item.children && item.children.length > 0;
  const isOpen = mobileOpen === item.id;

  if (!hasChildren) {
    return (
      <li className="ppid-nav-item" role="none">
        <NavLink
          className="ppid-nav-link"
          to={item.href}
          role="menuitem"
          onClick={onCloseMenu}
        >
          {item.label}
        </NavLink>
      </li>
    );
  }

  return (
    <li
      className={`ppid-nav-item has-dropdown${isOpen ? ' mobile-open' : ''}`}
      role="none"
    >
      <button
        className="ppid-nav-link"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`Menu ${item.label}`}
        onClick={() => isMobile && onMobileToggle(item.id)}
        type="button"
      >
        {item.label}
        <span className="ppid-dropdown-caret" aria-hidden="true">▾</span>
      </button>
      <ul
        className="ppid-dropdown-menu"
        role="menu"
        aria-label={`Submenu ${item.label}`}
      >
        {item.children.map((child) => (
          <DropdownItem
            key={child.href}
            child={child}
            onCloseMenu={onCloseMenu}
          />
        ))}
      </ul>
    </li>
  );
}

/* ══════════════════════════════════════════════════
   NAVBAR PPID — komponen utama
══════════════════════════════════════════════════ */
export default function NavbarPpid() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef(null);
  const { pathname } = useLocation();

  /* Tutup semua menu saat route berubah */
  useEffect(() => {
    setMenuOpen(false);
    setMobileOpen(null);
  }, [pathname]);

  /* Deteksi mobile */
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const handle = (e) => setIsMobile(e.matches);
    handle(mq);
    mq.addEventListener('change', handle);
    return () => mq.removeEventListener('change', handle);
  }, []);

  /* Tutup menu saat klik di luar */
  useEffect(() => {
    if (!menuOpen) return;
    const handleOut = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
        setMobileOpen(null);
      }
    };
    document.addEventListener('mousedown', handleOut);
    return () => document.removeEventListener('mousedown', handleOut);
  }, [menuOpen]);

  const handleMobileToggle = useCallback(
    (id) => setMobileOpen((prev) => (prev === id ? null : id)),
    []
  );

  const handleCloseMenu = useCallback(() => {
    setMenuOpen(false);
    setMobileOpen(null);
  }, []);

  return (
    <>
      {/* ── Non-sticky: Topbar ── */}
      <header className="ppid-site-header">
        <div className="ppid-topbar">

          {/* Brand: logo saja */}
          <Link to="/" className="ppid-topbar__brand" aria-label="Beranda PPID Bakorwil I Madiun">
            <img
              src={logoBarkorwil}
              alt="Logo Bakorwil I Madiun"
              className="ppid-topbar__logo"
            />
          </Link>

          {/* Tombol kembali ke situs utama */}
          <a
            href={MAIN_SITE_URL}
            className="ppid-topbar__back"
            aria-label="Kembali ke situs utama Bakorwil I Madiun"
          >
            <ArrowLeftIcon />
            <span className="ppid-topbar__back-label">Situs Utama</span>
          </a>

        </div>
      </header>

      {/* ── Sticky: Nav Bar ── */}
      <nav className="ppid-navbar" ref={navRef} aria-label="Navigasi PPID" role="navigation">
        {/* Hamburger */}
        <button
          className={`ppid-hamburger${menuOpen ? ' active' : ''}`}
          aria-expanded={menuOpen}
          aria-controls="ppid-nav-menu"
          aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
          onClick={() => { setMenuOpen((v) => !v); setMobileOpen(null); }}
          type="button"
        >
          <span className="ppid-hamburger-bar" />
          <span className="ppid-hamburger-bar" />
          <span className="ppid-hamburger-bar" />
        </button>

        <ul
          id="ppid-nav-menu"
          className={`ppid-nav-menu${menuOpen ? ' open' : ''}`}
          role="menubar"
          aria-label="Menu PPID"
        >
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isMobile={isMobile}
              mobileOpen={mobileOpen}
              onMobileToggle={handleMobileToggle}
              onCloseMenu={handleCloseMenu}
            />
          ))}
        </ul>
      </nav>
    </>
  );
}
