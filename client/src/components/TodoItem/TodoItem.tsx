import { useState } from "react"
import { Modal, Checkbox, Button, Image } from "antd"
import { toast } from "react-toastify"

import { updateTodo, deleteTodo } from "../../apis"
import { responseTypes } from "../../types"

import "./TodoItem.scss"
interface TodoItemProps {
  note: string
  createdAt: string
  updatedAt: string
  type: number
  status: number
  id: number
  index: number
  onComplete: () => void
}

const TodoItem: React.FC<TodoItemProps> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = async () => {
    setIsModalOpen(false)
    const { data, errorMessage }: responseTypes = await deleteTodo(props.id)

    if (errorMessage) {
      toast.error(errorMessage)
      return
    }
    if (data?.status === "Error") {
      toast.error("Whoops something went wrong!")
      return
    } else if (data?.status === "OK") {
      props.onComplete()
      toast.success("Deleted suceessfully!")
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleUpdateStatus = async () => {
    const params = {
      status: props.status === 0 ? 1 : 0,
      id: props.id,
    }
    const { data, errorMessage }: responseTypes = await updateTodo(params)

    if (errorMessage) {
      toast.error(errorMessage)
      return
    }
    if (data?.status === "Error") {
      toast.error("Whoops something went wrong!")
    } else if (data?.status === "OK") {
      toast.success("Status changed!")
      props.onComplete()
    }
  }

  return (
    <div className="item-container">
      <Checkbox onChange={handleUpdateStatus} checked={props.status === 1} />
      <label
        className={`todo-title ${props.status === 1 ? "todo-completed" : ""}`}
      >
        No.{props.index} - {props.note}
      </label>

      <Button className="btn-delete">
        <Image
          src="/images/delete.svg"
          alt="delete"
          preview={false}
          onClick={showModal}
        />
      </Button>
      <Modal
        title="Delete todo"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete this todo?</p>
      </Modal>
    </div>
  )
}

export default TodoItem
