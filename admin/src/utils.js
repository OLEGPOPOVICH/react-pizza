export const checkFileExsist = (file) => {
  if (
    !file
    || !file[0]
  ) {
    return false;
  }

  return true;
}

export const checkMaxFileSize = (fileSize, maxSize) => {
  if (!fileSize && !maxSize) {
    return false;
  }

  return fileSize <= maxSize
}

export const checkFileTypes = (fileType, types) => {
  if (!fileType && !types) {
    return false;
  }

  return types.includes(fileType);
}
