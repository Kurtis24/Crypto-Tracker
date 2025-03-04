"use client"
import React from 'react'
import { BarChart as BarGraph ,ResponsiveContainer, XAxis, YAxis, Bar  } from "recharts";

type Props = {}

const data = [
    {
        name: "2019",
        total: 335.21,
    },
    {
        name: "2020",
        total: 507.17
    },
    {
        name: "2021",
        total: 1956.72,
    },
    {
        name: "2022",
        total: 4579.95,
    },
    {
        name: "2023",
        total: 3163.07,
    },
    {
        name: "2024",
        total: 3006.60,
    },
]

export default function BarChart({}: Props) {
    return <ResponsiveContainer width="100%" height={350}>
        <BarGraph data={data}>
            <XAxis 
            dataKey={"name"}
            tickLine={false}
            axisLine={false}
            stroke='#88888'
            fontSize={17}
            />
            <YAxis 
            tickLine={false}
            axisLine={false}
            stroke='#88888'
            fontSize={17}
            tickFormatter={(value) => `$${value}`}
            />
            <Bar dataKey="total" radius={[4,4,0,0]} fill="black" />
        </BarGraph>
    </ResponsiveContainer>
}
