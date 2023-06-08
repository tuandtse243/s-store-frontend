import React, { useState, useEffect, useRef } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { backend_url, server } from "@/server";
import styles from "@/src/styles/styles";
import Link from "next/link";
import { MdTrackChanges } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { Button, Form, Input, Modal, Row, Select, Table, Tag, notification } from "antd";
import { useAuth } from "@/store/auth";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";
import Province from '../../../public/address/tinh_tp.json';
import District from '../../../public/address/quan_huyen.json';
import Town from '../../../public/address/xa_phuong.json';

const ProfileContent = ({ active }) => {
  const user = useAuth((state) => state.auth);
  const setAuth = useAuth((state) => state.setAuth)
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phone);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(user?.avatar);


  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(updateUserInformation(name, email, phoneNumber, password));
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    // console.log(file)
    // setAvatar(file);

    const formData = new FormData();

    formData.append("image", file);
    formData.append("id", user._id);

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    await axios
      .post(`${server}/user/update-avatar`, formData, config)
      .then((response) => {
        //  console.log(response.data.newUser)
         setAuth({...user, avatar: response.data.secure_url})
         setAvatar(response.data.secure_url)
         notification.success({message: "Cập nhật avatar thành công!"});
      })
      .catch((error) => {
        notification.error({message: error});
      });
  };

  return (
    <div className="w-full">
      {/* profile */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={avatar}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={(e) => handleImage(e)}
                />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Username</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={user?.username}
                    disabled
                  />
                </div>
              </div>
              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </>
      )}

      {/* order */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* Refund */}
      {/* {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )} */}

      {/* Track order */}
      {/* {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )} */}

      {/* Change Password */}
      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}

      {/*  user Address */}
      {active === 7 && (
        <div>
          {/* <Address /> */}
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
    const router = useRouter();
    const user = useAuth((state) => state.auth);
    const [orders, setOrders] = useState([]);
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

  useEffect(() => {
    axios.get(`${server}/order/get-all-orders/${user._id}`, config)
    .then((res) => setOrders(res.data?.orders))
  }, []);

  // Thanh toán
  const onPayment = (order) => {
    localStorage.setItem("latestOrder", JSON.stringify(order));
    router.push('/payment')
  }

  
  // Hủy
  const onCancel = (order) => {
    order.status = 'CANCEL';
    axios.post(`${server}/order/update-order`, order, config)
      .then((res) => {
        if(res.data.success) {
          router.refresh();
        }
      })
      .catch((err) => console.log('Error', err))
  }

  // Chỉnh sửa

  const [form] = Form.useForm();
  const [order, setOrder] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (order) => {
    setIsModalOpen(true);
    setOrder(order);
    form.setFieldsValue({ name: order?.shippingAddress?.name, province: order?.shippingAddress?.province, district: order?.shippingAddress?.district, town: order?.shippingAddress?.town, street: order?.shippingAddress?.street, houseNumber: order?.shippingAddress?.houseNumber })
  };

  const onFinish = (values) => {
    order.shippingAddress.name = values.name;
    order.shippingAddress.province =  values.province.split(',')[1] || values.province;
    order.shippingAddress.district =  values.district.split(',')[1] || values.district;
    order.shippingAddress.town = values.town;
    order.shippingAddress.street = values.street;
    order.shippingAddress.houseNumber = values.houseNumber;

    axios.post(`${server}/order/update-order`, order, config)
        .then((res) => {
            if(res.data.success) {
                notification.success({message: 'Chỉnh sửa đơn hàng thành công'});
                setIsModalOpen(false);
                router.refresh();
            }
        })
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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

  const columns = [
    {
      title: 'Mã đơn',
      dataIndex: '_id',
      key: 'id',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: 'Người nhận',
      key: 'takePeople',
      render: (_, { shippingAddress }) => (
        <>
          {shippingAddress.name}
        </>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_, { status }) => (
        <>
          {status === 'PROCESSING' ? <Tag color="gold">Đang lấy hàng</Tag> : ''}
          {status === 'PAYMENT FAIL' ? <Tag color="red">Thanh toán thất bại</Tag> : ''}
          {status === 'WAITING PAYMENT' ? <Tag color="orange">Chờ thanh toán</Tag> : ''}
          {status === 'DELIVERING' ? <Tag color="blue">Đang vận chuyển</Tag> : ''}
          {status === 'INCOMPLETE' ? <Tag color="error">Giao hàng thất bại</Tag> : ''}
          {status === 'COMPLETE' ? <Tag color="green">Hoàn Thành</Tag> : ''}
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
      key: 'totalPrice',
      render: (_, record) => (
        <>
          {record?.paymentInfo ? record?.paymentInfo.type : 'Chưa chọn'}
        </>
      )
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'shippingAddress',
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
          <Button type="primary" onClick={() => onDetail(record)}>Chi tiết</Button>
          {
            record.status === 'PAYMENT FAIL' || record.status === 'WAITING PAYMENT'  ? <Button type="primary" onClick={() => onPayment(record)}>Thanh toán</Button> : null
          }
          {
            record.status === 'PROCESSING' || record.status === 'PAYMENT FAIL' || record.status === 'WAITING PAYMENT'  ? <Button type="primary" onClick={() => showModal(record)}>Chỉnh sửa</Button> : null
          }
          {
            record.status === 'PROCESSING' || record.status === 'PAYMENT FAIL'  ? <Button type="primary" onClick={() => onCancel(record)}>Hủy đơn</Button> : null
          }
        </>
      ),
    },
  ];

  return (
    <div>
      {orders.length !== 0 ? (
        <div className="w-full bg-white">
            <Table columns={columns} dataSource={orders} scroll={{x:800}}/>
        </div>
      ) : (
        <Loader />
      )}

      <Modal title="Basic Modal" footer={null} open={isModalOpen}>
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
            <Row justify='space-between' style={{marginTop: '24px'}}>
                <Button onClick={handleCancel}>Hủy</Button>
                <Button type='primary' htmlType="submit">Xác nhận</Button>
            </Row>
        </Form>
      </Modal>
    </div>
  );
};

const AllRefundOrders = () => {
  const user = useAuth((state) => state.auth);
//   const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const eligibleOrders = orders && orders.filter((item) => item.record.status === "Processing refund");

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link href={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  eligibleOrders &&
   eligibleOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};

const TrackOrder = () => {
  const user = useAuth((state) => state.auth);
//   const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link href={`/user/track/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.success);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className=" w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Enter your old password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your new password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your confirm password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const user = useAuth((state) => state.auth);

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all the fields!");
    } else {
      dispatch(
        updatUserAddress(
          country,
          city,
          address1,
          address2,
          addressType
        )
      );
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setAddressType("");
    }
  };

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
  };

  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
          <div className="w-[40%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Add New Address
            </h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  <div className="w-full pb-2">
                    <label className="block pb-2">Country</label>
                    <select
                      name=""
                      id=""
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-[100%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        choose your country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Choose your City</label>
                    <select
                      name=""
                      id=""
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-[100%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        choose your city
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 1</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 2</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Address Type</label>
                    <select
                      name=""
                      id=""
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-[100%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        Choose your Address Type
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option
                            className="block pb-2"
                            key={item.name}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className=" w-full pb-2">
                    <input
                      type="submit"
                      className={`${styles.input} mt-5 py-2 cursor-pointer bg-black text-white`}
                      required
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <div
          className={`${styles.button} !rounded-md`}
          onClick={() => setOpen(true)}
        >
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      {user &&
        user.addresses.map((item, index) => (
          <div
            className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
            key={index}
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-[600]">{item.addressType}</h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {item.address1} {item.address2}
              </h6>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {user && user.phoneNumber}
              </h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => handleDelete(item)}
              />
            </div>
          </div>
        ))}

      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px]">
          You not have any saved address!
        </h5>
      )}
    </div>
  );
};
export default ProfileContent;