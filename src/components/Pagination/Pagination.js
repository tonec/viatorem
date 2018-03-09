import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { push } from 'react-router-redux'
import { Pagination as AntdPagination } from 'antd'
import { createQueryObject } from 'helpers/querystring'

import styles from './styles.scss'

export class Pagination extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    pagination: PropTypes.object.isRequired
  }

  getPageNumber () {
    return parseInt(this.props.history.location.query.page) || 1
  }

  pageNumberHasChanged (nextPageNum) {
    return parseInt(nextPageNum) !== this.getPageNumber()
  }

  updatePageNumber (nextPageNum) {
    const { history, dispatch } = this.props
    const newQuery = createQueryObject({ page: nextPageNum })

    dispatch(push({ pathname: history.location.pathname, query: newQuery }))
  }

  handleOnChange = nextPageNum => {
    if (this.pageNumberHasChanged(nextPageNum)) {
      this.updatePageNumber(nextPageNum)
    }
  }

  render () {
    const { pagination } = this.props

    return (
      <AntdPagination
        current={this.getPageNumber()}
        onChange={this.handleOnChange}
        total={parseInt(pagination.total)}
        pageSize={parseInt(pagination.perPage)}
      />
    )
  }
}

export default compose(
  withRouter,
  connect()
)(Pagination)
