import React, { Component } from 'react';

class Feed extends Component {
  render() {
    return (
      <div>
        {
          this.props.feeds.map(function(feed) {
            return (
              <div key={feed._id}>
                <p>{feed.message}</p>
                <p>Posted By: {feed.author}</p>
                <p>Timestamp: {feed.timestamp}</p>
                <hr />
              </div>  
            )
          })
        }
      </div>
    );
  }
}

export default Feed;
