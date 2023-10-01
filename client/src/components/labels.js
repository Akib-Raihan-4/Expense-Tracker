import React from 'react'
import {default as api} from '../store/apiSlice'
import { getLabels } from '../helper/helper'

const obj = [
    {
        type: 'Savings',
        color: 'rgb(255, 99, 132)',
        percent:45
    },
    {
        type: 'Investment',
        color: 'rgb(255, 205, 86)',
        percent:20
    },
    {
        type: 'Expense',
        color: 'rgb(54, 162, 235)',
        percent:10
    }
]

export default function Labels() {

    const {data, isFetching, isSuccess, isError} = api.useGetLabelsQuery()
    // console.log(data)
    let Transactions

    if(isFetching){
        Transactions= <div>Fetching</div>
    }else if(isSuccess){
        
        Transactions = getLabels(data, 'type').map((v,i)=> <LableComponent key={i} data={v}/>)
    }else if(isError){
        Transactions = <div>Error</div>
    }
  return (
    <>
        {Transactions}
    </>
  )
}

function LableComponent({data}){
    if(!data)return<></>
    return(
        <div className='labels flex justify-between'>
            <div className='flex gap-2'>
                <div className='w-2 h-2 rounded py-3' style={{background:data.color??'#f9c74f'}}></div>
                <h3 className='text-md'>{data.type??""}</h3>
            </div>
            <h3 className='font-bold'>{Math.round(data.percent)??0}%</h3>
        </div>
    )
}
