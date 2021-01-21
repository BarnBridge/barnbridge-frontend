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
import Grid from 'components/custom/grid';
import { Heading, Small } from 'components/custom/typography';
import AddZerosPopup from '../add-zeros-popup';

import Web3Contract, { encodeABIParams, Web3ContractAbiItem } from 'web3/contract';
import { fetchContractABI } from 'web3/utils';
import { useReload } from 'hooks/useReload';

import s from './styles.module.scss';
import { Spin } from 'antd';

type FunctionParam = {
  name: string;
  type: string;
  value: string;
}

export type ProposalActionCreateForm = {
  targetAddress?: string;
  addValueAttribute?: boolean;
  actionValue?: string;
  addFunctionCall?: boolean;
  functionName?: string;
  functionMeta?: Web3ContractAbiItem;
  functionParams: FunctionParam[];
  contract?: Web3Contract;
};

const InitialFormValues: ProposalActionCreateForm = {
  targetAddress: '',
  addValueAttribute: undefined,
  actionValue: undefined,
  addFunctionCall: undefined,
  functionName: undefined,
  functionMeta: undefined,
  functionParams: [],
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
  const [loadingContract, setLoadingContract] = React.useState<boolean>(false);

  const [formValues, setFormValues] = React.useState<ProposalActionCreateForm>(InitialFormValues);

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
      setLoadingContract(true);

      fetchContractABI(targetAddress)
        .then((results: any[]) => {
          setContract(new Web3Contract(results, targetAddress, targetAddress));
          setLoadingContract(false);
        })
        .catch(() => {
          setLoadingContract(true);
        });
    }
  }, [formValues.addFunctionCall, formValues.targetAddress]);

  const selectedFunction = React.useMemo<Web3ContractAbiItem | undefined>(() => {
    return (contract?.writeFunctions as Array<any>)?.find(fn => fn.name === formValues.functionName);
  }, [contract, formValues.functionName]);

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
    console.log('***', values);
    setFormValues(prevState => ({
      ...prevState,
      ...values,
    }));

    const changedField = Object.keys(values)[0];

    switch (changedField) {
      case 'addFunctionCall':
        form.setFieldsValue({
          functionName: undefined,
          functionMeta: undefined,
          functionParams: [],
        });

        setFormValues(prevState => ({
          ...prevState,
          functionName: undefined,
          functionMeta: undefined,
          functionParams: [],
        }));
        break;
      case 'functionName':
        const functionMeta: Web3ContractAbiItem = (contract?.writeFunctions as Array<any>)?.find(fn => fn.name === values.functionName);
        const functionParams: any[] = [];

        if (functionMeta) {
          functionMeta.inputs?.forEach(input => {
            functionParams.push({
              name: input.name,
              type: input.type,
              value: '',
            } as FunctionParam)
          });
        }

        form.setFieldsValue({
          functionMeta,
          functionParams,
        });

        setFormValues(prevState => ({
          ...prevState,
          functionMeta,
          functionParams,
        }));
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
              label={(
                <Grid flow="col" gap={8}>
                  <Small semiBold color="grey500">Action Value</Small>
                  <AddZerosPopup
                    max={78 - (formValues.actionValue?.length ?? 0)}
                    onAdd={value => handleZerosAdd(['actionValue'], value)} />
                </Grid>
              )}
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
                  loading={loadingContract}
                  disabled={loadingContract || submitting}
                  options={contract?.writeFunctions.map(fn => ({
                    label: fn.name!,
                    value: fn.name!,
                  })) ?? []} />
              </Form.Item>
              {formValues.functionMeta && (
                <>
                  <Form.List name="functionParams">
                    {fields => fields.map(field => {
                      const param = formValues.functionParams[field.fieldKey];

                      return (
                        <Form.Item
                          // name={[field.name, 'value']}
                          // fieldKey={[field.fieldKey, 'value']}
                          label={(
                            <Grid flow="col" gap={8}>
                              <Small semiBold color="grey500">{param.name} ({param.name})</Small>
                              {/(u?int\d+)/g.test(param.type) && (
                                <AddZerosPopup onAdd={value => handleZerosAdd(['functionParams', String(field.fieldKey), 'value'], value)} />
                              )}
                            </Grid>
                          )}
                          rules={[
                            { required: true, message: 'Required' },
                          ]}>
                          <Input disabled={submitting} placeholder={`${param.name} (${param.type})`} />
                        </Form.Item>
                      );
                    })}
                  </Form.List>
                  {/*{formValues.functionParams.map((param, index) => {*/}
                  {/*  return (*/}
                  {/*    <Form.Item*/}
                  {/*      name={['functionParams', index, 'value']}*/}
                  {/*      fieldKey={index}*/}
                  {/*      label={(*/}
                  {/*        <Grid flow="col" gap={8}>*/}
                  {/*          <Small semiBold color="grey500">{param.name} ({param.name})</Small>*/}
                  {/*          {/(u?int\d+)/g.test(param.type) && (*/}
                  {/*            <AddZerosPopup onAdd={value => handleZerosAdd(['functionParams', String(index), 'value'], value)} />*/}
                  {/*          )}*/}
                  {/*        </Grid>*/}
                  {/*      )}*/}
                  {/*      rules={[*/}
                  {/*        { required: true, message: 'Required' },*/}
                  {/*      ]}>*/}
                  {/*      <Input disabled={submitting} placeholder={`${param.name} (${param.type})`} />*/}
                  {/*    </Form.Item>*/}
                  {/*  );*/}
                  {/*})}*/}

                  {formValues.functionParams.length! > 0 && (
                    <Form.Item label={`Function type: ${formValues.functionName}`}>
                      <Textarea
                        className={s.textarea}
                        rows={5}
                        value={`Parameters:\n${JSON.stringify(formValues.functionParams, null, 2)}`}
                        disabled />
                    </Form.Item>
                  )}
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
            </>
          )}

          {formValues.targetAddress && formValues.addFunctionCall && !loadingContract && !contract && (
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
