import { gfRpad, gfIsNull } from "./Utils";
import { CONST_BLANK_STR } from "./Const";
import dayjs from 'dayjs';
const aLogLevel = ["ERROR","WARN","DEBUG","INFO"];

/**
 * name   : gfLogMonthAndDay
 * desc   : dayjs의 인덱스, 월, 일을 로그로 남겨주는 함수
 * param  : psDate(string)
 * param  : pnIndex(number)
 * return : void 
 */
export const gfLogMonthAndDay = (psDate, pnIndex) => {
    
    const month = dayjs(psDate).get('month') + 1;
    const day = dayjs(psDate).get('date');

    if(gfIsNull(pnIndex))
        pnIndex + "";
    else
        pnIndex++;
    
    const sMsg = `${pnIndex} ${month}/${day}`;

    gfDebugLog(sMsg);
} 

/**
 * name   : gfVarLog
 * desc   : 지정된 변수의 값을 "변수명 : [변수값]"으로 로그를 남겨주는 함수
 * param  : psVarObj(object)
 * return : void 
 */
export const gfVarLog = (psVarObj) => {
    if(gfIsNull(psVarObj)){
      return "";
    } 
    for(key in psVarObj){
        const sMsg = key + " : " + psVarObj[key];
        gfDebugLog(sMsg);
    }
  }

/**
 * name   : gfLog
 * desc   : 기본(디버깅) 레벨로 로그를 찍는다.
 * param  : psMsg(string)
 * return : void 
 */
export const gfLog = (psMsg) => {
    _fnLogPrint(psMsg,"DEBUG");
}

/**
 * name   : gfDebugLog
 * desc   : 디버깅 레벨로 로그를 찍는다.
 * param  : psMsg(string)
 * return : void 
 */
export const gfDebugLog = (psMsg) => {
    //console.log("sdfds");
    _fnLogPrint(psMsg,"DEBUG");
}

/**
 * name   : gfErrorLog
 * desc   : 에러 레벨로 로그를 찍는다.
 * param  : psMsg(string)
 * return : void 
 */
export const gfErrorLog = (psMsg) => {
    _fnLogPrint(psMsg,"ERROR");
}

/**
 * name   : gfWarnLog
 * desc   : 경고 레벨로 로그를 찍는다.
 * param  : psMsg(string)
 * return : void 
 */
export const gfWarnLog = (psMsg) => {
    _fnLogPrint(psMsg,"WARN");
}

/**
 * name   : gfInfoLog
 * desc   : 정보성 레벨로 로그를 찍는다.
 * param  : psMsg(string)
 * return : void 
 */
export const gfInfoLog = (psMsg) => {
    _fnLogPrint(psMsg,"INFO");
}

/**
 * name   : _fnLogPrint
 * desc   : level [error, warn, debug, info]
 * param  : psMsg(string)
 * param  : psLevel(string)
 * return : void 
 */
const _fnLogPrint = ((psMsg, psLevel)=>{

    if(!aLogLevel.includes(psLevel)) return "";
    
    let sLoglevel = gfRpad(psLevel, 5, CONST_BLANK_STR);

    let sMsg = `[LOG LEVEL : ${sLoglevel}] ${psMsg}`;
    console.log(sMsg);
})