import { useEffect } from "react";

const Doc = () => {
  useEffect(() => {
    document.title = "Freight-Admin";
  }, []);

  return null;
};

export default Doc;
