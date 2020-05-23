import React from 'react';
import { TabBar, Tab } from '@ui-kitten/components';
import { getIcon } from 'utils';

export default ({ navigation, state }) => {
  return (
    <TabBar
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}
    >
      <Tab icon={getIcon({ name: "home-outline" })} />
      <Tab icon={getIcon({ name: "book-open-outline" })} />
      <Tab icon={getIcon({ name: "calendar-outline" })} />
      <Tab icon={getIcon({ name: "image-outline" })} />
      <Tab icon={getIcon({ name: "settings-outline" })} />
    </TabBar>
  );
}