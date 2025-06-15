import { useContext, createContext, setContext } from "react";

export const ShorturlsContext = createContext(undefined);

export const useShorturlsContext = () => {
  const context = useContext(ShorturlsContext);
  if (context === undefined) {
    throw new Error("ShorturlsContext must be used within a ShorturlsProvider");
  }
  const { shortUrls, setShortUrls } = context;
  return { shortUrls, setShortUrls };
};

export const useEditShortUrlContext = () => {
  const context = useContext(ShorturlsContext);
  if (context === undefined) {
    throw new Error("ShorturlsContext must be used within a ShorturlsProvider");
  }
  const { editId, setEditId, editData, setEditData } = context;
  return { editId, setEditId, editData, setEditData };
};

export const useNewShortUrlContext = () => {
  const context = useContext(ShorturlsContext);
  if (context === undefined) {
    throw new Error("ShorturlsContext must be used within a ShorturlsProvider");
  }
  const { newUrl, setNewUrl, creating, setCreating } = context;
  return { newUrl, setNewUrl, creating, setCreating };
};

export const ShorturlsProvider = ({ children }) => {
  const [shortUrls, setShortUrls] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ fullUrl: "", shortUrl: "" });
  const [newUrl, setNewUrl] = useState({ fullUrl: "", shortUrl: "" });
  const [creating, setCreating] = useState(false);

  return (
    <ShorturlsContext.Provider
      value={{
        shortUrls,
        setShortUrls,
        editId,
        setEditId,
        editData,
        setEditData,
        newUrl,
        setNewUrl,
        creating,
        setCreating,
      }}
    >
      {children}
    </ShorturlsContext.Provider>
  );
};
