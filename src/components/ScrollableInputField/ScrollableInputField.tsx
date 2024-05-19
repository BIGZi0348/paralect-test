import React, { useEffect, useState } from "react";
import {
  Input,
  Combobox,
  InputBase,
  ScrollArea,
  useCombobox,
} from "@mantine/core";
import styles from "./ScrollableInputField.module.css";
import IconDown from "../SVG/IconDown";
import IconUp from "../SVG/IconUp";

export default function ScrollableInputField({
  data,
  value,
  setValue,
  placeHolder,
  defaultValue,
  onChange,
}: any) {
  const [isOpen, setIsOpen] = useState(false);
  const iconSize = "24px";
  const [icon, setIcon] = useState(<IconDown size={iconSize} />);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const isActive = (item: any) => {
    if (value === null && defaultValue === item.label) {
      return true;
    }
    return value === item.value;
  };

  const options = data.map((item: any, index: any) => (
    <Combobox.Option
      active={isActive(item)}
      value={item.value}
      key={item.value}
      className={styles.option}
      onMouseOver={() => combobox.selectOption(index)}
    >
      {item.label}
    </Combobox.Option>
  ));

  const selectedOption = data.find((item: any) => item.value === value);

  useEffect(() => {
    if (isOpen) {
      combobox.openDropdown();
      setIcon(<IconUp size={iconSize} />);
    } else {
      combobox.closeDropdown();
      setIcon(<IconDown size={iconSize} />);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        if (value === optionValue) {
          setValue(null);
        } else {
          setValue(optionValue);
        }
        onChange();
        setIsOpen(false);
      }}
      store={combobox}
      withinPortal={false}
      offset={8}
      classNames={{ dropdown: styles.dropdown }}
    >
      <Combobox.Target>
        <InputBase
          classNames={{ root: styles.root, input: styles.input }}
          component="button"
          type="button"
          pointer
          multiline
          size="md"
          rightSection={icon}
          rightSectionPointerEvents="none"
          onClick={() => {
            if (isOpen) {
              setIsOpen(false);
            } else {
              setIsOpen(true);
            }
          }}
          onBlur={() => {
            setIsOpen(false);
          }}
          onKeyDown={(event) => {
            if (event.key === "Backspace") {
              event.preventDefault();
              setValue(null);
            }
          }}
        >
          {selectedOption ? (
            selectedOption.label
          ) : defaultValue ? (
            defaultValue
          ) : (
            <Input.Placeholder>{placeHolder}</Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          <ScrollArea
            scrollbarSize="6px"
            h={202}
            type="auto"
            classNames={{ scrollbar: styles.scrollbar }}
          >
            {options}
          </ScrollArea>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
