import { Text } from "components/custom/typography";
import Grid from "components/custom/grid";
import IconBubble from "components/custom/icon-bubble";

export default function MarketCoinCard() {
  return (
    <Grid flow="col" gap={16} align="center">
      <IconBubble name="usdc-token" bubbleName="compound" />
      <Grid flow="row" gap={4} className="ml-auto">
        <div>
          <Text type="p1" weight="semibold" color="primary">
            USD Coin
          </Text>
          {' '}
          <Text type="p1" weight="semibold">
            (USDC)
          </Text>
        </div>
        <Text type="small" weight="semibold">Compound</Text>
      </Grid>
    </Grid>
  );
}
