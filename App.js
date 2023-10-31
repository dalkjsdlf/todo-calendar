
import {KeyboardAvoidingView, Keyboard, View, Text, FlatList, StyleSheet, Image, Pressable, SafeAreaView, Alert } from 'react-native';
import dayjs from 'dayjs';
import { gfIsNull, ITEM_WIDTH } from './src/utils/Utils'; 
import { DateTimePickerModal } from "react-native-modal-datetime-picker";
import useCalendar from './src/hook/use-calendar';
import Calendar  from './src/component/Calendar';
import useTodo from './src/hook/use-todo'
import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
import AddInput from './src/component/AddInput'


export default function App() {
  /*
  * ===============================================================
  * STATE 및 변수 선언 DEFINE START
  * ===============================================================
  */
  let oNow = dayjs();
  let { oSelectedDate,
        setOSelectedDate,
        isDatePickerVisible,
        handleConfirm,
        showDatePicker,
        hideDatePicker,
        addOneMonth,
        subtractOneMonth} = useCalendar(oNow);
        
  let {aTodoList,
    aFilterTodoList,
    sInput,
    setSInput,
    fnResetInput,
    fnAddTodo,
    fnRemoveTodo,
    fnUpdateSuccess,
    } = useTodo(oSelectedDate);
          
    const oFlatListRef = useRef(null);
  /*
  * ===============================================================
  * STATE 및 변수 선언 DEFINE END
  * ===============================================================
  */
 
 
  /*
  * ================================================================
  * 함수 정의 영역 START
  * ===============================================================
  */
  
  const ListHeaderComponent = () => {
    return (
      <View>
       <Calendar
         columns           = {aColumns}
         aTodoList         = {aTodoList}
         selectedDate      = {oSelectedDate}
         onPressLeftArrow  = {onPressLeftArrow}
         onPressRightArrow = {onPressRightArrow}
         onPressHeadDate   = {onPressHeadDate}
         onPressDate       = {onPressDate}
      />
      </View>
    );
  }

  const RenderItem = ({item : todo}) => {
    const bIsSuccess = todo.isSuccess;
    return(
      <Pressable
        onPress={() => fnUpdateSuccess(todo.id)}
        onLongPress={() => onLongPress(todo.id)}
        
      >
      <View style={{
                  flexDirection:'row',
                  width: ITEM_WIDTH, 
                  borderBottomWidth:0.2,
                  paddingHorizontal:5,
                  paddingVertical:10,
                  alignSelf:'center',
                  borderColor:"#a6a6a6"
                  }}>
          <Text style={{flex:1, fontSize:14, color: "#595959"}}>{todo.content}</Text>
        
          <Ionicons 
            name="ios-checkmark" 
            size={17} 
            color={bIsSuccess ? "#595959" : "#bfbfbf"}
            />
        </View>
      </Pressable>
    )
  }

  const ListFooterComponent = () => {
    return (<></>);
  }

  const onPressDate       = setOSelectedDate;
  const onPressHeadDate   = showDatePicker;
  const onPressLeftArrow  = subtractOneMonth;
  const onPressRightArrow = addOneMonth; 

  const onLongPress       = (todoId) => {
    Alert.alert('삭제 경고 메시지','정말로 삭제하시겠습니까?',
    [
      {
        text:'Cancel',
        onPress:()=>{},
        style:'cancel'
      },
      {
        text:'OK',
        onPress:()=>fnRemoveTodo(todoId),
      }
    ]
    );
  }
  const onPressAdd        = (psContent) => {
    if(gfIsNull(psContent)){
      Alert.alert('TO DO 입력 오류', 'TO DO 내용이 없습니다.');
      return;
    }

    fnAddTodo(psContent);
    fnResetInput();    
    fnScrollToEnd();
    
  }
  
  const onFocus           = () => {
    fnScrollToEnd();
    
  }

  const onSubmitEditing    = (psContent) => {
    if(gfIsNull(psContent)){
      Alert.alert('TO DO 입력 오류', 'TO DO 내용이 없습니다.');
      return;
    }

    fnAddTodo(psContent);
    fnResetInput();    
    fnScrollToEnd();
  }

  const fnScrollToEnd = () => {
    setTimeout(()=>{
      //oFlatListRef.current?.fnScrollToEnd({ animated: true });
    },300)
  }

   /** 
    * name   : fnGetCalColsForMonth
    * param  : poSelectedDate(Date)
    * return : Array
   */
  
  const fnGetCalColsForMonth = ((poSelectedDate)=>{

    if(gfIsNull(poSelectedDate)) return null;
    let nLastDateInMonth  = dayjs(poSelectedDate).endOf('month').get('date');
    let oFirstDateInMonth = dayjs(poSelectedDate).startOf('month');

    let aColumns = []; 
  
    for(let i = 0 ; i < nLastDateInMonth ; i++){
      const resultDate = oFirstDateInMonth.add(i,'day');
      aColumns.push(resultDate); 
    }
  
    aColumns = fnFillRestCols(aColumns);

    return aColumns;
  });

  /** 
   //달력 앞에 빈 부분 채우기
   * name   : fnFillRestCols
   * param  : paColumns(Array)
   * return : Array
   */
  const fnFillRestCols = ((paColumns)=>{
    
    if(gfIsNull(paColumns)){
      return paColumns;
    }
    
    const oFirstDate      = paColumns[0];
    const oLastDate       = paColumns[paColumns.length - 1];
    const nDayOfFirstDate = dayjs(oFirstDate).get('day');
    const nDayOfLastDate  = dayjs(oLastDate ).get('day');
    
    for(let i = 1 ; i <= nDayOfFirstDate ; i++ ){
      const resultDate = dayjs(oFirstDate).subtract(i, 'day');
      paColumns.unshift(resultDate);
    }

    //달력 뒤에 빈 부분 채우기
    for(let i = 1 ; i <= 6 - nDayOfLastDate ; i++){
      const resultDate = dayjs(oLastDate).add(i,'day');
      paColumns.push(resultDate);
    }
    return paColumns;
  });

  /*
   * ===============================================================
   * 함수 정의 영역 END
   * ===============================================================
   */

  /*
   * ===============================================================
   * HOOK DEFINE START
   * ===============================================================
   */

  /*
   * ===============================================================
   * HOOK DEFINE END
   * ===============================================================
   */

  /*
   * ===============================================================
   * 스크립트 영역 START
   * ===============================================================
   */
   
  let aColumns = fnGetCalColsForMonth(oSelectedDate);

 /*
  * ===============================================================
  * 스크립트 영역 END
  * ===============================================================
  */
 
 return (

   <Pressable 
    style={styles.container} 
    onPress={Keyboard.dismiss}
  >
    

    <Image
      source={{
        uri: "https://img.freepik.com/free-photo/white-crumpled-paper-texture-for-background_1373-159.jpg?w=1060&t=st=1667524235~exp=1667524835~hmac=8a3d988d6c33a32017e280768e1aa4037b1ec8078c98fe21f0ea2ef361aebf2c",
      }}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
      }}
      
    />
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView>
        
        <FlatList
          ref={oFlatListRef}
          data={aFilterTodoList}
          renderItem={RenderItem}
          ListHeaderComponent={ListHeaderComponent}
        />

        <AddInput
        value={sInput}
        onChangeText={setSInput}
        placeholder={`${dayjs(oSelectedDate).format("MM.D")}에 추가할 부분`}
        onPressAdd={onPressAdd}
        onFucus={onFocus}
        onSubmitEditing={onSubmitEditing}
        />

        <DateTimePickerModal
          isVisible = {isDatePickerVisible}
          mode      = "date"
          onConfirm = {handleConfirm}
          onCancel  = {hideDatePicker}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
    </Pressable>
  );
  /*
   * ===============================================================
   * JSX 영역 END
   * ===============================================================
   */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
