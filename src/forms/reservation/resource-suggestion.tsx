import { IYaahApiResource, yaahApi } from '@/apis/yaah';
import { cn } from '@/lib/twMerge';
import { useTenantStore } from '@/stores/tenant';
import { ArrowPathIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { Button, CardActionArea, IconButton, SvgIcon, SwipeableDrawer } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { FC, RefObject, useEffect, useEffectEvent, useImperativeHandle, useState } from 'react';

interface ResourceSuggestionParams {
  resourceCategoryId: string;
  businessModelId: string;
  startTime: string;
  endTime: string;
}

export interface ReservationResourceSuggestionHandle {
  openSelector: () => void;
}

interface ReservationResourceSuggestionProps {
  params: Partial<ResourceSuggestionParams>;
  value?: string;
  ref?: RefObject<ReservationResourceSuggestionHandle>;
  onChange?: (id?: string) => void;
}

const ReservationResourceSuggestion: FC<ReservationResourceSuggestionProps> = ({ params, value, ref, onChange }) => {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const { tenant } = useTenantStore();

  const { data: resources, isLoading } = useQuery({
    queryKey: ['resources/suggestions', { ...params, tenantId: tenant?.id }],
    queryFn: ({ signal }) =>
      yaahApi.resource.getSuggestions({ params: { ...params, numberOfPlayers: 1, tenantId: tenant?.id }, signal }),
    enabled: !!params.businessModelId && !!tenant?.id,
  });

  const { data: estimatedPrice, isFetching: isEstimating } = useQuery({
    queryKey: [
      'resources/estimated-price',
      {
        resource: value,
        params: {
          startTime: params.startTime,
          endTime: params.endTime,
        },
      },
    ],
    queryFn: ({ signal }) =>
      yaahApi.resource.estimatePrice({
        pathParams: { id: value! },
        body: { startTime: params.startTime!, endTime: params.endTime! },
        signal,
      }),
    enabled: !!(value && params.startTime && params.endTime),
  });

  const selectedResource = resources?.data.find((x) => x.id === value);

  const onResourcesChange = useEffectEvent((resources: Array<IYaahApiResource>) => {
    onChange?.(resources[0]?.id);
  });

  useEffect(() => {
    if (resources) onResourcesChange(resources?.data);
  }, [resources]);

  const handleSwitchResource = () => {
    const currentIndex = resources?.data.findIndex((x) => x.id === selectedResource?.id) ?? -1;
    const newResource = resources?.data[(currentIndex + 1) % resources.data.length];
    onChange?.(newResource?.id);
  };

  useImperativeHandle(ref, () => ({
    openSelector() {
      if (!resources?.data.length) {
        enqueueSnackbar({ variant: 'default', message: 'Không có địa điểm phù hợp' });
        return;
      }
      setIsSelectorOpen(true);
    },
  }));

  if (isLoading) return <div className='h-25 animate-pulse rounded-xl bg-white/20'></div>;
  if (!selectedResource)
    return (
      <div className='flex h-20 items-center justify-center rounded-xl border border-dashed border-white/50 bg-white/5 p-4 text-center text-sm font-medium text-white'>
        <p>Không có vị trí trống</p>
      </div>
    );

  return (
    <>
      <div className='to-primary/10 flex h-25 items-center rounded-xl bg-linear-to-r from-black p-4'>
        <div className='flex flex-1 flex-col gap-1'>
          <div className='text-primary flex items-center gap-2 text-[10px] font-semibold uppercase'>
            <SparklesIcon className='size-4' />
            <p>Đề xuất tốt nhất</p>
          </div>

          <p className='text-title-3 line-clamp-1 font-semibold'>{selectedResource?.name}</p>
        </div>

        <IconButton size='large' onClick={handleSwitchResource}>
          <SvgIcon>
            <ArrowPathIcon />
          </SvgIcon>
        </IconButton>
      </div>

      {params.startTime && params.endTime && estimatedPrice ? (
        <div className='text-primary flex items-center gap-2 text-sm font-semibold'>
          Giá dự kiến:{' '}
          {isEstimating ? (
            <div className='inline-block h-4 w-30 animate-pulse rounded-sm bg-white/10' />
          ) : (
            estimatedPrice.data.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })
          )}
        </div>
      ) : null}

      <SwipeableDrawer
        open={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
        onOpen={() => {}}
        anchor='bottom'
        slotProps={{ paper: { className: 'bg-background rounded-t-2xl text-foreground' } }}
      >
        <div className='flex flex-col gap-4 p-6 pb-12'>
          <h3 className='text-2xl font-bold'>Tùy chỉnh</h3>

          <div className='grid grid-cols-3 gap-3'>
            {resources?.data.map((resource) => {
              const isActive = resource.id === selectedResource.id;
              return (
                <CardActionArea
                  key={resource.id}
                  className={cn('to-primary/10 relative overflow-hidden rounded-xl bg-black/50', {
                    'text-primary bg-primary/10': isActive,
                  })}
                  onClick={() => onChange?.(resource.id)}
                >
                  <div className='flex h-25 px-4 py-3'>
                    <h4 className='text-sm font-semibold'>{resource.name}</h4>
                  </div>
                </CardActionArea>
              );
            })}
          </div>

          <Button fullWidth variant='contained' className='rounded-full' onClick={() => setIsSelectorOpen(false)}>
            Đồng ý
          </Button>
        </div>
      </SwipeableDrawer>
    </>
  );
};

export default ReservationResourceSuggestion;
