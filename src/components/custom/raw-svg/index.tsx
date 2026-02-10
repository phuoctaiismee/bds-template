'use client';
import { Box, BoxProps } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FC } from 'react';
import { create } from 'zustand';

interface CachedState {
  data: Record<string, string>;
}
interface CachedAction {
  setData: (key: string, value: string) => void;
}

const useCachedStore = create<CachedState & CachedAction>((set, get) => ({
  data: {},
  setData(key, value) {
    set({
      data: {
        ...get().data,
        [key]: value,
      },
    });
  },
}));

interface RawSvgProps extends BoxProps {
  src: string;
  size?: number;
}

const RawSvg: FC<RawSvgProps> = ({ src, dangerouslySetInnerHTML, size = 20, sx, ...props }) => {
  const { data, setData } = useCachedStore();

  const { data: html } = useQuery({
    queryKey: ['svg/raw', { src }],
    queryFn: async ({ signal }) => {
      if (data[src]) return data[src];

      const res = await axios
        .get('/api/fetch', { params: { url: src }, signal, withCredentials: false })
        .then((res) => {
          if (res.headers['content-type'] !== 'image/svg+xml') return '';
          return res.data;
        })
        .catch(() => '');

      setData(src, res);

      return res;
    },
  });

  return (
    <Box
      dangerouslySetInnerHTML={{
        __html: html,
        ...dangerouslySetInnerHTML,
      }}
      {...props}
      sx={{
        '& svg': {
          width: size,
          height: size,
        },
        '& [stroke="#000000"]': {
          stroke: 'currentcolor',
        },
        '& [fill="#000000"]': {
          fill: 'currentcolor',
        },
        ...sx,
      }}
    />
  );
};

export default RawSvg;
