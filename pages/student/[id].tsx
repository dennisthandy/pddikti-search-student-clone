import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { Layout } from "../../components/Layout";
import { College, Profile, Study } from "../../utils/types";

type Data = {
  datastatuskuliah: College[];
  datastudi: Study[];
  dataumum: Profile;
};

interface Props {
  data: Data;
  error: boolean;
}

const Detail: NextPage<Props> = ({ data, error }) => {
  function formatSemester(code: string) {
    const start = parseInt(code[code.length - 1]);
    return start % 2 === 0
      ? `Genap ${code.substring(0, code.length - 1)}`
      : `Ganjil ${code.substring(0, code.length - 1)}`;
  }

  function formatGender(code: string) {
    return code === "L" ? "Laki-Laki" : "Perempuan";
  }

  return (
    <Layout>
      <div className="container px-4 pt-10 pb-20 mx-auto">
        <h1 className="mb-4 text-2xl text-left">Nih riwayat studinya.</h1>
        <div className="flex items-center space-x-2">
          <div className="relative rounded-full w-14 h-14">
            <Image
              layout="fill"
              src={`https://avatars.dicebear.com/api/${
                data.dataumum.jk === "L" ? "male" : "female"
              }/student.svg?background=%236b21a8`}
              alt="avatar"
            />
          </div>
          <div>
            <p>{data.dataumum.nm_pd}</p>
            <p>
              {data.dataumum.namajenjang} <span>{data.dataumum.namaprodi}</span>
            </p>
          </div>
        </div>
        <table className="w-full mt-4">
          <caption className="p-1 tracking-widest text-left text-purple-800 uppercase bg-purple-200 rounded-sm">
            Biodata
          </caption>
          <tbody>
            <tr>
              <td className="p-2 font-bold">Jenis Kelamin</td>
              <td className="p-2">
                {formatGender(data.dataumum.jk as string)}
              </td>
            </tr>
            <tr>
              <td className="p-2 font-bold">Perguruan Tinggi</td>
              <td className="p-2">{data.dataumum.namapt}</td>
            </tr>
            <tr>
              <td className="p-2 font-bold">NIM</td>
              <td className="p-2">{data.dataumum.nipd}</td>
            </tr>
            <tr>
              <td className="p-2 font-bold">Semester Awal</td>
              <td className="p-2">
                {formatSemester(data.dataumum.mulai_smt as string)}
              </td>
            </tr>
            <tr>
              <td className="p-2 font-bold">Status Awal</td>
              <td className="p-2">{data.dataumum.nm_jns_daftar}</td>
            </tr>
            <tr>
              <td className="p-2 font-bold">Status Saat Ini</td>
              <td className="p-2">
                {data.dataumum.ket_keluar || "Belum Lulus"}
              </td>
            </tr>
            {data.dataumum.no_seri_ijazah !== " " && data.dataumum.no_seri_ijazah && (
              <tr>
                <td className="p-2 font-bold">Nomor Seri Ijazah</td>
                <td className="p-2">{data.dataumum.no_seri_ijazah}</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="overflow-x-scroll">
          <table className="w-full mt-4 whitespace-nowrap">
            <caption className="p-1 tracking-widest text-left text-purple-800 uppercase bg-purple-200 rounded-sm">
              Riwayat Status Kuliah
            </caption>
            <thead>
              <tr className="text-left">
                <th className="p-2">No</th>
                <th className="p-2">Semester</th>
                <th className="p-2">Status</th>
                <th className="p-2">SKS</th>
              </tr>
            </thead>
            <tbody>
              {data.datastatuskuliah.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "" : "bg-purple-100"}
                  >
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">
                      {formatSemester(item.id_smt as string)}
                    </td>
                    <td className="p-2">{item.nm_stat_mhs}</td>
                    <td className="p-2">{item.sks_smt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="overflow-x-scroll">
          <table className="w-full mt-4 whitespace-nowrap">
            <caption className="p-1 tracking-widest text-left text-purple-800 uppercase bg-purple-200 rounded-sm">
              Riwayat Studi
            </caption>
            <thead>
              <tr className="text-left">
                <th className="p-2">No</th>
                <th className="p-2">Semester</th>
                <th className="p-2">Kode Mata Kuliah</th>
                <th className="p-2">Mata Kuliah</th>
                <th className="p-2">SKS</th>
              </tr>
            </thead>
            <tbody>
              {data.datastudi.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "" : "bg-purple-100"}
                  >
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">
                      {formatSemester(item.id_smt as string)}
                    </td>
                    <td className="p-2">{item.kode_mk}</td>
                    <td className="p-2">{item.nm_mk}</td>
                    <td className="p-2">{item.sks_mk}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let data = {} as Data;
  let error: boolean = false;

  const response = await fetch(
    `https://api-frontend.kemdikbud.go.id/detail_mhs/${query.id}`
  );

  if (response.ok) {
    data = await response.json();
  } else {
    error = true;
  }

  return {
    props: {
      data,
      error,
    },
  };
};

export default Detail;
