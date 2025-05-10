import { Dispatch, SetStateAction } from "react";

type Props = {
  pages: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

export default function Pagination({
  pages,
  currentPage,
  setCurrentPage,
}: Props) {
  const buttons = Array.from({ length: pages }, (_, index) => index + 1);
  const buttonStyles = "py-1 px-2 border-2 border-yellow-300 font-bold text-blue-600 cursor-pointer";
  const activeButtonStyles =
    "py-1 px-2 border-2 border-blue-600 cursor-pointer bg-yellow-300 text-blue-600";
  return (
    <ul className="flex gap-4">
      {buttons.map((button) => (
        <li
          key={button}
          className={currentPage === button ? activeButtonStyles : buttonStyles}
          onClick={() => setCurrentPage(button)}
        >
          <span>{button}</span>
        </li>
      ))}
    </ul>
  );
}
