// Business Sector and Subsector Data Structure
import { BusinessSector, CustomerSegment } from '@/types/dashboard';

export const BUSINESS_SECTORS: BusinessSector[] = [
  {
    id: 'PERTANIAN',
    name: 'Pertanian, Kehutanan & Perikanan',
    subsectors: [
      { id: 'TANAMAN_PANGAN', name: 'Tanaman pangan', sectorId: 'PERTANIAN' },
      { id: 'HORTIKULTURA', name: 'Hortikultura', sectorId: 'PERTANIAN' },
      { id: 'PERKEBUNAN', name: 'Perkebunan', sectorId: 'PERTANIAN' },
      { id: 'PETERNAKAN', name: 'Peternakan', sectorId: 'PERTANIAN' },
      { id: 'PERIKANAN', name: 'Perikanan', sectorId: 'PERTANIAN' },
      { id: 'AKUAKULTUR', name: 'Akuakultur', sectorId: 'PERTANIAN' },
      { id: 'KEHUTANAN', name: 'Kehutanan', sectorId: 'PERTANIAN' }
    ]
  },
  {
    id: 'PERTAMBANGAN',
    name: 'Pertambangan dan Penggalian',
    subsectors: [
      { id: 'BATU_BARA', name: 'Batu bara', sectorId: 'PERTAMBANGAN' },
      { id: 'MINYAK_GAS', name: 'Minyak & gas', sectorId: 'PERTAMBANGAN' },
      { id: 'BIJIH_LOGAM', name: 'Bijih logam (emas, tembaga, nikel)', sectorId: 'PERTAMBANGAN' },
      { id: 'BATU_KAPUR', name: 'Batu kapur', sectorId: 'PERTAMBANGAN' },
      { id: 'PASIR', name: 'pasir', sectorId: 'PERTAMBANGAN' },
      { id: 'GARAM', name: 'garam', sectorId: 'PERTAMBANGAN' },
      { id: 'MINERAL_NON_LOGAM', name: 'mineral non-logam', sectorId: 'PERTAMBANGAN' }
    ]
  },
  {
    id: 'INDUSTRI_PENGOLAHAN',
    name: 'Industri Pengolahan',
    subsectors: [
      { id: 'MAKANAN_MINUMAN', name: 'Industri makanan & minuman', sectorId: 'INDUSTRI_PENGOLAHAN' },
      { id: 'TEKSTIL', name: 'Tekstil', sectorId: 'INDUSTRI_PENGOLAHAN' },
      { id: 'KAYU_FURNITUR', name: 'Kayu & furnitur', sectorId: 'INDUSTRI_PENGOLAHAN' },
      { id: 'KERTAS', name: 'Kertas', sectorId: 'INDUSTRI_PENGOLAHAN' },
      { id: 'PUPUK_KIMIA', name: 'Pupuk & kimia', sectorId: 'INDUSTRI_PENGOLAHAN' },
      { id: 'KARET_PLASTIK', name: 'Karet & plastik', sectorId: 'INDUSTRI_PENGOLAHAN' },
      { id: 'SEMEN', name: 'Semen', sectorId: 'INDUSTRI_PENGOLAHAN' },
      { id: 'LOGAM_DASAR', name: 'Logam dasar', sectorId: 'INDUSTRI_PENGOLAHAN' },
      { id: 'MESIN', name: 'Mesin', sectorId: 'INDUSTRI_PENGOLAHAN' },
      { id: 'ALAT_TRANSPORTASI', name: 'Alat transportasi', sectorId: 'INDUSTRI_PENGOLAHAN' },
      { id: 'ELEKTRONIK', name: 'Elektronik', sectorId: 'INDUSTRI_PENGOLAHAN' }
    ]
  },
  {
    id: 'LISTRIK_GAS',
    name: 'Pengadaan Listrik Dan Gas',
    subsectors: [
      { id: 'PEMBANGKIT_LISTRIK', name: 'Pembangkit listrik', sectorId: 'LISTRIK_GAS' },
      { id: 'DISTRIBUSI_LISTRIK', name: 'Distribusi listrik', sectorId: 'LISTRIK_GAS' },
      { id: 'GAS_ALAM', name: 'Gas alam', sectorId: 'LISTRIK_GAS' },
      { id: 'JARINGAN_GAS', name: 'Jaringan distribusi gas', sectorId: 'LISTRIK_GAS' }
    ]
  },
  {
    id: 'AIR_LIMBAH',
    name: 'Pengadaan Air, Pengelolaan Sampah, Limbah Dan Daur Ulang',
    subsectors: [
      { id: 'DISTRIBUSI_AIR', name: 'Distribusi air bersih', sectorId: 'AIR_LIMBAH' },
      { id: 'LIMBAH_CAIR', name: 'Pengolahan limbah cair', sectorId: 'AIR_LIMBAH' },
      { id: 'PENGELOLAAN_SAMPAH', name: 'Pengelolaan sampah', sectorId: 'AIR_LIMBAH' },
      { id: 'DAUR_ULANG', name: 'Daur ulang', sectorId: 'AIR_LIMBAH' }
    ]
  },
  {
    id: 'KONSTRUKSI',
    name: 'Konstruksi',
    subsectors: [
      { id: 'GEDUNG', name: 'Gedung', sectorId: 'KONSTRUKSI' },
      { id: 'SIPIL', name: 'Sipil (jalan, jembatan, bandara)', sectorId: 'KONSTRUKSI' },
      { id: 'ENERGI', name: 'Energi (pembangkit, pipa)', sectorId: 'KONSTRUKSI' },
      { id: 'JASA_KHUSUS', name: 'Jasa khusus (plumbing, finishing)', sectorId: 'KONSTRUKSI' }
    ]
  },
  {
    id: 'PERDAGANGAN',
    name: 'Perdagangan Besar Dan Eceran, Reparasi Mobil Dan Motor',
    subsectors: [
      { id: 'PERDAGANGAN_BESAR', name: 'Perdagangan besar', sectorId: 'PERDAGANGAN' },
      { id: 'PERDAGANGAN_ECERAN', name: 'Perdagangan eceran', sectorId: 'PERDAGANGAN' },
      { id: 'E_COMMERCE', name: 'E-commerce', sectorId: 'PERDAGANGAN' },
      { id: 'REPARASI_KENDARAAN', name: 'Reparasi kendaraan', sectorId: 'PERDAGANGAN' }
    ]
  },
  {
    id: 'TRANSPORTASI',
    name: 'Transportasi Dan Pergudangan',
    subsectors: [
      { id: 'TRANSPORTASI_DARAT', name: 'Transportasi darat', sectorId: 'TRANSPORTASI' },
      { id: 'TRANSPORTASI_LAUT', name: 'Transportasi laut', sectorId: 'TRANSPORTASI' },
      { id: 'TRANSPORTASI_UDARA', name: 'Transportasi udara', sectorId: 'TRANSPORTASI' },
      { id: 'PERGUDANGAN', name: 'Pergudangan', sectorId: 'TRANSPORTASI' },
      { id: 'KURIR_EKSPEDISI', name: 'Jasa kurir & ekspedisi', sectorId: 'TRANSPORTASI' }
    ]
  },
  {
    id: 'AKOMODASI',
    name: 'Penyediaan Akomodasi Dan Makan Minum',
    subsectors: [
      { id: 'HOTEL_RESORT', name: 'Hotel & resort', sectorId: 'AKOMODASI' },
      { id: 'RESTORAN', name: 'Restoran', sectorId: 'AKOMODASI' },
      { id: 'KAFE', name: 'Kafe', sectorId: 'AKOMODASI' },
      { id: 'CATERING', name: 'Catering', sectorId: 'AKOMODASI' },
      { id: 'BAR', name: 'Bar', sectorId: 'AKOMODASI' }
    ]
  },
  {
    id: 'INFORMASI',
    name: 'Informasi Dan Komunikasi',
    subsectors: [
      { id: 'TELEKOMUNIKASI', name: 'Telekomunikasi', sectorId: 'INFORMASI' },
      { id: 'PENYIARAN', name: 'Penyiaran', sectorId: 'INFORMASI' },
      { id: 'PRODUKSI_FILM', name: 'Produksi film', sectorId: 'INFORMASI' },
      { id: 'IT_SERVICES', name: 'IT services', sectorId: 'INFORMASI' },
      { id: 'MEDIA_ONLINE', name: 'Media online', sectorId: 'INFORMASI' }
    ]
  },
  {
    id: 'KEUANGAN',
    name: 'Jasa Keuangan Dan Asuransi',
    subsectors: [
      { id: 'PERBANKAN', name: 'Perbankan', sectorId: 'KEUANGAN' },
      { id: 'PASAR_MODAL', name: 'Pasar modal', sectorId: 'KEUANGAN' },
      { id: 'ASURANSI', name: 'Asuransi', sectorId: 'KEUANGAN' },
      { id: 'FINTECH', name: 'Fintech', sectorId: 'KEUANGAN' },
      { id: 'PEGADAIAN', name: 'Pegadaian', sectorId: 'KEUANGAN' }
    ]
  },
  {
    id: 'REAL_ESTATE',
    name: 'Real Estate',
    subsectors: [
      { id: 'PENGEMBANGAN_PROPERTI', name: 'Pengembangan properti', sectorId: 'REAL_ESTATE' },
      { id: 'REAL_ESTATE_KOMERSIAL', name: 'Real estate komersial', sectorId: 'REAL_ESTATE' },
      { id: 'AGEN_PROPERTI', name: 'Agen properti', sectorId: 'REAL_ESTATE' },
      { id: 'SEWA_PENGELOLAAN', name: 'Sewa & pengelolaan gedung', sectorId: 'REAL_ESTATE' }
    ]
  },
  {
    id: 'JASA_PERUSAHAAN',
    name: 'Jasa Perusahaan',
    subsectors: [
      { id: 'KONSULTANSI', name: 'Konsultansi', sectorId: 'JASA_PERUSAHAAN' },
      { id: 'HUKUM_AKUNTANSI', name: 'Hukum & akuntansi', sectorId: 'JASA_PERUSAHAAN' },
      { id: 'R_AND_D', name: 'R&D', sectorId: 'JASA_PERUSAHAAN' },
      { id: 'OUTSOURCING', name: 'Outsourcing', sectorId: 'JASA_PERUSAHAAN' },
      { id: 'KEAMANAN_KEBERSIHAN', name: 'Keamanan & kebersihan', sectorId: 'JASA_PERUSAHAAN' }
    ]
  },
  {
    id: 'PENDIDIKAN',
    name: 'Jasa Pendidikan',
    subsectors: [
      { id: 'PENDIDIKAN_FORMAL', name: 'Pendidikan formal', sectorId: 'PENDIDIKAN' },
      { id: 'PENDIDIKAN_TINGGI', name: 'Pendidikan tinggi', sectorId: 'PENDIDIKAN' },
      { id: 'KURSUS_PELATIHAN', name: 'Kursus & pelatihan', sectorId: 'PENDIDIKAN' },
      { id: 'BIMBEL', name: 'Bimbel', sectorId: 'PENDIDIKAN' },
      { id: 'PENDIDIKAN_NONFORMAL', name: 'Pendidikan nonformal', sectorId: 'PENDIDIKAN' }
    ]
  },
  {
    id: 'KESEHATAN',
    name: 'Jasa Kesehatan Dan Kegiatan Sosial',
    subsectors: [
      { id: 'RUMAH_SAKIT', name: 'Rumah sakit', sectorId: 'KESEHATAN' },
      { id: 'KLINIK', name: 'Klinik', sectorId: 'KESEHATAN' },
      { id: 'LAB_KESEHATAN', name: 'Lab kesehatan', sectorId: 'KESEHATAN' },
      { id: 'APOTEK', name: 'Apotek', sectorId: 'KESEHATAN' },
      { id: 'KESEHATAN_TRADISIONAL', name: 'Kesehatan tradisional', sectorId: 'KESEHATAN' },
      { id: 'PANTI_ASUHAN', name: 'Panti asuhan/jompo', sectorId: 'KESEHATAN' }
    ]
  },
  {
    id: 'JASA_LAINNYA',
    name: 'Jasa Lainnya',
    subsectors: [
      { id: 'SENI', name: 'Seni', sectorId: 'JASA_LAINNYA' },
      { id: 'HIBURAN', name: 'Hiburan', sectorId: 'JASA_LAINNYA' },
      { id: 'OLAHRAGA', name: 'Olahraga', sectorId: 'JASA_LAINNYA' },
      { id: 'PERAWATAN_PRIBADI', name: 'Perawatan pribadi', sectorId: 'JASA_LAINNYA' },
      { id: 'ORGANISASI_SOSIAL', name: 'Organisasi sosial & keagamaan', sectorId: 'JASA_LAINNYA' }
    ]
  },
  {
    id: 'PEMERINTAHAN',
    name: 'Administrasi Pemerintahan, Pertahanan Dan Jaminan Sosial Wajib',
    subsectors: [
      { id: 'LEMBAGA_PEMERINTAHAN', name: 'Lembaga pemerintahan', sectorId: 'PEMERINTAHAN' },
      { id: 'PERTAHANAN', name: 'Pertahanan', sectorId: 'PEMERINTAHAN' },
      { id: 'KEPOLISIAN', name: 'Kepolisian', sectorId: 'PEMERINTAHAN' },
      { id: 'LAYANAN_PUBLIK', name: 'Layanan publik', sectorId: 'PEMERINTAHAN' },
      { id: 'BPJS_JAMINAN_SOSIAL', name: 'BPJS & jaminan sosial', sectorId: 'PEMERINTAHAN' }
    ]
  }
];

