import { formatNumber } from '@/utils/convertNumbThousand'
import Image from 'next/image'
import React from 'react'

const StatisticCard = ({ title, value, changedValue }: { title: string, value: number, changedValue: number }) => {
    return (
        <div className='p-4 bg-white rounded-xl h-full flex flex-col justify-between'>
            <div>  <h4 className='text-sm text-neutral-500'>
                {title}
            </h4>
                <span className='font-semibold text-lg flex items-center'>${formatNumber(value)} <span className='text-green-500 text-xs'>+ {changedValue.toFixed(2)}% * 24h</span></span></div>
        </div>
    )
}
export default StatisticCard