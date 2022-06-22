import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByOrigin,
  filterByTypes,
  orderByName,
  orderByAttack,
  resetDetail,
} from "../../redux/action.pokemons";
import "./AsideStyles.css";

export function Aside() {
  const [, setOrder] = useState("");
  const [, setTypes] = useState("allPokemon");

  const dispatch = useDispatch();
  const totalTypes = useSelector((state) => state.types);
  // const totalPokemon = useSelector((state) => state.pokemons);

  useEffect(() => {
    dispatch(resetDetail());
  }, [dispatch]);

  //Funcion de reseteo a los filtros/orden:
  function handleReset() {
    window.location.reload();
  }

  //Filtrado por el origen
  function handleFilterOrigin(e) {
    e.preventDefault();
    dispatch(filterByOrigin(e.target.value));
  }

  //Filtro por los Typos:
  function handleFilterByTypes(e) {
    e.preventDefault();
    dispatch(filterByTypes(e.target.value));
    setTypes(e.target.value);
  }

  //Orden alfebetico:
  function handleFilterName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setOrder(`Order by ${e.target.value}`);
  }

  //Orden por fuerza:
  function handleOrderByAttack(e) {
    e.preventDefault();
    dispatch(orderByAttack(e.target.value));
    setOrder(`Order by ${e.target.value}`);
  }

  return (
    <div>
      <aside class="aside-container">
        <div class= "ordenado">
          <label class="label">Sort by: </label>
          <select
            class="select"
            defaultValue="name"
            onChange={(e) => handleFilterName(e)}
          >
            <option class="options" value="name" disabled>
              Name
            </option>
            <option class="options" value="aToZ">
              A - Z
            </option>
            <option class="options" value="zToA">
              Z - A
            </option>
          </select>

          <select
            class="select"
            defaultValue="attack"
            onChange={(e) => handleOrderByAttack(e)}
          >
            <option class="options" value="attack" disabled>
              Attack
            </option>
            <option class="options" value="minToMax">
              Min to Max
            </option>
            <option class="options" value="maxToMin">
              Max to Min
            </option>
          </select>
        </div>

        <div class="filtrado">
          <label class="label">Filter: </label>
          <select
            class="select"
            defaultValue="allOrigin"
            onChange={(e) => handleFilterOrigin(e)}
          >
            <option class="options" value="allOrigin">
              All Origin
            </option>
            <option class="options" value="pokemonApi">
              Poke Api
            </option>
            <option class="options" value="createdPokemon">
              Created
            </option>
          </select>

          <select
            class="select"
            defaultValue="Types"
            onChange={(e) => handleFilterByTypes(e)}
            id="type-select"
          >
            <option class="options" value="Types" disabled>
              Types
            </option>
            <option class="options" value="allTypes">
              All Types
            </option>
            {totalTypes &&
              totalTypes
                .sort(function (a, b) {
                  if (a.name < b.name) return -1;
                  if (a.name > b.name) return 1;
                  return 0;
                })
                .map((t) => (
                  <option class="options" value={t.name} key={t.name}>
                    {t.name}
                  </option>
                ))}
          </select>
          <button class="btn-reload" onClick={(e) => handleReset(e)}>
            Reload
          </button>
        </div>
      </aside>
    </div>
  );
}
