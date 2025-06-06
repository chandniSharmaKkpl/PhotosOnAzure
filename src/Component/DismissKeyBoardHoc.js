import React from 'react';
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native'; 

export const DismissKeyboardHOC = (Comp) => {
    return ({ children, ...props }) => (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Comp {...props}>
          {children}
        </Comp>
      </TouchableWithoutFeedback>
    );
  };
  //const DismissKeyboardView = DismissKeyboardHOC(View)