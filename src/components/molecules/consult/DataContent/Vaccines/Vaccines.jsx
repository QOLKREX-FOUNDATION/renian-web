import Image from "next/image";
import { useEffect } from "react";
import { IPFS } from "../../../../../config";
//import { URL_RENIAN } from "../../../../../config/constants/endpoints";
import { useRaceVaccines } from "../../../../../hook/consult/useVaccinesRaces";
import { useView } from "../../../../../hook/consult/useView";
import { formatDate } from "../../../../../utils/date";
import classes from "./view.module.css";

export const Vaccines = ({ pets, type = "WAR" }) => {
  const { listVaccines, handleListVaccines } = useRaceVaccines();
  const { colours, values, handleView } = useView();
  const URL_RENIAN = "https://consultwar.renian.foundation/public/images";

  useEffect(() => {
    handleView(pets);
  }, [pets.chip]);

  useEffect(() => {
    handleListVaccines(pets?.type);
  }, [pets?.type]);

  return (
    <div
      className={classes.timeline}
      style={{
        background: "#ddd",
        fontSize: "12px",
        borderRadius: "5px",
        padding: "10px 5px 10px 5px",
      }}
    >
      {values.map((value, index) => (
        <div
          key={index}
          className={`${classes.timeline__event} ${colours(
            classes,
            value,
            index
          )} `}
          style={{
            marginBottom: "20px",
            width: "70%",
            borderRadius: "20px",
          }}
        >
          <div
            className={classes.timeline__event__icon}
            style={{
              width: "40px",
              height: "40px",
              padding: "10px",
              margin: "10px",
            }}
          >
            <i>
              <img
                src={value.icon}
                alt={value.name}
                style={{
                  width: "30px",
                  height: "30px",
                }}
              />
            </i>
          </div>
          <div
            className={classes.timeline__event__date}
            style={{
              width: "12%",
              boxShadow: "0 5px 10px #ddd",
              gap: "1rem",
              padding: "0 5px",
            }}
          >
            <div
              className={classes.timeline__event__date_content}
              style={{ fontSize: ".8rem" }}
            >
              <div>
                <Image
                  src="/img/icons/vaccines/date.png"
                  width={20}
                  height={20}
                  style={{
                    cursor: "pointer",
                  }}
                  alt="date"
                  title="Fecha de Colocación"
                />
              </div>
              {formatDate(value.date)}
            </div>
            {value.next && (
              <div
                className={classes.timeline__event__date_content}
                style={{ fontSize: ".8rem" }}
              >
                <div>
                  <Image
                    src="/img/icons/vaccines/next.png"
                    width={20}
                    height={20}
                    style={{
                      cursor: "pointer",
                    }}
                    alt="date"
                    title="Próxima dosis"
                  />
                </div>
                {formatDate(value.next)}
              </div>
            )}
          </div>
          <div
            className={classes.timeline__event__content}
            style={{
              width: "70%",
              boxShadow: "500 500 1000 #ddd",
            }}
          >
            <div
              className={classes.timeline__event__title}
              // style={padding(100, 0, 0, 0)}
            >
              {value.type === "VACCINES" && "Vacunas"}

              {value.type === "DEWORMING" && (
                <>
                  Desparasitación
                  {` ${value.product}`}
                </>
              )}
              {value.type !== "VACCINES" &&
                value.type !== "DEWORMING" &&
                value.name}
            </div>
            <p className={`${classes.text} divCenter divItemCenter`}>
              {value.type === "VACCINES" || value.type === "DEWORMING" ? (
                <div className={classes.illnessDiv}>
                  {listVaccines.map((illness, index) => (
                    <>
                      {console.log("Procesando vacuna del JSON:", illness)}
                      {value.illness[illness.value] && (
                        <div
                          key={index}
                          className={classes.illness}
                          style={{
                            fontStyle: "italic",
                            padding: "10px 20px 10px 10px",
                            boxShadow: "1px 1 px 3px #555",
                          }}
                        >
                          {console.log(
                            "Vacuna encontrada en value.illness:",
                            illness["es-Es"]
                          )}
                          {illness["es-Es"]}
                        </div>
                      )}
                    </>
                  ))}

                  {type === "RENIAN" &&
                    value.illness.map((illness, index) => (
                      <div
                        key={index}
                        className={classes.illness}
                        style={{
                          fontStyle: "italic",
                          padding: "10px 20px 10px 10px",
                          boxShadow: "1px 1 px 3px #555",
                        }}
                      >
                        {illness}
                      </div>
                    ))}
                </div>
              ) : (
                value.text
              )}
            </p>
            {(value.type === "VACCINES" || value.type === "DEWORMING") && (
              <a
                href={
                  type === "WAR"
                    ? `${IPFS}${value.image}`
                    : `${URL_RENIAN}/vacimg/${value.image}`
                }
                target="_blank"
                rel="noreferrer noopener"
                style={{ textDecoration: "none" }}
              >
                <button className={classes.button}>
                  <img
                    src="/img/icons/buttons/pet.png"
                    alt="pet"
                    style={{ width: "15px" }}
                    title="PET"
                  />
                  Comprobante
                </button>
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
