import React from 'react';
import * as Antd from 'antd';

import Button from 'components/antd/button';
import Form from 'components/antd/form';
import Modal, { ModalProps } from 'components/antd/modal';
import GasFeeList from 'components/custom/gas-fee-list';
import Grid from 'components/custom/grid';
import useMergeState from 'hooks/useMergeState';

import s from './styles.module.scss';
import { useTokenPool } from 'modules/smart-yield/providers/token-pool-provider';
import { getHumanValue, getNonHumanValue, ZERO_BIG_NUMBER } from 'web3/utils';
import BigNumber from 'bignumber.js';

type FormState = {
  gasPrice?: {
    value: number;
  };
};

const InitialFormValues: FormState = {
  gasPrice: undefined,
};

type Props = ModalProps & {
  type?: 'regular' | 'instant';
  payload?: any;
};

type State = {
  submitting: boolean;
};

const InitialState: State = {
  submitting: false,
};

const ConfirmWithdrawalModal: React.FC<Props> = props => {
  const { type, payload, ...modalProps } = props;

  const [form] = Antd.Form.useForm<FormState>();

  const tokenPool = useTokenPool();
  const [state, setState] = useMergeState<State>(InitialState);

  async function handleSubmit(values: FormState) {
    setState({ submitting: true });

    const { gasPrice } = values;

    try {
      await form.validateFields();

      if (type === 'regular') {
        await tokenPool.sy?.loadAbond();
        const amount = getNonHumanValue(new BigNumber(payload.to), tokenPool.sy?.decimals);
        const maxMaturesAt = 1 + (tokenPool.sy?.abond?.maturesAt ?? 0);
        const deadline = Math.round(Date.now() / 1_000) + 1200;

        await tokenPool.actions.juniorRegularWithdraw(
          amount,
          maxMaturesAt,
          deadline,
          gasPrice?.value ?? 0,
        );
      } else if (type === 'instant') {
        const amount = getNonHumanValue(new BigNumber(payload.from), tokenPool.sy?.decimals);
        const debtShare = amount.dividedBy(tokenPool.sy?.totalSupply ?? 1);
        const forfeits = tokenPool.sy?.abondDebt?.multipliedBy(debtShare).dividedBy(1e18) ?? ZERO_BIG_NUMBER;
        const toPay = amount.multipliedBy(tokenPool.sy?.price ?? 1).dividedBy(1e18).minus(forfeits);
        const minUnderlying = new BigNumber(toPay.multipliedBy(1 - 0.005).toFixed(0)); // slippage ?? rounding mode
        const deadline = Math.round(Date.now() / 1_000) + 1200;

        // uint256 debtShare = tokenAmount_ * 1e18 / SY.totalSupply();
        // uint256 forfeits = (SY.abondDebt() * debtShare) / 1e18;
        // uint256 toPay = (tokenAmount_ * SY.price()) / 1e18 - forfeits;
        // minUnderlying => toPay - slippage

        await tokenPool.actions.juniorInstantWithdraw(
          amount,
          minUnderlying,
          deadline,
          gasPrice?.value ?? 0,
        );
      }

      props.onCancel?.();
    } catch {
    }

    setState({ submitting: false });
  }

  return (
    <Modal className={s.component} width={560} title="Confirm your withdrawal" {...modalProps}>
      <Form
        form={form}
        initialValues={InitialFormValues}
        validateTrigger={['onSubmit', 'onChange']}
        onFinish={handleSubmit}>
        <Grid flow="row" gap={32} className={s.row}>
          <Form.Item name="gasPrice" label="Gas Fee (Gwei)" rules={[{ required: true, message: 'Required' }]}>
            <GasFeeList disabled={state.submitting} />
          </Form.Item>

          <Button htmlType="submit" type="primary" loading={state.submitting} className={s.actionBtn}>
            Confirm withdrawal initiation
          </Button>
        </Grid>
      </Form>
    </Modal>
  );
};

export default ConfirmWithdrawalModal;
