import React from 'react';
import * as Antd from 'antd';
import { FormInstance } from 'antd/lib/form';

import Modal, { ModalProps } from 'components/antd/modal';
import Form from 'components/antd/form';
import Button from 'components/antd/button';
import Input from 'components/antd/input';
import Textarea from 'components/antd/textarea';
import Select from 'components/antd/select';
import YesNoSelector from 'components/antd/yes-no-selector';
import Alert from 'components/antd/alert';
import Grid from 'components/custom/grid';
import { Heading, Small } from 'components/custom/typography';
import AddZerosPopup from '../add-zeros-popup';

import { fetchContractABI } from 'web3/utils';
import { AbiFunctionFragment, AbiInterface } from 'web3/abiInterface';

import s from './styles.module.scss';
import Web3Contract from '../../../../web3/contract';

export type ProposalActionCreateForm = {
  targetAddress: string;
  isProxyAddress: boolean;
  implementationAddress: string;
  addValueAttribute?: boolean;
  actionValue: string;
  addFunctionCall?: boolean;
  abiLoading: boolean;
  abiInterface?: AbiInterface,
  functionSignature?: string;
  functionMeta?: AbiFunctionFragment;
  functionParams: Record<string, any>;
  functionStrParams: string;
  functionEncodedParams: string;
};

const InitialFormValues: ProposalActionCreateForm = {
  targetAddress: '0x19cFBFd65021af353aB8A7126Caf51920163f0D2',
  isProxyAddress: true,
  implementationAddress: '0xED5B6c65140FA8681c3DFf6BA5EFDb7334dff870',
  addValueAttribute: false,
  actionValue: '',
  addFunctionCall: false,
  abiLoading: false,
  abiInterface: undefined,
  functionSignature: '',
  functionMeta: undefined,
  functionParams: {},
  functionStrParams: '',
  functionEncodedParams: '',
};

export type ProposalActionCreateModalProps = ModalProps & {
  edit?: boolean;
  onSubmit: (values: ProposalActionCreateForm) => void;
};

