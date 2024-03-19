const Expense = require('../models/expense.js');

exports.getExpenses = (request, response, next)=>{
    console.log("In Get Expenses...");
    Expense.findAll()
        .then((expenseList)=>{
            response.json(expenseList);
        })
        .catch(erro=>console.log(error));
}

exports.postExpense = (request, response, next)=>{
    console.log("In Post Expense...", request.body);
    if(request.body.id)
    {
        console.log("IN IF post expense...", request.body.id)
        Expense.findByPk(request.body.id)
            .then((fetchedExpense)=>{
                fetchedExpense.amount = request.body.amount;
                fetchedExpense.description = request.body.description;
                fetchedExpense.category = request.body.category;
                return fetchedExpense.save();
            })
            .then(editedExpense=>{
                response.json(editedExpense)
            })
            .catch(error=>console.log(error));
    }
    else
    {
        console.log("IN ELSE post expense...", request.body.id)
        Expense.create({
            amount: request.body.amount,
            description: request.body.description,
            category: request.body.category,
        })
            .then((expenseCreated)=>{
                response.json(expenseCreated);
            })
            .catch(error=>console.log(error));
    }
}

exports.deleteExpense = (request, response, next)=>{
    console.log('In Delete Expense...', request.params.id);
    Expense.findByPk(request.params.id)
        .then((expense)=>{
            return expense.destroy();
        })
        .then((deletedExpense)=>{
            response.json(deletedExpense);
        })
        .catch(error=>console.log(error));
}