import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import GithubOutline from "../../../public/icons/github-outline.svg";

interface Props {
  title?: string;
  description?: string;
  keywords?: string;
}

export function Header({
  title = "PDDikti",
  description = "pddikti",
  keywords = "pddikti",
}: Props): JSX.Element {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <header>
        <nav className="flex items-center justify-between p-2">
          <div className="relative w-14 h-14">
            <Image layout="fill" src="/logo.png" alt="brand" />
            <Link href="/">
              <a className="absolute z-10 text-xl tracking-wider text-purple-500 transform -translate-y-1/2 -right-20 top-1/2">
                PDDIKTI
              </a>
            </Link>
          </div>
          <div className="w-8 h-8 mr-2">
            <GithubOutline fill="rgb(168 85 247)" />
          </div>
        </nav>
      </header>
    </>
  );
}
