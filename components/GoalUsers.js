import { View, Text, FlatList, Button } from "react-native";
import React, { useEffect, useState } from "react";

export default function GoalUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    //we have to use a separate function because the effect function can not be marked async
    async function getUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("couldn't fetch");
        }
        console.log("success");
        // data is converted from JSON to JS object
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.log("error in fetching users data ", err);
      }
    }
    getUsers();
  }, []);

  async function addUser() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ name: "Neda" }),
        }
      );

      if (!response.ok) {
        throw new Error("couldn't post");
      }
      const newUser = await response.json();
      setUsers((prevUsers) => {
        return [...prevUsers, newUser];
      });
    } catch (err) {
      console.log("post req err ", err);
    }
  }
  return (
    <>
      <FlatList
        data={users}
        renderItem={({ item }) => {
          return <Text>{item.name}</Text>;
        }}
      />
      <Button title="add a user" onPress={addUser} />
    </>
  );
}
