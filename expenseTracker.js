const ulList = document.getElementById("list");

function getExpenses()
{
    axios.get('http://localhost:4000/expenses')
        .then((result)=>{
            console.log("Get Expenses...",result);
            const expenseList = result.data;
            for(let i=0; i<expenseList.length; i++)
            {
                createListItem(expenseList[i]);
            }
        })
}
getExpenses();

function createListItem(expense)
{
    const listItem = document.createElement('li');
    listItem.innerHTML = `${expense.amount} - ${expense.description} - ${expense.category}`;
    listItem.setAttribute('name', 'id');
    listItem.setAttribute('value', expense.id);

    const delete_btn = document.createElement('button');
    delete_btn.innerHTML = "Delete";
    delete_btn.setAttribute('value', expense.id);
    delete_btn.onclick = (event)=>{
        console.log("Delete Button click...", event.target.value);
        axios.delete(`http://localhost:4000/deleteExpense/${event.target.value}`)
            .then((deletedExpense)=>{
                console.log(deletedExpense);
                ulList.removeChild(event.target.parentElement);                
            })
            .catch(error=>console.log(error));
    }

    const edit_btn = document.createElement('button');
    edit_btn.innerHTML = 'Edit';
    edit_btn.setAttribute('name', 'id');
    edit_btn.setAttribute('value', expense.id);
    edit_btn.onclick = (event)=>{
        const listItem = event.target.parentElement;
        const strArray = listItem.firstChild.textContent.split(' - ');
        document.getElementById("amount").value = strArray[0];
        document.getElementById("description").value = strArray[1];
        document.getElementById("category").value = strArray[2];
        document.getElementById("id").value = event.target.value;
        document.getElementById('form-button').innerHTML = "Edit Expense";

        ulList.removeChild(listItem);
    }
    
    listItem.appendChild(edit_btn);
    listItem.appendChild(delete_btn);

    ulList.appendChild(listItem);
}

function addExpenses(event)
{
    event.preventDefault();
    const expense = {
        amount : event.target.amount.value,
        description : event.target.description.value,
        category : event.target.category.value,
        id : event.target.id.value
    }
    
    axios.post('http://localhost:4000/expenses', expense)
        .then((result)=>{
            const createdExpense = result.data;
            console.log("Post Expense...", createdExpense);
            createListItem(createdExpense);
        })
        .catch(error=>console.log(error));

    event.target.amount.value='';
    event.target.description.value='';
    event.target.category.value='';
    event.target.id.value='';
    event.target.button.innerHTML = "Add Expense";

}