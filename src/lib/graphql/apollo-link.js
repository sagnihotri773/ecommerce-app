import { HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context"; 
import { currentStoreCode } from "../../components/Util/commonFunctions";
import Cookies from 'js-cookie'; 

const errorLink = onError(({ graphQLErrors, networkError, response }) => {
  // if (graphQLErrors) {
  //     var err = graphQLErrors.reduce((r, i)=> r.concat(i?.extensions?.category),[]);
  //     var path = graphQLErrors.reduce((r, i)=> r.concat(i?.path),[]);
  //     if(err.includes('graphql-authorization') && localStorage.getItem('token')){ //Handle Invalid token
  //         //localStorage.removeItem('token');
  //        // window.location.reload();
  //         // window.location.href = "/login";
  //     } else if(path.includes('cart') && err.includes('graphql-no-such-entity')){ //Handle Cart Inactive
  //         localStorage.removeItem('cart_id');
  //         window.location.reload();
  //     }
  //     if(graphQLErrors[0]?.message === "The current customer isn't authorized.") {
  //         // CommonToastMessage({message:graphQLErrors[0]?.message});
  //         alert('tets' , graphQLErrors[0]?.message)
  //         // localStorage.clear("token");
  //     }
  // }
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = Cookies.get('token') || '';
  const store = typeof window !== 'undefined' ? currentStoreCode :" ";
  
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      // Store: store || process.env.NEXT_PUBLIC_DEFAULT_STORE,
    },
  };
});
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL + "graphql",
});

export { errorLink, authLink, httpLink };
