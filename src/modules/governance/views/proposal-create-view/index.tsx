import React from 'react';
import { useHistory } from 'react-router';
import * as Antd from 'antd';

import Card from 'components/antd/card';
import Button from 'components/antd/button';
import { Heading, Paragraph } from 'components/custom/typography';
import Form from 'components/antd/form';
import Input from 'components/antd/input';
import Textarea from 'components/antd/textarea';
import PopoverMenu, { PopoverMenuItem } from 'components/antd/popover-menu';
import Icon from 'components/custom/icon';

import ProposalActionCreateModal, { ProposalActionCreateForm } from '../../components/proposal-create-modal';
import ProposalDeleteModal from 'modules/governance/components/proposal-delete-modal';
import { useWeb3Contracts } from 'web3/contracts';
import { encodeABIParams } from 'web3/contract';

import s from './styles.module.scss';
import Grid from '../../../../components/custom/grid';

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
            a.signatures.push('cancelProposal(uint256)');
            a.calldatas.push(encodeABIParams(['uint256'], ['1'])!);
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
    <div className={s.component}>
      <Button type="link">
        <Paragraph type="p1" semiBold>Proposals</Paragraph>
      </Button>
      <Heading type="h1" bold className="mb-32" color="grey900">Create Proposal</Heading>
      <Form
        form={form}
        initialValues={InitialFormValues}
        validateTrigger={['onSubmit', 'onChange']}
        onValuesChange={setValues}
        onFinish={handleSubmit}>
        <Grid flow="col" gap={24} colsTemplate="repeat(auto-fit, minmax(0, 1fr))" align="start">
          <Card title="Proposal description">
            <div className={s.cardBody}>
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
                rules={[
                  { required: true, message: 'Required' },
                ]}>
                <Textarea
                  placeholder="Placeholder"
                  rows={6}
                  disabled={submitting} />
              </Form.Item>
            </div>
          </Card>
          <Card
            title="Actions"
            actions={[
              <Button
                type="ghost"
                icon={<Icon type="plus-circle" />}
                className={s.addActionBtn}
                onClick={handleAddAction}>Add new action</Button>,
            ]}>
            <Form.List name="actions">
              {fields => (
                <>
                  {fields.map(field => (
                    <Form.Item {...field}>
                      <div className={s.actionRow}>
                        <Paragraph type="p1" semiBold>
                          Contract.burnFrom(“0xd98CE81cbCa3981A18481...0cAa793B5A49”,420)
                        </Paragraph>
                        <PopoverMenu
                          placement="bottomLeft"
                          items={ActionMenuItems}
                          onClick={key => handleActionMenu(key)}>
                          <Icon type="gear" />
                        </PopoverMenu>
                      </div>
                    </Form.Item>
                  ))}
                </>
              )}
            </Form.List>
          </Card>
        </Grid>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={submitting}
          className={s.createBtn}>
          Create proposal
        </Button>
      </Form>
      <ProposalActionCreateModal
        visible={proposalCreateModal}
        onCancel={() => setProposalCreateModal(false)}
        onSubmit={handleCreateAction} />
      <ProposalDeleteModal
        visible={proposalDeleteModal}
        onCancel={() => setProposalDeleteModal(false)} />
    </div>
  );
};

export default ProposalCreateView;
