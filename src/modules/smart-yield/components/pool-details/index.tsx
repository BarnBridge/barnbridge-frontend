import Card from "components/antd/card";
import { Paragraph, Small } from "components/custom/typography";
import Grid from "components/custom/grid";
import s from './s.module.scss';


export default function PoolDetails() {
  return (
    <Card noPaddingBody>
      <div className={s.detailsRow}>
        <Paragraph type="p1" semiBold>
          Pool details
        </Paragraph>
      </div>
      <Grid flow="col" gap={32} className={s.detailsRow} colsTemplate="1fr 1fr">
        <Grid flow="row">
          <Small semiBold>Junior Liquidity</Small>
          <Paragraph type="p1" semiBold color="grey900">
            812.33 M
          </Paragraph>
        </Grid>
        <Grid flow="row">
          <Small semiBold>Senior Liquidity</Small>
          <Paragraph type="p1" semiBold color="grey900">
            1,322.16 M
          </Paragraph>
        </Grid>
      </Grid>
      <Grid flow="col" gap={32} className={s.detailsRow} colsTemplate="1fr 1fr">
        <Grid flow="row">
          <Small semiBold># of juniors</Small>
          <Paragraph type="p1" semiBold color="grey900">
            3,148
          </Paragraph>
        </Grid>
        <Grid flow="row">
          <Small semiBold># of seniors</Small>
          <Paragraph type="p1" semiBold color="grey900">
            5,731
          </Paragraph>
        </Grid>
      </Grid>
    </Card>
  );
}