const ProposalActionCreateModal: React.FunctionComponent<ProposalActionCreateModalProps> = props => {
  const { edit = false } = props;
  const [form] = Antd.Form.useForm<ProposalActionCreateForm>();

  const [isSubmitting, setSubmitting] = React.useState<boolean>(false);

  async function handleSubmit(values: ProposalActionCreateForm) {
    setSubmitting(true);

    let cancel = false;

    try {
      await form.validateFields();

      if (values.addFunctionCall) {
        const encodedFunction = values.abiInterface?.encodeFunctionData(values.functionMeta!, Object.values(values.functionParams)
          .map(dt => {
            try {
              return JSON.parse(dt);
            } catch {
              return dt;
            }
          }));

        await Web3Contract.tryCall(
          values.targetAddress,
          String(process.env.REACT_APP_CONTRACT_DAO_GOVERNANCE_ADDR),
          encodedFunction!,
          values.actionValue);
      }

      await props.onSubmit(values);
      form.resetFields();
      cancel = true;
    } catch (e) {
      Antd.notification.error({
        message: e.message,
      });
    }

    setSubmitting(false);

    if (cancel) {
      props.onCancel?.();
    }
  }

  function loadAbiInterface(address: string) {
    form.setFieldsValue({
      abiLoading: true,
    });

    fetchContractABI(address)
      .then((abi: any[]) => {
        form.setFieldsValue({
          abiInterface: new AbiInterface(abi),
        });
      })
      .catch(Error)
      .then(() => {
        form.setFieldsValue({
          abiLoading: false,
        });
      });
  }

  function handleFormValuesChange(values: Partial<ProposalActionCreateForm>, allValues: ProposalActionCreateForm) {
    const {
      targetAddress,
      isProxyAddress,
      implementationAddress,
      addFunctionCall,
      abiInterface,
      functionSignature,
      functionMeta,
      functionParams,
    } = allValues;

    Object.keys(values)
      .forEach((fieldName: string) => {
        if (fieldName === 'targetAddress' || fieldName === 'implementationAddress') {
          form.setFieldsValue({
            abiLoading: false,
            abiInterface: undefined,
            functionSignature: '',
            functionMeta: undefined,
            functionParams: {},
            functionStrParams: '',
            functionEncodedParams: '',
          });

          const address = implementationAddress || targetAddress;

          if (addFunctionCall === true && address) {
            loadAbiInterface(address);
          }
        } else if (fieldName === 'isProxyAddress') {
          if (!isProxyAddress && implementationAddress) {
            form.setFieldsValue({
              abiLoading: false,
              abiInterface: undefined,
              functionSignature: '',
              functionMeta: undefined,
              functionParams: {},
              functionStrParams: '',
              functionEncodedParams: '',
            });

            if (addFunctionCall === true && targetAddress) {
              loadAbiInterface(targetAddress);
            }
          }
        } else if (fieldName === 'addValueAttribute') {
          form.setFieldsValue({
            actionValue: '',
          });
        } else if (fieldName === 'addFunctionCall') {
          form.setFieldsValue({
            abiLoading: false,
            abiInterface: undefined,
            functionSignature: '',
            functionMeta: undefined,
            functionParams: {},
            functionStrParams: '',
            functionEncodedParams: '',
          });

          const address = implementationAddress || targetAddress;

          if (addFunctionCall === true && address) {
            loadAbiInterface(address);
          }
        } else if (fieldName === 'functionSignature') {
          const selectedFunctionMeta = (abiInterface?.writableFunctions ?? [])
            .find(fn => fn.format() === functionSignature);
          let functionStrParams = '';

          if (selectedFunctionMeta) {
            const params = selectedFunctionMeta.inputs.map(({ name, type }) => ({ name, type }));
            const paramsStr = JSON.stringify(params, null, 2);
            functionStrParams = `Parameters:\n${paramsStr}`;
          }

          form.setFieldsValue({
            functionMeta: selectedFunctionMeta,
            functionParams: {},
            functionStrParams,
            functionEncodedParams: '',
          });
        } else if (fieldName === 'functionParams') {
          if (functionMeta) {
            const paramsValues = Object.values(functionParams);
            const encodedParams = AbiInterface.encodeFunctionData(functionMeta, paramsValues);

            form.setFieldsValue({
              functionEncodedParams: encodedParams,
            });
          }
        }
      });
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
          onValuesChange={handleFormValuesChange}
          onFinish={handleSubmit}>
          <Form.Item
            name="targetAddress"
            label="Target address"
            rules={[{ required: true, message: 'Required' }]}>
            <Input disabled={isSubmitting} />
          </Form.Item>

          <Grid flow="col" align="center" justify="space-between">
            <Small semiBold color="grey500">Is this a proxy address?</Small>
            <Form.Item name="isProxyAddress">
              <Antd.Switch disabled={isSubmitting} />
            </Form.Item>
          </Grid>

          <Form.Item dependencies={['isProxyAddress']}>
            {({ getFieldsValue }) => {
              const { isProxyAddress } = getFieldsValue();

              return isProxyAddress === true && (
                <Form.Item
                  name="implementationAddress"
                  hidden={!isProxyAddress}
                  preserve={false}
                  rules={[{ required: true, message: 'Required' }]}>
                  <Input placeholder="Implementation address" disabled={isSubmitting} />
                </Form.Item>
              );
            }}
          </Form.Item>

          <Form.Item
            name="addValueAttribute"
            label="Add a value attribute to your action?"
            rules={[{ required: true, message: 'Required' }]}>
            <YesNoSelector disabled={isSubmitting} />
          </Form.Item>

          <Form.Item shouldUpdate={prevValue => prevValue.addValueAttribute === true}>
            {({ getFieldsValue, setFieldsValue }) => {
              const { addValueAttribute, actionValue } = getFieldsValue();
              const max = 78 - (actionValue?.length ?? 0);

              return addValueAttribute === true && (
                <Form.Item
                  name="actionValue"
                  label={(
                    <Grid flow="col" gap={8}>
                      <Small semiBold color="grey500">Action Value</Small>
                      <AddZerosPopup
                        max={max}
                        onAdd={value => {
                          const { actionValue: prevActionValue } = getFieldsValue();

                          if (prevActionValue) {
                            const zeros = '0'.repeat(value);
                            setFieldsValue({
                              actionValue: `${prevActionValue}${zeros}`,
                            });
                          }
                        }} />
                    </Grid>
                  )}
                  preserve={false}
                  rules={[{ required: true, message: 'Required' }]}>
                  <Input disabled={isSubmitting} />
                </Form.Item>
              );
            }}
          </Form.Item>

          <Form.Item
            name="addFunctionCall"
            label="Add a function call to your action?"
            rules={[{ required: true, message: 'Required' }]}>
            <YesNoSelector disabled={isSubmitting} />
          </Form.Item>

          <Form.Item name="abiLoading" preserve={false} hidden />
          <Form.Item name="abiInterface" preserve={false} hidden />
          <Form.Item name="functionMeta" preserve={false} hidden />
          <Form.Item name="functionStrParams" preserve={false} hidden />
          <Form.Item name="functionEncodedParams" preserve={false} hidden />

          <Form.Item shouldUpdate={(prevValues: ProposalActionCreateForm) => prevValues.addFunctionCall === true}>
            {({ getFieldsValue, setFieldsValue }: FormInstance<ProposalActionCreateForm>) => {
              const {
                targetAddress,
                addFunctionCall,
                abiLoading,
                abiInterface,
                functionMeta,
                functionParams,
                functionStrParams,
                functionEncodedParams,
              } = getFieldsValue();

              if (addFunctionCall !== true) {
                return null;
              }

              const functionOptions = abiInterface?.writableFunctions.map(fn => ({
                label: fn.format(),
                value: fn.format(),
              })) ?? [];

              return (
                <Grid flow="row" gap={32}>
                  <Form.Item
                    name="functionSignature"
                    label="Select function"
                    preserve={false}
                    rules={[{ required: true, message: 'Required' }]}>
                    <Select
                      loading={abiLoading}
                      disabled={isSubmitting}
                      options={functionOptions} />
                  </Form.Item>

                  {functionMeta && (
                    <Grid flow="row" gap={32}>
                      {functionMeta.inputs.map(input => (
                        <Form.Item
                          key={`${functionMeta?.format()}:${input.name}`}
                          name={['functionParams', input.name]}
                          label={(
                            <Grid flow="col" gap={8}>
                              <Small semiBold color="grey500">{input.name} ({input.type})</Small>
                              {/(u?int\d+)/g.test(input.type) && (
                                <AddZerosPopup
                                  onAdd={value => {
                                    const prevActionValue = functionParams[input.name];

                                    if (prevActionValue) {
                                      const zeros = '0'.repeat(value);
                                      setFieldsValue({
                                        functionParams: {
                                          [input.name]: `${prevActionValue}${zeros}`,
                                        },
                                      });
                                    }
                                  }} />
                              )}
                            </Grid>
                          )}
                          preserve={false}
                          rules={[{ required: true, message: 'Required' }]}>
                          <Input disabled={isSubmitting} placeholder={`${input.name} (${input.type})`} />
                        </Form.Item>
                      ))}

                      <Form.Item label={`Function type: ${functionMeta.name}`}>
                        <Textarea
                          className={s.textarea}
                          rows={5}
                          value={functionStrParams}
                          disabled />
                      </Form.Item>

                      <Form.Item label="Hex data">
                        <Textarea
                          className={s.textarea}
                          rows={5}
                          placeholder="Fill in the arguments above"
                          value={functionEncodedParams}
                          disabled />
                      </Form.Item>
                    </Grid>
                  )}

                  {targetAddress && addFunctionCall && !abiLoading && !abiInterface && (
                    <Alert
                      type="error"
                      message="The target address you entered is not a validated contract address. Please check the information you entered and try again" />
                  )}
                </Grid>
              );
            }}
          </Form.Item>

          <Form.Item dependencies={['addValueAttribute', 'addFunctionCall']}>
            {({ getFieldsValue }) => {
              const { addValueAttribute, addFunctionCall } = getFieldsValue();

              return addValueAttribute === false && addFunctionCall === false && (
                <Alert
                  type="error"
                  message="You need to provide at least one: a value attribute or a function call to your action" />
              );
            }}
          </Form.Item>

          <div className={s.actions}>
            <Button
              type="default"
              disabled={isSubmitting}
              className={s.cancelBtn}
              onClick={props.onCancel}>
              {edit ? 'Cancel Changes' : 'Cancel'}
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
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
