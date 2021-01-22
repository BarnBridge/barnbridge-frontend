import React from 'react';
import { useHistory } from 'react-router';
import * as Antd from 'antd';

import Card from 'components/antd/card';
import Form from 'components/antd/form';
import Input from 'components/antd/input';
import Textarea from 'components/antd/textarea';
import Button from 'components/antd/button';
import PopoverMenu, { PopoverMenuItem } from 'components/antd/popover-menu';
import Grid from 'components/custom/grid';
import { Heading, Paragraph } from 'components/custom/typography';
import Icon from 'components/custom/icon';
import ProposalActionCreateModal, { ProposalActionCreateForm } from '../../components/proposal-create-modal';
import { getActionStringFor } from '../proposal-detail-view/providers/ProposalProvider';

import ProposalDeleteModal from 'modules/governance/components/proposal-delete-modal';
import { useWeb3Contracts } from 'web3/contracts';
import { encodeABIParams } from 'web3/contract';

import s from './styles.module.scss';

type NewProposalForm = {
  title: string;
  description: string;
  actions: ProposalActionCreateForm[];
};

const InitialFormValues: NewProposalForm = {
  title: '',
  description: '',
  actions: [],
};

const ActionMenuItems: PopoverMenuItem[] = [
  {
    key: 'edit',
    icon: null,
    title: 'Edit action',
  },
  {
    key: 'delete',
    icon: null,
    title: 'Delete action',
  },
];

const ProposalCreateView: React.FunctionComponent = () => {
  const history = useHistory();
  const web3c = useWeb3Contracts();

  const [form] = Antd.Form.useForm<NewProposalForm>();
  const [, setValues] = React.useState<NewProposalForm>(InitialFormValues);
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [proposalCreateModal, setProposalCreateModal] = React.useState<boolean>(false);
  const [proposalDeleteModal, setProposalDeleteModal] = React.useState<boolean>(false);

  function handleAddAction() {
    setProposalCreateModal(true);
  }

  function handleCreateAction(payload: ProposalActionCreateForm) {
    form.setFieldsValue({
      actions: [
        ...form.getFieldValue('actions'),
        payload,
      ],
    });
  }

  function handleActionMenu(key: string | number) {
    if (key === 'edit') {
    } else if (key === 'delete') {
      setProposalDeleteModal(true);
    }
  }

  async function handleSubmit(values: NewProposalForm) {
    setSubmitting(true);

    try {
      await form.validateFields();

      const payload = {
        title: values.title,
        description: values.description,
        ...values.actions.reduce((a, c) => {
          if (!c.targetAddress) {
            return a;
          }

          a.targets.push(c.targetAddress);

          if (c.addFunctionCall) {
            a.signatures.push(c.functionSignature!);
            a.calldatas.push(c.abiFunctionData!);
          } else {
            a.signatures.push('');
            a.calldatas.push('0x');
          }

          if (c.addValueAttribute) {
            a.values.push(c.actionValue!);
          } else {
            a.values.push('0');
          }

          return a;
        }, {
          targets: [] as string[],
          signatures: [] as string[],
          calldatas: [] as string[],
          values: [] as string[],
        }),
      };

      console.log({ payload, values });
      const proposal = await web3c.daoGovernance.actions.createProposal(payload);
      form.setFieldsValue(InitialFormValues);
      history.push(`/governance/proposals/${proposal.returnValues.proposalId}`);
    } catch (e) {
      console.log('E', e);
    }

    setSubmitting(false);
  }

  return (
    <Grid flow="row" gap={16}>
      <Heading type="h1" bold color="grey900" className="mb-16">Create Proposal</Heading>
      <Form
        form={form}
        initialValues={InitialFormValues}
        validateTrigger={['onSubmit', 'onChange']}
        onValuesChange={setValues}
        onFinish={handleSubmit}>
        <Grid flow="row" gap={32}>
          <Grid flow="col" gap={24} colsTemplate="repeat(auto-fit, minmax(0, 1fr))" align="start">
            <Card title={(
              <Paragraph type="p1" semiBold color="grey900">Proposal description</Paragraph>
            )}>
              <Grid flow="row" gap={24}>
                <Form.Item
                  name="title"
                  label="Title"
                  rules={[
                    { required: true, message: 'Required' },
                  ]}>
                  <Input
                    placeholder="Placeholder"
                    disabled={submitting} />
                </Form.Item>
                <Form.Item
                  name="description"
                  label="Description"
                  hint=""
                  rules={[
                    { required: true, message: 'Required' },
                  ]}>
                  <Textarea
                    placeholder="Placeholder"
                    rows={6}
                    disabled={submitting} />
                </Form.Item>
              </Grid>
            </Card>
            <Card title={(
              <Paragraph type="p1" semiBold color="grey900">Actions</Paragraph>
            )}>
              <Form.List name="actions">
                {fields => (
                  <>
                    {fields.map((field, index) => {
                      const fieldData: ProposalActionCreateForm = form.getFieldValue(['actions', 0]);

                      return (
                        <Form.Item {...field}>
                          <Grid flow="col" gap={24}>
                            {/*{getActionStringFor(fieldData.targetAddress!, fieldData.functionName!, '', fieldData.actionValue!)}*/}
                            <PopoverMenu
                              placement="bottomLeft"
                              items={ActionMenuItems}
                              onClick={key => handleActionMenu(key)}>
                              <Icon type="gear" />
                            </PopoverMenu>
                          </Grid>
                        </Form.Item>
                      );
                    })}
                  </>
                )}
              </Form.List>
              <Antd.Row align="middle" justify="center">
                <Antd.Col xs={24}>
                  <Button
                    type="ghost"
                    icon={<Icon type="plus-circle" />}
                    className={s.addActionBtn}
                    onClick={handleAddAction}>Add new action</Button>
                </Antd.Col>
              </Antd.Row>
            </Card>
          </Grid>
          <div>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={submitting}>
              Create proposal
            </Button>
          </div>
        </Grid>
      </Form>

      <ProposalActionCreateModal
        visible={proposalCreateModal}
        onCancel={() => setProposalCreateModal(false)}
        onSubmit={handleCreateAction} />
      <ProposalDeleteModal
        visible={proposalDeleteModal}
        onCancel={() => setProposalDeleteModal(false)} />
    </Grid>
  );
};

export default ProposalCreateView;
