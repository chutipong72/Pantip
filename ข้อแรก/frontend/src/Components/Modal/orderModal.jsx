import React from "react";
import { Button, Modal, Result } from "antd";
import { useNavigate } from "react-router-dom";

const OrderModal = (props) => {
  const { visible, onCancel } = props;
  const navigate = useNavigate();
  return (
    <Modal
      title="Order History"
      width={700}
      visibled={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Result
        status="success"
        title="Order Confirmed!"
        subTitle="Your order has been successfully placed."
        extra={[
          <Button key="back" onClick={() => navigate("/")}>
            Go to Shop
          </Button>,
        ]}
      />
      <Button type="primary" onClick={onCancel}>
        Close
      </Button>
      <Button type="primary" onClick={() => navigate("/orders")}>
        See Order History
      </Button>
    </Modal>
  );
};

export default OrderModal;
