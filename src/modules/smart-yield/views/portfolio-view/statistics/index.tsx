import Card from 'components/antd/card';
import { Paragraph, Small, Heading } from 'components/custom/typography';
import Grid from 'components/custom/grid';

export default function PortfolioStatistics() {
  return (
    <Grid gap={32} >
      <Card>
        <Paragraph type="p1" semiBold color="grey900">Portfolio balance</Paragraph>
      </Card>
      <Card>
        <Paragraph type="p1" semiBold color="grey900">Portfolio value</Paragraph>
      </Card>
      <Card>
        <Paragraph type="p1" semiBold color="grey900">Transaction history</Paragraph>
      </Card>
    </Grid>
  );
}
