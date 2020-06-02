import React from 'react';
import { Layout, Button } from '@ui-kitten/components';
import { getIcon } from 'utils';

/**
 * 
 * @param {Object} props
 * @param {import('react-native').ViewStyle} props.style
 * 
 */
const CustomLayout = ({
  onButtonPress,
  showButton,
  style,
  children,
}) => {
  return (
    <Layout style={{ flex: 1, ...style }}>
      {children}
      {
        showButton &&
        <Button
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
            position: "absolute",
            bottom: 15,
            right: 15,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}
          accessoryLeft={getIcon({ name: "plus-outline" })}
          onPress={onButtonPress}
        />
      }
    </Layout>
  )
}

CustomLayout.defaultProps = {
  showButton: true
}

export default CustomLayout