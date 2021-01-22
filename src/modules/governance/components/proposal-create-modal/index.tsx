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
import IF from 'components/custom/if';
import Grid from 'components/custom/grid';
import { Heading, Small } from 'components/custom/typography';
import AddZerosPopup from '../add-zeros-popup';

import { fetchContractABI } from 'web3/utils';
import { AbiFragmentType, AbiInterface } from 'web3/abiInterface';
import { useReload } from 'hooks/useReload';
import useMergeState from 'hooks/useMergeState';

import s from './styles.module.scss';

export type ProposalActionCreateForm = {
  targetAddress?: string;
  addValueAttribute?: boolean;
  actionValue?: string;
  addFunctionCall?: boolean;
  functionSignature?: string;
  abiFunctionParams: any;
  abiParamValues?: string[];
  abiFunctionData?: string;
};

const InitialFormValues: ProposalActionCreateForm = {
  targetAddress: '0xED5B6c65140FA8681c3DFf6BA5EFDb7334dff870',
  addValueAttribute: undefined,
  actionValue: undefined,
  addFunctionCall: undefined,
  functionSignature: undefined,
  abiFunctionParams: {},
};

export type ProposalActionCreateModalProps = ModalProps & {
  edit?: boolean;
  onSubmit: (values: ProposalActionCreateForm) => void;
};

type ProposalActionCreateModalState = {
  abiLoading: boolean;
  abiInterface?: AbiInterface;
  abiFunction?: AbiFragmentType;
  submitting: boolean;
};

const InitialState: ProposalActionCreateModalState = {
  abiLoading: false,
  abiInterface: undefined,
  abiFunction: undefined,
  submitting: false,
};

