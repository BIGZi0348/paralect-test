export default function IconClose({ className, width, height }: any) {
  width = width ? width : 16;
  height = height ? height : 16;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_18005_1868)">
        <path
          className={className}
          d="M12 4L4 12"
          stroke="#ACADB9"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className={className}
          d="M4 4L12 12"
          stroke="#ACADB9"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
