import React from 'react'
import './charComp.css'
import {useForm} from 'react-hook-form'
import List from './list'
import {default as api} from '../store/apiSlice'

export default function Form() {

    const{register, handleSubmit, resetField} = useForm()
    const [addTransaction] = api.useAddTransactionMutation()

    const onSubmit = async(data) =>{
        if(!data)return {}
        await addTransaction(data).unwrap()
    }
  return (
    <div className='form max-w-sm mx-auto w-96'>
        <h1 className=' font-bold pb-4 text-xl'>Transaction</h1>
        <form id='form' onSubmit={handleSubmit(onSubmit)}>
            <div className='grid gap-4'>
                <div className='input-group'>
                    <input type='text'{...register('name')} placeholder='Salary, House Rent...' className='form-input'/>
                </div>
                <select className='form-input' {...register('type')}>
                    <option value='Investment' defaultValue>Investment</option>
                    <option value='Expense'>Expense</option>
                    <option value='Savings'>Savings</option>
                </select>
                <div className='input-group'>
                    <input type='text' placeholder='Amount' {...register('amount')} className='form-input'/>
                </div>
                <div className='submit-btn'>
                    <button className='border py-3 text-white bg-indigo-500 w-full'>Make Transaction</button>
                </div>
            </div>
        </form>
        <List/>
    </div>
  )
}
