'use client';
import React, { useState } from 'react';

interface WithStateChildrenFuncParams<T> {
  state: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
}

interface WithStateProps<T> {
  initialValue: T;
  children: (params: WithStateChildrenFuncParams<T>) => React.ReactElement;
}

export default function WithState<T>({ initialValue, children }: WithStateProps<T>) {
  const [state, setState] = useState<T>(() => initialValue);

  return children({ state, setState });
}
