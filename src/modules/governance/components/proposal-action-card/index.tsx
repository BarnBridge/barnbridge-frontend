import React from 'react';
import * as Antd from 'antd';
import cx from 'classnames';

import Button from 'components/antd/button';
import PopoverMenu, { PopoverMenuItem } from 'components/antd/popover-menu';
import { Text } from 'components/custom/typography';
import ExpandableCard, { ExpandableCardProps } from 'components/custom/expandable-card';
import Grid from 'components/custom/grid';
import ExternalLink from 'components/custom/externalLink';
import Icons from 'components/custom/icon';

import { getEtherscanAddressUrl, shortenAddr } from 'web3/utils';
import { AbiDecodeResult, AbiFunctionFragment, AbiInterface } from 'web3/abiInterface';

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

const ProposalActionCard: React.FC<ProposalActionCardProps> = props => {
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
        <Text type="p1" weight="semibold">
          {isSignature ? 'Show transaction' : 'Show function signature'}
        </Text>
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
        <Text type="p1" weight="semibold" color="red">
          Delete action
        </Text>
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
        <Text type="p2" weight="semibold" color="primary">
          {title}
        </Text>
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
            <Text type="small" weight="semibold" color="secondary">
              {isSignature ? 'Show transaction' : 'Show function signature'}
            </Text>
          </Button>
        )
      }
      footer={
        ellipsis || expanded ? (
          <Grid flow="col" align="center" justify="center">
            <Button type="link" onClick={handleExpand}>
              <Text type="small" weight="semibold" color="secondary">
                {expanded ? 'Hide details' : 'Show more'}
              </Text>
            </Button>
          </Grid>
        ) : null
      }
      {...cardProps}>
      <div className={s.content}>
        <ExternalLink href={etherscanLink}>
          <Text type="p1" weight="semibold" className={s.address} color="blue">
            {shortenAddr(target)}
          </Text>
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
