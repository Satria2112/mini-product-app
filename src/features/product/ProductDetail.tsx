import {
  Card,
  Descriptions,
  Image,
  Spin,
  Button,
} from "antd";
import { useEffect, useState } from "react";
import { getProductDetail } from "./productService";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchDetail = async () => {
    try {
      const res = await getProductDetail(Number(id));
      setData(res.data);
    } catch {
      console.error("Failed fetch detail");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  if (loading) return <Spin />;

  return (
    <Card
      title="Product Detail"
      extra={<Button onClick={() => navigate("/products")}>Back</Button>}
    >
      <Image src={data.thumbnail} width={200} />

      <Descriptions column={1} bordered style={{ marginTop: 20 }}>
        <Descriptions.Item label="Title">
          {data.title}
        </Descriptions.Item>

        <Descriptions.Item label="Price">
          ${data.price}
        </Descriptions.Item>

        <Descriptions.Item label="Category">
          {data.category}
        </Descriptions.Item>

        <Descriptions.Item label="Brand">
          {data.brand}
        </Descriptions.Item>

        <Descriptions.Item label="Stock">
          {data.stock}
        </Descriptions.Item>

        <Descriptions.Item label="Rating">
          {data.rating}
        </Descriptions.Item>

        <Descriptions.Item label="Description">
          {data.description}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}