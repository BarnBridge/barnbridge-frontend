import React from 'react';
import * as Antd from 'antd';

import Card from 'components/antd/card';
import Button from 'components/antd/button';
import { Heading, Paragraph } from 'components/custom/typography';
import Form from 'components/antd/form';
import Input from 'components/antd/input';
import Textarea from 'components/antd/textarea';
import PopoverMenu from 'components/antd/popover-menu';

import ProposalCreateModal from '../../components/proposal-create-modal';
import ProposalDeleteModal from 'modules/governance/components/proposal-delete-modal';

import { ReactComponent as PlusCircleSvg } from 'resources/svg/icons/plus-circle.svg';
import { ReactComponent as GearSvg } from 'resources/svg/icons/gear.svg';

import s from './styles.module.scss';

type NewProposalForm = {
  title: string;
  description: string;
};

const InitialFormValues: NewProposalForm = {
  title: '',
  description: '',
};

const ProposalCreateView: React.FunctionComponent = () => {
  const [form] = Antd.Form.useForm<NewProposalForm>();
  const [, setValues] = React.useState<NewProposalForm>(InitialFormValues);
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [proposalCreateModal, setProposalCreateModal] = React.useState<boolean>(false);
  const [proposalEditModal, setProposalEditModal] = React.useState<boolean>(false);
  const [proposalDeleteModal, setProposalDeleteModal] = React.useState<boolean>(false);

  async function handleSubmit(values: NewProposalForm) {
    setSubmitting(true);

    try {
      form.setFieldsValue(InitialFormValues);
    } catch {
      //
    }

    setSubmitting(false);
  }

  function handleAddAction() {
    setProposalCreateModal(true);
  }

  function handleActionMenu(key: string | number) {
    if (key === 'edit') {
      setProposalEditModal(true);
    } else if (key === 'delete') {
      setProposalDeleteModal(true);
    }
  }

  return (
    <div className={s.component}>
      <Button type="link">
        <Paragraph type="p1" semiBold>Proposals</Paragraph>
      </Button>
      <Heading type="h1" bold>Create Proposal</Heading>
      <Form
        form={form}
        initialValues={InitialFormValues}
        validateTrigger={['onSubmit', 'onChange']}
        onValuesChange={setValues}
        onFinish={handleSubmit}>
        <div className={s.cards}>
          <Card
            title="Proposal description"
          >
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
                icon={<PlusCircleSvg />}
                className={s.addActionBtn}
                onClick={handleAddAction}>Add new action</Button>,
            ]}>
            <div className={s.actionRow}>
              <Paragraph type="p1" semiBold>
                Contract.burnFrom(“0xd98CE81cbCa3981A18481...0cAa793B5A49”,420)
              </Paragraph>
              <PopoverMenu
                placement="bottomLeft"
                items={[
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
                ]}
                onClick={key => handleActionMenu(key)}>
                <GearSvg />
              </PopoverMenu>
            </div>
          </Card>
        </div>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={submitting}
          className={s.createBtn}>
          Create proposal
        </Button>
      </Form>
      <ProposalCreateModal visible={proposalCreateModal} onCancel={() => setProposalCreateModal(false)} />
      <ProposalCreateModal edit visible={proposalEditModal} onCancel={() => setProposalEditModal(false)} />
      <ProposalDeleteModal visible={proposalDeleteModal} onCancel={() => setProposalDeleteModal(false)} />
    </div>
  );
};

export default ProposalCreateView;
