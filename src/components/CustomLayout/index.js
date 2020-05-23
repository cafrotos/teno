import React from 'react';
import { Layout, Button } from '@ui-kitten/components';
import { getIcon } from 'utils';

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
        showButton && <Button
          style={{ height: 50, width: 50, borderRadius: 50, position: "absolute", bottom: 15, right: 15 }}
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