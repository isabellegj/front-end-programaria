import { useState, useEffect } from "react";
import listaImg from "../assets/lista.svg";
import { Header } from "./Header.jsx";
import { Footer } from "./Footer.jsx";

import Axios from "axios";

import styles from "../styles/content.module.css";

export function Content() {
  const [repositories, setRepositories] = useState([]);
  const [name, setName] = useState("");
  const [minibio, setMinibio] = useState("");
  const [quote, setQuote] = useState("");
  const [image, setImage] = useState("");
  const [success, setSuccess] = useState(false);
  const baseURL = "https://back-end-programaria-5knu.onrender.com/women";

  useEffect(() => {
    async function getData() {
      const response = await Axios.get(baseURL);
      setRepositories(response.data);
    }
    getData();
  }, []);

  function handleInputValuename(event) {
    setName(event.target.value);
  }

  function handleInputValueminibio(event) {
    setMinibio(event.target.value);
  }

  function handleInputValueimage(event) {
    setImage(event.target.value);
  }

  function handleInputValuequote(event) {
    setQuote(event.target.value);
  }

  function handleCreateMessage(event) {
    event.preventDefault();

    console.log("mensagem enviada", name, quote, minibio, image);

    async function sendData() {
      await Axios.post(baseURL, {
        name: name,
        quote: quote,
        minibio: minibio,
        image: image,
      });
      const response = await Axios.get(baseURL);
      setRepositories(response.data);
    }
    sendData();

    setSuccess(true);
    setName("");
    setMinibio("");
    setImage("");
    setQuote("");
  }

  return (
    <>
      <Header
        title="Mulheres em Tech Brasil"
        subtitle="Conheça personalidades femininas que estão transformando a tecnologia no Brasil"
        image={listaImg}
      />
      <div className={styles.projectsContainer}>
        <div className={styles.projectsContainer}>
          <div className={styles.cardsRepoContainer}>
            {repositories.map((repo) => {
              return (
                <div key={repo._id} className={styles.cardRepo}>
                  <div className={styles.cardImgContainer}>
                    <img className={styles.cardRepoImage} src={repo.image} />
                  </div>
                  <details>
                    <summary className={styles.cardRepoSummary}>
                      {repo.name}
                    </summary>
                    <p className={styles.cardRepoText}>{repo.minibio}</p>
                    <q className={styles.cardRepoQuote}>{repo.quote}</q>
                  </details>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        <h2 className={styles.projectsTitle}>Cadastre uma rainha tech:</h2>
        <form className={styles.form} onSubmit={handleCreateMessage}>
          <input
            onChange={handleInputValuename}
            placeholder="Digite o nome"
            value={name}
            className={styles.formInput}
          />
          <textarea
            onChange={handleInputValueimage}
            placeholder="Digite o link da imagem"
            value={image}
            className={styles.formTextArea}
          />
          <textarea
            onChange={handleInputValueminibio}
            placeholder="Digite a minibiografia"
            value={minibio}
            className={styles.formTextArea}
          />
          <textarea
            onChange={handleInputValuequote}
            placeholder="Digite a citação"
            value={quote}
            className={styles.formTextArea}
          />
          <button className={styles.formButton} type="submit">
            Enviar mensagem
          </button>
          {success && <p>Cadastro realizado com sucesso.</p>}
        </form>
      </div>
      <Footer />
    </>
  );
}
