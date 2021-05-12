/* eslint-disable prettier/prettier */
import { useState } from 'react';

export const useAppState = () =>
  useState({ isLoading: false, pizzaData: {}, order: {} });
