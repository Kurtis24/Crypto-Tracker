import React from 'react'

export type SalesProps = {
    name: string;
    SoldAmount: string;
}

export default function ViewedCard({}: SalesProps) {
    return (
        <div className='flex flex-wrap justify-between gap-3'>
        <section className='flex justify-between gap-3'>
            <div className="h-12 w-12 rounded-full bg-gray-100">
                <img width={200} height={200} src="" alt="avatar" />
            </div>
        </section>
        </div>
    );
}
