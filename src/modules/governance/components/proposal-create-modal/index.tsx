import React from 'react';
import * as Antd from 'antd';
import Web3 from 'web3';

import Modal, { ModalProps } from 'components/antd/modal';
import Form from 'components/antd/form';
import Button from 'components/antd/button';
import Input from 'components/antd/input';
import Textarea from 'components/antd/textarea';
import Select from 'components/antd/select';
import YesNoSelector from 'components/antd/yes-no-selector';
import Alert from 'components/antd/alert';
import { Heading } from 'components/custom/typography';
import NumericInput from 'components/custom/numeric-input';

import { useWeb3Contracts } from 'web3/contracts';
import Web3Contract, { Web3ContractAbiItem } from 'web3/contract';
import { fetchContractABI } from 'web3/utils';
import { useReload } from 'hooks/useReload';

import s from './styles.module.scss';

export type ProposalActionCreateForm = {
  targetAddress?: string;
  addValueAttribute?: boolean;
  actionValue?: string;
  addFunctionCall?: boolean;
  functionName?: string;
  functionArgs?: Record<string, any>;
  contract?: Web3Contract;
};

const InitialFormValues: ProposalActionCreateForm = {
  targetAddress: '',
  addValueAttribute: undefined,
  actionValue: undefined,
  addFunctionCall: undefined,
  functionName: undefined,
  functionArgs: undefined,
};

export type ProposalActionCreateModalProps = ModalProps & {
  edit?: boolean;
  onSubmit: (values: ProposalActionCreateForm) => void;
};

const ProposalActionCreateModal: React.FunctionComponent<ProposalActionCreateModalProps> = props => {
  const { edit = false } = props;

  const [reload] = useReload();
  const [form] = Antd.Form.useForm<ProposalActionCreateForm>();
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [contract, setContract] = React.useState<Web3Contract | undefined>();

  const formValues = form.getFieldsValue();

  async function handleSubmit(values: ProposalActionCreateForm) {
    setSubmitting(true);

    let cancel = false;

    try {
      await props.onSubmit(values);
      form.resetFields();
      cancel = true;
    } catch {
      //
    }

    setSubmitting(false);

    if (cancel) {
      props.onCancel?.();
    }
  }

  React.useEffect(() => {
    const { addFunctionCall, targetAddress } = formValues;

    setContract(undefined);

    if (addFunctionCall && targetAddress && Web3.utils.isAddress(targetAddress)) {
      fetchContractABI(targetAddress)
        .then((results: any[]) => {
          setContract(new Web3Contract(results, targetAddress, targetAddress));
        });
    }
  }, [formValues.addFunctionCall, formValues.targetAddress]);

  const selectedFunction = React.useMemo<Web3ContractAbiItem | undefined>(() => {
    return (contract?.writeFunctions as Array<any>)?.find(fn => fn.name === formValues.functionName);
  }, [contract, formValues.functionName]);

  function handleValuesChange(values: Partial<ProposalActionCreateForm>) {
    const changedField = Object.keys(values)[0];

    switch (changedField) {
      case 'addFunctionCall':
        form.setFieldsValue({
          functionName: undefined,
          functionArgs: undefined,
        });
        break;
      case 'functionName':
        form.setFieldsValue({
          functionArgs: {},
        });
        break;
    }

    reload();
  }

  return (
    <Modal className={s.component} {...props}>
      <div className={s.wrap}>
        <Heading type="h2" semiBold className={s.headerLabel}>
          {edit ? 'Edit action' : 'Add new action'}
        </Heading>

        <Form
          className={s.form}
          form={form}
          initialValues={InitialFormValues}
          validateTrigger={['onSubmit', 'onChange']}
          onValuesChange={handleValuesChange}
          onFinish={handleSubmit}>
          <Form.Item
            name="targetAddress"
            label="Target address"
            rules={[
              { required: true, message: 'Required' },
            ]}>
            <Input disabled={submitting} />
          </Form.Item>
          <Form.Item
            name="addValueAttribute"
            label="Add a value attribute to your action?">
            <YesNoSelector />
          </Form.Item>
          {formValues.addValueAttribute && (
            <Form.Item
              name="actionValue"
              label="Action value"
              rules={[
                { required: true, message: 'Required' },
              ]}>
              <Input disabled={submitting} />
            </Form.Item>
          )}
          <Form.Item
            name="addFunctionCall"
            label="Add a function call to your action?">
            <YesNoSelector />
          </Form.Item>
          {formValues.addFunctionCall && (
            <>
              <Form.Item
                name="functionName"
                label="Select function"
                rules={[
                  { required: true, message: 'Required' },
                ]}>
                <Select
                  loading
                  options={contract?.writeFunctions.map(fn => ({
                    label: fn.name!,
                    value: fn.name!,
                  })) ?? []}
                  disabled={submitting} />
              </Form.Item>
              {selectedFunction && (
                <>
                  {selectedFunction.inputs?.map(methodInput => (
                    <Form.Item
                      key={methodInput.name}
                      name={['functionArgs', methodInput.name]}
                      label={`${methodInput.name} (${methodInput.type})`}
                      rules={[
                        { required: true, message: 'Required' },
                      ]}>
                      <Input disabled={submitting} placeholder={`${methodInput.name} (${methodInput.type})`} />
                    </Form.Item>
                  ))}
                  {selectedFunction.inputs?.length! > 0 && (
                    <Form.Item label={`Function type: ${formValues.functionName}`}>
                      <Textarea
                        className={s.textarea}
                        rows={5}
                        value={`Parameters:\n${JSON.stringify(selectedFunction.inputs, null, 2)}`}
                        disabled />
                    </Form.Item>
                  )}
                  <Form.Item label="Hex data">
                    <Textarea
                      className={s.textarea}
                      rows={5}
                      placeholder="Fill in the arguments above"
                      value={contract?.getHexFor(selectedFunction.name!, ...selectedFunction.inputs?.map(input => {
                        return formValues.functionArgs?.[input.name] ?? '';
                      }) ?? []) ?? ''}
                      disabled />
                  </Form.Item>
                </>
              )}
            </>
          )}

          {formValues.targetAddress && !contract && (
            <Alert
              type="error"
              message="The target address you entered is not a validated contract address. Please check the information you entered and try again" />
          )}

          {formValues.addValueAttribute === false && formValues.addFunctionCall === false && (
            <Alert
              type="error"
              message="You need to provide at least one: a value attribute or a function call to your action" />
          )}

          <div className={s.actions}>
            <Button
              type="default"
              disabled={submitting}
              className={s.cancelBtn}
              onClick={props.onCancel}>
              {edit ? 'Cancel Changes' : 'Cancel'}
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              className={s.saveBtn}>
              {edit ? 'Save Changes' : 'Add Action'}
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ProposalActionCreateModal;
