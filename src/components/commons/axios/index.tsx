// axios.tsx
import axios from "axios";
import React from "react";
import type { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

export const AxiosContext = React.createContext<AxiosInstance>(instance);

interface IProps {
  children: React.ReactNode;
}

const AxiosProvider: React.FC<IProps> = ({ children }) => {
  return (
    <AxiosContext.Provider value={instance}>{children}</AxiosContext.Provider>
  );
};

export default AxiosProvider;
