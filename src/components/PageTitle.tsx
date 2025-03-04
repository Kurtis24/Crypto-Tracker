import React from 'react'

type Props = { 
    title: string,
    className?: string
};

export default function PageTitle({title}: Props) {
    return <h1 className='text-2xl font-semibold'>{title}</h1>;
}
