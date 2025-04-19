import React from 'react'
import { options } from './ArtStyle'
import Image from 'next/image';

function Preview({ formData }) {
    const selectedVideoStyle = formData && options.find((item => item.name == formData?.artStyle));
    return (
        <div className='relative'>
            <h2 className='mb-3 text-xl'>Preview</h2>

            {selectedVideoStyle?.image ? (
                <Image
                    src={selectedVideoStyle.image}
                    alt={selectedVideoStyle.name || 'Art style preview'}
                    width={1000}
                    height={300}
                    className='w-full h-[65vh] object-cover rounded-xl'
                />
            ) : (
                <div className='w-full h-[65vh] dark:bg-primary-foreground flex items-center justify-center rounded-xl border border-dashed border-gray-300'>
                    <p className="text-gray-500 text-xs text-center">Select a style to see preview</p>
                </div>
            )}

            <h2 className={`${formData?.caption?.style} absolute bottom-8 text-center w-full`}>
                {formData?.caption?.name}
            </h2>
        </div>

    )
}

export default Preview