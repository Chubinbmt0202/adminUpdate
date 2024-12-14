import { UploadOutlined } from '@ant-design/icons';
import {
  Row,
  Col,
  Drawer,
  Button,
  Input,
  Space,
  message,
  List,
  Tabs,
  Upload,
  Modal,
  Typography,
} from 'antd';
import { useState } from 'react';

import Card from '@/components/card';
import { IconButton, Iconify } from '@/components/icon';

import ExerciseDrawer from './examClass';
import { useExercises } from './provider/questionClass';

const { TabPane } = Tabs;

const renderExerciseType = (type: string) => {
  switch (type) {
    case 'multiple':
      return 'Trắc nghiệm';
    case 'essay':
      return 'Tự luận';
    default:
      return 'Khác';
  }
};

export default function TeamsTab() {
  const [addDrawerVisible, setAddDrawerVisible] = useState(false);
  const [editDrawerVisible, setEditDrawerVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [detailDrawerVisible, setDetailDrawerVisible] = useState(false);
  interface QuestionData {
    id: string;
    questions: { text: string; type: string; options?: string[]; correct?: number }[];
  }
  const { exercises, clearExercises } = useExercises();
  const [isModalVisible, setIsModalVisible] = useState(false);
  interface Exercise {
    id: string;
    questions: { text: string; type: string; options?: string[]; correct?: number }[];
  }

  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);

  // Mở modal chi tiết bài tập
  const handleViewDetails = (exercise: Exercise) => {
    setCurrentExercise(exercise);
    setIsModalVisible(true);
  };

  // Đóng modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setCurrentExercise(null);
  };
  const [currentDetail, setCurrentDetail] = useState<{
    name: string;
    desc: string;
    icon: string;
  } | null>(null);

  const [newProgram, setNewProgram] = useState({ name: '', desc: '', icon: '' });
  const [editProgram, setEditProgram] = useState<{
    id: string;
    name: string;
    desc: string;
    icon: string;
  } | null>(null);

  const [items, setItems] = useState([
    {
      id: '1',
      icon: <Iconify icon="logos:react" size={40} />,
      name: 'Chương 1: Phát âm',
      desc: 'We don’t make assumptions about the rest of your technology stack, so you can develop new features in React.',
    },
  ]);

  const [materials, setMaterials] = useState<{ name: string; url: string }[]>([]);
  const [previewFile, setPreviewFile] = useState<string | null>(null);

  const handleUpload = async (file: any) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'question'); // Thay bằng upload preset của bạn
    formData.append('cloud_name', 'dx3snw69p'); // Thay bằng tên cloud của bạn

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/dx3snw69p/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      const newMaterial = {
        name: file.name,
        url: data.secure_url,
      };
      setMaterials((prev) => [...prev, newMaterial]);
      message.success('Tải tài liệu thành công!');
    } catch (error) {
      message.error('Tải tài liệu thất bại!');
    }
  };

  const icons = [
    'logos:react',
    'logos:vue',
    'logos:figma',
    'logos:html-5',
    'logos:adobe-xd',
    'logos:nodejs',
    'logos:python',
  ];

  const generateId = () => Math.random().toString(36).substring(2, 15);

  // Xử lý thêm bài học
  const handleAddProgram = () => {
    const icon = icons[Math.floor(Math.random() * icons.length)];
    const newItem = {
      id: generateId(),
      icon: <Iconify icon={icon} size={40} />,
      name: newProgram.name,
      desc: newProgram.desc,
    };

    setItems((prevItems) => [...prevItems, newItem]);
    setAddDrawerVisible(false);
    setNewProgram({ name: '', desc: '', icon: '' });
  };

  // Xử lý cập nhật bài học
  const handleUpdateProgram = () => {
    if (editProgram) {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === editProgram.id
            ? {
                ...item,
                name: editProgram.name,
                desc: editProgram.desc,
                icon: <Iconify icon={editProgram.icon || 'logos:react'} size={40} />,
              }
            : item,
        ),
      );
      setEditDrawerVisible(false);
      setEditProgram(null);
    }
  };

  // Mở Drawer chỉnh sửa
  const handleEdit = (program: { id: string; name: string; desc: string; icon: any }) => {
    setEditProgram({
      id: program.id,
      name: program.name,
      desc: program.desc,
      icon: program.icon.props.icon,
    });
    setEditDrawerVisible(true);
  };

  // Hiển thị chi tiết chương
  const handleDetailProgram = (program: { name: string; desc: string; icon: any }) => {
    setCurrentDetail({
      name: program.name,
      desc: program.desc,
      icon: program.icon.props.icon,
    });
    setDetailDrawerVisible(true);
  };

  const renderExerciseType = (type: string) => {
    switch (type) {
      case 'multiple':
        return 'Trắc nghiệm';
      case 'essay':
        return 'Tự luận';
      default:
        return 'Khác';
    }
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        {/* Default Card for Adding a New Program */}
        <Col span={24} md={12}>
          <Card
            onClick={() => setAddDrawerVisible(true)}
            className="w-full cursor-pointer flex-col"
          >
            <header className="flex w-full items-center justify-center">
              <Iconify icon="eva:plus-fill" size={24} />
              <span className="ml-2 text-xl opacity-70">Thêm bài học</span>
            </header>
            <main className="my-2 text-center opacity-70">
              <p>Click để thêm một bài học mới</p>
            </main>
          </Card>
        </Col>

        {/* Display All Existing Programs */}
        {items.map((item) => (
          <Col span={24} md={12} key={item.id}>
            <Card
              onClick={() => handleDetailProgram(item)}
              className="w-full cursor-pointer flex-col"
            >
              <header className="flex w-full items-center">
                {item.icon}
                <span className="ml-4 text-xl opacity-70">{item.name}</span>

                <div className="ml-auto flex opacity-70">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(item);
                    }}
                  >
                    <Iconify icon="fontisto:more-v-a" size={18} />
                  </IconButton>
                </div>
              </header>
              <main className="my-4 opacity-70">{item.desc}</main>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Drawer for Adding Program */}
      <Drawer
        title="Thêm bài học mới"
        visible={addDrawerVisible}
        onClose={() => setAddDrawerVisible(false)}
        width={500}
        extra={
          <Space>
            <Button onClick={() => setAddDrawerVisible(false)}>Hủy</Button>
            <Button type="primary" onClick={handleAddProgram}>
              Tạo bài học
            </Button>
          </Space>
        }
      >
        <div className="mb-4">
          <Input
            id="add-program-name"
            name="name"
            value={newProgram.name}
            onChange={(e) => setNewProgram((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Nhập tên bài học"
          />
        </div>
        <div className="mb-4">
          <Input.TextArea
            id="add-program-desc"
            name="desc"
            value={newProgram.desc}
            placeholder="Nhập mô tả"
            rows={4}
            onChange={(e) => setNewProgram((prev) => ({ ...prev, desc: e.target.value }))}
          />
        </div>
      </Drawer>

      {/* Drawer for Editing Program */}
      <Drawer
        title="Chỉnh sửa bài học"
        visible={editDrawerVisible}
        onClose={() => setEditDrawerVisible(false)}
        width={500}
        extra={
          <Space>
            <Button onClick={() => setEditDrawerVisible(false)}>Hủy</Button>
            <Button type="primary" onClick={handleUpdateProgram}>
              Cập nhật
            </Button>
          </Space>
        }
      >
        <div className="mb-4">
          <Input
            id="edit-program-name"
            name="name"
            value={editProgram?.name || ''}
            onChange={(e) =>
              setEditProgram((prev) => (prev ? { ...prev, name: e.target.value } : null))
            }
            placeholder="Nhập tên bài học"
          />
        </div>
        <div className="mb-4">
          <Input.TextArea
            id="edit-program-desc"
            name="desc"
            value={editProgram?.desc || ''}
            placeholder="Nhập mô tả"
            rows={4}
            onChange={(e) =>
              setEditProgram((prev) => (prev ? { ...prev, desc: e.target.value } : null))
            }
          />
        </div>
      </Drawer>

      {/* Drawer for Viewing Details */}
      <Drawer
        title="Chi tiết bài học"
        visible={detailDrawerVisible}
        onClose={() => setDetailDrawerVisible(false)}
        width={1000}
      >
        {currentDetail && (
          <div>
            <div className="mb-4 flex items-center">
              <Iconify icon={currentDetail.icon} size={40} />
              <h2 className="ml-4 text-xl">{currentDetail.name}</h2>
            </div>
            <p>{currentDetail.desc}</p>

            <Tabs defaultActiveKey="1">
              {/* Tab Tài Liệu */}
              <TabPane tab="Tài liệu" key="1">
                <div className="mb-4">
                  <Upload
                    beforeUpload={(file) => {
                      handleUpload(file);
                      return false; // Ngăn Ant Design tự upload file
                    }}
                    showUploadList={false}
                  >
                    <Button icon={<UploadOutlined />}>Tải tài liệu lên</Button>
                  </Upload>
                </div>
                <List
                  dataSource={materials}
                  renderItem={(item) => (
                    <List.Item
                      onClick={() => setPreviewFile(item.url)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div>{item.name}</div>
                    </List.Item>
                  )}
                />
              </TabPane>

              {/* Tab Bài Tập */}
              <TabPane tab="Bài tập" key="2">
                <div className="mb-4">
                  <Button onClick={() => setDrawerVisible(true)} type="primary">
                    Tạo bài tập
                  </Button>
                </div>
                <Card style={{ marginTop: 20 }}>
                  <h3>Danh sách bài tập</h3>
                  {exercises.length > 0 ? (
                    <List
                      dataSource={exercises}
                      renderItem={(exercise, index) => (
                        <List.Item
                          onClick={() => handleViewDetails(exercise)}
                          style={{
                            cursor: 'pointer',
                            padding: '10px 0',
                            backgroundColor: '#f9f9f9',
                            borderRadius: '5px',
                            marginBottom: '10px',
                          }}
                        >
                          <div style={{ flex: 1, cursor: 'pointer', marginLeft: '10px' }}>
                            <Typography.Title level={5}>Bài tập {index + 1}</Typography.Title>
                          </div>
                        </List.Item>
                      )}
                    />
                  ) : (
                    <p style={{ textAlign: 'center', color: 'gray' }}>
                      Không có bài tập nào được thêm.
                    </p>
                  )}
                </Card>
                <ExerciseDrawer visible={drawerVisible} onClose={() => setDrawerVisible(false)} />
              </TabPane>
            </Tabs>
          </div>
        )}

        {/* Modal Xem Trước Tài Liệu */}
        <Modal
          visible={!!previewFile}
          title="Xem trước tài liệu"
          footer={null}
          onCancel={() => setPreviewFile(null)}
          width={800}
        >
          <iframe
            src={previewFile || ''}
            title="Document Preview"
            style={{ width: '100%', height: '500px', border: 'none' }}
          />
        </Modal>

        <Modal
          title={`Chi tiết bài tập ${currentExercise ? currentExercise.id : ''}`}
          visible={isModalVisible}
          onCancel={handleCloseModal}
          footer={[
            <Button key="back" onClick={handleCloseModal}>
              Đóng
            </Button>,
          ]}
          width={800}
        >
          {currentExercise && (
            <div>
              <h2>Câu hỏi:</h2>
              <List
                dataSource={currentExercise.questions}
                renderItem={(question, index) => (
                  <List.Item key={index}>
                    <div>
                      <p>{question.text}</p>
                      {question.type === 'multiple' && question.options && (
                        <ul>
                          {question.options.map((option, i) => (
                            <li key={i}>
                              {i === question.correct ? <strong>{option}</strong> : option}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </List.Item>
                )}
              />
            </div>
          )}
        </Modal>
      </Drawer>
    </div>
  );
}
