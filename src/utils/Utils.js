//import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
//import { useSafeAreaInsets } from 'react-native-safe-area-context';
//export const nStatusBarHeight = getStatusBarHeight(true);
//export const nBottomeSpace = getBottomSpace();

export const ITEM_WIDTH = 220;

/*
 * name : gfIsNull
 * desc   : 값이 NULL 인지 판별해 주는 함수("", undefined, null) 모두 true 이다.
 * param  : psVal(string)
 * return : boolean 
 */
export const gfIsNull = (psVal) => {
    // console.log(`gfIsNull Enter`);

    // console.log(`[gfIsNull] value ${psVal}`);

    // console.log(`[gfIsNull] psVal == null ${(psVal == null)}`);
    // console.log(`[gfIsNull] psVal == "" ${(psVal == "")}`);
    // console.log(`[gfIsNull] psVal == undefined ${(psVal == undefined)}`);


    return (psVal == null || psVal == "" || psVal == "undefined")
}

/*
 * name : gfLpad
 * desc   : 문자의 왼쪽 공백을 개수와 문자만큼 채워주는 함수
 * param  : psStr(string)
 * param  : pnLen(number)
 * param  : psPadStr(string)
 * return : string 
 */
export const gfLpad = (psStr, pnLen, psPadStr) => {
    
    if(psStr.length > pnLen){
        console.log("오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다.");
        return psStr;
    }

    psStr += "";
    psPadStr += "";

    while(psStr.length < pnLen) psStr = psPadStr + psStr;
    psStr = psStr.length >= pnLen ? psStr.substring(0,pnLen) : psStr;
    return psStr;
}

/*
 * name : gfRpad
 * desc   : 문자의 오른쪽 공백을 개수와 문자만큼 채워주는 함수
 * param  : psStr(string)
 * param  : pnLen(number)
 * param  : psPadStr(string)
 * return : string 
 */
export const gfRpad = (psStr, pnLen, psPadStr) => {
    
    if(psStr.length > pnLen){
        console.log("오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다.");
        return psStr;
    } 
    
    psStr += "";
    psPadStr += "";
    
    while(psStr.length < pnLen){
        psStr += psPadStr;
    }
        
    psStr = psStr.length >= pnLen ? psStr.substring(0,pnLen) : psStr;
    
    return psStr;
}
