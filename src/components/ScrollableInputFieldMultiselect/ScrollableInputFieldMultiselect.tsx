import React, { useEffect, useState } from "react";
import {
  Input,
  Combobox,
  InputBase,
  ScrollArea,
  useCombobox,
} from "@mantine/core";
import styles from "./ScrollableInputFieldMultiselect.module.css";
import IconDown from "../SVG/IconDown";
import IconUp from "../SVG/IconUp";

export default function ScrollableInputFieldMultiselect({
  data,
  value,
  setValue,
  placeHolder,
  onChange,
}: any) {
  const [isOpen, setIsOpen] = useState(false);
  const iconSize = "24px";
  const [icon, setIcon] = useState(<IconDown size={iconSize} />);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const parseInput = () => {
    if (valueTemp.length === 0) {
      return null;
    } else {
      let result = valueTemp[0].id;
      for (let index = 1; index < valueTemp.length; index++) {
        const element = valueTemp[index].id;
        result = result + "," + element;
      }
      return result;
    }
  };

  const initValueTemp = () => {
    if (value) {
      let result: any[] = [];
      const tempArr = JSON.parse("[" + value + "]");
      for (let index = 0; index < tempArr.length; index++) {
        result.push(data.find((e: any) => e.id === tempArr[index]));
      }
      if (result.some((e: any) => e === undefined)) {
        return [];
      }
      return result;
    } else {
      return [];
    }
  };

  const [valueTemp, setValueTemp] = useState<any[]>(initValueTemp());

  const isActive = (item: any) => {
    const result = valueTemp.some((element) => {
      return element.id === item.id;
    });
    return result;
  };

  const options = data.map((item: any, index: any) => (
    <Combobox.Option
      value={item}
      key={item.id}
      className={styles.option}
      active={isActive(item)}
      onMouseOver={() => combobox.selectOption(index)}
    >
      {item.name}
    </Combobox.Option>
  ));

  const selectedOption = () => {
    if (valueTemp.length === 0) {
      return false;
    }

    let result = valueTemp[0].name;

    for (let index = 1; index < valueTemp.length; index++) {
      const element = valueTemp[index].name;
      result = result + ", " + element;
    }

    return result;
  };

  const handleValueSelect = (val: any) => {
    setValueTemp((current: any) => {
      return current.some((e: { name: any }) => e.name === val.name)
        ? current.filter((v: any) => v.name !== val.name)
        : [...current, val];
    });
  };

  const handleValueRemove = (val: any) => {
    setValueTemp((current: any) =>
      current.filter((v: any) => v.name !== val.name)
    );
  };

  useEffect(() => {
    if (value === "" || value === null) {
      setValueTemp([]);
    }
  }, [value]);

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
      onOptionSubmit={handleValueSelect}
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
            setValue(parseInput());
            setIsOpen(false);
            onChange();
          }}
          onKeyDown={(event) => {
            if (event.key === "Backspace") {
              event.preventDefault();
              handleValueRemove(valueTemp[valueTemp.length - 1]);
            }
          }}
        >
          {selectedOption() !== false ? (
            selectedOption()
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
