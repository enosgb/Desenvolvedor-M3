export class ShoppingList{
    constructor(){
        this._shoppingList = []
    }

    add(compra){
        this._shoppingList.push(compra);
    }

    remove(id){
        for(let i = 0; i < this._shoppingList.length; i++){
            if(this._shoppingList[i].id == id){
                this._shoppingList.splice(i,1)
            }
        }
    }

    get purchases(){
        return [].concat(this._shoppingList)
    }
}