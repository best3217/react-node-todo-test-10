import { Radio, Tabs, RadioChangeEvent } from "antd"
import "./Tab.scss"

interface TabProps {
  onChange: (value: number) => void
}

const items = [
  {
    key: "0",
    label: "Personal",
  },
  {
    key: "1",
    label: `Professional`,
  },
]

const Tab: React.FC<TabProps> = ({ onChange }) => {
  const handleOnChange = (key: string) => {
    onChange(Number(key))
  }

  return (
    <div className="tab-container">
      <Tabs
        defaultActiveKey="1"
        centered={true}
        items={items}
        onChange={handleOnChange}
      />
    </div>
  )
}

export default Tab
