import styles from "./MobileSearchButton.module.css";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Space } from "@mantine/core";
import MobileSearchInputs from "../MobileSearchInputs/MobileSearchInputs";
import IconSearch from "../SVG/IconSearch";
import IconClose from "../SVG/IconClose";

export default function MobileSearchButton({ reFetchData, genres }: any) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button className={styles.button} onClick={open}>
        <IconSearch />
        <Space w="md" />
        <p className={styles.pButton}>{"Search options"}</p>
      </Button>
      <Modal
        classNames={{
          content: styles.modalContent,
          title: styles.modalTitle,
          header: styles.modalHeader,
          close: styles.modalCloseButton,
          body: styles.modalBody,
        }}
        zIndex={300}
        opened={opened}
        onClose={close}
        title="Search options"
        fullScreen
        radius={0}
        transitionProps={{ transition: "fade", duration: 200 }}
        closeButtonProps={{
          icon: (
            <IconClose
              height={24}
              width={24}
              className={styles.closeButtonIcon}
            />
          ),
        }}
        overlayProps={{
          backgroundOpacity: 0,
        }}
      >
        {<MobileSearchInputs reFetchData={reFetchData} genres={genres} />}
      </Modal>
    </>
  );
}
