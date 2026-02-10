import { cn } from '@/lib/twMerge';
import { Button, CardActionArea, SwipeableDrawer, TextField } from '@mui/material';
import { FC, PropsWithChildren, useMemo, useRef, useState } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

interface NumberPadInputProps
  extends PropsWithChildren, Omit<NumericFormatProps, 'customInput' | 'onChange' | 'min' | 'onValueChange'> {
  defaultValue?: number;
  min?: number;
  max?: number;
  suggestions?: Array<number>;
  onChange?: (val: number) => void;
}

const NumberPadInput: FC<NumberPadInputProps> = ({
  defaultValue,
  children,
  onChange,
  min,
  max,
  suggestions,
  ...props
}) => {
  const [value, setValue] = useState(() => defaultValue ?? 0);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (typeof defaultValue === 'number') setValue(defaultValue);
    setIsOpen(true);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    onChange?.(value);
    setIsOpen(false);
  };

  const { errorMessage, isValid } = useMemo(() => {
    let isValid = true;
    let errorMessage = '';

    if (typeof min === 'number' && value < min) {
      isValid = false;
      errorMessage = `Vui lòng nhập giá trị lớn hơn hoặc bằng ${min.toLocaleString('vi')}`;
    }

    if (typeof max === 'number' && value > max) {
      isValid = false;
      errorMessage = `Vui lòng nhập giá trị nhỏ hơn hoặc bằng ${max.toLocaleString('vi')}`;
    }

    return {
      isValid,
      errorMessage,
    };
  }, [max, min, value]);

  return (
    <>
      <div onClick={handleOpen}>{children}</div>

      <SwipeableDrawer
        open={isOpen}
        onClose={() => {}}
        onOpen={handleClose}
        anchor='bottom'
        slotProps={{ paper: { className: 'py-8 px-6 rounded-t-2xl bg-background' } }}
      >
        <div className='flex flex-col gap-4'>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-expect-error */}
          <NumericFormat
            inputRef={inputRef}
            value={value}
            customInput={TextField}
            thousandSeparator='.'
            decimalSeparator=','
            slotProps={{
              htmlInput: {
                inputMode: 'numeric',
                className: 'caret-primary text-4xl text-center',
                autoComplete: 'off',
              },
            }}
            onValueChange={(val) => {
              if (val.floatValue) setValue(val.floatValue);
            }}
            {...props}
          />

          {errorMessage && <p className='text-error text-center'>{errorMessage}</p>}

          {suggestions?.length && (
            <div className='overflow-x-auto'>
              <div className='flex w-fit items-center gap-2'>
                {suggestions.map((suggestion) => {
                  const isActive = suggestion === value;
                  const handleClick = () => setValue(suggestion);
                  return (
                    <CardActionArea
                      className={cn('rounded-md bg-black px-4 py-2 text-white', {
                        'text-primary': isActive,
                      })}
                      key={suggestion}
                      onClick={handleClick}
                    >
                      {suggestion.toLocaleString('vi')}
                      {props.suffix}
                    </CardActionArea>
                  );
                })}
              </div>
            </div>
          )}

          <Button variant='contained' disabled={!isValid} onClick={handleSubmit}>
            Đồng ý
          </Button>
          <Button size='small' onClick={handleClose}>
            Hủy
          </Button>
        </div>
      </SwipeableDrawer>
    </>
  );
};

export default NumberPadInput;
