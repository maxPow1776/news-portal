import { Flex, FlexProps } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction'>;

export const VStack = ({ align = 'start', ...otherProps }: VStackProps) => {
  return (
    <Flex {...otherProps} direction="column" align={align} />
  );
};
