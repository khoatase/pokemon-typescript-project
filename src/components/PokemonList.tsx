import React, { useEffect, useState } from "react";
import { Detail } from "../interface";

interface Props {
  abilities:
    | {
        name: string;
        ability: string;
      }[]
    | undefined;
  name: string;
  key: number;
  id: number;
  image: string;
  viewDetail: Detail;
  setViewDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonList: React.FC<Props> = (props) => {
  const { name, id, image, abilities, viewDetail, setViewDetail } = props;
  const [isSelected, setSelected] = useState<boolean>(false);

  useEffect(() => {
    setSelected(id === viewDetail?.id);
  }, [viewDetail]);
  const closeViewDetail = () => {
    setViewDetail({
      id: 0,
      isOpened: false,
    });
    // setSelected(false);
  };
  return (
    <div className="">
      {isSelected ? (
        <section className="pokemon-list-detailed">
          <div className="detail-container">
            <div
              className="detail-close"
              onClick={() => {
                closeViewDetail();
              }}
            >
              X
            </div>
            <div className="detail-info">
              <img src={image} alt="pokemon" className="detail-img" />
              <p className="detail-name">{name}</p>
            </div>
            <div className="detail-skill">
              <p className="detail-ability">Abilities: </p>
              {abilities?.map((ab: any) => {
                return <div>{ab.ability.name}</div>;
              })}
            </div>
          </div>
        </section>
      ) : (
        <section className="pokemon-list-container">
          <p className="pokemon-name">{name}</p>
          <img src={image} alt="pokemon" />
        </section>
      )}
    </div>
  );
};

export default PokemonList;
