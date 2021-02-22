import cn from 'classnames';
import { Text } from "components/custom/typography";
import Grid from "components/custom/grid";

import s from './s.module.scss';

export type Props = {
  title: string;
  subtitle: string;
  icon: any;
  className?: string;
  tag?: 'button' | 'a';
  active?: boolean;
};

export default function TabCard({ title, subtitle, icon, className, tag = "button", active = false, ...rest }: Props) {
  let Component = tag;

  return (
    <Component className={cn(s.container, className, { [s.active]: active })} {...rest}>
      <div className={s.icon}>
        {icon}
      </div>
      <Grid flow="row">
        <Text type="p1" weight="semibold" color="primary">
          {title}
        </Text>
        <Text type="small" weight="semibold" color="secondary">{subtitle}</Text>
      </Grid>
    </Component>
  )
}
