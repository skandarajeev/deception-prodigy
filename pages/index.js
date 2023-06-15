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

              <div className={styles.leftSection}>
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 400 400">
                  <path fill="#1DA1F2" d="M100 0C44.8 0 0 44.8 0 100s44.8 100 100 100 100-44.8 100-100S155.2 0 100 0zm39.2 61.6c.1 1.4.1 2.8.1 4.4 0 44.4-33.6 95.2-95.2 95.2-18.8 0-36.4-5.5-51.2-15.2 2.6.3 5.3.5 8.2.5 16.1 0 30.9-5.5 42.5-14.6-14.5-.3-26.7-9.8-31.1-23 2 .4 4 .6 6.1.6 2.9 0 5.7-.4 8.3-1.3-14.5-3-25.3-15.5-25.3-30.4v-.4c4.1 2.2 8.8 3.5 14 3.6-8.2-5.5-13.5-14.8-13.5-25.4 0-5.5 1.4-10.6 3.8-15.1 13.9 17 34.6 28.1 58 28.8-1.3-5.5-1.9-11.2-1.9-17 0-40.8 33.2-74 74-74 21.2 0 40.8 9 54.3 23.6 17-3.4 33-9.6 46.9-18.2-4.4 14-13.8 25.8-26 33.4 11.9-1.4 23.2-4.6 33.7-9.4-8 11.9-18 22.3-29.6 30.4z"/>
                </svg>
              </div>

              {/* RIGHT SECTION */}

                <div className={styles.rightSection}>
                  <div className = {styles.topSection}>

                    <h1 className={styles.author}><span className={styles.authorName}>{card.author}</span></h1>
                    {/* <h1 className={styles.author}>{"@" + card.author}</h1> */}

                  </div>

                  <div className={styles.content}>
                    <h1 className={styles.text}>{card.value}</h1>
                  </div>

                  <div className={styles.statsSection}>
                    <div className={styles.statFragment}>
                        <svg class="feather feather-message-circle sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                        <p>23</p>
                    </div>

                    <div className={styles.statFragment}>
                      <svg class="feather feather-heart sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                      <p>32</p>
                    </div>

                    <div className={styles.statFragment}>
                      <svg class="feather feather-send sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                      <p>44</p>
                    </div>

                </div>
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
