import Card  from "components/antd/card";
import { Paragraph, Small, Text } from "components/custom/typography";
import Grid from "components/custom/grid";
import s from './s.module.scss';


export default function PoolDetails() {
  return (
    <Card noPaddingBody>
      <div className={s.detailsRow}>
        <Text type="p1" weight="semibold" color="primary">
          Pool details
        </Text>
      </div>
      <Card.Delimiter />
      <Grid flow="col" gap={32} className={s.detailsRow} colsTemplate="1fr 1fr">
        <Grid flow="row">
          <Text type="small" weight="semibold" color="secondary" className="mb-4">Junior Liquidity</Text>
          <Text type="p1" weight="semibold" color="primary">812.33 M</Text>
        </Grid>
        <Grid flow="row">
          <Text type="small" weight="semibold" color="secondary" className="mb-4">Senior Liquidity</Text>
          <Text type="p1" weight="semibold" color="primary">1,322.16 M</Text>
        </Grid>
      </Grid>
      <Card.Delimiter />
      <Grid flow="col" gap={32} className={s.detailsRow} colsTemplate="1fr 1fr">
        <Grid flow="row">
          <Text type="small" weight="semibold" color="secondary" className="mb-4"># of juniors</Text>
          <Text type="p1" weight="semibold" color="primary">3,148</Text>
        </Grid>
        <Grid flow="row">
          <Text type="small" weight="semibold" color="secondary" className="mb-4"># of seniors</Text>
          <Text type="p1" weight="semibold" color="primary">5,731</Text>
        </Grid>
      </Grid>
      <Card.Delimiter />
      <Grid flow="col" gap={32} className={s.detailsRow} colsTemplate="1fr 1fr">
        <Grid flow="row">
          <Text type="small" weight="semibold" color="secondary" className="mb-4">Junior APY</Text>
          <Text type="p1" weight="semibold" color="purple">21.33%</Text>
        </Grid>
        <Grid flow="row">
          <Text type="small" weight="semibold" color="secondary" className="mb-4">Senior APY</Text>
          <Text type="p1" weight="semibold" color="green">6.42%</Text>
        </Grid>
      </Grid>
      <Card.Delimiter />
      <Grid flow="col" gap={32} className={s.detailsRow} colsTemplate="1fr 1fr">
        <Grid flow="row">
          <Text type="small" weight="semibold" color="secondary" className="mb-4">Junior liquidity locked</Text>
          <Text type="p1" weight="semibold" color="primary">131.42 M</Text>
        </Grid>
        <Grid flow="row">
          <Text type="small" weight="semibold" color="secondary" className="mb-4">Average senior maturity</Text>
          <Text type="p1" weight="semibold" color="primary">2mnths 3d 4h</Text>
        </Grid>
      </Grid>
    </Card>
  );
}
