import { React } from "react";
import dayjs from 'dayjs';
import Margin  from './Margin';
import { gfIsNull } from '../utils/Utils'
import { SimpleLineIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { FlatList, Text, View } from "react-native";
/**
 * type   : Component 
 * name   : Column
 * param  : poDate(date)
 * param  : pnColumnSize(number)
 * param  : pbIsSelected(boolean)
 * param  : pbDisabled(boolean)
*/
const Column = ({
    psText
  , psColor
  , pnColumnSize 
  , onPress
  , pbIsSelected
  , pbIsCurrMonth
  , pbDisabled
  , pbHasTodo
  , pbAllSuc})=>{

if(gfIsNull(pbIsCurrMonth)){
  pbIsCurrMonth = true;
}

if(gfIsNull(pbIsSelected)){
  pbIsSelected = false;
}

if(gfIsNull(pbHasTodo)){
  pbHasTodo = false;
}

if(gfIsNull(pbAllSuc)){
  pbAllSuc  = false;
}

const sBackColor = (pbIsSelected)?"#c2c2c2":"transparent"
const nOpacity   = (pbIsCurrMonth)?0.5:1;
const sBold      = (pbHasTodo)?'bold':'normal';

return (
    <TouchableOpacity onPress={onPress}
        style={{flexDirection:'row'
        , justifyContent:'center'
        , alignItems:'center'
        , width:pnColumnSize
        , height:pnColumnSize
        , backgroundColor:sBackColor
        , borderRadius:20
        , opacity : nOpacity
    }}
    
    disabled={pbDisabled}>
    <Text style={{color:psColor, fontWeight:sBold}}>{psText}</Text>
    <View style={{flexDirection:'col', justifyContent :'center' ,alignContent:'center'}}>
      {pbHasTodo&&!pbAllSuc&&<Text style={{fontWeight:'bold'}}>.</Text>}
    </View>

    </TouchableOpacity>
    )
}

export default Calendar = ({
    columns,
    aTodoList,
    selectedDate,
    onPressLeftArrow,
    onPressRightArrow,
    onPressHeadDate,
    onPressDate,
}) => {

/** 
  * type   : Component 
  * name   : ListHeaderComponent
  * param  : item(date)
  */
  const ListHeaderComponent = ()=>{
    
    const mon = dayjs(selectedDate).format("YYYY.MM.DD");
    return(
      <View style={{flexDirection:'col', justifyContent: 'center', alignItems : 'center'}}>
          <Margin pnSize={30}/>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={{padding:10}} onPress={onPressLeftArrow}>
              <SimpleLineIcons name="arrow-left" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={{justifyContent:"center"}}
              onPress={onPressHeadDate}
            >
              <Text style={{fontSize:20, fontWeight:'bold'}}>{mon}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{padding:10, }} onPress={onPressRightArrow}>
              <SimpleLineIcons name="arrow-right" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <Margin pnSize={10}/>
          <View style={{flexDirection:'row'}}>
            {
              [0,1,2,3,4,5,6].map((item, index)=>{
                const sColor = (item == 0)?"#e67639":(item == 6)? "#5872d1":"#000000";
                const sText = fnGetDayText(item);
                return (
                  <Column
                  psText={sText}
                  psColor={sColor}
                  pnColumnSize={30}
                  key={index}
                  pbDisabled={true}
                  />
                  )
                })
              }
          </View>
        </View>
      )
  }
  
  /** 
   * type   : Component 
   * name   : RenderItem
   * param  : item(date)
  */
  const RenderItem = ({item : date})=>{
   
  const nSelectedMonth = dayjs(selectedDate).get('month');
  const nSelectedDate = dayjs(selectedDate).get('date');
  
  const nMonth = dayjs(date).get('month');
  const nDate = dayjs(date).get('date');
  
  // 월 같지 않아 투명(disable true)
  // 월 같아 && 일 같아 선택 
  // 월 같지 않아 일 같지 않아
  const bIsSelected = (nSelectedMonth == nMonth && nSelectedDate == nDate);
  const bIsCurrMonth   = !(nSelectedMonth == nMonth);
  
  // 데이값이 0 --> 빨갱
  // 데이값이 6 --> 파랭
  const nDay  = date.get('day');
  let sColor = (nDay == 0)?"#e67639":(nDay == 6)? "#5872d1":"#000000";
  
  let bHasTodo = false;
  let bAllSuc  = false;
  if(!gfIsNull(aTodoList)){
    const aFilteredTodoList = aTodoList.filter(todo=>dayjs(date).isSame(dayjs(todo.date),'date'))

    if(!gfIsNull(aFilteredTodoList))
    {
      bHasTodo = (aFilteredTodoList.length > 0);
      bAllSuc    = bHasTodo&aFilteredTodoList.every((todo)=>todo.isSuccess);
    }

  }

  return (
    <Column
    psText        = {nDate}
    psColor       = {sColor}
    pnColumnSize  = {30}
    onPress       = {() => onPressDate(date)}
    pbIsSelected  = {bIsSelected}
    pbIsCurrMonth = {bIsCurrMonth}
    pbDisabled    = {false}
    pbHasTodo     = {bHasTodo}
    pbAllSuc       = {bAllSuc}
    />
    )
   }
   /** 
    * type   : Component 
    * name   : ListFooterComponent
    * param  : item(date)
   */
  const ListFooterComponent = ({item})=>{
    <></>
   }
   
   const fnGetDayText = (pnDayNum) =>{
    const aDays = ['일','월','화','수','목','금','토'];
    return aDays[pnDayNum];
  }

    return (
        <>
            <FlatList
                data={columns}
                numColumns={7}
                keyExtractor={(_, index)=>index}
                renderItem={RenderItem}
                ListHeaderComponent={ListHeaderComponent}
                ListFooterComponent={ListFooterComponent}
            />
        </>
    )
}
