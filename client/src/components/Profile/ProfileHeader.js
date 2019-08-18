import React, { Component } from 'react'
import { connect } from 'react-redux'

export class ProfileHeader extends Component {
    render() {
        return (
            <div>
                header
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader)
