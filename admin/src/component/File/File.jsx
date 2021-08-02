import {
  Label,
  ButtonUpload,
  Size,
  Thumb,
  FileError
} from "./components";

const File = ({
  children
}) => (
  <div className="wrap__download">
    {children}
  </div>
);

File.Label = Label;
File.ButtonUpload = ButtonUpload;
File.Size = Size;
File.Thumb = Thumb;
File.FileError = FileError;

export { File };
