import useSWR from "swr";
import { useState, useEffect } from "react";
import styles from "@/styles/game.module.css";

export default function page() {
  const [card, newChoice] = useState("start");
  const [progress, updateProgress] = useState([]);
  const [parentButton, changeParent] = useState({});

  const fetcher = (data) =>
    fetch(data, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chosen: card }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (parentButton.stay) {
          let list = progress;
          list[list.length - 1] = data;
          updateProgress(list);
        } else {
          let list = progress.concat(data);

          updateProgress(list);
        }
        return data;
      });

  const { data, error, isLoading, mutate } = useSWR("/api/hello", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  if (isLoading) return <h1 align="center">Loading ...</h1>;
  if (error) return <h1>error</h1>;
  if (data) {
    return (
      <div>
        <div className={styles.progress}>
          {progress.map((card) => (
            <div className={styles.card}>
              <h1 className={styles.author}>{card.author}</h1>
              <h1 className={styles.text}>{card.value}</h1>
            </div>
          ))}
        </div>

        {data.children.map((choice) => (
          <button
            className={styles.button54}
            align="center"
            key={choice.id}
            onClick={async () => {
              await changeParent(choice);
              await newChoice(choice.name);

              mutate();
            }}
          >
            {choice.title}
          </button>
        ))}
      </div>
    );
  }
}
