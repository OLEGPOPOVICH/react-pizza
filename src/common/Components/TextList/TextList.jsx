import { getRandomString } from "common/utils/string/index";
import "./index.css";

export const TextList = ({ textList, className }) => (
  <ul className={`text__list ${className}`}>
    {textList.map((textItem) => (
      <li key={getRandomString()}>{textItem}</li>
    ))}
  </ul>
);
