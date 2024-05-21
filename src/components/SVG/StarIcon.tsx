import { useMediaQuery } from "@mantine/hooks";

export default function StarIcon({ color, size }: any) {
  const isMobile = useMediaQuery("(max-width: 560px)");
  let width = 26;
  let height = 25;

  if (isMobile) {
    width = 20;
    height = width * (25 / 26);
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 26 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.9999 19.7083L5.79926 23.4941L7.17476 15.4756L1.34143 9.79747L9.39143 8.6308L12.9918 1.33563L16.5921 8.6308L24.6421 9.79747L18.8088 15.4756L20.1843 23.4941L12.9999 19.7083Z"
        fill={color}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
