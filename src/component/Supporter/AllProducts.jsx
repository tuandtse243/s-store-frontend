'use client'
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import Link from "next/link";
// import { deleteProduct } from "../../redux/actions/product";
import { Space, Table, Tag, notification } from 'antd';
import { server } from "@/server";
import axios from "axios";
import Loader from "../Loader/Loader";

const AllProducts = () => {
    const [data, setData] = useState(false)

  useEffect(() => {
    axios.get(`${server}/product/get-all-products`)
    .then((res) => setData(res?.data?.products))
    .catch((err) => notification.error({message: err?.response?.data?.message}));
  }, []);

  const handleDelete = (key) => {
    // console.log(key)
  };

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Loại',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Size',
      key: 'sizes',
      dataIndex: 'sizes',
      render: (_, { sizes }) => (
        <>
          {sizes.map((size) => {
            {/* let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            } */}
            return (
              <Tag color='volcano' key={size}>
                {size}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
        title: 'Giới tính',
        dataIndex: 'sex',
        key: 'sex',
    },
    {
        title: 'Giá gốc',
        dataIndex: 'originalPrice',
        key: 'originalPrice',
    },
    {
        title: 'Giá khuyến mãi',
        dataIndex: 'discountPrice',
        key: 'discountPrice',
    },
    {
        title: 'Số lượng',
        dataIndex: 'stock',
        key: 'stock',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Edit</a>
          <p onClick={() => handleDelete(record)}>Delete</p>
        </Space>
      ),
    },
  ];

  return (
    <>
      {data ? (
        <div className="w-[85%] bg-white">
            <Table columns={columns} dataSource={data} scroll={{x:1250}}/>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default AllProducts;