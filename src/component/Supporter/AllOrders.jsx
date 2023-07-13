'use client'
import { server } from '@/server';
import { useAuth } from '@/store/auth';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Loader from '../Loader/Loader';
import { Button, Form, Input, Modal, Row, Select, Table, Tag, notification } from 'antd';
import Province from '../../../public/address/tinh_tp.json';
import District from '../../../public/address/quan_huyen.json';
import Town from '../../../public/address/xa_phuong.json';
import { useRouter } from 'next/navigation';
import { Excel } from 'antd-table-saveas-excel';
const { Option } = Select;



const AllOrders = () => {
    const token = useRef();

    if (typeof window !== 'undefined') {
      token.current = localStorage.getItem('token');
    }

    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token.current}`,
        },
    };
    
    const user = useAuth((state) => state.auth);
    const [form] = Form.useForm();
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

  useEffect(() => {
    axios.get(`${server}/order/admin-all-orders`, config)
    .then((res) => setOrders(res.data?.orders))
  }, []);

  const showModal = (order) => {
    setIsModalOpen(true);
    setOrder(order);
    form.setFieldsValue({ name: order?.shippingAddress?.name, province: order?.shippingAddress?.province, district: order?.shippingAddress?.district, town: order?.shippingAddress?.town, street: order?.shippingAddress?.street, houseNumber: order?.shippingAddress?.houseNumber, status: order?.status })
  };

  const onFinish = (values) => {
    order.shippingAddress.name = values.name;
    order.shippingAddress.province =  values.province.split(',')[1] || values.province;
    order.shippingAddress.district =  values.district.split(',')[1] || values.district;
    order.shippingAddress.town = values.town;
    order.shippingAddress.street = values.street;
    order.shippingAddress.houseNumber = values.houseNumber;
    order.status = values.status;

    axios.post(`${server}/order/update-order`, order, config)
      .then((res) => {
          if(res.data.success) {
              notification.success({message: 'Cập nhật đơn hàng thành công'});
              setIsModalOpen(false);
              router.refresh();
          }
      })
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: 'Mã đơn',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Người nhận',
      dataIndex: 'receiverName',
      key: 'receiverName',
      render: (_, { shippingAddress }) => (
        <>
          {shippingAddress.name}
        </>
      )
    },
    {
      title: 'Trạng thái',
      // dataIndex: 'status',
      key: 'status',
      render: (_, { status }) => (
        <>
        {/* Sau khi thanh toán momo thành công hoặc chọn thanh toán cash on delivery */}
          {status === 'PROCESSING' ? <Tag color="gold">Đang lấy hàng</Tag> : ''} 
        {/* Chọn thanh toán momo nhấn hủy bỏ */}
          {status === 'PAYMENT FAIL' ? <Tag color="red">Thanh toán thất bại</Tag> : ''}
        {/* Sau khi tạo đơn hàng mặc định sẽ có trạng thái này */}
          {status === 'WAITING PAYMENT' ? <Tag color="orange">Chờ thanh toán</Tag> : ''}
        {/* Support or Admin sẽ cập nhật trạng thái này */}
          {status === 'DELIVERING' ? <Tag color="blue">Đang vận chuyển</Tag> : ''}
        {/* Support or Admin sẽ cập nhật trạng thái này */}
          {status === 'INCOMPLETE' ? <Tag color="error">Giao hàng thất bại</Tag> : ''}
        {/* Support or Admin sẽ cập nhật trạng thái này */}
          {status === 'COMPLETE' ? <Tag color="green">Hoàn thành</Tag> : ''}
        {/* User chọn hủy đơn */}
          {status === 'CANCEL' ? <Tag color="cyan">Đã hủy</Tag> : ''}
        </>
      )
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: 'Hình thức',
      // dataIndex: 'paymentType',
      key: 'paymentType',
      render: (_, record) => (
        <>
          {record?.paymentInfo ? record?.paymentInfo.type : 'Chưa chọn'}
        </>
      )
    },
    {
      title: 'Địa chỉ',
      // dataIndex: 'shippingAddress',
      key: 'shippingAddress',
      render: (_, { shippingAddress }) => (
        <>
          {`${shippingAddress.houseNumber}, ${shippingAddress.street}, ${shippingAddress.town}, ${shippingAddress.district}, ${shippingAddress.province}`}
        </>
      )
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <>
          {
            record.status === 'COMPLETE' || record.status === 'CANCEL' ? null : <Button type="primary" onClick={() => showModal(record)}>Cập nhật</Button>
          }
        </>
      ),
    },
  ];

  //Select address
  const province = Object.values(Province).map((item) => {
    return {
        label: item.name,
        value: `${item.code},${item.name}`
    }
  })
  const selectedProvince = Form.useWatch('province', form);
  const district = Object.values(District).filter((item) => item.parent_code === selectedProvince?.split(',')[0]).map((item) => {
    return {
        label: item.name,
        value: `${item.code},${item.name}`
    }
  });
  const selectedDistrict = Form.useWatch('district', form);
  const town = Object.values(Town).filter((item) => item.parent_code === selectedDistrict?.split(',')[0]).map((item) => {
    return {
        label: item.name,
        value: item.name
    }
  });



  const dataSource = orders.map((order) => {
    return {
      id: order._id,
      receiverName: order.shippingAddress.name,
      status: order.status,
      totalPrice: order.totalPrice,
      paymentType: order.paymentInfo?.type || 'Chưa chọn',
      shippingAddress: `${order.shippingAddress.houseNumber}, ${order.shippingAddress.street}, ${order.shippingAddress.town}, ${order.shippingAddress.district}, ${order.shippingAddress.province}`
    }
  })

  
  const columns2 = [
    {
      title: 'Mã đơn',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Người nhận',
      dataIndex: 'receiverName',
      key: 'receiverName',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: 'Hình thức',
      dataIndex: 'paymentType',
      key: 'paymentType',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'shippingAddress',
      key: 'shippingAddress',
    },
  ];

  console.log(dataSource)
  const handleClick = () => {
    const excel = new Excel();
    excel
      .addSheet("Đơn hàng")
      .addColumns(columns2)
      .addDataSource(dataSource, {
        str2Percent: true
      })
      .saveAs("Order.xlsx");
  };

  return (
    <>
      {orders.length !== 0 ? (
        <div className="w-[85%] bg-white h-full">
            <Button onClick={handleClick}>Xuất excel</Button>
            <Table columns={columns} dataSource={orders} scroll={{x:1250}}/>
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

            <Form.Item name="province" label="Chọn tỉnh/thành phố" rules={[{ required: false }]}>
                <Select
                    options={province}
                />
            </Form.Item>

            <Form.Item name="district" label="Quận/Huyện" rules={[{ required: false }]}>
                <Select
                    options={district}
                />
            </Form.Item>

            <Form.Item name="town" label="Phường/Xã" rules={[{ required: false }]}>
                <Select
                    placeholder=""
                    options={town}
                />
            </Form.Item>

            <Form.Item
                label="Đường"
                name="street"
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Số nhà"
                name="houseNumber"
            >
                <Input />
            </Form.Item>

            <Form.Item name="status" label="Trạng thái" rules={[{ required: false }]}>
                <Select
                    placeholder="Trạng thái đơn hàng"
                >
                    <Option value="WAITING PAYMENT">Chờ thanh toán</Option>
                    <Option value="PAYMENT FAIL">Thanh toán thất bại</Option>
                    <Option value="PROCESSING">Đang xử lý</Option>
                    <Option value="DELIVERING">Đang vận chuyển</Option>
                    <Option value="INCOMPLETE">Giao hàng không thành công</Option>
                    <Option value="COMPLETE">Hoàn thành</Option>
                </Select>
            </Form.Item>

            <Row justify='space-between' style={{marginTop: '24px'}}>
                <Button onClick={handleCancel}>Hủy</Button>
                <Button type='primary' htmlType="submit">Xác nhận</Button>
            </Row>
        </Form>
      </Modal>
    </>
  );
}

export default AllOrders