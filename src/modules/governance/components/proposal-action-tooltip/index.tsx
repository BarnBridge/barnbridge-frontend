import React from 'react';
import * as Antd from 'antd';

import Grid from 'components/custom/grid';
import { Label, Paragraph, Small } from 'components/custom/typography';
import ExternalLink from 'components/custom/externalLink';

import { getEtherscanAddressUrl, shortenAddr } from 'web3/utils';
import { AbiDecodeResult, AbiFunctionFragment, AbiInterface } from 'web3/abiInterface';

export type ProposalActionTooltipProps = {
  target: string;
  signature: string;
  callData: string;
  value: string;
};

const ProposalActionTooltip: React.FunctionComponent<ProposalActionTooltipProps> = props => {
  const { target, signature, callData, value } = props;

  const functionFragment = React.useMemo<AbiFunctionFragment | undefined>(() => {
    return AbiInterface.getFunctionFragmentFrom(signature);
  }, [signature]);

  const functionParamValues = React.useMemo<AbiDecodeResult | undefined>(() => {
    if (!functionFragment) {
      return [];
    }

    return AbiInterface.decodeFunctionData(functionFragment, callData) ?? [];
  }, [functionFragment, callData]);

  const etherscanLink = React.useMemo<string>(() => {
    return `${getEtherscanAddressUrl(target)}#writeContract`;
  }, [target]);

  return (
    <Antd.Tooltip title={(
      <Grid flow="row" gap={12}>
        <Grid flow="row" gap={4} align="center">
          <Label type="lb2" bold color="grey900">Contract address:</Label>
          <Small semiBold color="grey500" wrap>{target}</Small>
        </Grid>

        {value !== '0' && (
          <Grid flow="row" gap={4} align="center">
            <Label type="lb2" bold color="grey900">Action value:</Label>
            <Small semiBold color="grey500" wrap>{value}</Small>
          </Grid>
        )}

        <Grid flow="row" gap={4} align="center">
          <Label type="lb2" bold color="grey900">Function signature:</Label>
          <Small semiBold color="grey500" wrap>{signature}</Small>
        </Grid>

        {functionParamValues && functionParamValues.length > 0 && (
          <Grid flow="row" gap={4} align="center">
            <Label type="lb2" bold color="grey900">Function arguments:</Label>
            {functionParamValues.map((param, index) => {
              const paramValue = AbiInterface.stringifyParamValue(param);
              const { type } = functionFragment!.inputs[index];

              return (
                <Grid key={index} flow="col" gap={8} align="center">
                  {index + 1}. | {type} |
                  <Small semiBold color="grey500" wrap>
                    {paramValue}
                  </Small>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Grid>
    )}>
      <ExternalLink href={etherscanLink}>
        <Grid flow="col" wrap>
          <Paragraph type="p1" semiBold color="blue500">
            {shortenAddr(target)}
          </Paragraph>
          <Paragraph type="p1" color="red500">
            .{signature}
          </Paragraph>
        </Grid>
      </ExternalLink>
    </Antd.Tooltip>
  );
};

export default ProposalActionTooltip;
