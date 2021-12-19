import type { NextPage } from "next";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Layout } from "../components/Layout";
import SearchOutline from "../public/icons/search-outline.svg";

export type University = {
  id_sp: string;
  kode_pt: string;
  nama_pt: string;
};

export type StudyProgram = {
  id_sms: string;
  id_sp: string;
  kode_prodi: string;
  nama_prodi: string;
};

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="absolute left-0 right-0 flex flex-col items-center justify-center transform -translate-y-1/2 top-1/2">
        <h1 className="my-4 text-2xl text-center">Cari data mahasiswa ?</h1>
        <Link href="/search">
          <a
            className={`mx-auto bg-indigo-500 text-fuchsia-50 p-2 px-4 rounded-md flex justify-between items-center`}
          >
            Sini-sini, hihihi
            <div className="w-6 h-6 ml-2">
              <SearchOutline fill="#fff" />
            </div>
          </a>
        </Link>
        <div className="relative w-64 mx-auto h-72">
          <Image src="/undefined.svg" alt="searching" layout="fill" />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
