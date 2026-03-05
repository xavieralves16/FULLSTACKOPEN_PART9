import { useEffect, useState } from "react"
import { type DiaryEntry , type NewDiaryEntry } from "./types"
import { getAllDiaries , createDiary} from "./services/diaryService"

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  const [date, setDate] = useState("")
  const [visibility, setVisibility] = useState("")
  const [weather, setWeather] = useState("")
  const [comment, setComment] = useState("")

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

  const addDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    const newDiary: NewDiaryEntry = {
      date,
      visibility: visibility as any,
      weather: weather as any,
      comment
    }

    const returnedDiary = await createDiary(newDiary)

    setDiaries(diaries.concat(returnedDiary))

    setDate("")
    setVisibility("")
    setWeather("")
    setComment("")
  }

  return (
    <div>
      <h1>Add new entry</h1>

      <form onSubmit={addDiary}>
        <div>
          date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          visibility
          <input
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          />
        </div>

        <div>
          weather
          <input
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
          />
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

      {diaries.map(diary => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <div>visibility: {diary.visibility}</div>
          <div>weather: {diary.weather}</div>
        </div>
      ))}
    </div>
  )
}

export default App