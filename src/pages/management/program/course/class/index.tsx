// import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  TimePicker,
} from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
// import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { IconButton, Iconify } from '@/components/icon';
import { useRouter, usePathname } from '@/router/hooks';
import ProTag from '@/theme/antd/components/tag';

import '../../../student/listStudent/modal.css';

import { Class } from '#/entity';
import type { DatePickerProps } from 'antd';

type SearchFormType = Pick<Class, 'name' | 'status'>;

export default function OrganizationPage() {
  const { push } = useRouter();
  const pathname = usePathname();
  const [searchForm] = Form.useForm();
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  // const router = useRouter();
  // const [course, setCourse] = useState({});
  const [selectedRowKeys, setselectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    // fetchCourse();
    const storeClasses = localStorage.getItem('courseSelect');
    console.log('Dư xlieeuk trong ', storeClasses);
    setSelectedClasses(storeClasses ? JSON.parse(storeClasses) : []);
    console.log('selectedClasses', selectedClasses);
  }, []);

  const onChange: DatePickerProps['onChange'] = (date: any, dateString: any) => {
    console.log(date, dateString);
  };

  const [studentModalPros, setStudentModalProps] = useState<ClassModalProps>({
    formValue: {
      id: '',
      name: '',
      numberStudent: 1,
      createDate: 'Đã thanh toán',
      endDate: 'Chờ xếp lớp',
      status: 'Đang mở',
    },
    title: 'New',
    show: false,
    onOk: () => {
      setStudentModalProps((prev) => ({ ...prev, show: false }));
    },
    onCancel: () => {
      setStudentModalProps((prev) => ({ ...prev, show: false }));
    },
  });

  const data = [
    {
      id: '1',
      name: 'Tiếng Anh Giao tiếp C201',
      numberStudent: 25,
      createDate: '01-01-2024',
      endDate: '30-06-2024',
      price: '2,000,000 VND',
    },
    {
      id: '2',
      name: 'Tiếng Anh Giao tiếp B122',
      numberStudent: 30,
      createDate: '15-02-2024',
      endDate: '15-07-2024',
      price: '2,500,000 VND',
    },
    {
      id: '3',
      name: 'Tiếng Anh Giao tiếp D231',
      numberStudent: 20,
      createDate: '10-03-2024',
      endDate: '10-09-2024',
      price: '3,000,000 VND',
    },
    {
      id: '4',
      name: 'Tiếng Anh Giao tiếp C233',
      numberStudent: 18,
      createDate: '20-04-2024',
      endDate: '20-10-2024',
      price: '2,200,000 VND',
    },
    {
      id: '5',
      name: 'Tiếng Anh Giao tiếp A123',
      numberStudent: 15,
      createDate: '01-05-2024',
      endDate: '01-11-2024',
      price: '2,800,000 VND',
    },
    {
      id: '6',
      name: 'Tiếng Anh Giao tiếp E123',
      numberStudent: 10,
      createDate: '01-06-2024',
      endDate: '01-12-2024',
      price: '3,500,000 VND',
    },
  ];

  const columns: ColumnsType<Class> = [
    { title: 'Tên lớp học', dataIndex: 'name', width: 200 },
    { title: 'Số lượng học viên', dataIndex: 'numberStudent', align: 'center', width: 100 },
    { title: 'Ngày tạo', dataIndex: 'createDate', align: 'center', width: 120 },
    { title: 'Ngày kết thúc', dataIndex: 'endDate', align: 'center', width: 120 },
    { title: 'Trạng thái', dataIndex: 'status', align: 'center', width: 120 },
    {
      title: 'Hành động     ',
      key: 'operation',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <div className="flex w-full justify-center text-gray">
          <IconButton>
            <Iconify
              icon="mdi:card-account-details"
              onClick={() => handleDetailClass()}
              size={18}
            />
          </IconButton>
          <IconButton onClick={() => onEdit(record)}>
            <Iconify icon="solar:pen-bold-duotone" size={18} />
          </IconButton>
          <Popconfirm
            title="Bạn muốn xoá lớp học này"
            okText="Yes"
            cancelText="No"
            placement="left"
          >
            <IconButton>
              <Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
            </IconButton>
          </Popconfirm>
        </div>
      ),
    },
  ];

  interface OnSelectionChangeProps {
    newSelectedRowKeys: React.Key[];
  }

  const onSelectionChange = ({ newSelectedRowKeys }: OnSelectionChangeProps) => {
    setselectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<Class> = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setselectedRowKeys(newSelectedRowKeys);
      console.log('rowSelection.onChange', newSelectedRowKeys);
      onSelectionChange({ newSelectedRowKeys });
    },
    onSelect: (record, selected, selectedRows) => {
      console.log('detail class', record, selected, selectedRows);
      console.log(record, selected, selectedRows);
      setSelectedClasses(selectedRows.map((item) => item.name));
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  const onSearchFormReset = () => {
    searchForm.resetFields();
  };

  const onCreate = () => {
    setStudentModalProps((prev) => ({
      ...prev,
      show: true,
      title: 'Tạo lớp học mới',
      formValue: {
        ...prev.formValue,
        id: '',
        name: '',
        order: 1,
        desc: '',
        status: 'Đang mở',
      },
    }));
  };

  const onEdit = (formValue: Class) => {
    setStudentModalProps((prev) => ({
      ...prev,
      show: true,
      title: 'Chỉnh sửa',
      formValue: {
        ...formValue,
        status: formValue.status || 'Đang mở',
      },
    }));
  };

  const handleDetailClass = () => {
    // TODO: Implement logic to open detail class modal
    if (selectedRowKeys.length === 0) {
      alert('Vui lòng chọn lớp học để xem chi tiết');
    } else {
      console.log('Detail class', pathname);
      console.log('Detail class', selectedRowKeys);
      push(`${pathname}/${selectedClasses}`);
    }
  };

  return (
    <Space direction="vertical" size="large" className="w-full">
      <h1 className="text-3xl font-bold">{selectedClasses.tenKhoaHoc}</h1>
      <Card>
        <Form form={searchForm}>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item<SearchFormType> label="Tên lớp" name="name" className="!mb-0">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item<SearchFormType> label="Trạng thái" name="statusSalary" className="!mb-0">
                <Select>
                  <Select.Option value="enable">
                    <ProTag color="success">Đang học</ProTag>
                  </Select.Option>
                  <Select.Option value="disable">
                    <ProTag color="error">Đã khoá</ProTag>
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6} offset={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="primary" className="ml-4">
                Tìm lớp học
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card
        title={`Danh sách lớp học trong khoá : ${selectedClasses.numberClass}`}
        extra={
          <div>
            <Button className="mr-3" disabled={selectedRowKeys.length === 0} onClick={onCreate}>
              khoá lớp
            </Button>
            <Button type="primary" onClick={onCreate}>
              Thêm mới khoá học
            </Button>
          </div>
        }
      >
        <Table
          rowKey="id"
          size="small"
          scroll={{ x: 'max-content' }}
          pagination={false}
          dataSource={data}
          columns={columns}
          rowSelection={{ ...rowSelection }}
        />
      </Card>

      <ClassModal {...studentModalPros} />
    </Space>
  );
}

