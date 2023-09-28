import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseUrl = 'http://localhost:5000'

export const apiSlice = createApi({
    baseQuery:fetchBaseQuery({
        baseUrl:baseUrl
    }),
    endpoints:builder =>({
        getCategories:builder.query({
            query:()=>'/api/categories'
        }),

        getLabels: builder.query({
            query:()=>'/api/labels'
        }),
        
        addTransaction:builder.mutation({
            query:(initialTransaction)=>({
                url: '/api/transaction',
                method: "POST",
                body:initialTransaction
            })
        }),

        deletTransaction:builder.mutation({
            query:recordId =>({
                url: '/api/transaction',
                method: "DELETE",
                body:recordId
            })
        })
    })
})

export default apiSlice