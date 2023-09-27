const model = require('../models/model')


async function createCategories(req, res) {
    try {
        const Create = new model.Categories({
            type: "Transaction",
            color: "#1F3251"
        });

        const savedCategory = await Create.save();
        return res.json(savedCategory);
    } catch (err) {
        return res.status(400).json({ message: `Error while creating categories: ${err.message}` });
    }
}

async function getCategories(req,res){
    let data = await model.Categories.find({})

    let filter = await data.map(v=>Object.assign({}, {type:v.type, color:v.color}))
    return res.json(filter)
}

async function createTransaction(req, res) {
    try {
      if (!req.body) {
        return res.status(400).json({ error: "No Data Provided" });
      }
  
      const { name, type, amount } = req.body;
  
      const transaction = new model.Transaction({
        name,
        type,
        amount,
        date: new Date(),
      });
  
      await transaction.save();
  
      return res.status(201).json({ message: "Transaction created successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
}

async function getTransaction(req, res){
    let data = await model.Transaction.find({})
    return res.json(data)
}

async function deleteTransaction(req, res) {
    try {
      if (!req.body) {
        return res.status(400).json({ message: "Request body not found" });
      }
      const deleteQuery = req.body; 
  
      const deletionResult = await model.Transaction.deleteOne(deleteQuery);
  
      if (deletionResult.deletedCount === 1) {
        return res.json({ message: "Record Deleted" });
      } else {
        return res.status(404).json({ message: "Record not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
}

async function getLabels(req, res) {
    try {
      const result = await model.Transaction.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "type",
            foreignField: "type",
            as: "categoriesInfo",
          },
        },
        {
          $unwind: "$categoriesInfo",
        },
      ]);
  
      let data = result.map(v=>Object.assign({},{
        _id:v._id,
        name:v.name,
        type:v.type,
        amount:v.amount,
        color:v.categoriesInfo['color']
      }))
      res.json(data)
    } catch (error) {
      res.status(400).json({ error: "Lookup Collection Error" });
    }
}

module.exports= {
    createCategories,
    getCategories,
    createTransaction,
    getTransaction,
    deleteTransaction, 
    getLabels
}