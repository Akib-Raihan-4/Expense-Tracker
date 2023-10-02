import React from 'react'
import { Chart, ArcElement } from 'chart.js'
import {Doughnut} from 'react-chartjs-2'
import './charComp.css'
import Labels from './labels'
import { chart_Data, getTotal } from '../helper/helper'
import {default as api} from '../store/apiSlice'

Chart.register(ArcElement)


export default function ChartComp() {
  const {data, isFetching, isSuccess, isError} = api.useGetLabelsQuery()
    // console.log(data)
    let graphData

    if(isFetching){
        graphData= <div>Fetching</div>
    }else if(isSuccess){
      graphData = <Doughnut {...chart_Data(data)} ></Doughnut>
    }else if(isError){
        graphData = <div>Error</div>
  }
  return (
    <div className='flex max-w-xs mx-auto'>
        <div className='item'>
            <div className='chart relative'>
                {graphData}
                <h3 className='mb-4 font-bold title text-xl'>
                  Total <span className='block text-3xl text-emerald-400'>{getTotal(data)?? 0} tk</span>
                </h3>
            </div>
            <div className='flex flex-col py-10 gap-4'>
                <Labels/>
            </div>
        </div>
    </div>
  )
}
