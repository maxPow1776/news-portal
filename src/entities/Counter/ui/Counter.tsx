import { Button } from '@/shared/ui/Button';
import { useCounterActions } from '../model/slice/counterSlice';
import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

export const Counter = () => {
  const counterValue = useCounterValue();
  const { add, increment, decrement } = useCounterActions();

  const handleIncrement = () => {
    increment();
  };

  const handleDecrement = () => {
    decrement();
  };

  const handleAddFive = () => {
    add(5);
  };

  return (
    <div>
      <h1 data-testid="value-title">{counterValue}</h1>
      <Button
        onClick={handleIncrement}
        data-testid="increment-btn"
      >
        +
      </Button>
      <Button
        onClick={handleAddFive}
        data-testid="increment-btn-five"
      >
        +5
      </Button>
      <Button
        data-testid="decrement-btn"
        onClick={handleDecrement}
      >
        -
      </Button>
    </div>
  );
};
