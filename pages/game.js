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
        <div className = {styles.progress}>
          {progress.map((card) => (
            <div className={styles.card}>
              <h1 className={styles.text}>{card.value}</h1>
              
              <div className= {styles.statsSection}>
                <svg class="feather feather-heart sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                <svg class="feather feather-message-circle sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                <svg class="feather feather-repeat sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
              </div>
              
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
