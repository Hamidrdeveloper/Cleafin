import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator
} from "react-native";

import { Document, Edit, Location,IconlyProvider } from "react-native-iconly";
import Avatar from "../../components/avatar";
import { BackgroundForm, ButtonColor, HandleEvent } from "../../css/main.style";
import { Color } from "../../infrastructuer/theme/colors.style";
import { Space } from "../../infrastructuer/theme/space.style";
import { AuthContext } from "../../service/Auth/Auth.context";
import { MainContext } from "../../service/Main/Main.context";
import { PartnerContext } from "../../service/Partner/Partner.context";
import { Partners } from "../../service/Partner/type";
import { LocationPartner } from "../loactionPartner";
import { LoadingButton } from "../../components/buttonLoading";
import { SignUpModel } from "../../service/Auth/model";
import { widthFullScreen } from "../../utils/main";
import i18n from "../../core/i18n/config";
import MapPartner from "../../components/mapPartner/MapPartner";
import { TextInputSign } from "./style/signUp.style";

const height = Dimensions.get("screen").height;
export default function PartFive({ navigation, onChangeValue }) {
  const { partner, partnerIdFn ,isLoadingData} = useContext(PartnerContext);
  const [arrayPartner, setArrayPartner] = useState([]);
  const [openLocation, setOpenLocation] = useState(true);
  const [showList, isShowList] = useState(false);

  const [selectLocation, setSelectLocation] = useState("German");
  
   
  useEffect(() => {
    
    return setArrayPartner(partner);
  }, [partner]);
  function onPressPartnerOnMap(item: Partners) {
    console.log(item.id);
    SignUpModel.sponsor_id = item.id;
    let selectArray = arrayPartner.map((data) => {
      if (data?.id == item?.id) {
        return { ...data, select: true };
      }
      return { ...data, select: false };
    });
    setArrayPartner(selectArray);
    onSign();
    // navigation.navigate('PartnerDetailScreen');
  }
  function onPressPartner(item: Partners) {
    console.log(item.id);
    SignUpModel.sponsor_id = item.id;
    let selectArray = arrayPartner.map((data) => {
      if (data?.id == item?.id) {
        return { ...data, select: true };
      }
      return { ...data, select: false };
    });
    setArrayPartner(selectArray);
  
    // navigation.navigate('PartnerDetailScreen');
  }
  function onPressPartnerDetail(item: Partners) {
    console.log(item.id);
    SignUpModel.sponsor_id = item.id;
    let selectArray = arrayPartner.find((data) => {
      return data?.id == item?.id;
    });

    navigation.navigate("PartnerDetailScreen", {
      params: selectArray,
    });
  }
  const { isRegister, singUpFn, isLoginOpen, isRegisterOpen } =
    useContext(AuthContext);
  const { onGetUser } = useContext(MainContext);

  function onSign() {
    onChangeValue();
  }
 
  const regex = /(<([^>]+)>)/gi;
  function renderItemPartner({ item }): JSX.Element {
    console.log(item);

    return (
      <View
        style={{
          backgroundColor: item.select ? Color.brand.gryLight : "#fff",
          width: `110%`,
        }}
      >
        <Space lineH={10} />
        <TouchableOpacity onPress={() => onPressPartner(item)}>
          <View style={{ flexDirection: "row" }}>
            <Avatar
              styled={{
                width: 80,
                height: 80,
                borderRadius: 80,
                alignSelf: "center",
              }}
              onClick={() => {
                onPressPartnerDetail(item);
              }}
              src={item?.user?.avatar}
            />
            <Space lineW={15} />
            <View>
              <Text style={{ fontSize: 17, color: Color.brand.black }}>
                {item?.firstName + " " + item?.lastName}
                {/* <Text style={{fontSize: 12, color: Color.brand.green}}>
                  {'   ' + 'Level1'}
                </Text> */}
              </Text>
              <Text style={{ fontSize: 12, color: Color.brand.textGrey }}>
                {item?.address_complete?.replace(regex, ", ")}
              </Text>
              <Text style={{ fontSize: 12, color: Color.brand.textGrey }}>
                {`${i18n.t("Global.Customers")} ${item?.user_id} `}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <Space lineH={10} />
      </View>
    );
  }
  return (
    <>
      <BackgroundForm height={height - 250}>
        <View style={{ height: "100%", width: `100%`, borderRadius: 15 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent:'space-between',
              width: "100%",
              height: 70,
            }}
          >
            <LocationPartner
              open={openLocation}
              onChange={(item) => {
                setSelectLocation("Location : " + item.label);
                setOpenLocation(!openLocation);
              }}
            />
            <TouchableOpacity
              style={{
                
                
               
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
                backgroundColor: "#fff",
                width: 50,
                height: 50,
                alignSelf: "center",
                borderRadius: 50,
                bottom:10,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                isShowList(!showList);
              }}
            >
            <IconlyProvider
          primaryColor={Color.brand.black}
          secondaryColor={Color.brand.black}
          set="light"
          size="xlarge">
       
       
              {!showList?
              <Document size={"medium"} color={"#000"} />
            :<Location size={"medium"} color={"#000"}/>}
             </IconlyProvider>
            </TouchableOpacity>
            <View>
            <TextInputSign
            style={{width: 150,
              height: 50,}}
              placeholder="Name, ID"
          placeholderTextColor={'#ccc'}
         
          onChangeText={e => {
           
          }}
        
        />
          </View>
          </View>
          {/* <ScrollView showsVerticalScrollIndicator={false}> */}
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Text style={{fontSize: 14, color: Color.brand.black}}>
              {selectLocation}
            </Text>
            <HandleEvent
              onPress={() => {
                setOpenLocation(!openLocation);
              }}
              style={{
                flexDirection: 'row',
              }}>
              <Edit
                set="light"
                size={20}
                primaryColor={Color.brand.blue}
                onPress={() => {
                  setOpenLocation(!openLocation);
                }}
              />
              <Space lineW={5} />
              <Text style={{fontSize: 14, color: Color.brand.blue}}>
                {i18n.t("Global.Edit")}
              </Text>
            </HandleEvent>
          </View>
          <LocationPartner
            open={openLocation}
            onChange={item => {
              setSelectLocation('Location : ' + item.label);
              setOpenLocation(!openLocation);
            }}
          />
          <Space lineH={5} />
          
          {/* </ScrollView> */}
          <MapPartner
            partnerData={arrayPartner}
            onPress={(item) => onPressPartnerOnMap(item)}
          />
          {showList ? (
            <View
              style={{
                position: "absolute",
                backgroundColor: "#fff",
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                top: 70,
                height:`100%`
              }}
            >
              <FlatList
                style={{ backgroundColor: "transparent",height:`50%` }}
                keyExtractor={(item) => item.id}
                data={arrayPartner}
                maxToRenderPerBatch={10}
                renderItem={renderItemPartner}
              />
               <LoadingButton
          isActive={isRegister}
          width={widthFullScreen - 30}
          onNext={() => onSign()}
          title={i18n.t("Global.Submit")}
          onClose={() => {}}
        />
            </View>
          ) : null}
        </View>

        <Space lineH={10} />
       {isLoadingData==true?
        <TouchableOpacity style={{position:'absolute',alignItems:'center',justifyContent:"center",width:`100%`,height:`100%`,}}>
            <ActivityIndicator size={"large"} color={Color.brand.colorButton}/>

        </TouchableOpacity>
        :null}
      </BackgroundForm>
    </>
  );
}
