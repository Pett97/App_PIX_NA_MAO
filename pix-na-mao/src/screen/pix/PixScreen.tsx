import { Link, useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Icon } from 'react-native-paper';

import Chave from '../../components/Chave/Chave';
import { ChavePixDatabase, useChavePixDatabse } from '../../database/useChavesPixDatabase';
import StylePixScreen from './StylePixScrenn';

export default function PixScreen() {
  const DB = useChavePixDatabse();
  const router = useRouter();
  const [chaves, setChaves] = React.useState<ChavePixDatabase[]>([]);

  //para puxar os dados
 useFocusEffect(
    useCallback(() => {
      list();
    }, [])
  );

  async function list() {
    try {
      const response = await DB.getAll();
      setChaves(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={StylePixScreen.container}>
      <Link href={"chaves_pix/NewChave"}>
        {" "}
        <Icon source="plus-circle" size={20} />
        Adicionar Nova Chave
      </Link>
      <View style={{ flex: 1, margin: 15 }}>
        <FlatList
          data={chaves}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Chave
              nome_recebedor={item.nome_recebedor}
              cidade_recebedor={item.cidade_recebedor ?? "GURAPAUVA"}
              chave_pix={item.chave_pix}
              action={() => {router.push(`chaves_pix/${item.id}`)}}
              secondAction={()=>{console.log("123123123")}}
            ></Chave>
          )}
        ></FlatList>
      </View>
    </View>
  );
}