const ProposalActionCreateModal: React.FunctionComponent<ProposalActionCreateModalProps> = props => {
  const { edit = false } = props;

  const [reload] = useReload();
  const [form] = Antd.Form.useForm<ProposalActionCreateForm>();
  const [state, setState] = useMergeState<ProposalActionCreateModalState>(InitialState);

  const [formValues, setFormValues] = React.useState<ProposalActionCreateForm>(InitialFormValues);

  async function handleSubmit(values: ProposalActionCreateForm) {
    const abiParamValues = state.abiFunction?.inputs.map(input => {
      try {
        return JSON.parse(values.abiFunctionParams[input.name]);
      } catch {
        return values.abiFunctionParams[input.name];
      }
    });

    console.log('SUBMIT', { values, abiParamValues });
    const abiFunctionData = state.abiInterface?.encodeFunctionData(state.abiFunction!, abiParamValues)
    console.log('SUBMIT', { abiFunctionData });

    setState({
      submitting: true,
    });

    let cancel = false;

    try {
      await props.onSubmit({
        ...values,
        abiParamValues,
        abiFunctionData,
      });
      form.resetFields();
      cancel = true;
    } catch {
    }

    setState({
      submitting: false,
    });

    if (cancel) {
      props.onCancel?.();
    }
  }

  React.useEffect(() => {
    const { addFunctionCall, targetAddress } = formValues;

    setState({
      abiInterface: undefined,
    });

    if (addFunctionCall && targetAddress && Web3.utils.isAddress(targetAddress)) {
      setState({
        abiLoading: true,
      });

      fetchContractABI(targetAddress)
        .then((abi: any[]) => {
          setState({
            abiLoading: false,
            abiInterface: new AbiInterface(abi),
          });
        })
        .catch(() => {
          setState({
            abiLoading: false,
          });
        });
    }
  }, [formValues.addFunctionCall, formValues.targetAddress]);

  function handleZerosAdd(fieldPath: string[], count: number) {
    let currentValue = form.getFieldValue(fieldPath);

    if (!currentValue) {
      return;
    }

    currentValue = currentValue + '0'.repeat(count);

    const field: Record<string, any> = {};
    fieldPath.reduce((a: Record<string, any>, v: string, i: number, arr: string[]) => {
      a[v] = arr.length - 1 === i ? currentValue : {};
      return a[v];
    }, field);

    form.setFieldsValue(field);
  }

  function handleValuesChange(values: Partial<ProposalActionCreateForm>) {
    const changedField = Object.keys(values)[0];

    if (changedField === 'functionParams' || changedField === 'actionValue') {
      return;
    } /// to remove!!!

    setFormValues(prevState => ({
      ...prevState,
      ...values,
    }));

    switch (changedField) {
      case 'addFunctionCall':
        form.setFieldsValue({
          functionSignature: undefined,
          abiFunctionParams: {},
        });

        setFormValues(prevState => ({
          ...prevState,
          functionSignature: undefined,
          abiFunctionParams: {},
        }));
        break;
      case 'functionSignature':
        const abiFunction = (state.abiInterface?.writableFunctions ?? []).find(fn => fn.format() === values.functionSignature);

        if (abiFunction) {
          setState({
            abiFunction,
          });
        }
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
          initialValues={formValues}
          validateTrigger={['onSubmit', 'onChange']}
          onValuesChange={handleValuesChange}
          onFinish={handleSubmit}>
          <Form.Item
            name="targetAddress"
            label="Target address"
            rules={[
              { required: true, message: 'Required' },
            ]}>
            <Input disabled={state.submitting} />
          </Form.Item>
          <Form.Item
            name="addValueAttribute"
            label="Add a value attribute to your action?">
            <YesNoSelector />
          </Form.Item>
          <IF condition={formValues.addValueAttribute === true}>
            <Form.Item
              name="actionValue"
              label={(
                <Grid flow="col" gap={8}>
                  <Small semiBold color="grey500">Action Value</Small>
                  <AddZerosPopup
                    max={78 - (formValues.actionValue?.length ?? 0)}
                    onAdd={value => handleZerosAdd(['actionValue'], value)} />
                </Grid>
              )}
              rules={[{ required: true, message: 'Required' }]}>
              <Input disabled={state.submitting} />
            </Form.Item>
          </IF>
          <Form.Item
            name="addFunctionCall"
            label="Add a function call to your action?">
            <YesNoSelector />
          </Form.Item>
          <IF condition={formValues.addFunctionCall === true}>
            <Form.Item
              name="functionSignature"
              label="Select function"
              rules={[{ required: true, message: 'Required' }]}>
              <Select
                loading={state.abiLoading}
                disabled={state.abiLoading || state.submitting}
                options={state.abiInterface?.writableFunctions.map(fn => ({
                  label: fn.format(),
                  value: fn.format(),
                })) ?? []} />
            </Form.Item>
            <Form.Item name="functionMeta" />
            {state.abiFunction && (
              <>
                {/*<Form.List name="functionParams">*/}
                {/*  {fields => fields.map(field => {*/}
                {/*    const param = formValues.functionParams[field.fieldKey];*/}

                {/*    return (*/}
                {/*      <Form.Item*/}
                {/*        {...field}*/}
                {/*        name={[field.name, 'value']}*/}
                {/*        fieldKey={[field.fieldKey, 'value']}*/}
                {/*        label={(*/}
                {/*          <Grid flow="col" gap={8}>*/}
                {/*            <Small semiBold color="grey500">{param.name} ({param.name})</Small>*/}
                {/*            {/(u?int\d+)/g.test(param.type) && (*/}
                {/*              <AddZerosPopup*/}
                {/*                onAdd={value => handleZerosAdd(['functionParams', String(field.fieldKey), 'value'], value)} />*/}
                {/*            )}*/}
                {/*          </Grid>*/}
                {/*        )}*/}
                {/*        rules={[*/}
                {/*          { required: true, message: 'Required' },*/}
                {/*        ]}>*/}
                {/*        <Input disabled={state.submitting} placeholder={`${param.name} (${param.type})`} />*/}
                {/*      </Form.Item>*/}
                {/*    );*/}
                {/*  })}*/}
                {/*</Form.List>*/}

                {state.abiFunction.inputs.map(input => {
                  return (
                    <Form.Item
                      key={input.format()}
                      name={['abiFunctionParams', input.name]}
                      label={(
                        <Grid flow="col" gap={8}>
                          <Small semiBold color="grey500">{input.name} ({input.type})</Small>
                          {/(u?int\d+)/g.test(input.type) && (
                            <AddZerosPopup
                              onAdd={value => handleZerosAdd(['abiFunctionParams', input.name], value)} />
                          )}
                        </Grid>
                      )}
                      rules={[{ required: true, message: 'Required' }]}>
                      <Input disabled={state.submitting} placeholder={`${input.name} (${input.type})`} />
                    </Form.Item>
                  );
                })}

                {/*{formValues.functionParams.length! > 0 && (*/}
                {/*  <Form.Item label={`Function type: ${formValues.functionSignature}`}>*/}
                {/*    <Textarea*/}
                {/*      className={s.textarea}*/}
                {/*      rows={5}*/}
                {/*      value={`Parameters:\n${JSON.stringify(formValues.functionParams, null, 2)}`}*/}
                {/*      disabled />*/}
                {/*  </Form.Item>*/}
                {/*)}*/}
                <Form.Item label="Hex data">
                  {/*<Textarea*/}
                  {/*  className={s.textarea}*/}
                  {/*  rows={5}*/}
                  {/*  placeholder="Fill in the arguments above"*/}
                  {/*  value={encodeABIParams(*/}
                  {/*    formValues.functionParams?.map(input => input.type) ?? [],*/}
                  {/*    formValues.functionParams?.map(input => input.value)) ?? ''}*/}
                  {/*  disabled />*/}
                </Form.Item>
              </>
            )}
          </IF>

          {formValues.targetAddress && formValues.addFunctionCall && !state.abiLoading && !state.abiInterface && (
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
              disabled={state.submitting}
              className={s.cancelBtn}
              onClick={props.onCancel}>
              {edit ? 'Cancel Changes' : 'Cancel'}
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={state.submitting}
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
