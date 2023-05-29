import useSWR from "swr";
import { useState, useEffect } from "react";

export function createCard(data, cardNumber) {
  return (
    //USE HOOKS TO RUN THE BUTTONS
    <div id="divChoices" align="center">
      <h1>{data.start.value}</h1>
      {choices(data)}
    </div>
  );
}

export default function page() {
  const [card, newChoice] = useState("start");
  function createCard(value) {
    return <h1>{value}</h1>;
  }

  const fetcher = (data) =>
    fetch(data, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chosen: card }),
    }).then((data) => data.json());

  const { data, error, isLoading, mutate } = useSWR("/api/hello", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  if (isLoading) return <h1 align="center">Loading ...</h1>;
  if (error) return <h1>error</h1>;
  if (data) {
    return (
      <div>
        {createCard(data.value)}
        {data.children.map((choice) => (
          <button
            name="choice"
            align="center"
            key={choice.id}
            onClick={async () => {
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
