import { IYaahApiResource, yaahApi } from '@/apis/yaah';
import EmptyStage from '@/components/common/empty-stage';
import CircleLoading from '@/components/ui/circle-loading';
import { cn } from '@/lib/twMerge';
import { useTenantStore } from '@/stores/tenant';
import { CardActionArea } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FC, useEffect, useEffectEvent } from 'react';

interface ResourceSuggestionParams {
  resourceCategoryId: string;
  businessModelId: string;
  startTime: string;
  endTime: string;
}

export interface ReservationResourceSuggestionHandle {
  openSelector: () => void;
}

interface ReservationResourceSuggestionV2Props {
  params: Partial<ResourceSuggestionParams>;
  value?: string;
  onChange?: (id?: string) => void;
}

const ReservationResourceSuggestionV2: FC<ReservationResourceSuggestionV2Props> = ({ params, value, onChange }) => {
  const { tenant } = useTenantStore();

  const { data: resources, isLoading } = useQuery({
    queryKey: ['resources/suggestions', { ...params, tenantId: tenant?.id, paymentTiming: 'postpaid' }],
    queryFn: ({ signal }) =>
      yaahApi.resource.getSuggestions({
        params: { ...params, numberOfPlayers: 1, tenantId: tenant?.id, paymentTiming: 'postpaid' },
        signal,
      }),
    enabled: !!params.businessModelId && !!tenant,
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

  const onResourcesChange = useEffectEvent((resources: Array<IYaahApiResource>) => {
    onChange?.(resources[0]?.id);
  });

  useEffect(() => {
    if (resources) onResourcesChange(resources?.data);
  }, [resources]);

  return (
    <div className='flex flex-col gap-2'>
      <h4 className='text-neutral-1 text-sm font-semibold'>Phù hợp nhất</h4>
      {isLoading ? (
        <CircleLoading />
      ) : (
        <>
          {resources?.data.length ? (
            <div className='grid grid-cols-2 gap-4'>
              {resources.data.map((resource) => {
                const isActive = resource.id === value;
                const handleClick = () => {
                  onChange?.(resource.id);
                };
                return (
                  <CardActionArea
                    key={resource.id}
                    className={cn(
                      'bg-background flex flex-col justify-stretch gap-1 rounded-lg border border-white/10 p-4',
                      {
                        'bg-primary/10 text-primary': isActive,
                      },
                    )}
                    onClick={handleClick}
                  >
                    <p className='w-full font-semibold'>{resource.name}</p>
                    <p className='text-neutral-1 w-full text-xs'>{resource.resource_category?.name}</p>
                    <p className='text-neutral-2 w-full text-end'>
                      {(+resource.base_price).toLocaleString('vi', {
                        style: 'currency',
                        currency: 'VND',
                      })}{' '}
                      / h
                    </p>
                  </CardActionArea>
                );
              })}
            </div>
          ) : (
            <>
              <EmptyStage />
            </>
          )}
        </>
      )}

      {params.startTime && params.endTime ? (
        <div className='flex items-center pt-8'>
          <span className='text-content-1 text-neutral-1'>Giá dự kiến</span>
          <span className='flex-1'></span>
          {isEstimating ? (
            <div className='h-[20px] w-25 animate-pulse rounded-sm bg-white/20' />
          ) : (
            <span className='text-primary text-[18px] font-semibold'>
              {estimatedPrice?.data.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
            </span>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default ReservationResourceSuggestionV2;
