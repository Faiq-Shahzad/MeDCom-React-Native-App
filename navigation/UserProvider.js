import {createContext} from 'react';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [doctor, setDoctor] = useState(null);

  return (
    <UserContext.Provider value={[doctor, setDoctor]}>
      
    </UserContext.Provider>
  );
};
