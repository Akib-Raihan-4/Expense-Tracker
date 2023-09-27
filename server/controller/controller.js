const model = require('../models/model')


async function createCategories(req, res) {
    try {
        const Create = new model.Categories({
            type: "Savings",
            color: "#1F3B5C"
        });

        const savedCategory = await Create.save();
        return res.json(savedCategory);
    } catch (err) {
        return res.status(400).json({ message: `Error while creating categories: ${err.message}` });
    }
}

module.exports= {
    createCategories
}