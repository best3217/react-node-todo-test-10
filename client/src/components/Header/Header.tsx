import React from "react"
import { Image } from "antd"
import "./Header.scss"

const Header: React.FC = () => {
  return (
    <div className="align-center header-container">
      <Image src="/images/logo.svg" preview={false} />
    </div>
  )
}

export default Header
