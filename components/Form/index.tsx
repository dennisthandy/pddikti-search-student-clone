import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../context";
import { StudyProgram, University } from "../../pages";
import { Drodpdown } from "../Dropdown";

interface Props {
  data: University[];
}

type Values = {
  nama?: string;
  nim?: string;
  pt?: {
    id: string;
    name: string;
  };
  prodi?: {
    id: string;
    name: string;
  };
};

export function Form({ data }: Props): JSX.Element {
  const { state, dispatch } = useContext(Context);

  const [university, setUniversity] = useState(data);
  const [studyProgram, setStudyProgram] = useState<StudyProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState<Values>();

  const router = useRouter();

  async function getStudyProgram(idUniversity: string): Promise<any> {
    try {
      const response = await fetch(`/api/loadprodi/${idUniversity}`);

      if (response.ok) {
        const data = await response.json();
        setStudyProgram(data);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();
    if (e.target.name === "pt") {
      const filtered = data.filter((item) =>
        item.nama_pt.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setUniversity(filtered);
    }
    if (e.target.name === "pt") {
      const data = studyProgram;
      const filtered = data.filter((item) =>
        item.nama_prodi.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setStudyProgram(filtered);
    }
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const payload = {
      nama: values?.nama,
      nim: values?.nim,
      pt: values?.pt?.id,
      prodi: values?.prodi?.id,
    };
    dispatch({
      type: "SET_STUDENT_QUERY",
      payload: payload as {
        nama: string;
        nim: string;
        pt: string;
        prodi: string;
      },
    });
    dispatch({ type: "SET_STUDENTS_DATA", payload: [] });
    router.push("/students");
  }

  useEffect(() => {
    if (data.length > 0) {
      setUniversity(data);
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (values?.pt?.id) {
      getStudyProgram(values?.pt?.id);
    }
  }, [values?.pt?.id]);

  return (
    <>
      {(() => {
        if (loading) {
          return <h1>Loading</h1>;
        } else {
          return (
            <>
              <form onSubmit={handleSubmit} className="grid w-full gap-2 mt-12">
                <div className="grid gap-1">
                  <label htmlFor="pt">
                    Nama Perguruan Tinggi{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <Drodpdown
                    value={values?.pt?.name as string}
                    identifier="pt"
                    options={university}
                    renderOption={(item) => (
                      <p
                        onClick={() => {
                          setValues({
                            ...values,
                            pt: { name: item.nama_pt, id: item.id_sp },
                          });
                          dispatch({
                            type: "SET_OPEN_DROPDOWN",
                            payload: !state.openDropdown,
                          });
                        }}
                      >
                        {item.nama_pt}
                      </p>
                    )}
                    onFilter={(item, value) =>
                      item.nama_pt.toLowerCase().includes(value.toLowerCase())
                    }
                  />
                </div>
                <div
                  className={`grid gap-1 ${
                    studyProgram.length > 0
                      ? ""
                      : "pointer-events-none opacity-50"
                  }`}
                >
                  <label htmlFor="prodi">
                    Nama Program Studi <span className="text-red-600">*</span>
                  </label>
                  <Drodpdown
                    value={values?.prodi?.name as string}
                    identifier="prodi"
                    options={studyProgram}
                    renderOption={(item) => (
                      <p
                        onClick={() => {
                          setValues({
                            ...values,
                            prodi: { name: item.nama_prodi, id: item.id_sms },
                          });
                          dispatch({
                            type: "SET_OPEN_DROPDOWN",
                            payload: !state.openDropdown,
                          });
                        }}
                      >
                        {item.nama_prodi}
                      </p>
                    )}
                    onFilter={(item, value) =>
                      item.nama_prodi
                        .toLowerCase()
                        .includes(value.toLowerCase())
                    }
                  />
                </div>
                <div className="grid gap-1">
                  <label htmlFor="nama">
                    Nama Mahasiswa <span className="text-red-600">*</span>
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    className="p-2 border w-80 focus:outline-none focus:border-purple-600"
                    name="nama"
                    id="nama"
                    placeholder="John Doe"
                    required
                    value={values?.nama}
                  />
                </div>
                <div className="grid gap-1">
                  <label htmlFor="nim">Nomor Induk Mahasiswa</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    className="p-2 border w-80 focus:outline-none focus:border-purple-600"
                    name="nim"
                    id="nim"
                    placeholder="14536123"
                    value={values?.nim}
                  />
                </div>
                <div className="grid gap-1">
                  <button
                    type="submit"
                    className="p-2 text-purple-100 bg-purple-600"
                  >
                    Cari
                  </button>
                </div>
              </form>
            </>
          );
        }
      })()}
    </>
  );
}
