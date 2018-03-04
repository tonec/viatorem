import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import classNames from 'classnames'
import { Layout, Row, Col } from 'antd'
import { Navigation } from 'containers'

import style from './style.scss'

const { Header, Content } = Layout

const propTypes = {
  span: PropTypes.number,
  offset: PropTypes.number,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

const defaultProps = {
  span: 6,
  offset: 9,
  className: ''
}

const OneColumnThin = ({ span, offset, title, className, children, ...props }) => {
  const classes = classNames('one-column-thin', className)

  return (
    <div className={classes} {...props}>
      <Helmet title={title} />
      <Header className={style.header}>
        <Navigation />
      </Header>
      <Content className={style.content}>
        <Row>
          <Col span={span} offset={offset}>
            {children}
          </Col>
        </Row>
      </Content>
    </div>
  )
}

OneColumnThin.propTypes = propTypes
OneColumnThin.defaultProps = defaultProps

export default OneColumnThin
