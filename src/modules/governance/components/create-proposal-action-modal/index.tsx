import React from 'react';
import AntdForm, { FormInstance } from 'antd/lib/form';
import AntdNotification from 'antd/lib/notification';
import AntdSpin from 'antd/lib/spin';
import AntdSwitch from 'antd/lib/switch';
import { AbiFunctionFragment, AbiInterface } from 'web3/abiInterface';
import { fetchContractABI } from 'web3/utils';
import Web3Contract from 'web3/web3Contract';

import Alert from 'components/antd/alert';
import Form from 'components/antd/form';
import Input from 'components/antd/input';
import Modal, { ModalProps } from 'components/antd/modal';
import Select from 'components/antd/select';
import Textarea from 'components/antd/textarea';
import YesNoSelector from 'components/antd/yes-no-selector';
import Grid from 'components/custom/grid';
import { Hint, Text } from 'components/custom/typography';
import config from 'config';
import useMergeState from 'hooks/useMergeState';

import AddZerosPopup from '../add-zeros-popup';
import SimulatedProposalActionModal from '../simulated-proposal-action-modal';

import s from './s.module.scss';

export type CreateProposalActionForm = {
  targetAddress: string;
  isProxyAddress: boolean;
  implementationAddress: string;
  addValueAttribute?: boolean;
  actionValue: string;
  addFunctionCall?: boolean;
  abiLoading: boolean;
  abiInterface?: AbiInterface;
  functionSignature?: string;
  functionMeta?: AbiFunctionFragment;
  functionParams: Record<string, any>;
  functionStrParams: string;
  functionEncodedParams: string;
};

