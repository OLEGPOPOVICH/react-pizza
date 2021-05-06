import { useState } from "react";

export const useAppState = () => {
  return useState({isLoaded: false, pizza: {}, order: {}});
}