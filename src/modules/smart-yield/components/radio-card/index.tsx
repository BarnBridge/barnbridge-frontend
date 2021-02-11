import cn from 'classnames';
import s from './s.module.scss';

type Props ={
  children?: any,
  selected?: boolean,
  onClick: (e: any) => void,
}

export default function RadioCard({ children, selected = false, ...rest }: Props) {
  return (
    <button type="button" className={cn(s.card, { [s.selected]: selected})} {...rest}>
      {children}
    </button>
  );
}