type ClassModalProps = {
  formValue: Class;
  title: string;
  show: boolean;
  onOk: VoidFunction;
  onCancel: VoidFunction;
};

function ClassModal({ title, show, formValue, onOk, onCancel }: ClassModalProps) {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ ...formValue });
  }, [formValue, form]);

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    alert('Form values: ' + JSON.stringify(values, null, 2));
    console.log('Form values:', values);
  };
  return (
    <Modal
      footer={[
        <Button key="back">Huỷ</Button>,
        <Button type="primary" onClick={() => handleSubmit}>
          Tạo mới
        </Button>,
      ]}
      title={title}
      open={show}
      onCancel={onCancel}
      className="custom-modal"
    >
      <Form
        initialValues={formValue}
        form={form}
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 32 }}
        layout="horizontal"
        className="space-y-4"
      >
        <hr />
        <p>Thông tin lớp học</p>
        <Form.Item
          name="fullName"
          className="mt-[-10px]"
          rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
        >
          Nhập tên lớp
          <Input />
        </Form.Item>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="birthdate" className="!mb-0">
              <p>Ngày mở lớp</p>
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="birthdate" className="!mb-0">
              <p>Ngày kết thúc</p>
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="job" className="!mb-0">
              <p>Phòng học</p>
              <Select className="w-full">
                <Select.Option>C210</Select.Option>
                <Select.Option>C223</Select.Option>
                <Select.Option>C310</Select.Option>
                <Select.Option>C110</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <p>Giáo viên phụ trách</p>
            <Form.Item name="job" className="!mb-0">
              <Select className="w-full">
                <Select.Option value="student">Nguyễn Thị Lan</Select.Option>
                <Select.Option value="employee">Dương Thị Bích Ngọc</Select.Option>
                <Select.Option value="freelancer">Lê Thị Ý Nhi</Select.Option>
                <Select.Option value="other">Nguyễn Thị Thuỳ Linh</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <p>Số lượng học viên</p>
            <Form.Item name="number">
              <Input className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="TimeStart" className="!mb-0">
              <p className="mb-1">Thời gian học</p>
              <TimePicker
                style={{ width: '100%' }}
                defaultValue={dayjs('12:08:23', 'HH:mm:ss')}
                size="large"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="TimeEnd" className="!mb-0">
              <p className="mb-1">Thời gian học xong</p>
              <TimePicker
                defaultValue={dayjs('12:08:23', 'HH:mm:ss')}
                size="large"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
