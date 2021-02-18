import React, { useState } from 'react';
import { Text } from 'components/custom/typography';
import Icons from 'components/custom/icon';
import s from './s.module.scss';
import cn from 'classnames';
// import Modal from 'components/antd/modal';
import Popover from 'components/antd/popover';
import Button from 'components/antd/button';
import Input from 'components/antd/input';

export default function TransactionDetails({ className }: { className?: string }) {
  const [visible, setVisible] = useState(false);
  return (
    <section className={cn(s.container, className)}>
      <header className={s.header}>
        <Text type="p2" weight="semibold" color="secondary">Transaction details</Text>
        <Popover
          title="Customize transaction"
          overlayStyle={{ width: 423 }}
          content={<>
            <Text type="small" weight="semibold" color="secondary" className="mb-8">Minimum APY</Text>
            <div className="flex mb-32">
              <Button type="ghost">0.1%</Button>
              <Button type="ghost">0.3%</Button>
              <Button type="ghost">0.5%</Button>
              <Input type='number' />
            </div>
            <div className="mb-32">
              <Text type="small" weight="semibold" color="secondary" className="mb-8">Transaction deadline</Text>
              <Input type='number' />
            </div>
            <div className="flex">
              <Button type="light">Reset changes</Button>
              <Button type="primary" className="ml-auto">Apply changes</Button>
            </div>
          </>}
          visible={visible}
          onVisibleChange={setVisible}
        >
          <button type="button" className={s.settingsButton}>
            <Icons name="gear" />
          </button>
        </Popover>
      </header>
      <div className="p-24">
        <div className="flex mb-24">
          <Text type="small" weight="semibold" color="secondary">Slippage tolerance</Text>
          <Text type="small" weight="semibold" color="primary" className="ml-auto">0.01%</Text>
        </div>
        <div className="flex">
          <Text type="small" weight="semibold" color="secondary">Transaction deadline</Text>
          <Text type="small" weight="semibold" color="primary" className="ml-auto">20 minutes</Text>
        </div>
      </div>
      {/*{visible && (*/}
      {/*  <Modal*/}
      {/*    onOk={(props) => console.log(setShowModal)}*/}
      {/*    onCancel={() => setShowModal(false)}*/}
      {/*  >*/}
      {/*    <Text type="p1" weight="semibold" color="primary">Customize transaction</Text>*/}

      {/*  </Modal>*/}
      {/*)}*/}
    </section>
  )
}
