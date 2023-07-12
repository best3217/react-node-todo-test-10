import React, { useEffect, useState, useMemo } from "react"
import { Layout, Modal, Button, Image } from "antd"
import { toast } from "react-toastify"

import { getTodos, addTodo, deleteCompletedTodos } from "../../apis"
import Header from "../../components/Header/Header"
import Tab from "../../components/Tab/Tab"
import InputBox from "../../components/InputBox/InputBox"
import TodoItem from "../../components/TodoItem/TodoItem"
import { responseTypes, todoTypes } from "../../types"
import { TAB_VALUES } from "../../constants"

import "./home.scss"

const Home: React.FC = () => {
  const [activeTab, setTab] = useState<number>(TAB_VALUES.PERSONAL)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [items, setItems] = useState<todoTypes[]>([])
  const hasCompltedTodo = useMemo(() => {
    console.log(items.filter((item) => item.status === 1))
    return items.filter((item) => item.status === 1).length > 0
  }, [items])

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = async () => {
    setIsModalOpen(false)
    const { data, errorMessage }: responseTypes = await deleteCompletedTodos(
      activeTab
    )

    if (errorMessage) {
      toast.error(errorMessage)
      return
    }
    if (data?.status === "OK") {
      toast.success("Cleared successfully!")
      getList()
    } else {
      toast.error("Whoops something went wrong!")
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleAddClick = async (note: string) => {
    if (!note) {
      toast.warning("Please enter todo title!")
      return
    }

    const { data, errorMessage }: responseTypes = await addTodo({
      note,
      type: activeTab,
      status: 0,
    })

    if (errorMessage) {
      console.log("errorMessage", errorMessage)
      toast.error(errorMessage)
      return
    }

    if (data?.status === "Error" && data.field) {
      toast.error(`Plealse enter ${data.field}!`)
      return
    }

    if (data?.status === "OK" && data?.result) {
      toast.success("New todo added!")
      getList()
    }
  }

  const getList = async () => {
    const { data, errorMessage }: responseTypes = await getTodos(activeTab)

    if (errorMessage) {
      toast.error(errorMessage)
    }
    if (data?.status === "OK") {
      setItems(data.result)
    }
  }

  useEffect(() => {
    console.log("has", hasCompltedTodo)
  }, [hasCompltedTodo])

  useEffect(() => {
    getList()
  }, [activeTab])

  return (
    <Layout className="container">
      <Header />
      <Tab onChange={setTab} />

      <Layout className="content-main">
        <InputBox
          placeholder="What do you need to do?"
          onAddClick={handleAddClick}
        />

        <div className="list-container">
          {items && items.length === 0 ? (
            <p className="no-todo">No todos added yet!</p>
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

              {hasCompltedTodo && (
                <Button className="btn-clear-completed" onClick={showModal}>
                  <Image src="/images/clear.svg" alt="clear" preview={false} />
                  Clear Completed
                </Button>
              )}
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
  )
}

export default Home
