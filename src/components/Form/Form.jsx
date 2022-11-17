import React, {useEffect, useState} from 'react';
import './Form.css'
import {useTelegram} from "../../hooks/useTelegram";


const Form = () => {
    const [city,setCity] = useState('');
    const [street, setStreet] = useState('');
    const [home, setHome] = useState('');
    const [apart, setApart] = useState('');
    const [subject,setSubject] = useState('physical');

    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            city,
            street,
            home,
            apart,
            subject
        }
        tg.sendData(JSON.stringify(data));
    }, [city, street, home, apart, subject])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])


    useEffect(()=>{
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    },[])

    useEffect(()=>{
        if(!city || !street || !home || !apart) {
            tg.MainButton.hide();
        }else{
            tg.MainButton.show();
        }

    },[city, street, home, apart])

    const onChangeCity = (e) => {
        setCity(e.target.value)
    }
    const onChangeStreet = (e) => {
        setStreet(e.target.value)
    }
    const onChangeHome = (e) => {
        setHome(e.target.value)
    }
    const onChangeApart= (e) => {
        setApart(e.target.value)
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }



    return (
        <div className={'form'}>
            <h3>Введите ваши данные</h3>
            <input
                className={'input'}
                type={'text'}
                placeholder={'Город'}
                value={city}
                onChange={onChangeCity}
            />
            <input
                className={'input'}
                type={'text'}
                placeholder={'Улица'}
                value={street}
                onChange={onChangeStreet}
            />
            <input
                className={'input'}
                type={'number'}
                min={'1'}
                max={'9999'}
                placeholder={'Дом'}
                value={home}
                onChange={onChangeHome}
            />
            <input
                className={'input'}
                type={'number'}
                min={'1'}
                max={'9999'}
                placeholder={'Квартира'}
                value={apart}
                onChange={onChangeApart}
            />
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'legal'}>Юр.лицо</option>
                <option value={'physical'}>Физ.лицо</option>
            </select>


        </div>
    );
};

export default Form;