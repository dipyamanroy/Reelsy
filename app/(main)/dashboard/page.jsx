import React from 'react'
import VideoList from './_components/VideoList'

function Dashboard() {
    return (
        <div>
            <h2 className='text-3xl'>Dashboard</h2>
            <h2 className='text-md text-gray-400'>My videos</h2>
            <VideoList />
        </div>
    )
}

export default Dashboard