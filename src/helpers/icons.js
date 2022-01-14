import {
    faTrash,
    faSignOutAlt,
    faEdit,
    faSpinner,
    faPlusCircle,
    faPhone,
    faMap,
    faAt,
    faKey,
    faEnvelope
  } from "@fortawesome/free-solid-svg-icons";
  import { library } from "@fortawesome/fontawesome-svg-core";
  
  const Icons = () => {
    return library.add(
      faTrash, faSignOutAlt, faEdit, 
      faSpinner, faPlusCircle, faPhone,
      faMap, faAt, faKey, faEnvelope);
  };
  
  export default Icons;