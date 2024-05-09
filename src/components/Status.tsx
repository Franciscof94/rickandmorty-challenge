import React from 'react'

interface Props {
    status: string;
    className?: string
}

type IStatusColor = {
    Alive: string;
    unknown: string
}

export const Status = ({ status, className }: Props) => {

    const statusColor = {
        Alive: <div className={`rounded-full bg-green-600 ${className}`}></div>,
        Dead: <div className={`rounded-full bg-red-600 ${className}` }></div>,
        unknown: <div className={`rounded-full bg-gray-600 ${className}` }></div>
    }
    return (
        <>
            {
                statusColor[status as keyof IStatusColor]
            }
        </>
    )
}
