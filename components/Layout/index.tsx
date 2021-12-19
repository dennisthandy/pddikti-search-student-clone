import { Footer } from "./Footer";
import { Header } from "./Header";

interface Props {
  children: JSX.Element;
  title?: string;
  description?: string;
  keywords?: string;
}

export function Layout({
  children,
  title = "PDDikti",
  description = "pddikti",
  keywords = "pddikti"
}: Props): JSX.Element {
  return (
    <div className="relative min-h-screen">
      <Header title={title} description={description} keywords={keywords} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
