import React, { createContext, useState } from "react";
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext(); 

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    const DummyAvatar = "https://firebasestorage.googleapis.com/v0/b/medcom-e961c.appspot.com/o/avatar.png?alt=media&token=f6a81a27-c82c-4f22-9ba4-ca8ead95cb5a"

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) =>{
                    try{
                        await auth().signInWithEmailAndPassword(email, password);
                    } catch(e){
                        console.log(e);
                    }
                },
                register: async (email, password, fname, lname, phone, gender, dob, userImg) =>{
                    try{
                        await auth().createUserWithEmailAndPassword(email, password).then(()=>{
                            firestore().collection('users').doc(auth().currentUser.uid)
                            .set({
                                fname: fname,
                                lname: lname,
                                email: email,
                                phone: phone,
                                gender: gender,
                                dob: dob,
                                createdAt: firestore.Timestamp.fromDate(new Date()),
                                userImg: userImg?userImg:DummyAvatar,
                            }).catch(error => {
                                console.log('Something went wrong with added user to firestore: ', error);
                                
                            })
                        })
                        .catch(error => {
                            console.log('Something went wrong with added user to firestore: ', error);
                            
                        });

                    } catch(e){
                        console.log(e);
                    }
                },
                logout: async () =>{
                    try{
                        await auth().signOut();
                    } catch(e){
                        console.log(e);
                    }
                },
            }}
            > 
            {children}
        </AuthContext.Provider>
    );
}