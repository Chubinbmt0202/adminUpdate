// import { useQuery } from '@tanstack/react-query';
import { EditOutlined, EllipsisOutlined, ExpandOutlined } from '@ant-design/icons';
import {
  Card,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  InputNumber,
  Space,
  Avatar,
} from 'antd';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from '@/router/hooks';

import '../../student/listStudent/modal.css';

import { Course } from '#/entity';

export default function OrganizationPage() {
  const [searchForm] = Form.useForm();
  const { push } = useRouter();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  const [courseModalPros, setCourseModalProps] = useState<CourseModalProps>({
    formValue: {
      id: '',
      name: '',
      desc: '',
      numberClass: 0,
      fee: 0,
    },
    title: 'New',
    show: false,
    onOk: () => {
      setCourseModalProps((prev) => ({ ...prev, show: false }));
    },
    onCancel: () => {
      setCourseModalProps((prev) => ({ ...prev, show: false }));
    },
  });

  const onCreate = () => {
    setVisible(true);
  };

  const cardData = [
    {
      idKhoaHoc: 1,
      tenKhoaHoc: 'Khóa học Tiếng Anh giao tiếp trung cấp',
      moTa: 'Khóa tiếng Anh Giao tiếp Trung cấp tại E-Best English sẽ giúp bạn đến gần hơn với các mong muốn đó giao tiếp của bạn trôi chảy giao tiếp của bạn trôi chảy',
      numberClass: '20',
      hocPhi: 1000000.0,
    },
    {
      idKhoaHoc: 2,
      tenKhoaHoc: 'Khóa học Tiếng Anh giao tiếp nâng cao',
      moTa: 'Khoá học tiếng Anh giao tiếp nâng cao sẽ giúp cho giao tiếp của bạn trôi chảy, tự tin giao tiếp với người nước ngoài và sử dụng thuần thục cho các công việc khác yêu cầu tiếng Anh',
      numberClass: '10',
      hocPhi: 1000000.0,
    },
    {
      idKhoaHoc: 3,
      tenKhoaHoc: 'Khóa Tiếng Anh nền tảng lồng ghép TOEIC 4 kỹ năng',
      moTa: 'Các bạn ấy đã có thể sử dụng tốt tiếng Anh sau khi học Khóa tiếng Anh Nền tảng lồng ghép TOEIC 4 kỹ năng tại E-Best English viên cùng tài liệu học được chuẩn hóa, Khóa học TOEIC.',
      numberClass: '20',
      hocPhi: 1000000.0,
    },
    {
      idKhoaHoc: 3,
      tenKhoaHoc: 'Khóa học Toeic đảm bảo đầu ra cho mọi đối tượng',
      moTa: 'Với lộ trình theo level của từng học viên cùng tài liệu học được chuẩn hóa, Khóa học TOEIC tại E-Best English sẽ giúp bạn chinh phục đỉnh TOEIC dễ dàng. Cùng tìm hiểu chi tiết hơn về khóa học này nhé.',
      numberClass: '20',
      hocPhi: 1000000.0,
    },
    {
      idKhoaHoc: 3,
      tenKhoaHoc: 'Khóa học Tiếng Anh thiếu nhi',
      moTa: 'Với lộ trình theo level của từng học viên cùng tài liệu học được chuẩn hóa, Khóa học TOEIC tại E-Best English sẽ giúp bạn chinh phục đỉnh TOEIC dễ dàng. Cùng tìm hiểu chi tiết hơn về khóa học này nhé.',
      numberClass: '20',
      hocPhi: 1000000.0,
    },
    {
      idKhoaHoc: 3,
      tenKhoaHoc: 'Khóa học Tiếng Anh giao tiếp',
      moTa: 'Với lộ trình theo level của từng học viên cùng tài liệu học được chuẩn hóa, Khóa học TOEIC tại E-Best English sẽ giúp bạn chinh phục đỉnh TOEIC dễ dàng. Cùng tìm hiểu chi tiết hơn về khóa học này nhé.',
      numberClass: '20',
      hocPhi: 1000000.0,
    },
  ];

  function handleDetail(course: {
    idKhoaHoc: number;
    tenKhoaHoc: string;
    moTa: string;
    numberClass: string;
    hocPhi: number;
  }): void {
    console.log('Course Details:', course);
    // Navigate to the course detail page
    console.log('Navigate to the course detail page', `${pathname}/${course.idKhoaHoc}`);
    localStorage.setItem('courseSelect', JSON.stringify(course));
    push(`${pathname}/${course.idKhoaHoc}`);
  }

  const handleDelete = (course: {
    idKhoaHoc: number;
    tenKhoaHoc: string;
    moTa: string;
    numberClass: string;
    hocPhi: number;
  }): void => {
    // Delete course from API or database
    alert("Delete course")
  };

  const handleUpdate = (course: {
    idKhoaHoc: number;
    tenKhoaHoc: string;
    moTa: string;
    numberClass: string;
    hocPhi: number;
  }): void => {
    // Set course data to state and show modal
    setCourseData(course);
    form.setFieldsValue(course);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setVisible(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log('Validation failed:', info);
      });
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [courseData, setCourseData] = useState<{
    idKhoaHoc: number;
    tenKhoaHoc: string;
    moTa: string;
    numberClass: string;
    hocPhi: number;
  } | null>(null);

  const handleSubmit = () => {
    const formValues = form.getFieldsValue();
    if (formValues) {
      console.log('Form values:', formValues);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setVisible(false);
      }, 1000);
    }else {
      console.log('Form values:', formValues);
    }
  };

  const [form] = Form.useForm();
  return (
    <Space direction="vertical" size="large" className="w-full">
      <Card>
        <Form form={searchForm}>
          <Row justify="space-between" align="middle" gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item label="Tên khoá học" name="name" className="!mb-0">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <div className="flex justify-end">
                {/* <Button onClick={onSearchFormReset}>Reset</Button> */}
                <Button type="primary" className="ml-4">
                  Tìm khoá học
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card
        title="Danh sách khoá học"
        
        extra={
          <div>
            <Button type="primary" onClick={onCreate}>
              Thêm khoá học mới
            </Button>
          </div>
        }
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          {cardData.map((course, index) => (
            <Card
              key={index}
              style={{ width: '47%', marginBottom: '2%' }}
              actions={[
                <ExpandOutlined onClick={() => handleDetail(course)} />,
                // <ExpandOutlined onClick={() => push(`${pathname}/${course.idKhoaHoc}`)} />,
                <EditOutlined key="edit" onClick={() => handleUpdate(course)} />,
                <EllipsisOutlined key="ellipsis" onClick={() => handleDelete(course)} />,
              ]}
            >
              <Card.Meta
                avatar={<Avatar src="../../../../assets/icons/ic-logo.svg" />}
                title={course.tenKhoaHoc}
                description={
                  <>
                    <p>{course.moTa}</p>
                    <p className="font-bold">Số lượng lớp học: {course.numberClass}</p>
                    <p className="font-bold">
                      Học phí:
                      {course.hocPhi.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </p>
                  </>
                }
              />
            </Card>
          ))}
        </div>
      </Card>

      <Modal
        title="Cập nhật thông tin khoá học"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Lưu cập nhật
          </Button>,
        ]}
      >
        <hr className="mb-3" />
        {courseData && (
          <Form form={form} layout="vertical" initialValues={courseData}>
            <Form.Item
              name="tenKhoaHoc"
              label="Tên khóa học"
              rules={[{ required: true, message: 'Please input the course name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="moTa"
              label="Mô tả"
              rules={[{ required: true, message: 'Please input the course description!' }]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              name="numberClass"
              label="Số lượng lớp học"
              rules={[{ required: true, message: 'Please input the number of classes!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="hocPhi"
              label="Học phí"
              rules={[{ required: true, message: 'Please input the price!' }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Form>
        )}
      </Modal>

      <Modal
        visible={visible}
        onCancel={handleCancel}
        title="Thêm khoá học"
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Thêm khóa học
          </Button>,
        ]}
      >
        <hr className="mb-3" />
          <Form form={form} layout="vertical">
            <Form.Item
              name="tenKhoaHoc"
              label="Tên khóa học"
              rules={[{ required: true, message: 'Please input the course name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="moTa"
              label="Mô tả"
              rules={[{ required: true, message: 'Please input the course description!' }]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              name="numberClass"
              label="Số lượng lớp học"
              rules={[{ required: true, message: 'Please input the number of classes!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="hocPhi"
              label="Học phí"
              rules={[{ required: true, message: 'Please input the price!' }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Form>
      </Modal>
    </Space>
  );
}

type CourseModalProps = {
  formValue: Course;
  title: string;
  show: boolean;
  onOk: VoidFunction;
  onCancel: VoidFunction;
};