const InitialFormValues: CreateProposalActionForm = {
  targetAddress: '',
  isProxyAddress: false,
  implementationAddress: '',
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

export type CreateProposalActionModalProps = ModalProps & {
  edit?: boolean;
  actions: CreateProposalActionForm[];
  initialValues?: CreateProposalActionForm;
  onSubmit: (values: CreateProposalActionForm) => void;
};

type CreateProposalActionModalState = {
  showSimulatedActionModal: boolean;
  simulatedAction?: CreateProposalActionForm;
  simulationResolve?: () => void;
  simulationReject?: () => void;
  formDirty: boolean;
  submitting: boolean;
};

const InitialState: CreateProposalActionModalState = {
  showSimulatedActionModal: false,
  simulatedAction: undefined,
  simulationResolve: undefined,
  simulationReject: undefined,
  formDirty: false,
  submitting: false,
};

const CreateProposalActionModal: React.FC<CreateProposalActionModalProps> = props => {
  const { edit = false, initialValues = InitialFormValues } = props;

  const [form] = AntdForm.useForm<CreateProposalActionForm>();
  const [state, setState] = useMergeState<CreateProposalActionModalState>(InitialState);

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

  function handleFormValuesChange(values: Partial<CreateProposalActionForm>, allValues: CreateProposalActionForm) {
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

    Object.keys(values).forEach((fieldName: string) => {
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
        const selectedFunctionMeta = (abiInterface?.writableFunctions ?? []).find(
          fn => fn.format() === functionSignature,
        );
        let functionStrParams = '';

        if (selectedFunctionMeta) {
          const params = selectedFunctionMeta.inputs.map(({ name, type }) => ({
            name,
            type,
          }));
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

    setState({
      formDirty: form.isFieldsTouched(),
    });
  }

  async function handleSubmit(values: CreateProposalActionForm) {
    const existsSimilar = props.actions.some(action => {
      return (
        action !== values &&
        action.addFunctionCall &&
        action.targetAddress === values.targetAddress &&
        action.functionSignature === values.functionSignature &&
        action.functionEncodedParams === values.functionEncodedParams
      );
    });

    if (existsSimilar) {
      AntdNotification.error({
        message: 'Duplicate actions are disallowed!',
      });
      return;
    }

    setState({ submitting: true });

    let cancel = false;

    try {
      await form.validateFields();

      if (values.addFunctionCall) {
        const encodedFunction = values.abiInterface?.encodeFunctionData(
          values.functionMeta!,
          Object.values(values.functionParams ?? {}),
        );

        try {
          await Web3Contract.tryCall(
            values.targetAddress,
            config.contracts.dao.governance,
            encodedFunction!,
            values.actionValue,
          );
        } catch {
          await new Promise<void>((resolve, reject) => {
            setState({
              showSimulatedActionModal: true,
              simulatedAction: values,
              simulationResolve: resolve,
              simulationReject: reject,
            });
          });
        }
      }

      await props.onSubmit(values);
      form.resetFields();
      cancel = true;
    } catch (e) {
      if (e?.message) {
        AntdNotification.error({
          message: e?.message,
        });
      }
    }

    setState({ submitting: false });

    if (cancel) {
      props.onCancel?.();
    }
  }

  function handleSimulatedAction(answer: boolean) {
    if (answer) {
      state.simulationResolve?.();
    } else {
      state.simulationReject?.();
    }

    setState({
      showSimulatedActionModal: false,
      simulationResolve: undefined,
      simulationReject: undefined,
    });
  }

  React.useEffect(() => {
    if (initialValues !== InitialFormValues) {
      form.resetFields();
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  return (
    <Modal
      className={s.component}
      confirmClose={state.formDirty}
      confirmText="Are you sure you want to close this form?"
      {...props}>
      <div className={s.wrap}>
        <Text type="h2" weight="semibold" className={s.headerLabel} color="primary">
          {edit ? 'Edit action' : 'Add new action'}
        </Text>

        <Form
          className={s.form}
          form={form}
          initialValues={{}}
          validateTrigger={['onSubmit', 'onChange']}
          onValuesChange={handleFormValuesChange}
          onFinish={handleSubmit}>
          <Form.Item
            name="targetAddress"
            label="Target address"
            hint="This is the address to which the transaction will be sent."
            rules={[{ required: true, message: 'Required' }]}>
            <Input disabled={state.submitting} />
          </Form.Item>

          <Grid flow="col" align="center" justify="space-between">
            <Hint text="In case you are using a proxy address as the target, please specify the address where the function implementation is found.">
              <Text type="small" weight="semibold" color="secondary">
                Is this a proxy address?
              </Text>
            </Hint>
            <Form.Item name="isProxyAddress" noStyle>
              <AntdSwitch disabled={state.submitting} />
            </Form.Item>
          </Grid>

          <Form.Item dependencies={['isProxyAddress']} noStyle>
            {({ getFieldsValue }) => {
              const { isProxyAddress } = getFieldsValue();

              return (
                isProxyAddress === true && (
                  <Form.Item
                    name="implementationAddress"
                    hidden={!isProxyAddress}
                    preserve={false}
                    rules={[{ required: true, message: 'Required' }]}>
                    <Input placeholder="Implementation address" disabled={state.submitting} />
                  </Form.Item>
                )
              );
            }}
          </Form.Item>

          <Form.Item
            name="addValueAttribute"
            label="Add a value attribute to your action?"
            hint="This field allows you to send some ETH along with your transaction."
            rules={[{ required: true, message: 'Required' }]}>
            <YesNoSelector disabled={state.submitting} />
          </Form.Item>

          <Form.Item shouldUpdate={prevValue => prevValue.addValueAttribute === true} noStyle>
            {({ getFieldsValue }) => {
              const { addValueAttribute, actionValue } = getFieldsValue();
              const max = 78 - (actionValue?.length ?? 0);

              return (
                addValueAttribute === true && (
                  <Form.Item
                    name="actionValue"
                    label={
                      <Grid flow="col" gap={8}>
                        <Text type="small" weight="semibold" color="secondary">
                          Action Value
                        </Text>
                        <AddZerosPopup
                          max={max}
                          onAdd={value => {
                            const { actionValue: prevActionValue } = getFieldsValue();

                            if (prevActionValue) {
                              const zeros = '0'.repeat(value);
                              form.setFieldsValue({
                                actionValue: `${prevActionValue}${zeros}`,
                              });
                            }
                          }}
                        />
                      </Grid>
                    }
                    preserve={false}
                    rules={[{ required: true, message: 'Required' }]}>
                    <Input disabled={state.submitting} />
                  </Form.Item>
                )
              );
            }}
          </Form.Item>

          <Form.Item
            name="addFunctionCall"
            label="Add a function call to your action?"
            hint="This field allows you to call a function on a smart contract."
            rules={[{ required: true, message: 'Required' }]}>
            <YesNoSelector disabled={state.submitting} />
          </Form.Item>

          <Form.Item name="abiLoading" preserve={false} hidden noStyle />
          <Form.Item name="abiInterface" preserve={false} hidden noStyle />
          <Form.Item name="functionMeta" preserve={false} hidden noStyle />
          <Form.Item name="functionStrParams" preserve={false} hidden noStyle />
          <Form.Item name="functionEncodedParams" preserve={false} hidden noStyle />

          <Form.Item
            shouldUpdate={(prevValues: CreateProposalActionForm) => prevValues.addFunctionCall === true}
            noStyle>
            {({ getFieldsValue }: FormInstance<CreateProposalActionForm>) => {
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

              const functionOptions =
                abiInterface?.writableFunctions.map(fn => ({
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
                    <Select loading={abiLoading} disabled={state.submitting} options={functionOptions} fixScroll />
                  </Form.Item>

                  {functionMeta && (
                    <Grid flow="row" gap={32}>
                      {functionMeta.inputs.map(input => (
                        <Form.Item
                          key={`${functionMeta?.format()}:${input.name}`}
                          name={['functionParams', input.name]}
                          label={
                            <Grid flow="col" gap={8}>
                              <Text type="small" weight="semibold" color="secondary">
                                {input.name} ({input.type})
                              </Text>
                              {/(u?int\d+)/g.test(input.type) && (
                                <AddZerosPopup
                                  onAdd={value => {
                                    const prevActionValue = functionParams[input.name];

                                    if (prevActionValue) {
                                      const zeros = '0'.repeat(value);
                                      functionParams[input.name] = `${prevActionValue}${zeros}`;

                                      const paramsValues = Object.values(functionParams);
                                      const encodedParams = AbiInterface.encodeFunctionData(functionMeta, paramsValues);

                                      form.setFieldsValue({
                                        functionParams,
                                        functionEncodedParams: encodedParams,
                                      });
                                    }
                                  }}
                                />
                              )}
                            </Grid>
                          }
                          preserve={false}
                          rules={[{ required: true, message: 'Required' }]}>
                          <Input disabled={state.submitting} placeholder={`${input.name} (${input.type})`} />
                        </Form.Item>
                      ))}

                      <Form.Item label={`Function type: ${functionMeta.name}`}>
                        <Textarea className={s.textarea} rows={5} value={functionStrParams} disabled />
                      </Form.Item>

                      <Form.Item label="Hex data">
                        <Textarea
                          className={s.textarea}
                          rows={5}
                          placeholder="Fill in the arguments above"
                          value={functionEncodedParams}
                          disabled
                        />
                      </Form.Item>
                    </Grid>
                  )}

                  {targetAddress && addFunctionCall && !abiLoading && !abiInterface && (
                    <Alert
                      type="error"
                      message="The target address you entered is not a validated contract address. Please check the information you entered and try again"
                    />
                  )}
                </Grid>
              );
            }}
          </Form.Item>

          <Form.Item dependencies={['addValueAttribute', 'addFunctionCall']} noStyle>
            {({ getFieldsValue }) => {
              const { addValueAttribute, addFunctionCall } = getFieldsValue();

              return (
                addValueAttribute === false &&
                addFunctionCall === false && (
                  <Alert
                    type="error"
                    message="You need to provide at least one: a value attribute or a function call to your action"
                  />
                )
              );
            }}
          </Form.Item>

          <div className={s.actions}>
            <button
              type="button"
              disabled={state.submitting}
              onClick={props.onCancel}
              className="button-ghost-monochrome">
              {edit ? 'Cancel Changes' : 'Cancel'}
            </button>
            <button className="button-primary" type="submit">
              {state.submitting && <AntdSpin spinning />}
              {edit ? 'Save Changes' : 'Add Action'}
            </button>
          </div>
        </Form>

        {state.showSimulatedActionModal && state.simulatedAction && (
          <SimulatedProposalActionModal
            targetAddress={state.simulatedAction.targetAddress}
            functionSignature={state.simulatedAction.functionSignature}
            functionEncodedParams={state.simulatedAction.functionEncodedParams}
            onOk={() => handleSimulatedAction(true)}
            onCancel={() => handleSimulatedAction(false)}
          />
        )}
      </div>
    </Modal>
  );
};

export default CreateProposalActionModal;
