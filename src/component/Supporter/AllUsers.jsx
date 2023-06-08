'use client'
import { server } from '@/server';
import { Button, Form, Input, Modal, Row, Select, Space, Table, notification } from 'antd';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Loader from '../Loader/Loader';
import { useRouter } from 'next/navigation';
const { Option } = Select;

const AllUsers = () => {
    const [users, setUsers] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const router = useRouter();
    const user = useRef();
    const token = useRef();

    if (typeof window !== 'undefined') {
      token.current = localStorage.getItem('token');
    }

    const config = {
      headers: {
        Authorization: `${token.current}`,
      },
    };

    useEffect(() => {
        axios.get(`${server}/user/get-all-users`, config).then((res) => setUsers(res?.data?.users));
    }, [])

    const editHandler = (userForm) => {
        setIsModalOpen(true);
        user.current = userForm;
        form.setFieldsValue({ name: userForm?.name, avatar: userForm?.avatar, phone: userForm?.phone, email: userForm?.email, role: userForm?.role });
    }

    const deleteHandler = (user) => {
        axios.delete(`${server}/user/delete-user`, {
            params: {
                id: user._id
            }
        } , config).then((res) => {
            if(res.data.success) {
                notification.success({message: 'Xóa người dùng thành công'});
                router.refresh();
            }
        })
    }

    const cancelHandler = () => {
        setIsModalOpen(false);
    }

    const onFinish = (values) => {
        user.current.name = values.name;
        user.current.phone = values.phone;
        user.current.email = values.email;
        user.current.role = values.role;

        axios.put(`${server}/user/update-user`, user.current, config).then((res) => {
            if(res.data.success) {
                notification.success({message: 'Chỉnh sửa thông tin thành công'});
                setIsModalOpen(false);
                router.refresh();
            }
        })
    }

    const columns = [
        {
          title: 'Tên',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Hình ảnh',
          dataIndex: 'avatar',
          key: 'avatar',
          render: (avatar) => <img src={avatar} height={150} width={150}/>
        },
        {
          title: 'Tên đăng nhập',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: 'Điện thoại',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Role',
          dataIndex: 'role',
          key: 'role',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <Space size="middle">
                <Button onClick={() => editHandler(record)}>Chỉnh sửa</Button>
                <Button onClick={() => deleteHandler(record)}>Xóa</Button>
              </Space>
            ),
        },
    ]

  return (
    <>
      {users ? (
        <div className="w-[85%] bg-white">
            <Table columns={columns} dataSource={users} scroll={{x:1250}}/>
        </div>
      ) : (
        <Loader />
      )}

      <Modal title="" footer={null} open={isModalOpen}>
        <Form
            layout='vertical'
            form={form}
            onFinish={onFinish}
        >
            <Form.Item
                label="Tên"
                name="name"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Điện thoại"
                name="phone"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
            >
                <Input />
            </Form.Item>

            <Form.Item name="role" label="Role" rules={[{ required: false }]}>
                <Select
                    placeholder="Role"
                >
                    <Option value="user">Người dùng</Option>
                    <Option value="supporter">Hỗ trợ viên</Option>
                </Select>
            </Form.Item>

            <Row justify='space-between' style={{marginTop: '24px'}}>
                <Button onClick={cancelHandler}>Hủy</Button>
                <Button type='primary' htmlType="submit">Xác nhận</Button>
            </Row>
        </Form>
      </Modal>
    </>
  )
}

export default AllUsers