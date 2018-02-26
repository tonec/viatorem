import React, { PureComponent } from 'react'
import { Icon } from 'antd'
import FormItem from 'antd/lib/form/FormItem'

const specialInputsIcons = name => {
  const inputs = {
    name: 'user',
    email: 'red-envelope',
    password: 'lock',
    password_confirmation: 'lock'
  }

  return name in inputs ? <Icon type={inputs[name]} /> : null
}

export default function createComponent (AntdComponent, mapProps) {
  class InputComponent extends PureComponent {

    getRenderedComponent () {
      return this.componentRef
    }

    initComponentRef = r => {
      this.componentRef = r
    }

    render () {
      const { label, labelCol, wrapperCol, help, extra, validateStatus, hasFeedback = true, colon, ...rest } = mapProps(
        this.props
      )

      const icon = specialInputsIcons(rest.name)

      return (
        <FormItem
          label={label}
          ref={this.initComponentRef}
          wrapperCol={wrapperCol}
          labelCol={labelCol}
          help={help}
          hasFeedback={hasFeedback}
          extra={extra}
          validateStatus={validateStatus}
          colon={colon}
        >
          {icon ? <AntdComponent prefix={icon} {...rest} /> : <AntdComponent {...rest} />}
        </FormItem>
      )
    }
  }
  InputComponent.dispayName = `Redux-form-ANTD${AntdComponent.dispayName}`

  return InputComponent
}
