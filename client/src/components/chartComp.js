import React from 'react'
import { Chart, ArcElement } from 'chart.js'
import {Doughnut} from 'react-chartjs-2'
import './charComp.css'
import Labels from './labels'
import { chart_Data } from '../helper/helper'
import {default as api} from '../store/apiSlice'

Chart.register(ArcElement)



const config ={
  data:{
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4,
      borderRadius: 10,
      spacing: 10
    }]
  },
  options:{
    cutout:110
  }
}

export default function ChartComp() {
  const {data, isFetching, isSuccess, isError} = api.useGetLabelsQuery()
    // console.log(data)
    let graphData

    if(isFetching){
        graphData= <div>Fetching</div>
    }else if(isSuccess){
      chart_Data(data)
        
      // graphData = getLabels(data, 'type').map((v,i)=> <LableComponent key={i} data={v}/>)
    }else if(isError){
        graphData = <div>Error</div>
  }
  return (
    <div className='flex max-w-xs mx-auto'>
        <div className='item'>
            <div className='chart relative'>
                <Doughnut {...config} ></Doughnut>
                <h3 className='mb-4 font-bold title text-xl'>
                  Total <span className='block text-3xl text-emerald-400'>{0}tk</span>
                </h3>
            </div>
            <div className='flex flex-col py-10 gap-4'>
                <Labels/>
            </div>
        </div>
    </div>
  )
}
