import React from 'react';
import { Link } from 'react-router-dom';
import AntdForm from 'antd/lib/form';
import AntdSwitch from 'antd/lib/switch';
import BigNumber from 'bignumber.js';
import Erc20Contract from 'web3/erc20Contract';
import { formatToken } from 'web3/utils';

import Alert from 'components/antd/alert';
import Button from 'components/antd/button';
import Form from 'components/antd/form';
import GasFeeList from 'components/custom/gas-fee-list';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import TokenAmount from 'components/custom/token-amount';
import { Text } from 'components/custom/typography';
import { useConfig } from 'components/providers/configProvider';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import useMergeState from 'hooks/useMergeState';
import { useDAO } from 'modules/governance/components/dao-provider';

import WalletDepositConfirmModal from './components/wallet-deposit-confirm-modal';

type DepositFormData = {
  amount?: BigNumber;
  gasPrice?: {
    value: number;
  };
};

const InitialFormValues: DepositFormData = {
  amount: undefined,
  gasPrice: undefined,
};

type WalletDepositViewState = {
  showDepositConfirmModal: boolean;
  enabling: boolean;
  enabled?: boolean;
  saving: boolean;
  // expanded: boolean;
};

const InitialState: WalletDepositViewState = {
  showDepositConfirmModal: false,
  enabling: false,
  enabled: undefined,
  saving: false,
  // expanded: false,
};

const WalletDepositView: React.FC = () => {
  const config = useConfig();
  const daoCtx = useDAO();
  const { projectToken } = useKnownTokens();
  const [form] = AntdForm.useForm<DepositFormData>();

  const [state, setState] = useMergeState<WalletDepositViewState>(InitialState);

  const { balance: stakedBalance, userLockedUntil } = daoCtx.daoBarn;
  const bondBalance = (projectToken.contract as Erc20Contract).balance?.unscaleBy(projectToken.decimals);
  const barnAllowance = (projectToken.contract as Erc20Contract).getAllowanceOf(config.contracts.dao?.barn!);
  const isLocked = (userLockedUntil ?? 0) > Date.now();

  async function handleSwitchChange(checked: boolean) {
    setState({ enabling: true });

    try {
      await (projectToken.contract as Erc20Contract).approve(config.contracts.dao?.barn!, checked);
    } catch {}

    setState({ enabling: false });
  }

  async function handleSubmit(values: DepositFormData) {
    const { amount, gasPrice } = values;

    if (!amount || !gasPrice) {
      return;
    }

    setState({ saving: true });

    try {
      await daoCtx.daoBarn.actions.deposit(amount, gasPrice.value);
      form.setFieldsValue(InitialFormValues);
      daoCtx.daoBarn.reload();
      (projectToken.contract as Erc20Contract).loadBalance().catch(Error);
    } catch {}

    setState({ saving: false });
  }

  function handleFinish(values: DepositFormData) {
    if (isLocked) {
      setState({ showDepositConfirmModal: true });
      return;
    }

    handleSubmit(values);
  }

  React.useEffect(() => {
    const isEnabled = barnAllowance?.gt(BigNumber.ZERO) ?? false;

    setState({
      enabled: isEnabled,
      // expanded: isEnabled,
    });
  }, [barnAllowance]);

  return (
    <div className="card">
      <div className="card-header flex wrap col-gap-64">
        <Grid flow="col" gap={12}>
          <Icon name={projectToken.icon!} width={40} height={40} />
          <Text type="p1" weight="semibold" color="primary">
            BOND
          </Text>
        </Grid>

        <Grid flow="row" gap={4}>
          <Text type="small" weight="semibold" color="secondary">
            Staked Balance
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            {formatToken(stakedBalance)}
          </Text>
        </Grid>

        <Grid flow="row" gap={4}>
          <Text type="small" weight="semibold" color="secondary">
            Wallet Balance
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            {formatToken(bondBalance)}
          </Text>
        </Grid>

        <Grid flow="row" gap={4}>
          <Text type="small" weight="semibold" color="secondary">
            Enable Token
          </Text>
          <AntdSwitch
            style={{ justifySelf: 'flex-start' }}
            checked={state.enabled}
            loading={state.enabled === undefined || state.enabling}
            onChange={handleSwitchChange}
          />
        </Grid>
        {config.features.faucets && (
          <Link to="/faucets" className="button-ghost ml-auto">
            Faucets
          </Link>
        )}
      </div>

      <Form
        className="p-24"
        form={form}
        initialValues={InitialFormValues}
        validateTrigger={['onSubmit']}
        onFinish={handleFinish}>
        <Grid flow="row" gap={32}>
          <Grid flow="col" gap={64} colsTemplate="1fr 1fr">
            <Grid flow="row" gap={32}>
              <Form.Item name="amount" label="Amount" rules={[{ required: true, message: 'Required' }]}>
                <TokenAmount
                  tokenIcon={projectToken.icon!}
                  max={bondBalance}
                  maximumFractionDigits={projectToken.decimals}
                  displayDecimals={4}
                  disabled={state.saving}
                  slider
                />
              </Form.Item>
              <Alert message="Deposits made after you have an ongoing lock will be added to the locked balance and will be subjected to the same lock timer." />
            </Grid>
            <Grid flow="row">
              <Form.Item
                name="gasPrice"
                label="Gas Fee (Gwei)"
                hint="This value represents the gas price you're willing to pay for each unit of gas. Gwei is the unit of ETH typically used to denominate gas prices and generally, the more gas fees you pay, the faster the transaction will be mined."
                rules={[{ required: true, message: 'Required' }]}>
                <GasFeeList disabled={state.saving} />
              </Form.Item>
            </Grid>
          </Grid>
          <Button
            type="primary"
            htmlType="submit"
            loading={state.saving}
            disabled={!state.enabled}
            style={{ justifySelf: 'start' }}>
            Deposit
          </Button>
        </Grid>
      </Form>

      {state.showDepositConfirmModal && (
        <WalletDepositConfirmModal
          deposit={form.getFieldsValue().amount}
          lockDuration={userLockedUntil}
          onCancel={() => setState({ showDepositConfirmModal: false })}
          onOk={() => {
            setState({ showDepositConfirmModal: false });
            return handleSubmit(form.getFieldsValue());
          }}
        />
      )}
    </div>
  );
};

export default WalletDepositView;
