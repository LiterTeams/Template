const checkQuantity = (state:number=0,min:number=0,max:number=0) => {
    if (min + max == 0) return true;
    if(min != 0) return state >= min;
    if(max != 0) return state <= max;
    
    return state >= min && state <= max;
}

export default checkQuantity;