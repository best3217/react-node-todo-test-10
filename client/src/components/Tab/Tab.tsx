import { Radio, RadioChangeEvent } from "antd"
import "./Tab.scss"

export const TAB_VALUES = {
  PERSONAL: 0,
  PROFESSIONAL: 1,
}

const options = [
  {
    label: "Personal",
    value: TAB_VALUES.PERSONAL,
  },
  {
    label: "Professional",
    value: TAB_VALUES.PROFESSIONAL,
  },
]

interface TabProps {
  value: number | null
  onChange: (value: number) => void
}

const Tab: React.FC<TabProps> = ({ value, onChange }) => {
  const handleOnChange = (e: RadioChangeEvent) => {
    console.log("value", value)
    onChange(Number(e.target.value))
  }

  return (
    <div className="tab-container">
      <Radio.Group options={options} onChange={handleOnChange} value={value} />
    </div>
  )
}

export default Tab
