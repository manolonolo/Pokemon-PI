import {
  GET_ALL_POKEMONS,
  GET_BY_NAME_POKEMON,
  GET_DETAILS,
  POST_POKEMON,
  GET_TYPES,
  FILTER_BY_TYPES,
  FILTER_BY_ORIGEN,
  ORDER_BY_NAME,
  ORDER_BY_ATTACK,
  RESET,
  RESET_DETAIL,
  SET_LOADING,
} from "./action.pokemons"

const initialState = {
  pokemons:[],
  types: [],
  filter: [],
  detail: {},
  backUp: [],
  errorRender: [],
}

export function rootReducer(state= initialState, action){
  switch(action.type){
    case GET_ALL_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        filter: action.payload,
        backUp: action.payload,
        errorRender: action.payload
      };//retorno la copia del estado y paso el action.

    case GET_BY_NAME_POKEMON:
      const nameSearched = state.pokemons.filter((e) => {
        return e.name === action.payload;
      });
      if (nameSearched.length !== 0) {
        return {
          ...state,
          backUp: nameSearched,
        };
      } else {
        return {
          ...state,
          pokemons: false,
        };
      }

      case GET_DETAILS:
        return { ...state, detail: action.payload };
  
      case POST_POKEMON:
        return { ...state, pokemons: state.pokemons.concat(action.payload) };
  
      case GET_TYPES:
        return { ...state, types: action.payload };
      
      case FILTER_BY_TYPES:
        const pokemons = state.pokemons;
        const typesFiltered =
          action.payload === "allTypes"
          ? pokemons
          : pokemons.filter((e) =>
              e.types.map((type) => type)[0] === action.payload ||
              e.types.map((type) => type)[1] === action.payload
            );
        return {
          ...state,
          backUp: typesFiltered,
        };

      case FILTER_BY_ORIGEN:
        let value = action.payload;
        const filterByOrigin = state.pokemons.filter((pokemons) => {
          let resultado =
            value === "pokemonApi"
              ? pokemons.id < 1500
              : value === "createdPokemon"
              ? pokemons.id >= 1500
              : false;
          return resultado;
        });
        return {
          ...state,
          backUp: value === "allOrigin" ? state.pokemons : filterByOrigin,
        };

      case ORDER_BY_NAME:
        let pokemonSort =
          action.payload === "aToZ"
            ? state.backUp.sort(function (a, b) {
                if (a.name > b.name) return 1;
                // if (b.name > a.name) return -1;
                else {
                  return -1
                }
                // return 0;
              })
            : state.backUp.sort(function (a, b) {
                if (a.name > b.name) return -1;
                else {
                  return 1
                }
                // if (b.name > a.name) return 1;
                // return 0;
              });
        return {
          ...state,
          backUp: pokemonSort,
        };
    
      case ORDER_BY_ATTACK:
        let pokemonOrderByAttack =
          action.payload === "minToMax"
            ? state.backUp.sort(function (a, b) {
                if (a.attack > b.attack) return 1;
                if (b.attack > a.attack) return -1;
                return 0;
              })
            : state.backUp.sort(function (a, b) {
                if (a.attack > b.attack) return -1;
                if (b.attack > a.attack) return 1;
                return 0;
              });
        return {
          ...state,
          backUp: pokemonOrderByAttack,
        };
  
      case RESET:
        return {
          ...state,
  
          backUp: [],
        };
  
      case RESET_DETAIL:
        return {
          ...state,
          detail: {},
        };
  
      case SET_LOADING:
        return {
          ...state,
          pokemons: action.payload ? [] : state.pokemons,
        };
  
      default:
        return state;
  }
}
