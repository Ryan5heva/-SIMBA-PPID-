import { Routes, Route } from 'react-router-dom';
import NavbarPpid from './components/Navbar/NavbarPpid';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import PpidBerkala from './pages/PpidBerkala';
import PpidSertaMerta from './pages/PpidSertaMerta';
import PpidSetiapSaat from './pages/PpidSetiapSaat';
import PpidDikecualikan from './pages/PpidDikecualikan';
import PpidLaporanAkses from './pages/PpidLaporanAkses';
import PpidSeputar from './pages/PpidSeputar';
import PpidKelembagaan from './pages/PpidKelembagaan';
import PpidMaklumatPelayanan from './pages/PpidMaklumatPelayanan';
import PpidLayananInformasi from './pages/PpidLayananInformasi';
import PpidPengajuanKeberatan from './pages/PpidPengajuanKeberatan';
import PpidWewenang from './pages/PpidWewenang';
import PpidMekanismeProses from './pages/PpidMekanismeProses';
import PpidSimplePage from './pages/PpidSimplePage';

import './App.css';

function App() {
  return (
    <>
      <ScrollToTop />
      <NavbarPpid />
      <Routes>
        {/* ── Beranda PPID ── */}
        <Route path="/" element={<Home />} />

        {/* ── Profil PPID ── */}
        <Route path="/profil" element={<PpidSeputar />} />
        <Route path="/profil/kelembagaan" element={<PpidKelembagaan />} />
        <Route path="/profil/maklumat-pelayanan" element={<PpidMaklumatPelayanan />} />

        {/* ── Layanan Informasi ── */}
        <Route path="/layanan-informasi" element={<PpidLayananInformasi />} />
        <Route path="/pengajuan-keberatan" element={<PpidPengajuanKeberatan />} />
        <Route path="/wewenang-ppid" element={<PpidWewenang />} />
        <Route path="/mekanisme-proses" element={<PpidMekanismeProses />} />

        {/* ── Dokumen PPID ── */}
        <Route
          path="/dokumen/sk-ppid"
          element={<PpidSimplePage title="SK PPID" endpoint="/ppid/dokumen/sk-ppid" />}
        />
        <Route
          path="/dokumen/dip"
          element={<PpidSimplePage title="DIP PPID Bakorwil I Madiun" endpoint="/ppid/dokumen/dip-bakorwil-1-madiun" />}
        />
        <Route
          path="/dokumen/llid"
          element={<PpidSimplePage title="LLID PPID Bakorwil I Madiun" endpoint="/ppid/dokumen/llid-bakorwil-1-madiun" />}
        />

        {/* ── Klasifikasi Informasi ── */}
        <Route path="/klasifikasi/berkala"       element={<PpidBerkala />} />
        <Route path="/klasifikasi/serta-merta"   element={<PpidSertaMerta />} />
        <Route path="/klasifikasi/setiap-saat"   element={<PpidSetiapSaat />} />
        <Route path="/klasifikasi/dikecualikan"  element={<PpidDikecualikan />} />
        <Route path="/klasifikasi/laporan-akses" element={<PpidLaporanAkses />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
