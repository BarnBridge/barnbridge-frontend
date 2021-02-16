import { Paragraph, Small } from "components/custom/typography";
import Grid from "components/custom/grid";
import IconBubble from "components/custom/icon-bubble";

export default function MarketCoinCard() {
  return (
    <Grid flow="col" gap={16} align="center">
      <IconBubble name="usdc-token" bubbleName="compound" />
      <Grid flow="row" gap={4} className="ml-auto">
        <div>
          <Paragraph type="p1" semiBold color="primary">
            USD Coin
          </Paragraph>
          {' '}
          <Paragraph type="p1" semiBold>
            (USDC)
          </Paragraph>
        </div>
        <Small semiBold>Compound</Small>
      </Grid>
    </Grid>
  );
}
