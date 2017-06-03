// Не забутись написати нормальний інтерфейс/реалізацію

function TaskList(){
	this._originalList = [];
	this._listForNameSorting = [];
	this._listForNumberSorting = [];
	this._outputList = [];
	this._sortByNameFlag = false; // Checks if my list is sorted by name or not.
	this._sortByNumberFlag = false; // Checks if my list is sorted by number or not.
	this._reverseFlag = false; // Checks if the _originalList is reversed.
	this._attributeFlag = false; // Checks if the list is even or odd.
}

TaskList.prototype.getOriginalList = function(){
	return this._originalList;
}

TaskList.prototype.getListForNameSorting = function(){
	return this._listForNameSorting;
}

TaskList.prototype.getListForNumberSorting = function(){
	return this._listForNumberSorting;
}

TaskList.prototype.getOutputList = function(){
	return this._outputList;
}

TaskList.prototype.getSortByNameFlag = function(){
	return this._sortByNameFlag;
}

TaskList.prototype.getSortByNumberFlag = function(){
	return this._sortByNumberFlag;
}

TaskList.prototype.getReverseFlag = function(){
	return this._reverseFlag;
}

TaskList.prototype.getAttributeFlag = function(){
	return this._attributeFlag;
}

//------------------

TaskList.prototype.setOriginalList = function(list){
	this._originalList = list;
}

TaskList.prototype.setListForNameSorting = function(list){
	this._listForNameSorting = list;
}

TaskList.prototype.setListForNumberSorting = function(list){
	this._listForNumberSorting = list;
}

TaskList.prototype.setOutputList = function(list){
	this._outputList = list;
}

TaskList.prototype.setSortByNameFlag = function(flag){
	this._sortByNameFlag = flag;
}

TaskList.prototype.setSortByNumberFlag = function(flag){
	this._sortByNumberFlag = flag;
}

TaskList.prototype.setReverseFlag = function(flag){
	this._reverseFlag = flag;
}

TaskList.prototype.setAttributeFlag = function(flag){
	this._attributeFlag = flag;
}

TaskList.prototype._pushElement = function(element){
	this._originalList.push(element);
}

TaskList.prototype._spliceList = function(element){
	this._originalList.splice(element - 1, 1);
}

TaskList.prototype._reverseList = function(){
	this._originalList.reverse();
}

TaskList.prototype._sortListForNameSorting = function(){
	this._listForNameSorting.sort();
}

TaskList.prototype._reverseListForNameSorting = function(){
	this._listForNameSorting.reverse();
}

TaskList.prototype._reverseListForNumberSorting = function(){
	this._listForNumberSorting.reverse();
}

TaskList.prototype._addTask = function(){
	while (true){
		var taskName = prompt("Please, write your task.", "Task name");
		if (this.getOriginalList().indexOf(taskName) != -1){
			alert("Please, finish your previous such task.");
			continue;
		} else {
			break;
		}
	}

	if (taskName !== null){
		this._pushElement(taskName);
		this.setOriginalList(this.getOriginalList());
		this.setOutputList(this.getOriginalList());
	} else {
		return;
	}
}

TaskList.prototype._removeTask = function(){
	while (true){
		var taskNumber = Math.round(+prompt("Please, write a task number.", 1));
        if (!isNaN(parseFloat(taskNumber)) && isFinite(taskNumber) && (0 < taskNumber) && (taskNumber <= this.getOriginalList().length)){
            break;
        } else {
        	if (taskNumber === 0){
        		return;
        	}

        	alert("There is not any tasks with this number.");
        	continue;
        }
	}	
//для коректного видалення елементів при інверсному (за номером) списку
	if (this.getSortByNumberFlag()){
		this._reverseList();
		this.setOriginalList(this.getOriginalList());
		this._spliceList(taskNumber);
		this.setOriginalList(this.getOriginalList());
		this.setOutputList(this.getOriginalList());
		this._reverseList();
		this.setOriginalList(this.getOriginalList());
	} else {
		this._spliceList(taskNumber);
		this.setOriginalList(this.getOriginalList());
		this.setOutputList(this.getOriginalList());
	}
}

TaskList.prototype._sortListByNameAsc = function(){
	this.setListForNameSorting(this.getOriginalList());
	this._sortListForNameSorting();
	return this.getListForNameSorting();
}

TaskList.prototype._sortListByNameDesc = function(){
	this.setListForNameSorting(this.getOriginalList());
	this._sortListForNameSorting();
	this._reverseListForNameSorting();
	return this.getListForNameSorting();
}

TaskList.prototype._sortListByNumber = function(){
	this.setListForNumberSorting(this.getOriginalList());
	this._reverseListForNumberSorting();
	this.setListForNumberSorting(this.getListForNumberSorting());
	return this.getListForNumberSorting();
}

TaskList.prototype.updateList = function(n){
	var myTasks = document.getElementsByClassName("taskManager__list")[0];
	while(myTasks.firstChild){
		myTasks.removeChild(myTasks.firstChild);
	}

	switch(n){
		case 1:
			this._addTask();
			break;
		case 2:
			this._removeTask();
			break;
		case 3:
			this.setOutputList(this._sortListByNumber())

			//Set sortByNameFlag
			if (this.getSortByNameFlag()){
				this.setSortByNameFlag(false);
			}
			//Set sortByNumberFlag
			if (!this.getSortByNumberFlag()){
				this.setSortByNumberFlag(true);
			} else if (this.getSortByNumberFlag()){
				this.setSortByNumberFlag(false)
			}
			break;
		case 4:
			//For a choosing sort method.

			if (!this.getSortByNameFlag()){
				this.setOutputList(this._sortListByNameAsc())
				this.setSortByNameFlag(true);
			} else if (this.getSortByNameFlag()){
				this.setOutputList(this._sortListByNameDesc());
				this.setSortByNameFlag(false);
			}
			break;
	}

	if (this.getAttributeFlag()){
		this.setAttributeFlag(false);
	}

	for (var i = 0; i < this.getOutputList().length; i++){
		var task = document.createElement("LI");
		if (!this.getAttributeFlag()){
			task.setAttribute("class", "taskManager__list-odd");
			this.setAttributeFlag(true);
		} else {
			task.setAttribute("class", "taskManager__list-even");
			this.setAttributeFlag(false);
		}
		var text = document.createTextNode(this.getOutputList()[i]);
		task.appendChild(text);
		myTasks.appendChild(task);
	}

	if (this.getSortByNumberFlag()){
		var newValue = myTasks.childNodes.length;
		for (var i = 0; i < myTasks.childNodes.length; i++){
			myTasks.childNodes[i].setAttribute("value", newValue);
			newValue--;
		}
	}

	console.log(this.getOutputList());
}

var taskList = new TaskList;

$(document).ready(function(){
	$('.taskManager__button-add').on("click", function(){
		taskList.updateList(1)
	});

	$('.taskManager__button-remove').on("click", function(){
		taskList.updateList(2)
	});

	$('.taskManager__button-numsort').on("click", function(){
		taskList.updateList(3)
	});

	$('.taskManager__button-namesort').on("click", function(){
		taskList.updateList(4)
	});
});