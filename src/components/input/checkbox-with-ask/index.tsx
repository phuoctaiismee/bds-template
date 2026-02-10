import { cn } from '@/lib/twMerge';
import { Button, CardActionArea, Collapse } from '@mui/material';
import React from 'react';

interface OptionOption<TT> {
  label: string;
  value: TT;
}

interface Option<T, TT> {
  icon: React.ReactNode;
  label: string;
  description?: string;
  value: T;
  ask?: {
    question: string;
    options: Array<OptionOption<TT>>;
  };
}

interface CheckboxWithAskProps<T, TT> {
  options: Array<Option<T, TT>>;
  value?: T;
  askValue?: TT;
  onChange?: (val: T) => void;
  onAskChange?: (val: TT) => void;
}

function CheckboxWithAsk<T, TT>({ options, value, askValue, onChange, onAskChange }: CheckboxWithAskProps<T, TT>) {
  const selectedOption = options.find((x) => x.value === value);

  return (
    <div className='flex flex-col gap-2'>
      {options.map((option) => {
        const isActive = value === option.value;

        return (
          <CardActionArea
            key={option.value as never}
            className={cn(
              'bg-background text-neutral-1 flex h-20 items-start gap-4 rounded-lg border border-white/10 p-4',
              {
                'border-primary border-2': isActive,
              },
            )}
            onClick={() => onChange?.(option.value)}
          >
            <div>
              {React.cloneElement(option.icon as never, {
                className: cn('size-5 text-current', {
                  'text-primary': isActive,
                }),
              })}
            </div>
            <div className='flex flex-1 flex-col gap-1'>
              <p className='text-positive text-content-2 font-semibold'>{option.label}</p>
              <p>{option.description}</p>
            </div>
          </CardActionArea>
        );
      })}

      <Collapse in={!!selectedOption}>
        {selectedOption?.ask && (
          <div className='flex gap-4 pl-5'>
            <div className='h-15 w-px bg-white/20' />

            <div className='flex flex-col gap-1 py-1'>
              <p className='text-neutral-1'>{selectedOption.ask.question}</p>
              <div className='flex flex-wrap gap-2'>
                {selectedOption.ask.options.map((option) => {
                  const isActive = option.value === askValue;
                  return (
                    <Button
                      key={option.value as never}
                      size='small'
                      variant='outlined'
                      className={cn('text-neutral-1 bg-background border-white/10', {
                        'bg-primary/10 text-primary border-primary': isActive,
                      })}
                      onClick={() => onAskChange?.(option.value)}
                    >
                      {option.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </Collapse>
    </div>
  );
}

export default CheckboxWithAsk;
