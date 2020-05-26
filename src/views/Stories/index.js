import React, { useState } from 'react';
import CustomLayout from 'components/CustomLayout';
import { useNavigation } from '@react-navigation/native';
import { STACK_NAME } from 'consts/configs';
import ListDiaries from 'components/ListDiaries';
import { Text, Layout } from '@ui-kitten/components';

export default (props) => {
  const navigation = useNavigation()
  const [data, setData] = useState([
    {
      avatar: "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/95953893_2439313736360152_2296773988199694336_n.jpg?_nc_cat=107&_nc_sid=07e735&_nc_ohc=NWhdJtFlbiUAX9-HV-c&_nc_ht=scontent.fhan2-3.fna&oh=ec45d2c1f96065e0912e842957dce0d8&oe=5EF0FCEA",
      username: "cafrotos",
      note: "Nevermind i will find someone like you, i wish nothing but the best for you too",
      date: new Date()
    },
    {
      avatar: "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/95953893_2439313736360152_2296773988199694336_n.jpg?_nc_cat=107&_nc_sid=07e735&_nc_ohc=NWhdJtFlbiUAX9-HV-c&_nc_ht=scontent.fhan2-3.fna&oh=ec45d2c1f96065e0912e842957dce0d8&oe=5EF0FCEA",
      username: "cafrotos",
      note: "Nevermind i will find someone like you, i wish nothing but the best for you too",
      date: new Date()
    },
    {
      avatar: "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/95953893_2439313736360152_2296773988199694336_n.jpg?_nc_cat=107&_nc_sid=07e735&_nc_ohc=NWhdJtFlbiUAX9-HV-c&_nc_ht=scontent.fhan2-3.fna&oh=ec45d2c1f96065e0912e842957dce0d8&oe=5EF0FCEA",
      username: "cafrotos",
      note: "Nevermind i will find someone like you, i wish nothing but the best for you too",
      date: new Date()
    }
  ]);

  const onRefresh = async () => {
    /**
     * @fixme mockup get data, return boolen value is ended data
     */
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setData([
          ...data,
          {
            avatar: "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/95953893_2439313736360152_2296773988199694336_n.jpg?_nc_cat=107&_nc_sid=07e735&_nc_ohc=NWhdJtFlbiUAX9-HV-c&_nc_ht=scontent.fhan2-3.fna&oh=ec45d2c1f96065e0912e842957dce0d8&oe=5EF0FCEA",
            username: "cafrotos",
            note: "Nevermind i will find someone like you, i wish nothing but the best for you too",
            date: new Date()
          },
          {
            avatar: "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/95953893_2439313736360152_2296773988199694336_n.jpg?_nc_cat=107&_nc_sid=07e735&_nc_ohc=NWhdJtFlbiUAX9-HV-c&_nc_ht=scontent.fhan2-3.fna&oh=ec45d2c1f96065e0912e842957dce0d8&oe=5EF0FCEA",
            username: "cafrotos",
            note: "Nevermind i will find someone like you, i wish nothing but the best for you too",
            date: new Date()
          },
          {
            avatar: "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/95953893_2439313736360152_2296773988199694336_n.jpg?_nc_cat=107&_nc_sid=07e735&_nc_ohc=NWhdJtFlbiUAX9-HV-c&_nc_ht=scontent.fhan2-3.fna&oh=ec45d2c1f96065e0912e842957dce0d8&oe=5EF0FCEA",
            username: "cafrotos",
            note: "Nevermind i will find someone like you, i wish nothing but the best for you too",
            date: new Date()
          },
          {
            avatar: "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/95953893_2439313736360152_2296773988199694336_n.jpg?_nc_cat=107&_nc_sid=07e735&_nc_ohc=NWhdJtFlbiUAX9-HV-c&_nc_ht=scontent.fhan2-3.fna&oh=ec45d2c1f96065e0912e842957dce0d8&oe=5EF0FCEA",
            username: "cafrotos",
            note: "Nevermind i will find someone like you, i wish nothing but the best for you too",
            date: new Date()
          },
          {
            avatar: "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/95953893_2439313736360152_2296773988199694336_n.jpg?_nc_cat=107&_nc_sid=07e735&_nc_ohc=NWhdJtFlbiUAX9-HV-c&_nc_ht=scontent.fhan2-3.fna&oh=ec45d2c1f96065e0912e842957dce0d8&oe=5EF0FCEA",
            username: "cafrotos",
            note: "Nevermind i will find someone like you, i wish nothing but the best for you too",
            date: new Date()
          },
          {
            avatar: "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/95953893_2439313736360152_2296773988199694336_n.jpg?_nc_cat=107&_nc_sid=07e735&_nc_ohc=NWhdJtFlbiUAX9-HV-c&_nc_ht=scontent.fhan2-3.fna&oh=ec45d2c1f96065e0912e842957dce0d8&oe=5EF0FCEA",
            username: "cafrotos",
            note: "Nevermind i will find someone like you, i wish nothing but the best for you too",
            date: new Date()
          }
        ])
        if (data.length > 100) {
          return resolve(true)
        }
        return resolve(false)
      }, 3000);
    })
  }

  const _onCreateStory = () => {
    navigation.navigate(STACK_NAME.CREATE_NOTE)
  }

  return (
    <CustomLayout
      onButtonPress={_onCreateStory}
    >
      <ListDiaries
        data={data}
        onRefresh={onRefresh}
        header={
          <Text
            category="h4"
            style={{
              paddingBottom: 36,
              paddingTop: 8,
              fontWeight: "bold"
            }}>
            Chia sẻ câu chuyện
          </Text>
        }
      />
    </CustomLayout>
  )
}