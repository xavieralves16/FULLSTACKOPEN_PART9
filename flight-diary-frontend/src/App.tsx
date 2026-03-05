import { useState, useEffect } from "react";
import { type DiaryEntry, type NewDiaryEntry } from "./types";
import { getAllDiaries, createDiary } from "./services/diaryService";
import axios from "axios";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    getAllDiaries()
      .then((data) => setDiaries(data))
      .catch((err) => console.error("Error fetching diaries:", err));
  }, []);

  const addDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newDiary: NewDiaryEntry = {
      date,
      visibility: visibility as any,
      weather: weather as any,
      comment,
    };

    try {
      const returnedDiary = await createDiary(newDiary);
      setDiaries(diaries.concat(returnedDiary));
      setErrorMessage(null); // limpa erro
      setDate("");
      setVisibility("");
      setWeather("");
      setComment("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // tenta pegar a mensagem do backend
        const backendMessage = (error.response?.data as { error?: string })?.error;
        setErrorMessage(backendMessage ?? error.message);
      } else {
        setErrorMessage("Unknown error");
      }
    }
  };

  const visibilityOptions = ["great", "good", "ok", "poor"];
  const weatherOptions = ["sunny", "rainy", "cloudy", "stormy", "windy"];

  return (
    <div>
      <h1>Add new entry</h1>

      {errorMessage && (
        <div style={{ color: "red", marginBottom: "1rem" }}>
          Error: {errorMessage}
        </div>
      )}

      <form onSubmit={addDiary}>
        <div>
          date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          visibility
          {visibilityOptions.map((v) => (
            <label key={v} style={{ marginLeft: "0.5rem" }}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={visibility === v}
                onChange={(e) => setVisibility(e.target.value)}
                required
              />
              {v}
            </label>
          ))}
        </div>

        <div>
          weather
          {weatherOptions.map((w) => (
            <label key={w} style={{ marginLeft: "0.5rem" }}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={weather === w}
                onChange={(e) => setWeather(e.target.value)}
                required
              />
              {w}
            </label>
          ))}
        </div>

        <div>
          comment
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <button type="submit">add</button>
      </form>

      <h1>Flight Diaries</h1>

      {diaries.map((diary) => (
        <div key={diary.id} style={{ borderBottom: "1px solid #ccc", marginBottom: "0.5rem" }}>
          <h3>{diary.date}</h3>
          <div>visibility: {diary.visibility}</div>
          <div>weather: {diary.weather}</div>
          {diary.comment && <div>comment: {diary.comment}</div>}
        </div>
      ))}
    </div>
  );
};

export default App;