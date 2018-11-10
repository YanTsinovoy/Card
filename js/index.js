function DataCard(){
  var dataCards = []
  this.addCardInData = function(card){
  	dataCards.push(card)
  }
  this.showData = function(){
	if(dataCards.length!==0){
		return dataCards[dataCards.length-1]
	} else {
		atention.message('Карта не создана',"red")
	}
  }
}
var data = new DataCard()

var atention = document.getElementById("window")
atention.style.color = "white"
atention.message = function(mes,color){
	atention.innerText = mes
	atention.style.backgroundColor = color
}

function CreditCard(){
  var name = prompt("Введите ФИО владельца карты")
  var adminPin = "1996"
  this.nameForCard = (function(nam){
    var letter = nam.indexOf(String.fromCharCode(32)) < 0 ? nam: nam.slice(0,nam.indexOf(String.fromCharCode(32))+2) + "."
    return letter
  })(name)
  var pin = prompt("создайте пин")
  var cash = 0
  this.cardNum=(function(){
    var num = ""
    var i = 1
    while(i<20){
	  var res = ""
      if(i%5 === 0){
		res = " "
      } else {
		res += String.fromCharCode(Math.round(Math.random()*9)+48)
	  }
      num+=res
	  i++
    }
    return num
  })()
  this.putCash = function(sum){
    !sum ? atention.message(`${sum} не корректные данные`,"red"):cash+=sum
  }
  this.getCash = function(sum){
    if(prompt("введите пинкод")===pin){
      if(sum>cash ){
        atention.message(`недостаточно денег для снятия ${sum}`,"red")
            } else {
        cash-=sum
        return sum
      }
    } else {
    	atention.message('Пинкод неверный',"red")
    }
  }
  this.showCash = function(){
    if(prompt("введите пароль")=== pin){
    	return `средств в наличии ${cash}`
    } else {
    	atention.message('Пинкод неверный',"red")
    }
  }
  this.displayOnCard = function(){
	var dispName = document.getElementById("userName")
	dispName.innerText = this.nameForCard
	var dispNum = document.getElementById("numberCard")
	dispNum.innerText = this.cardNum
  }
  this.permission = function(admPin){
    if(admPin===adminPin) return name
  }
}


var createBtn = document.getElementById("createBtn")
function createCardEvent(event){
	var elem = new CreditCard()
	data.addCardInData(elem)
	elem.displayOnCard()
	atention.message(`Сoздана новая карта. Владелец: ${data.showData().permission("1996")}`,"green")//Как скрыть админ пароль?
}
createBtn.addEventListener("click",createCardEvent)

var showBtn = document.getElementById("showCashBtn")
function showCardEvent(event){
	var cashAvaileble = data.showData() ? data.showData().showCash(): atention.message('Карта не создана',"red")
	if(cashAvaileble){
		atention.message(`На вашем личном счету: ${cashAvaileble}`,"green")
	}
}
showBtn.addEventListener("click",showCardEvent)

var putBtn = document.getElementById("addCashBtn")
function addCashEvent(event){
	var checkInp = document.getElementById("moneyInp")
	if(!checkInp.value || checkInp.value<=0) return atention.message('Недопустимое значение',"red")
	else atention.message(`Зачисленна сумма ${checkInp.value}`,"green")
	data.showData() ? data.showData().putCash(Number(checkInp.value)) : atention.message('Карта не создана',"red")
}
putBtn.addEventListener("click",addCashEvent)

var getBtn = document.getElementById("getCashBtn")
function getСashEvent(event){
	var checkInp = document.getElementById("moneyInp")
	if(!checkInp.value || checkInp.value<=0) return atention.message('Недопустимое значение',"red")
	if(data.showData()){
		var money = data.showData().getCash(Number(checkInp.value))
		money?atention.message(`Получите ${money}`):atention.message('Невозможно выполнить операцию',"red")
	} else {
		atention.message('Карта не создана',"red")
	}
}
getBtn.addEventListener("click",getСashEvent)
