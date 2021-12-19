import React, { useContext, useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { Context } from "../../context";

interface Props<T> {
  identifier: string;
  options: T[];
  renderOption: (item: T) => React.ReactNode;
  onFilter: (item: T, value: string) => boolean;
  value: string;
}

export function Drodpdown<T>({
  options,
  identifier,
  renderOption,
  onFilter,
  value,
}: Props<T>): JSX.Element {
  const [showOptions, setShowOptions] = useState(false);
  const {state} = useContext(Context);

  const [filteredOptions, setFilteredOptions] = useState(options);
  const [display, setDisplay] = useState(value);

  const ref = useRef(null);

  useOnClickOutside(ref, () => setShowOptions(false));

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setDisplay(event.target.value);
    event.preventDefault();
    if (event.target.value.length >= 4) setShowOptions(true);

    const filtered = options.filter((item) =>
      onFilter(item, event.target.value)
    );
    setFilteredOptions(filtered);
  }

  useEffect(() => {
    if (value) {
      setDisplay(value);
    }
    setShowOptions(false);
  }, [value, state.openDropdown]);

  useEffect(() => {
    setFilteredOptions(options);
    if (identifier === "prodi") {
      setDisplay("");
    }
  }, [options, identifier]);

  return (
    <div className="relative" ref={ref}>
      <input
        defaultValue={value}
        value={display}
        onClick={() => {
          if (identifier !== "pt") setShowOptions(!showOptions);
        }}
        onChange={handleChange}
        type="text"
        className="w-full p-2 border focus:outline-none focus:border-purple-600"
        name={identifier}
        id={identifier}
        placeholder={
          identifier === "pt" ? "Universitas Indonesia" : "Ilmu Hukum"
        }
      />
      {showOptions && (
        <ul
          className="absolute left-0 right-0 z-50 p-2 space-y-2 overflow-y-scroll bg-white border shadow-md top-12 max-h-56"
        >
          {filteredOptions.map((item, index) => (
            <li
              key={index}
              className="w-full p-1 rounded cursor-pointer bg-slate-100"
            >
              {renderOption(item)}
            </li>
          ))}
          {filteredOptions.length <= 0 && (
            <li>Tidak ada pilihan</li>
          )}
        </ul>
      )}
    </div>
  );
}
