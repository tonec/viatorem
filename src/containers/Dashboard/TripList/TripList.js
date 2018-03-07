import React from 'react'
import PropTypes from 'prop-types'
import { List, Avatar } from 'antd'

const propTypes = {
  trips: PropTypes.arrayOf(PropTypes.object)
}

const defaultProps = {
  trips: []
}

const TripList = ({ trips }) => {
  return (
    <List
      dataSource={trips}
      itemLayout="horizontal"
      renderItem={trip => (
        <List.Item actions={[<a>edit</a>, <a>more</a>]}>
          <List.Item.Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={<a href="https://ant.design">{trip.title}</a>}
            description={trip.description}
          />
          <div>content</div>
        </List.Item>
      )}
    />
  )
}

TripList.propTypes = propTypes
TripList.defaultProps = defaultProps

export default TripList
