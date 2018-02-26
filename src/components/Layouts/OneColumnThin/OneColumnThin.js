import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import classNames from 'classnames'
import { Layout, Row, Col } from 'antd'
import { Navigation } from 'containers'

const { Header, Content } = Layout

const propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

const defaultProps = {
  className: ''
}

const OneColumnThin = ({ title, className, children, ...props }) => {
  const classes = classNames('one-column-thin', className)

  return (
    <div className={classes} {...props}>
      <Helmet title={title} />
      <Header>
        <Navigation />
      </Header>
      <Content>
        <Row style={{ padding: '50px' }}>
          <Col span={12} offset={6}>
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
