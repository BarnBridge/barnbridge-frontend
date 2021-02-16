import React from 'react';
import * as Antd from 'antd';
import cx from 'classnames';

import Button from 'components/antd/button';
import PopoverMenu, { PopoverMenuItem } from 'components/antd/popover-menu';
import { Paragraph, Small } from 'components/custom/typography';
import ExpandableCard, {
  ExpandableCardProps,
} from 'components/custom/expandable-card';
import Grid from 'components/custom/grid';
import ExternalLink from 'components/custom/externalLink';
import Icons from 'components/custom/icon';

import { getEtherscanAddressUrl, shortenAddr } from 'web3/utils';
import {
  AbiDecodeResult,
  AbiFunctionFragment,
  AbiInterface,
} from 'web3/abiInterface';

import s from './styles.module.scss';

export type ProposalActionCardProps = ExpandableCardProps & {
  title: React.ReactNode;
  target: string;
  signature: string;
  callData: string;
  showSettings?: boolean;
  onDeleteAction?: Function;
  onEditAction?: Function;
};

const ProposalActionCard: React.FunctionComponent<ProposalActionCardProps> = props => {
  const {
    className,
    title,
    target,
    signature,
    callData,
    showSettings,
    onDeleteAction,
    onEditAction,
    children,
    ...cardProps
  } = props;

  const [ellipsis, setEllipsis] = React.useState<boolean>(false);
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [isSignature, showSignature] = React.useState<boolean>(false);

  const functionFragment = React.useMemo<AbiFunctionFragment | undefined>(() => {
    return AbiInterface.getFunctionFragmentFrom(signature);
  }, [signature]);

  const functionParamValues = React.useMemo<AbiDecodeResult | undefined>(() => {
    if (!functionFragment) {
      return [];
    }

    return AbiInterface.decodeFunctionData(functionFragment, callData) ?? [];
  }, [functionFragment, callData]);

  const stringParams = React.useMemo<string>(() => {
    const params = functionParamValues?.map(param =>
      AbiInterface.stringifyParamValue(param),
    );
    return params?.join(',\n') ?? '';
  }, [functionParamValues]);

  const etherscanLink = React.useMemo<string>(() => {
    return `${getEtherscanAddressUrl(target)}#writeContract`;
  }, [target]);

  const ActionMenuItems: PopoverMenuItem[] = [
    {
      key: 'sig',
      icon: <Icons name="chevron-right" />,
      title: (
        <Paragraph type="p1" semiBold>
          {isSignature ? 'Show transaction' : 'Show function signature'}
        </Paragraph>
      ),
    },
    {
      key: 'edit',
      icon: <Icons name="pencil-outlined" />,
      title: 'Edit action',
    },
    {
      key: 'delete',
      icon: <Icons name="bin-outlined" color="red" />,
      title: (
        <Paragraph type="p1" semiBold color="red">
          Delete action
        </Paragraph>
      ),
    },
  ];

  function handleEllipsis(isEllipsis: boolean) {
    setEllipsis(isEllipsis);

    if (isEllipsis) {
      setExpanded(!isEllipsis);
    }
  }

  function handleShowSignature() {
    showSignature(prevState => !prevState);
  }

  function handleExpand() {
    setExpanded(prevState => !prevState);
  }

  function handleActionMenu(key: string) {
    if (key === 'sig') {
      handleShowSignature();
    } else if (key === 'edit') {
      onEditAction?.();
    } else if (key === 'delete') {
      onDeleteAction?.();
    }
  }

  return (
    <ExpandableCard
      title={
        <Paragraph type="p2" semiBold color="primary">
          {title}
        </Paragraph>
      }
      extra={
        showSettings ? (
          <PopoverMenu
            items={ActionMenuItems}
            placement="bottomLeft"
            onClick={key => handleActionMenu(String(key))}>
            <Button type="link" icon={<Icons name="gear" />} />
          </PopoverMenu>
        ) : (
          <Button type="link" onClick={handleShowSignature}>
            <Small semiBold color="secondary">
              {isSignature ? 'Show transaction' : 'Show function signature'}
            </Small>
          </Button>
        )
      }
      footer={
        ellipsis || expanded ? (
          <Grid flow="col" align="center" justify="center">
            <Button type="link" onClick={handleExpand}>
              <Small semiBold color="secondary">
                {expanded ? 'Hide details' : 'Show more'}
              </Small>
            </Button>
          </Grid>
        ) : null
      }
      {...cardProps}>
      <div className={s.content}>
        <ExternalLink href={etherscanLink}>
          <Paragraph type="p1" semiBold className={s.address} color="blue">
            {shortenAddr(target)}
          </Paragraph>
        </ExternalLink>
        {signature && (
          <Antd.Typography.Paragraph
            className={cx(s.paragraph, expanded && s.expanded)}
            style={{ maxWidth: '514px' }}
            ellipsis={{
              rows: expanded ? 9999 : 2,
              expandable: false,
              onEllipsis: handleEllipsis,
            }}>.
            {isSignature
              ? signature
              : `${functionFragment?.name}(${stringParams})`}
          </Antd.Typography.Paragraph>
        )}
      </div>
    </ExpandableCard>
  );
};

export default ProposalActionCard;
