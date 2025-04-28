import React from 'react'
import VideoList from './_components/VideoList'

function Dashboard() {
    return (
        <div>
        <div
        className="absolute w-60 h-60 bg-gradient-to-br from-green-400 via-blue-400 to-blue-500 rounded-full blur-2xl opacity-40 z-[-20] pointer-events-none animate-pulse shadow-[0_0_80px_30px_rgba(34,197,94,0.3)]"
        style={{ top: '-100px', right: '25px' }}
        />
            <h2 className='text-3xl'>Dashboard</h2>
            <h2 className='text-md text-gray-400'>My videos</h2>
            <VideoList />
        </div>
    )
}

export default Dashboard