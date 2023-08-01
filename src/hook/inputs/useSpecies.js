import { useEffect, useMemo, useState } from "react";
import specieJson from "../../../public/json/data/selects/species.json";
import { racesJson } from "../../config/constants/races";
import { firuApi } from "../../../api/firuApi";
// import { LangContext } from "../../contexts/Localization/LangContext";

const lang = { locale: "es-Es" };

export const useSpecie = (specie) => {
  // const { lang } = useContext(LangContext);
  const [species, setSpecies] = useState([]);
  const [races, setRaces] = useState([]);

  const handleSpecies = useMemo(() => {
    const temp = [];
    for (let i = 0; i < specieJson.length; i++) {
      temp.push({
        label: specieJson[i][lang.locale],
        value: specieJson[i].value,
      });
    }
    return temp;
  }, [lang.locale]);

  const handleRaces = useMemo(() => {
    const temp = [];
    for (let i = 0; i < racesJson[specie]?.length; i++) {
      temp.push({
        label: racesJson[specie][i][lang.locale],
        value: racesJson[specie][i].value,
      });
    }

    // if (specie === "") return temp;
    // firuApi.get(`races/type?type=${specie}`).then((res) => {
    //   console.log(res);
    //   for (let i = 0; i < res.data.races.length; i++) {
    //     temp.push({
    //       label: res.data.races[i]["nameSpanish"],
    //       value: res.data.races[i].value,
    //     });
    //   }
    // });

    return temp;
  }, [lang.locale, specie]);

  useEffect(() => {
    setSpecies(handleSpecies);
  }, [lang.locale, handleSpecies]);

  useEffect(() => {
    setRaces(handleRaces);
  }, [lang.locale, handleRaces]);

  return {
    species,
    races,
  };
};
