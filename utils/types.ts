export type Profile = {
  nm_pd: string | null;
  jk: string | null;
  nipd: string | null;
  namapt: string | null;
  namajenjang: string | null;
  namaprodi: string | null;
  reg_pd: string | null;
  mulai_smt: string | null;
  nm_jns_daftar: string | null;
  nm_pt_asal: string | null;
  nm_prodi_asal: string | null;
  ket_keluar: string | null;
  tgl_keluar: string | null;
  no_seri_ijazah: string | null;
  sert_prof: string | null;
  link_pt: string | null;
  link_prodi: string | null;
};

export type Study = {
  kode_mk: string | null;
  nm_mk: string | null;
  sks_mk: number | null;
  id_smt: string | null;
  nilai_huruf: string | null;
};

export type College = {
  id_smt: string | null;
  sks_smt: number | null;
  nm_stat_mhs: string | null;
};
