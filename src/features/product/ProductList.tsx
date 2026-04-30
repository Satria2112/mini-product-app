import {
  Table,
  Input,
  Button,
  Space,
  Modal,
  message,
  Card,
  Select,
  Tooltip,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "./productService";
import ProductFormModal from "./ProductFormModal";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const navigate = useNavigate();

  const fetchData = async (page = 1, q = "", pageSize = 5) => {
    setLoading(true);

    const skip = (page - 1) * pageSize;

    try {
      const res = await getProducts({
        q,
        limit: pageSize,
        skip,
      });

      setData(res.data.products);

      setPagination({
        current: page,
        pageSize,
        total: res.data.total,
      });
    } catch {
      message.error("Failed fetch data");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData(1, search, pagination.pageSize);
  }, []);

  const handleSearch = (value: string) => {
    setSearch(value);
    fetchData(1, value, pagination.pageSize);
  };

  const handleSubmit = async (values: any) => {
    try {
      if (editData) {
        await updateProduct(editData.id, values);
        message.success("Updated");
      } else {
        await addProduct(values);
        message.success("Added");
      }

      setModalOpen(false);
      setEditData(null);
      fetchData(pagination.current, search, pagination.pageSize);
    } catch {
      message.error("Action failed");
    }
  };

  const handleDelete = (record: any) => {
    Modal.confirm({
      title: "Delete this product?",
      onOk: async () => {
        await deleteProduct(record.id);
        message.success("Deleted");
        fetchData(pagination.current, search, pagination.pageSize);
      },
    });
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a: any, b: any) => a.title.localeCompare(b.title),
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a: any, b: any) => a.price - b.price,
    },
    {
      title: "Action",
      render: (_: any, record: any) => (
        <Space>
          <Tooltip title="Detail">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => navigate(`/products/${record.id}`)}
            />
          </Tooltip>

          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => {
                setEditData(record);
                setModalOpen(true);
              }}
            />
          </Tooltip>

          <Tooltip title="Delete">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <Space
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Input.Search
          placeholder="Search product"
          onSearch={handleSearch}
          style={{ width: 200 }}
          allowClear
        />

        <Space>
          <Select
            value={pagination.pageSize}
            onChange={(value) => fetchData(1, search, value)}
            options={[
              { value: 5, label: "5 / page" },
              { value: 10, label: "10 / page" },
              { value: 20, label: "20 / page" },
            ]}
          />

          <Button
            type="primary"
            onClick={() => {
              setEditData(null);
              setModalOpen(true);
            }}
          >
            Add Product
          </Button>
        </Space>
      </Space>

      <Table
        rowKey="id"
        loading={loading}
        dataSource={data}
        columns={columns}
        scroll={{ x: "max-content" }}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: (page, pageSize) =>
            fetchData(page, search, pageSize),
          showSizeChanger: false,
        }}
      />

      <ProductFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editData}
      />
    </Card>
  );
}