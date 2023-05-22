'use client'
import React, { useState } from 'react'
import { Button, Form, Modal } from 'antd';

const SupporterWelcome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    console.log(123)
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Button type="primary" onClick={showModal} className='bg-[#1677ff]'>Cập nhật</Button>
      <Modal title="Basic Modal" footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form>

        </Form>
      </Modal>
    </div>
  )
}

export default SupporterWelcome