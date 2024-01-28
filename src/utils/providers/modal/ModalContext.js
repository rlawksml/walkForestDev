import { useState, createContext } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ modalOpen, setModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};
