import { NumberInput } from "@mantine/core";
import styles from "./NumberInputField.module.css";
import React, { useEffect, useState } from "react";

export default function NumberInputField({
  placeholder,
  value,
  setValue,
  minV,
  maxV,
  onChange,
}: any) {
  const [tempValue, setTempValue] = useState<any>();

  useEffect(() => {
    if (value === null) {
      setTempValue("");
    } else {
      setTempValue(parseFloat(value));
    }
  }, [value]);

  const changeValue = (input: string) => {
    input ? setValue(input) : setValue(null);
  };

  return (
    <NumberInput
      classNames={{
        input: styles.input,
        section: styles.section,
        controls: styles.controls,
        control: styles.control,
      }}
      min={0}
      max={10}
      placeholder={placeholder}
      size="md"
      value={tempValue}
      onChange={(val) => {
        onChange();
        setTempValue(val);
      }}
      onBlur={(event) => {
        let temp = event.currentTarget.value;
        if (minV !== undefined && minV !== null) {
          if (parseFloat(event.currentTarget.value) < parseFloat(minV)) {
            temp = minV;
          }
        } else {
          if (parseFloat(event.currentTarget.value) < 0) {
            temp = "0";
          }
        }
        if (maxV !== undefined && maxV !== null) {
          if (parseFloat(event.currentTarget.value) > parseFloat(maxV)) {
            temp = maxV;
          }
        } else {
          if (parseFloat(event.currentTarget.value) > 10) {
            temp = "10";
          }
        }
        changeValue(temp);
        setTempValue(parseFloat(temp));
      }}
    />
  );
}
