import React, {createContext, ReactElement, useContext, useEffect, useState} from 'react';
import Toast from '../../components/toast';
import {ProductVariation} from '../Products/types';
import {ProfileContext} from '../Profile/Profile.context';
import * as AC from './Basket.action';
import {BasketBulkModel} from './model';
import {BasketAddForPay} from './types';

interface IBasketContext {
  addToBasket: (product: ProductVariation) => void;
  addToBasketCoin: (product: ProductVariation) => void;
  removeToBasket: (product: ProductVariation) => void;
  removeToBasketCoin: (product: ProductVariation) => void;
  basketsExited: Array<any>;
  numberBasket: number;
  resultSymbol: string;
  resultPrice: string;
  totalPrice: number;
  shipping: number;
  numberProducts: Array<any>;
  bulkAdd: (id) => void;
  bulkAddSendPartner: (id) => void;
  listOrderSale: Array<any>;
  orderSale: () => void;
  orderSalePadding: Array<any>;
  orderSaleCompleted: Array<any>;
  orderSaleCancel: Array<any>;
  orderSaleWhiting: Array<any>;
  paymentMethods: Array<any>;
  crateOrderSale: (id) => void;
  paymentMethodsFn: () => void;
  couponsFn: (code: string) => void;
  isCoupons: boolean;
  setCoupons: any;
  couponsType: any;
  resultPriceNotVat: any;
  coupon: any;
  closeBasket: () => void;
  codePrice: string;
  favoritesAddFn: (id: number) => void;
  favoritesFn: () => void;
  shopConfigFn: () => void;
  shopConfig: string;
  closeCouponsFn: () => void;
  orderSaleIDFn: (id: number) => void;
  walletCoinFn: (max: number) => void;
  arrayFavorite: undefined;
  loadingListOrderSale: any;
  loadingPay: any;
  orderSaleById: any;
  pointProducts: any;
  userLevel: any;
  transportation: any;
  userLevelFn: () => void;
  sendUserFn: (id: number) => void;
  dataConfigFn: () => void;
  removeOfferProfuct: (id: any) => void;
  removeCoinProduct: (id: any) => void;
  setCouponsProductPriceFn: () => void;
  dataConfig: any;
  couponsProduct: any;
  setCouponsRoleProduct: any;
  couponsRoleProduct: any;
  setCouponsProduct: any;
  couponsLoading: any;
  setAddOfferProduct: any;
  addOfferProduct: any;
  productWallet: any;
  setWalletProduct: any;
  addCoinProduct: any;
  setAddCoinProduct: any;
  walletRoleProduct: any;
  setWalletRoleProduct: any;
  priceBasketWallet: any;
  totalCoin: any;
  ISO3: any; 
  setISO3: any;
  setTotalPrice: any;
  setCodePrice: any;
  setTotalCoin: any;
  setCodePriceCoin: any;
  codePriceCoin: any;
}
export const BasketContext = createContext<IBasketContext>(
  {} as IBasketContext,
);
export default function BasketContextProvider({
  children,
}: {
  children: ReactElement;
}) {
  const [basketsExited, setBasketsExited] = useState([]);
  const [dataConfig, setDataConfig] = useState();
  const {rolesUser,profileFn} = useContext(ProfileContext);
  const [codePriceCoin, setCodePriceCoin] = useState(0);

  
  const [walletRoleProduct, setWalletRoleProduct] = useState<boolean>(false);
  const [ISO3, setISO3] = useState("EUR");

  const [numberBasket, setNumberBasket] = useState(0);
  const [priceBasketWallet, setPriceBasketWallet] = useState(0);
  
  const [resultPrice, setResultPrice] = useState('0');
  const [resultSymbol, setResultSymbol] = useState('');
  const [numberProducts, setNumberProducts] = useState<any>([]);
  const [paymentMethods, setPaymentMethods] = useState<any>([]);
  const [userLevel, setUserLevel] = useState<any>([]);
  const [shopConfig, setShopConfig] = useState('');
  const [productWallet, setProductWallet] = useState([]);

  const [shipping, setShipping] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [codePrice, setCodePrice] = useState<string>('0');
  const [isCoupons, setCoupons] = useState<boolean>(false);
  const [couponsLoading, setCouponsLoading] = useState<boolean>(false);

  const [couponsRoleProduct, setCouponsRoleProduct] = useState<boolean>(false);

  const [couponsType, setCouponsType] = useState(0);
  const [coupon, setCoupon] = useState<string>('');

  const [defaultPrice, setDefaultPrice] = useState(0);
  const [transportation, setTransportation] = useState(0);

  const [listOrderSale, setListOrderSale] = useState<any>([]);
  const [loadingListOrderSale, setLoadingListOrderSale] = useState<any>(false);

  const [orderSaleById, setOrderSaleById] = useState<any>();
  const [couponsProduct, setCouponsProduct] = useState<any>([]);

  const [orderSalePadding, setOrderSalePadding] = useState<any>([]);
  const [orderSaleCompleted, setOrderSaleCompleted] = useState<any>([]);
  const [orderSaleCancel, setOrderSaleCancel] = useState<any>([]);
  const [orderSaleWhiting, setOrderSaleWhiting] = useState<any>([]);
  const [arrayFavorite, setArrayFavorite] = useState<any>([]);
  const [loadingPay, setLoadingPay] = useState<any>(false);
  const [pointProducts, setPointProducts] = useState<any>(0);
  const [resultPriceNotVat, setResultPriceNotVat] = useState<any>(0);
  const [couponsData, setCouponsData] = useState<any>();
  const [addOfferProduct, setAddOfferProduct] = useState<any>([]);
  const [addCoinProduct, setAddCoinProduct] = useState<any>([]);
  const [vatShipping, setVatShipping] = useState<any>(0);
  const [vatTransportation, setVatTransportation] = useState<any>(0);
  const [chackRole, setChackRole] = useState<any>("");
  const [totalCoin, setTotalCoin] = useState<any>(0);

useEffect(() => {
  setChackRole(rolesUser)
}, [rolesUser])

  function paymentMethodsFn() {
    AC.paymentMethodsAc().then(res => {
      setPaymentMethods(res);
    });
  }
  function addToBasketCoin(product: ProductVariation) {
    let point = product?.point;
    setTotalCoin(totalCoin+product.sale_price.value)
    console.log('ProductVariation', product);
    
    console.log('point', product?.point);
    // alert(product?.point);
    if (point != null) {
      setPointProducts(point + pointProducts);
    }
    const filter = basketsExited.filter(val => {
      return val.id == product.id;
    });
    console.log(filter);
    setNumberBasket(numberBasket + 1);
    if (filter.length == 0) {
      let bask = {...product, numberBasket: 1};
      setBasketsExited([...basketsExited, bask]);
    } else {
      let dataP = basketsExited;
      dataP.map((val, index) => {
        if (val.id == product.id) {
          dataP[index] = {...product, numberBasket: val.numberBasket + 1};
        }
      });
      console.log('dataP', dataP);
    
      setBasketsExited(dataP);
    }
  }
  function removeToBasketCoin(product: ProductVariation) {
  
    let point = product.point;
    if (point != null) {
      setPointProducts(point - pointProducts);
    }
    setNumberBasket(numberBasket - 1);
    if (product.numberBasket == 1) {
      setBasketsExited(
        basketsExited.filter(function (val) {
          return val.id !== product.id;
        }),
      );
    } else {
      let dataP = basketsExited;
      dataP.map((val, index) => {
        if (val.id == product.id) {
          dataP[index] = {...product, numberBasket: val.numberBasket - 1};
        }
      });
      console.log('dataP', dataP);

      setBasketsExited(dataP);
    }
  }
  function addToBasket(product: ProductVariation) {
  
    const point = product?.point;
    console.log('ProductVariation', product);
    console.log('point', point);
    if (point != null) {
    setPointProducts(prevPointProducts => prevPointProducts + point);
    }
    
    const filter = basketsExited.filter(val => val.id === product.id);
    console.log(filter);
    setNumberBasket(prevNumberBasket => prevNumberBasket + 1);
    if (filter.length === 0) {
    const bask = {...product, numberBasket: 1};
    setBasketsExited(prevBasketsExited => [...prevBasketsExited, bask]);
    } else {
    const dataP = basketsExited.map(val => {
    if (val.id === product.id) {
    return {...product, numberBasket: val.numberBasket + 1};
    }
    return val;
    });
    console.log('dataP', dataP);
    setBasketsExited(dataP);
    }
    
    const salePriceValue = product?.sale_price.value ?? 0;
    const salePriceValueNotVat = product?.sale_price.value_not_vat ?? 0;
    const transportationGrossValue = parseFloat(product?.transportation?.gross_value.toFixed(2)) ?? 0;
    
    const price = parseFloat(resultPrice) + parseFloat(salePriceValue);
    const transport = transportation + transportationGrossValue;
    const priceNotVat = parseFloat(resultPriceNotVat) + parseFloat(salePriceValueNotVat);
    console.log('parseFloat', price);
    console.log('value_not_vat', salePriceValueNotVat);
    console.log('priceNotVat', priceNotVat);
    setResultPrice(price);
    setResultPriceNotVat(priceNotVat);
    setTransportation(transport);
    
    let plusT = 0;
    if(chackRole==="partner" ){
    if( transport > dataConfig?.transportation_rule?.min_partner_amount) {
    plusT = transport;
   
    setShipping(transport);
    } else {
    plusT = vatTransportation;
    setShipping(vatTransportation);
    }
  }
    let plusS = 0;
    if(chackRole!=="partner" ){
      if( price < shopConfig?.shipping_cost_rule?.min_amount) {
    setShipping(vatShipping);
    plusS = vatShipping;
    } else {
    setShipping(0);
    plusS = 0;
    }
  }
    
    const totalPrice = price + plusS +plusT;
    setTotalPrice(totalPrice);
    setDefaultPrice(totalPrice);
    setResultSymbol('€');
    }
  function removeToBasket(product: ProductVariation) {
    const transportationGrossValue = parseFloat(product?.transportation?.gross_value.toFixed(2)) ?? 0;
    const transport = transportation - transportationGrossValue;
    setTransportation(transport);
    let point = product.point;
    if (point != null) {
      setPointProducts(point - pointProducts);
    }
    setNumberBasket(numberBasket - 1);
    if (product.numberBasket == 1) {
      setBasketsExited(
        basketsExited.filter(function (val) {
          return val.id !== product.id;
        }),
      );
    } else {
      let dataP = basketsExited;
      dataP.map((val, index) => {
        if (val.id == product.id) {
          dataP[index] = {...product, numberBasket: val.numberBasket - 1};
        }
      });
      console.log('dataP', dataP);

      setBasketsExited(dataP);
    }
    let price =
      parseFloat(resultPrice) - parseFloat(product?.sale_price?.value);
  

    let priceNotVat =
      parseFloat(resultPriceNotVat) -
      parseFloat(product?.sale_price?.value_not_vat);

    setResultPrice(price);
    setResultPriceNotVat(priceNotVat);
    
    let plusT = 0;
    if(chackRole=="partner") {
      if (
        transport> dataConfig?.transportation_rule?.min_partner_amount 
      ) {
        plusT = transport;
        setShipping(transport);
       
      }else{
        plusT = vatTransportation;
       
        setShipping(vatTransportation);
      }
    }
      let plusS = 0;
      // alert(shopConfig?.shipping_cost_rule?.min_amount)
      if(chackRole!="partner") {
      if (price < shopConfig?.shipping_cost_rule?.min_amount) {
        setShipping(vatShipping);
        plusS = vatShipping;
      } else {
        setShipping(0);
        plusS = 0;
      }
    }
    setTotalPrice(price + plusS + plusT);
    setDefaultPrice(price + plusS + plusT);

    if (numberBasket <= 0) {
      setShipping(0);
      setTotalPrice(0);
      setDefaultPrice(0);
    }
    setResultSymbol('€');
  }
  function bulkAdd(id) {
    setLoadingPay(true);
    let product = basketsExited.map(value => {
      return {count: value.numberBasket, product_variation_id: value.id};
    });
    console.log('BasketBulkModel', BasketBulkModel.items);

    let params = (BasketBulkModel.items = product);
    return AC.BasketsAc(params).then(res => {
      console.log('bulkAdd', res);
      return crateOrderSale(id).then(res => {
        if (res) {
          setTotalPrice(0);
          setResultPrice(0);
          setDefaultPrice(0);
          setBasketsExited([]);
          console.log('bulkAdd', res);
          setNumberBasket(0);
          orderSale();

          orderSale();
        }
        setLoadingPay(false);
        return res;
      });
    });
  }
  useEffect(()=>{ closeBasket()},[])
  function closeBasket() {
    setBasketsExited([]);
    setAddCoinProduct([]);
    setNumberBasket(0);
    setTotalCoin(0);
    setDefaultPrice(0);
    setTotalPrice(0);
    setResultPrice(0);
    setLoadingPay(false);
  }
  function crateOrderSale(data: BasketAddForPay) {
    return AC.crateOrderSaleAc(data).then(res => {
      return res;
    });
  }
  function walletCoinFn(max: number) {
    return AC.walletCoinAc(max).then(res => {
      setProductWallet(res);
      return res;
    });
  }
  function orderSale() {
    setLoadingListOrderSale(true);

    AC.orderSalesAc().then(res => {
      console.log('orderSale', res);
      const result = Array.isArray(res);
      if (result) {
        setListOrderSale(res);
      }

      setLoadingListOrderSale(false);
      // res.forEach(element => {
      //   setOrderSalePadding([...orderSalePadding, element]);
      // });
    });
    setTimeout(() => {
      setLoadingListOrderSale(false);
    }, 1000);
  }
  function closeCouponsFn() {
    setCouponsType(0);
    setTotalPrice(defaultPrice);
    setCodePrice(0)
    setTotalCoin(0)
    setCoupons(false);
  }
  function setCouponsProductPriceFn() {
    if (couponsData?.amount != null) {
      let offer = (totalPrice * couponsData?.amount) / 100;
      let price = totalPrice - offer;
      if (price <= 0) {
        setCouponsType(1);
        setCoupons(false);
      } else {
        setCouponsType(2);
        setCoupons(true);
        setCodePrice(offer + '');
        setTotalPrice(price);
        // setCoupon(code);
      }
    } else {
      setCouponsType(3);
    }
  }
  function removeProductOfferFn() {
    let change = basketsExited.filter(x => typeof x?.offer === 'undefined');
    setCouponsProduct([]);
    setCouponsRoleProduct(false);
    setBasketsExited(change);
  }
  function couponsFn(code: string) {
    removeProductOfferFn();
    setCoupons(false);
    setCouponsLoading(false);
    AC.couponsAc(code).then(offerData => {
      setCouponsLoading(true);

      if (offerData?.min_amount != null) {
        AC.couponsIdAc(offerData?.id).then(res => {
          setCouponsProduct(res);
        });
        let offer = (totalPrice * offerData?.amount) / 100;
        let price = totalPrice - offer;
        if (price <= 0) {
          setCouponsType(1);
          setCoupons(false);
        } else {
          setCodePrice(offer + '');
          setCoupon(code);
        }
      } else {
        setCouponsType(3);
      }
      setCouponsData(offerData);
    });
  }
  function favoritesAddFn(id: number) {
    AC.favoritesAddAc(id).then(res => {
      console.log('favoritesAddFn', res);
    });
  }

  function favoritesFn() {
    AC.favoritesAc().then(res => {
      console.log('favoritesFn', res);
      setArrayFavorite(res);
    });
  }
  function orderSaleIDFn(id: number) {
    setOrderSaleById(null);
   return AC.orderSaleIDAc(id).then(res => {
      setOrderSaleById(res);
    });
  }
  function userLevelFn() {
    AC.userLevelAc().then(res => {
      let data = res?.map(value => {
        console.log('====================================');
        console.log('countriesFn', value.id + '' + value?.person?.full_name);
        console.log('====================================');
        return {label: value?.person?.full_name, value: value.id};
      });
      setUserLevel(data);
    });
  }

  function removeCoinProduct(item) {
    setTotalCoin(totalCoin-item.sale_price.value)
    setNumberBasket(numberBasket - 1);
    const change = basketsExited.filter(
      x => x?.id != item?.id || typeof x?.coin === 'undefined',
    );
    const changeOffer = addCoinProduct.filter(x => x != item);
    setBasketsExited(change);
    setAddCoinProduct(changeOffer);
    setProductWallet([...productWallet, item]);
  }
  function removeOfferProfuct(item) {
    setNumberBasket(numberBasket - 1);
    const change = basketsExited.filter(
      x => x?.id != item?.id || typeof x?.offer === 'undefined',
    );
    const changeOffer = addOfferProduct.filter(x => x != item);
    setBasketsExited(change);
    setAddOfferProduct(changeOffer);
    setCouponsProduct([...couponsProduct, item]);
  }
  function bulkAddSendPartner(id) {
    setLoadingPay(true);
    let product = basketsExited.map(value => {
      return {
        count: value.numberBasket,
        product_variation_id: value.id,
        order_position_type: 'Product Variation',
      };
    });

    let params = (BasketBulkModel.items = product);
    return AC.BasketsAc(params).then(res => {
      if (res.created_by == null) {
        return false;
      }
      console.log('bulkAdd', res);
      return sendUserFn(id).then(res => {
        return res;
      });
    });
  }
  function sendUserFn(id: number) {
    return AC.sendUserAc(id).then(res => {
      if (res == 'null') {
        return false;
      }
      return true;
    });
  }
  function shopConfigFn() {
    return AC.shopConfigAc().then(res => {
      if (res == 'null') {
        return false;
      }
      return true;
    });
  }
  function dataConfigFn() {
   
      return profileFn().then((rule)=>{

        setChackRole(rule)
   
    return AC.dataConfigAc().then(res => {
      setDataConfig(res);
      setShopConfig(res);
      if(res?.country){
        setISO3(res?.country?.currency?.iso3);

      var vat =res?.country?.default_vat/100;
      setVatShipping(res?.shipping_cost_rule?.amount*(vat+1));
      setVatTransportation(res?.transportation_rule?.partner_cost*(vat+1))
  
      if (rule === "partner" ) {
        setShipping(res?.transportation_rule?.partner_cost*(vat+1));
      } 
    
   
      if (rule !== "partner" ) {
    
        setShipping(res?.shipping_cost_rule?.amount*(vat+1));
      }

    }
   

      if (res == 'null') {
        return false;
      }
      return true;
    });
  });
  }

  return (
    <BasketContext.Provider
      value={{
        loadingPay,
        shopConfigFn,
        setCouponsProductPriceFn,
        shopConfig,
        addToBasket,
        basketsExited,
        dataConfigFn,
        dataConfig,
        numberBasket,
        resultPrice,
        resultSymbol,
        userLevelFn,
        userLevel,
        sendUserFn,
        removeToBasket,
        bulkAdd,
        bulkAddSendPartner,
        orderSale,
        listOrderSale,
        orderSalePadding,
        transportation,
        orderSaleCompleted,
        orderSaleCancel,
        orderSaleWhiting,
        crateOrderSale,
        numberProducts,
        paymentMethodsFn,
        couponsProduct,
        paymentMethods,
        shipping,
        totalPrice,
        couponsFn,
        isCoupons,
        setCoupons,
        setCouponsRoleProduct,
        couponsRoleProduct,
        couponsLoading,
        codePrice,
        favoritesAddFn,
        arrayFavorite,
        favoritesFn,
        loadingListOrderSale,
        closeCouponsFn,
        orderSaleIDFn,
        orderSaleById,
        couponsType,
        coupon,
        closeBasket,
        productWallet,
        walletCoinFn,
        setProductWallet,
        pointProducts,
        resultPriceNotVat,
        setCouponsProduct,
        setAddOfferProduct,
        addOfferProduct,
        removeOfferProfuct,
        setAddCoinProduct,
        addCoinProduct,
        removeToBasketCoin,
        addToBasketCoin,
        setWalletRoleProduct,
        walletRoleProduct,
        removeCoinProduct,
        priceBasketWallet,
        dataConfig,
        totalCoin,
        ISO3,
        setCodePrice,
        setTotalPrice,
        codePriceCoin,
        setCodePriceCoin,
        setTotalCoin
      }}>
      {children}
    </BasketContext.Provider>
  );
}
