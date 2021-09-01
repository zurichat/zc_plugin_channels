import React from 'react'
import ThreadMessage from './threadMessage/ThreadMessage.js'
import ThreadHeader from './threadHeader/ThreadHeader.js'
import ThreadReplies from './threadReply/ThreadReplies'
import ThreadInputForm from './threadInputForm/ThreadInputForm'

function Threads() {
    return (
        <div className='threadComponent'>
            <ThreadHeader />
            <ThreadMessage />
            <ThreadReplies />
            <ThreadInputForm /> 
        </div>
    )
}

export default Threads
