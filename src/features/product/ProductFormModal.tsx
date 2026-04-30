import { Modal, Form, Input, InputNumber } from "antd";

export default function ProductFormModal({
  open,
  onClose,
  onSubmit,
  initialValues,
}: any) {
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      title={initialValues ? "Edit Product" : "Add Product"}
      onCancel={onClose}
      onOk={() => form.submit()}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={initialValues}
      >
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}