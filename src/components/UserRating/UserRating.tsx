"use client";

import { Button, Modal, Rating } from "@mantine/core";
import styles from "./UserRating.module.css";
import StarButton from "../StarButton/StarButton";
import IconClose from "../SVG/IconClose";
import StarIcon from "../SVG/StarIcon";
import { useEffect, useState } from "react";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { usePathname } from "next/navigation";

export default function UserRating({ prop }: any) {
  const pathname = usePathname();
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue, removeValue] = useLocalStorage({
    key: "UserRating" + prop.id.toString(),
  });
  const [indexStorage, setIndexStorage] = useLocalStorage({
    key: "indexStorage",
    defaultValue: [],
  });
  const [propStorage, setPropStorage, removePropStorage] = useLocalStorage({
    key: "JSON" + prop.id.toString(),
  });
  const [valueTemp, setValueTemp] = useState(value);
  const [isDisabled, setIsDisabled] = useState(true);

  const onClose = () => {
    close();
    // for better animation
    setTimeout(() => {
      setValueTemp("");
    }, 200);
  };
  const onClickModalSave = () => {
    setValue(valueTemp === undefined ? "0" : valueTemp);
    const temp: any = indexStorage;
    if (!temp.some((i: any) => i === prop.id)) {
      temp.push(prop.id);
    }
    setIndexStorage(temp);
    prop.timeOfCreation = Date.now();
    setPropStorage(prop);
    close();
  };
  const onClickRemoveRating = () => {
    setValueTemp("");
    removeValue();
    setIndexStorage(indexStorage.filter((i: any) => i !== prop.id));
    removePropStorage();
    close();
  };
  const onClick = () => {
    open();
    setValueTemp(value);
  };

  useEffect(() => {
    if (value) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [value]);

  useEffect(() => {
    // copying movie data everywhere, but in "/rated"
    if (pathname !== "/rated") {
      try {
        const propJSON = JSON.parse(
          localStorage.getItem("JSON" + prop.id.toString()) || "{id:-1}"
        );
        if (prop.id === propJSON.id) {
          prop.timeOfCreation = Date.now();
          localStorage.setItem("JSON" + prop.id, JSON.stringify(prop));
        }
      } catch (error: any) {
        // do nothing on error
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={styles.userRating}>
        {/* flex-direction: row-reverse; */}
        {value ? <p className={styles.userRatingP}>{value}</p> : ""}
        <StarButton active={value ? true : false} onClick={onClick} />
      </div>
      <Modal
        classNames={{
          title: styles.modalTitle,
          header: styles.modalHeader,
          close: styles.modalCloseButton,
        }}
        size={"380px"}
        radius={"8px"}
        opened={opened}
        onClose={onClose}
        title="Your rating"
        zIndex={300}
        closeButtonProps={{
          icon: <IconClose className={styles.closeButtonIcon} />,
        }}
        centered
      >
        <div className={styles.modalContent}>
          <p style={{ paddingTop: "16px" }} className={styles.p2}>
            {prop.original_title}
          </p>
          <Rating
            value={parseInt(valueTemp)}
            onChange={(val) => {
              setValueTemp(val.toString());
            }}
            classNames={{ root: styles.ratingRoot }}
            emptySymbol={<StarIcon color={"#D5D6DC"} />}
            fullSymbol={<StarIcon color={"#FAB005"} />}
            size={"28px"}
            count={10}
          />
          <div className={styles.modalButtons}>
            <Button className={styles.buttonSave} onClick={onClickModalSave}>
              <p className={styles.p1}>{"Save"}</p>
            </Button>
            <button
              disabled={isDisabled}
              onClick={onClickRemoveRating}
              className={styles.removeRatingButton}
            >
              {"Remove rating"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
