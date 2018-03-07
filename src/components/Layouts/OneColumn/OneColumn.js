import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import classNames from 'classnames'
import { Layout, Row, Col } from 'antd'
import { Navigation } from 'containers'

import styles from './styles.scss'

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
  span: 24,
  offset: 0,
  className: ''
}

const OneColumn = ({ span, offset, title, className, children, ...props }) => {
  const classes = classNames('layout one-column', className)

  return (
    <div className={classes} {...props}>
      <Helmet title={title} />
      <Header className="layout-header">
        <Navigation />
      </Header>
      <Content className="layout-content">
        <Row className={styles.row}>
          <Col span={span} offset={offset}>
            {children}
          </Col>
        </Row>
      </Content>
    </div>
  )
}

OneColumn.propTypes = propTypes
OneColumn.defaultProps = defaultProps

export default OneColumn
