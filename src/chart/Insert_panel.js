import React, {Component, useState, useEffect, useReducer, useCallback, useRef} from 'react';
import { InputGroup, Button } from 'react-bootstrap';

function reducer(state, action){
    return{
        ...state, [action.name]: action.value
    };
}

const Insert_panel = (props) => {    //main 
    const [state, dispatch] = useReducer(reducer, {date:'', temp:'', moist:''});
    const {date, temp, moist} = state;
    const inputE1 = useRef(null);
    const {onUpdate} = props;

    const handleChange = (e) =>{
        dispatch(e.target);
    }
    const addData = useCallback(e =>{
        e.preventDefault();
        //useMemo(()=>{ onUpdate({date:date, temp:temp, moist:moist})},[date]);
        onUpdate({date:date, temp:temp, moist:moist});
        inputE1.current.focus();    //current 값 = 실제 엘리먼트 / focus
    },[date, temp, moist]);
    useEffect(() => {

        return()=>{

        }
    },[date]);
    return(
        <div>
            <form onSubmit={addData}>
                <input placeholder="일시" name="date" value={date} onChange={handleChange} ref={inputE1}/>
                <p/>
                <input placeholder="기온" name="temp" value={temp} onChange={handleChange}/>
                <p/>
                <input placeholder="습도" name="moist" value={moist} onChange={handleChange}/>
                <p/>
                <Button variant="secondary" value="register" type="submit">등록</Button>
            </form>
            
        </div>
    );
} //function
export default Insert_panel;