export const CUSTOMER_SEGMENTS: CustomerSegment[] = [
  { id: 'PEKERJA', name: 'Pekerja', description: 'Karyawan swasta dan BUMN' },
  { id: 'TRAVELER', name: 'Traveler', description: 'Pelaku perjalanan bisnis dan wisata' },
  { id: 'GAMER', name: 'Gamer', description: 'Pengguna aktif gaming dan digital entertainment' },
  { id: 'INVESTOR', name: 'Investor', description: 'Pengguna produk investasi dan wealth management' },
  { id: 'SHOPPER', name: 'Shopper', description: 'Pengguna aktif e-commerce dan retail' },
  { id: 'ENTREPRENEUR', name: 'Entrepreneur', description: 'Pemilik usaha dan UMKM' },
  { id: 'STUDENT', name: 'Student', description: 'Pelajar dan mahasiswa' },
  { id: 'PROFESSIONAL', name: 'Professional', description: 'Tenaga ahli dan konsultan' },
  { id: 'PENSIONER', name: 'Pensioner', description: 'Pensiunan PNS dan swasta' },
  { id: 'HOMEMAKER', name: 'Homemaker', description: 'Ibu rumah tangga dan keluarga' }
];

// Helper functions
export const getSectorById = (id: string): BusinessSector | undefined => {
  return BUSINESS_SECTORS.find(sector => sector.id === id);
};

export const getSubsectorsBySectorId = (sectorId: string) => {
  const sector = getSectorById(sectorId);
  return sector ? sector.subsectors : [];
};

export const getAllSubsectors = () => {
  return BUSINESS_SECTORS.reduce((acc, sector) => acc.concat(sector.subsectors), [] as typeof BUSINESS_SECTORS[0]['subsectors']);
};

export const getCustomerSegmentById = (id: string): CustomerSegment | undefined => {
  return CUSTOMER_SEGMENTS.find(segment => segment.id === id);
};