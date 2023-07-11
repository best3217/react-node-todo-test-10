import React, { useEffect, useState } from "react";
import { Layout, Modal, Button, Image } from "antd";
import { toast } from "react-toastify";

import Header from "../../components/Header/Header";
import Tab from "../../components/Tab/Tab";
import InputBox from "../../components/InputBox/InputBox";
import TodoItem from "../../components/TodoItem/TodoItem";
import { TAB_VALUES } from "../../components/Tab/Tab";
import { getTodos, addTodo, deleteCompletedTodos } from "../../apis";

import "./home.scss";

const Home: React.FC = () => {
  const [activeTab, setTab] = useState<number>(TAB_VALUES.PERSONAL);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [items, setItems] = useState<any>([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    const { status } = await deleteCompletedTodos(activeTab);
    if (status === 200) {
      toast.success("Cleared successfully!");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAddClick = async (note: string) => {
    if (!note) {
      toast.warning("Please enter todo title!");
      return;
    }

    const { status, data }: any = await addTodo({
      note,
      type: activeTab,
      status: 0,
    });

    if (status === 200 && !data.field) {
      toast.success("Added successfully!");
      getList();
    } else if (data.field === "title") {
      toast.warn("Please enter todo title!");
    } else {
      toast.error("Whoops something went wrong! Try again later.");
    }
  };

  const getList = async () => {
    const { data } = await getTodos(activeTab);
    setItems(data.result);
  };

  useEffect(() => {
    getList();
  }, [activeTab]);

  return (
    <Layout className="container">
      <Header />
      <Tab value={activeTab} onChange={setTab} />

      <Layout className="content-main">
        <InputBox
          placeholder="What do you need to do?"
          onAddClick={handleAddClick}
        />

        <div className="list-container">
          {items && items.length === 0 ? (
            <>
              <p className="no-todo">No todos added yet!</p>
            </>
          ) : (
            <>
              {items.map((item: any, index: number) => (
                <TodoItem
                  key={`${item.id}-${index}`}
                  {...item}
                  index={items.length - index}
                  onComplete={getList}
                />
              ))}
              <Button className="btn-clear-completed" onClick={showModal}>
                <Image src="/images/clear.svg" alt="clear" preview={false} />
                Clear Completed
              </Button>
            </>
          )}
          <Modal
            title="Clear completed todos"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Clear completed todos?</p>
          </Modal>
        </div>
      </Layout>
    </Layout>
  );
};

export default Home;
