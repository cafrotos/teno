import React, { useContext } from 'react';
import { Menu, MenuItem } from '@ui-kitten/components';

import CustomLayout from 'components/CustomLayout';
import { onSignOutButtonPress } from 'utils/firebase';
import Contexts from 'utils/Contexts';

export default (props) => {
  const context = useContext(Contexts);

  const _onPressLogout = async () => {
    console.log("Press")
    const isLogout = await onSignOutButtonPress();
    if(isLogout) {
      context.setGlobalState({
        isLogin: false
      })
    }
  }

  return (
    <CustomLayout showButton={false}>
      <Menu>
        <MenuItem title="Đăng xuất" onPress={_onPressLogout} />
      </Menu>
    </CustomLayout>
  )
}