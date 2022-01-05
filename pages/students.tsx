/* eslint-disable react-hooks/exhaustive-deps */
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { Layout } from "../components/Layout";
import { Context } from "../context";
import SearchOutline from "../public/icons/search-outline.svg";

export type Student = {
  id: string;
  nama: string;
  nipd: string;
  pt: string;
  prodi: string;
  kode_pt: string;
  kode_prodi: string;
};

const Students: NextPage = () => {
  const { state, dispatch } = useContext(Context);
  const { studentQuery, students } = state;

  async function getStudents(payload: string): Promise<any> {
    dispatch({ type: "SET_STUDENTS_LOADING", payload: true });
    try {
      const response = await fetch(
        `/api/search_mhs`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: payload,
        }
      );

      if (response.ok) {
        const data: { mahasiswa: [] } = await response.json();
        dispatch({ type: "SET_STUDENTS_DATA", payload: data.mahasiswa });
        return;
      }
    } catch (errror) {
      dispatch({ type: "SET_STUDENTS_ERROR", payload: true });
    }
  }

  useEffect(() => {
    if (studentQuery.prodi && students.data.length <= 0) {
      const payload = JSON.stringify(studentQuery);
      getStudents(payload);
    }
  }, [studentQuery]);

  return (
    <Layout>
      <div className="absolute left-0 right-0 flex flex-col items-center justify-center transform -translate-y-1/2 top-1/2">
        {(() => {
          if (students.loading)
            return (
              <>
                <h1 className="mb-4 text-2xl">Tunngu ya, lagi dicari...</h1>
                <div className="relative w-64 mx-auto h-72">
                  <Image src="/search-docs.svg" alt="searching" layout="fill" />
                </div>
              </>
            );
          else if (students.error || students.data.length <= 0)
            return (
              <>
                <h1 className="mb-4 text-2xl text-center">
                  Yah si Server gak nemuin datanya.
                </h1>
                <div className="relative w-64 mx-auto h-72">
                  <Image src="/No.svg" alt="not" layout="fill" />
                </div>
                <p className="mt-4 text-2xl text-center">
                  Coba cari lagi aja ya :)
                </p>
                <Link href="/search">
                  <a
                    className={`mx-auto mt-2 bg-indigo-500 text-fuchsia-50 p-2 px-4 rounded-md flex justify-between items-center`}
                  >
                    Sini-sini, hihihi
                    <div className="w-6 h-6 ml-2">
                      <SearchOutline fill="#fff" />
                    </div>
                  </a>
                </Link>
              </>
            );
          else
            return (
              <>
                <div className="relative mx-auto mb-8 w-52 h-52">
                  <h1 className="absolute left-0 right-0 z-10 text-2xl text-center -bottom-4">
                    Ketemu nih, ada{" "}
                    <strong className="text-purple-600">
                      {students.data.length}
                    </strong>{" "}
                    mahasiswa.
                  </h1>
                  <Image src="/Match.svg" alt="searching" layout="fill" />
                </div>
                <div className="pb-10 overflow-scroll">
                  <ul
                    className={`grid gap-2 ${
                      students.data.length >= 6 ? "h-64" : ""
                    }`}
                  >
                    {students.data.map((item, index) => {
                      const student: Student = item;
                      return (
                        <li
                          key={index}
                          className="flex items-center justify-between p-2 transition-all rounded-md bg-slate-300 border-slate-400 hover:shadow-md"
                        >
                          <p className="w-64 overflow-hidden text-ellipsis whitespace-nowrap">
                            {student.nama}
                          </p>

                          <Link href={`/student/${student.id}`}>
                            <a className="text-purple-600 cursor-pointer">
                              Riwayat
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </>
            );
        })()}
      </div>
    </Layout>
  );
};

export default Students;
