/* eslint-disable react-hooks/exhaustive-deps */
import { NextPage } from "next";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { Form } from "../components/Form";
import { Layout } from "../components/Layout";
import { Context } from "../context";

const Search: NextPage = () => {
  const { state, dispatch } = useContext(Context);
  const { university } = state;

  async function getUniversity() {
    dispatch({ type: "SET_UNIVERSITY_LOADING", payload: true });

    try {
      const response = await fetch("/api/loadpt");

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "SET_UNIVERSITY_DATA", payload: data });
        return;
      }
    } catch (error) {
      dispatch({ type: "SET_UNIVERSITY_ERROR", payload: true });
    }
  }

  useEffect(() => {
    if (university.data.length <= 0) {
      getUniversity();
    }
  }, [university.data]);

  return (
    <Layout>
      <div className="absolute left-0 right-0 flex flex-col items-center justify-center transform -translate-y-1/2 top-1/2">
        {(() => {
          if (university.loading)
            return (
              <>
                <h1 className="text-2xl text-center">Tunggu bentar ya...</h1>
                <div className="relative w-64 mx-auto h-72">
                  <Image src="/check-phone.svg" alt="searching" layout="fill" />
                </div>
                <p className="text-2xl text-center">
                  Lagi coba kontak si Server..
                </p>
              </>
            );
          else if (university.error)
            return (
              <>
                <h1 className="text-2xl text-center">
                  Yah si Server gak bisa dikontak.
                </h1>
                <div className="relative w-64 mx-auto my-4 h-72">
                  <Image src="/Caution.svg" alt="searching" layout="fill" />
                </div>
                <p className="text-2xl text-center">
                  Maaf ya, hiks T_T. <br /> Nanti coba lagi aja ya :).
                </p>
              </>
            );
          else
            return (
              <div>
                <div className="relative mx-auto mb-8 w-52 h-52">
                  <h1 className="absolute right-0 z-10 mb-6 text-2xl text-left -left-16 -bottom-11">
                    Seingetnya aja kalo ngisi
                  </h1>
                  <Image src="/Form.svg" alt="searching" layout="fill" />
                </div>
                <Form data={university.data} />
              </div>
            );
        })()}
      </div>
    </Layout>
  );
};

export default Search;
