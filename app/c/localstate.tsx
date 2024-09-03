"use client";
import { useState } from "react";

interface LocalStateProps<T> {
  children(
    state: T,
    setState: React.Dispatch<React.SetStateAction<T>>
  ): React.JSX.Element;
  initialState: T;
}

export function LocalState<T>({ children, initialState }: LocalStateProps<T>) {
  let result = useState(initialState);
  return children(...result);
}
