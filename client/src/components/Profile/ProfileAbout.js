import React, { Component } from 'react'
import { connect } from 'react-redux'

export class ProfileAbout extends Component {
    render() {
        return (
            <div>
                about
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAbout)
