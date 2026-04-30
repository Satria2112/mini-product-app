import { Modal, Form, Input, InputNumber } from "antd";
import { useEffect } from "react";

export default function ProductFormModal({
  open,
  onClose,
  onSubmit,
  initialValues,
}: any) {
  const [form] = Form.useForm();

  // 🔥 FIX: reset & set form setiap open
  useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue(initialValues); // edit
      } else {
        form.resetFields(); // add
      }
    }
  }, [open, initialValues]);

  return (
    <Modal
      open={open}
      title={initialValues ? "Edit Product" : "Add Product"}
      onCancel={onClose}
      onOk={() => form.submit()}
      destroyOnClose
      centered // 🔥 modal di tengah
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
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