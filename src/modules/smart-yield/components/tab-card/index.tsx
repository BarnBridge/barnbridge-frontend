import cn from 'classnames';
import { Paragraph, Small } from "components/custom/typography";
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
    <Component className={cn(s.container, className, {[s.active]: active})} {...rest}>
      <div className={s.icon}>
        {icon}
      </div>
      <Grid flow="row">
        <Paragraph type="p1" semiBold color="primary">
          {title}
        </Paragraph>
        <Small semiBold color="secondary">{subtitle}</Small>
      </Grid>
    </Component>
  )
}

export function TabCard2({ title, subtitle, icon, className, tag = "button", active = false, ...rest }: Props) {
  let Component = tag;

  return (
    <Component className={cn(s.container, className, {[s.active]: active})} {...rest}>
      <div className={s.icon}>
        {icon}
      </div>
      <Grid flow="row">
        <Paragraph type="p1" semiBold color="primary">
          {title}
        </Paragraph>
        <Small semiBold color="secondary">{subtitle}</Small>
      </Grid>
    </Component>
  )
}
