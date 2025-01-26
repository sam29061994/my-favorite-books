import { useState, useEffect, useRef, useMemo } from "react";
import cancelIcon from "../../assets/icons/clear.png";
import dropdownIcon from "../../assets/icons/icon-right.png";
import { SearchableSelectProps } from "./SearchableSelect.type";
import "./SearchableSelect.scss";

export const SearchableSelect = <T extends string>({
  label,
  options,
  selected,
  onChange,
  disabled,
}: SearchableSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState(selected);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<HTMLImageElement>(null);
  const isSelectOpen = isOpen || searchTerm.length > 0;

  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        String(option).toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [options, searchTerm]
  );

  useEffect(() => {
    if (isSelectOpen) {
      setFocusedIndex(0);
    }
  }, [isSelectOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCancel = () => {
    setSearchTerm("");
    setIsOpen(false);
    setSelectedOption(undefined);
    onChange(undefined);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleOptionClick = (option: T) => {
    onChange(option);
    setSearchTerm("");
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        if (isSelectOpen && focusedIndex >= 0) {
          handleOptionClick(filteredOptions[focusedIndex]);
        }
        break;
      case "Escape":
        handleCancel();
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!isSelectOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          );
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (focusedIndex === 0 && selectedOption) {
          setFocusedIndex(-1);
          cancelRef.current?.focus();
        } else {
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        }
        break;
      case "Tab":
        if (isSelectOpen) {
          e.preventDefault();
          if (selectedOption && document.activeElement === wrapperRef.current) {
            cancelRef.current?.focus();
          } else {
            wrapperRef.current?.focus();
          }
        }
        break;
    }
  };

  return (
    <div
      className="searchable-select"
      ref={wrapperRef}
      role="combobox"
      aria-expanded={isSelectOpen}
      aria-haspopup="listbox"
      onKeyDown={handleKeyDown}
    >
      <input
        type="text"
        className="searchable-select__input"
        placeholder={label}
        value={selectedOption ? selectedOption : searchTerm}
        onChange={handleSearchChange}
        onClick={handleOpen}
        disabled={disabled}
      />
      <div className="searchable-select__icon">
        {selectedOption ? (
          <img
            src={cancelIcon}
            alt="Cancel"
            onClick={handleCancel}
            onKeyDown={(e) => e.key === "Enter" && handleCancel()}
            tabIndex={0}
            role="button"
            aria-label="Clear selection"
          />
        ) : (
          <img
            src={dropdownIcon}
            alt="Dropdown"
            onClick={handleOpen}
            onKeyDown={(e) => e.key === "Enter" && handleOpen()}
            tabIndex={0}
            role="button"
            aria-label="Open dropdown"
          />
        )}
      </div>
      {isSelectOpen && (
        <ul className="searchable-select__options">
          {filteredOptions.map((option, i) => {
            const charIndex = option
              .toLowerCase()
              .indexOf(searchTerm.toLowerCase());
            const beforeMatch = option.slice(0, charIndex);
            const match = option.slice(
              charIndex,
              charIndex + searchTerm.length
            );
            const afterMatch = option.slice(charIndex + searchTerm.length);

            return (
              <li
                key={option}
                className={`searchable-select__option ${
                  focusedIndex === i ? "focused" : ""
                }`}
                onClick={() => handleOptionClick(option)}
                id={`option-${charIndex}`}
                role="option"
                aria-selected={selectedOption === option}
              >
                {beforeMatch}
                <strong>{match}</strong>
                {afterMatch}
              </li>
            );
          })}
          {filteredOptions.length === 0 && (
            <li className="searchable-select__no-results">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};
