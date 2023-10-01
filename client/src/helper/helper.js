import _ from 'lodash'

export function getSum(transaction, type){
    let sum = _(transaction)
                .groupBy('type')
                .map((objs,key)=>{
                    if(!type)return _.sumBy(objs,'amount')
                    return{
                        'type': key,
                        'color': objs[0].color,
                        'total':_.sumBy(objs, 'amount')
                }
                })
                .value()
    return sum
}

export function getLabels(transaction){
    let amountSum = getSum(transaction, 'type')
    let Total = _.sum(getSum(transaction))

    let percent = _(amountSum)
                    .map(objs => _.assign(objs,{percent: (100*objs.total)/Total}))
                    .value()
    return percent
}

export function chart_Data(transaction){
    let dataValue = getSum(transaction)
    let bg = _.map(transaction,a =>a.color)
    bg = _.uniq(bg)
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
}