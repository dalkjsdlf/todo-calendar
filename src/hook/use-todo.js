import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { gfIsNull } from '../utils/Utils';

export default useTodo = (poSelectedDate) => {

    const TODO_LIST_KEY = "TODO_LIST";
    const defaultTodoList = [];
    const [aTodoList, setATodoList] = useState(defaultTodoList);
    const [sInput, setSInput] = useState("");

    useEffect(() => {
        init();
    }, [])
    
  const init = async () => {
    const jsonValue = await AsyncStorage.getItem(TODO_LIST_KEY);

    if(!gfIsNull(jsonValue)){
        const aTodoListLoaded = JSON.parse(jsonValue);
        setATodoList(aTodoListLoaded);
    }
  };
  
    const fnGetTodoId = () => {
        if(aTodoList.length == 0) return 1;
        const nMaxID = aTodoList.reduce((max, val) => max.id > val.id ? max.id : val.id)
        return nMaxID;
    }

    const fnResetInput = () =>{
        setSInput("");
    }


    //todolist 추가
    const fnAddTodo = (sContents) => {
        
        const tempList = [
            ...aTodoList
         , 
         {
            id : fnGetTodoId() + 1,
            content : sContents,
            date : poSelectedDate,
            isSuccess : false
         }];

         setATodoList(tempList);
         storeData(tempList);
    }

    //todolist 삭제
    const fnRemoveTodo = (nTodoId) =>{
        newATodoList = aTodoList.filter((item)=>item.id !== nTodoId);
        setATodoList(newATodoList);
        storeData(newATodoList);
    }
    //todolist 내용 수정

    const fnModifyTodo = (nTodoId, psContent) => {
        const aNewTodoList =aTodoList.map((todo)=>{
            if(todo.id !== nTodoId)return todo;

            return {
                ...todo,
                content:psContent
            }
        })

        setATodoList(aNewTodoList);
    }

    const fnUpdateSuccess = (nTodoId) => {
        
        const aNewTodoList = aTodoList.map((todo)=>{
            if(todo.id !== nTodoId)return todo;
            
            return {
                ...todo,
                isSuccess:!todo.isSuccess
            }
        })

        setATodoList(aNewTodoList);
        storeData(aNewTodoList);
    }

  const storeData = (value) => {
    const jsonValue = JSON.stringify(value);
    AsyncStorage.setItem(TODO_LIST_KEY, jsonValue);
  };

    const aFilterTodoList = aTodoList.filter((item)=>{
        return dayjs(item.date).isSame(poSelectedDate, 'date');
    });
    
    //todolist 성공/실패 처리

    return {
        aTodoList,
        aFilterTodoList,
        sInput,
        setSInput,
        fnResetInput,
        fnAddTodo,
        fnRemoveTodo,
        fnUpdateSuccess,
        fnModifyTodo
    }
}