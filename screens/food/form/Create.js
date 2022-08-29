import React, { useEffect } from 'react';
import Form from '../../../Components/Form';
import { sum } from '../../../state/foodState';
import { localhost } from '../../../services/host.json';
import { useNavigation } from '@react-navigation/native';

export const Create = ({ props }) => {
  const { showForm2, star1, setstar1, star2, setstar2, star3, setstar3, star4, setstar4, star5, setstar5, captcha, setCaptcha, message, setMessage, setallstar, allstar } = props
  let _food = new sum(props);
  const navigation = useNavigation();
  useEffect(() => navigation.setOptions({ headerRight: () => <></> }), [showForm2]);
  return (
    <Form
      host={`${localhost}`}
      m s c
      captcha={captcha} setCaptcha={setCaptcha}
      message={message} setMessage={setMessage}
      star1={star1} setstar1={setstar1}
      star2={star2} setstar2={setstar2}
      star3={star3} setstar3={setstar3}
      star4={star4} setstar4={setstar4}
      star5={star5} setstar5={setstar5}
      allstar={allstar} setallstar={setallstar}
      onPress={() => _food.sendComment()} />
  );
};
