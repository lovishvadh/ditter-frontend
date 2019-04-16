import React, { Component } from 'react';
import Ditter from '../Ditters/ditters';
class Feed extends Component {
    state = {  }
    render() { 
        return (
            <div className="feed">
            {
                this.props.feed.map(element => {
                    return <Ditter key={element.timestamp} feedData={element}/>
                })
            }
                
            </div>
          );
    }
}
 
export default Feed;