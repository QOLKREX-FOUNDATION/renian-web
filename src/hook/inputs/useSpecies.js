import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import specieJson from "../../../public/json/data/selects/species.json";
import { racesJson } from "../../config/constants/races";
import { firuApi } from "../../../api/firuApi";
import { WarContext } from "../../contexts/War/WarContext";
// import { LangContext } from "../../contexts/Localization/LangContext";

const lang = { locale: "es-Es" };

export const useSpecie = (specie) => {
  const { speciesData, racesData } = useContext(WarContext);
  console.log(speciesData);
  console.log(specie);
  // const { lang } = useContext(LangContext);
  const [species, setSpecies] = useState([]);
  const [races, setRaces] = useState([]);

  const handleSpecies = useMemo(() => {
    const temp = [];
    for (let i = 0; i < speciesData.length; i++) {
      temp.push({
        label:
          lang.locale === "es-Es"
            ? speciesData[i]["nameSpanish"]
            : speciesData[i]["nameEnglish"],
        value: speciesData[i]["name"],
      });
    }
    return temp;
  }, [lang.locale]);

  const handleRaces = useMemo(() => {
    const temp = [];
    console.log(racesData);
    for (let i = 0; i < racesData.length; i++) {
      console.log(racesData);
      temp.push({
        label:
          lang.locale === "es-Es"
            ? racesData[i]["nameSpanish"]
            : racesData[i]["nameEnglish"],
        value: racesData[i]["nameEnglish"],
      });
    }

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
  // const handleSpecies = useCallback(() => {
  //   const animals = [];
  //   for (let i = 0; i < speciesData?.length; i++) {
  //     animals.push({
  //       label:
  //         lang.locale === "es-Es"
  //           ? speciesData[i]["nameSpanish"]
  //           : speciesData[i]["nameEnglish"],
  //       value: speciesData[i]["name"],
  //     });
  //   }
  //   return animals;
  // }, []);

  // const handleRaces = useCallback((type) => {
  //   const races = [];
  //   const racesFilter = racesData.filter((race) => race.animal === type);
  //   console.log("racesFilter", racesFilter);
  //   try {
  //     for (let i = 0; i < racesFilter?.length; i++) {
  //       races.push({
  //         label:
  //           lang.locale === "es-Es"
  //             ? racesFilter[i]["nameSpanish"]
  //             : racesFilter[i]["nameEnglish"],
  //         value: racesFilter[i]["nameEnglish"],
  //       });
  //     }
  //     return races;
  //   } catch (error) {
  //     console.log(error);
  //     return races;
  //   }
  // }, []);

  // useEffect(() => {
  //   setSpecies(handleSpecies());
  // }, [handleSpecies]);

  // useEffect(() => {
  //   setRaces(handleRaces(type));
  // }, [type, handleRaces]);

  // return {
  //   species,
  //   races,
  // };
};
