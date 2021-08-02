import { useEffect, useState } from "react";

export const Thumb = ({
  file,
  width
}) => {
  const [state, setState] = useState({
    loading: false,
    thumb: undefined,
  });

  useEffect(() => {
    if (!file) { return; }

    setState((state) => ({...state, loading: true}))
    let reader = new FileReader();

    reader.onloadend = () => {
      setState({ loading: false, thumb: reader.result });
    };

    reader.readAsDataURL(file);
  }, [file]);

  if (!file) { return null; }

  if (state.loading) { return <p>loading...</p>; }

  return (
    <img
      src={state.thumb}
      alt={file.name}
      width={width}
    />
  );
};
