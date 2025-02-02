const priceDiscountCalc = (price:number, discount:string): number => {
    const discountPercent = Number(discount.split("%")[0]);
    if (discountPercent === 0) return 0;
    return Math.round(price - ((price / 100) * discountPercent));
}
export default priceDiscountCalc;