'use client';
import React from 'react';
import { useSessionStorage } from 'usehooks-ts';

interface WithSessionChildrenFuncParams<T> {
  state: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
}

interface WithSessionProps<T> {
  initialValue: T;
  sessionKey: string;
  children: (params: WithSessionChildrenFuncParams<T>) => React.ReactElement;
}

export default function WithSession<T>({ initialValue, sessionKey, children }: WithSessionProps<T>) {
  const [state, setState] = useSessionStorage<T>(sessionKey, () => initialValue);

  return children({ state, setState });
}
