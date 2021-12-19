import HeartOutline from "../../../public/icons/heart-outline.svg";

export function Footer(): JSX.Element {
  return (
    <footer className="absolute bottom-0 left-0 right-0 p-4 -z-10">
      <div className="flex items-center justify-center text-center">
        Made with{" "}
        <div className="inline-block w-6 h-6 mx-1">
          <HeartOutline fill="rgb(190 24 93)" />
        </div>{" "}
        by dennisthandy
      </div>
    </footer>
  );
}
