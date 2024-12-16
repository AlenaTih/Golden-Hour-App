import {
        useState,
        useEffect,
        ChangeEvent,
        MouseEvent
    } from "react"
import axios from "axios"

function GoldenHour() {
    const [formData, setFormData] = useState({
        city: "",
    })

    const [sunsetTime, setSunsetTime] = useState<{ hours: number | null, minutes: number | null }>(
        {
            hours: null,
            minutes: null
        }
    )
 
    const [location, setLocation] = useState<{ longitude: number | null, latitude: number | null }>({
        longitude: null,
        latitude: null,
    })

    const [isButtonClicked, setIsButtonClicked] = useState(false)
    const [weatherData, setWeatherData] = useState("")
    const [iconUrl, setIconUrl] = useState("")

    const apiKey = "8af606c0008cbd969fafbea21b7c4ab6" // My OpenWeatherMap API key
    // let apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        
        // Reset states
        setSunsetTime({
            hours: null,
            minutes: null
        })
        setWeatherData("")
        setIconUrl("")

        const { name, value } = event.target

        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value,
            }
        })
    }

    function handleButtonClick(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
    
        // Reset states
        setSunsetTime({
            hours: null,
            minutes: null
        })
        setWeatherData("")
        setIconUrl("")
    
        // Check validity of the form
        if (!formData.city.trim()) {
            alert("Please type in a city")
            return
        }
    
        setIsButtonClicked(true)
    }
    

    useEffect(() => {
        const fetchLocationData = async () => {
            if (location.latitude === 0 || location.longitude === 0) {
                return
            }
            try {
              const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${formData.city}&limit=1&appid=${apiKey}`)
              
              if (response.data.length === 0) {
                alert("City not found. Please try again.")
                // Reset states
                setSunsetTime({
                    hours: null,
                    minutes: null
                })
                setIsButtonClicked(false)
                setWeatherData("")
                setIconUrl("")
                setLocation({ latitude: null, longitude: null })
                return
              }

              if (response.data.length > 0) {
                const { lat, lon } = response.data[0]
                setLocation({ latitude: lat, longitude: lon })
                // console.log(response.data)
              } else {
                alert("This city is not found")
              }
            } catch (error) {
              console.error("Error fetching data:", error)
            }
          }

          if (isButtonClicked) {
            fetchLocationData()
          }
    }, [formData.city, isButtonClicked])

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (location.latitude && location.longitude) {
                try {
                    const response = await axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}`
                    )
                    const unixSunsetTime = response.data.sys.sunset
                    const date = new Date(unixSunsetTime * 1000) // Convert from seconds to milliseconds
                    setSunsetTime({ hours: date.getUTCHours(), minutes: date.getUTCMinutes() })
                    setWeatherData(response.data.weather[0].description)
                    setIconUrl(`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
                } catch (error) {
                    alert("Failed to fetch weather data. Please try again.")
                    console.error("Error fetching weather data:", error)
                } finally {
                    setIsButtonClicked(false)
                }
            }
        }
    
        if (isButtonClicked) fetchWeatherData()
    }, [location, apiKey, isButtonClicked])
    

    return (
        <div className="golden-hour">
            <h1 className="golden-hour-title">Golden Hour App</h1>
            
            <p className="golden-hour-text">
                The golden hour is the time during one hour before sunset 
                when you can take stunning photos and just enjoy watching 
                the colors of the sky.
            </p>

            <p className="golden-hour-text">
                Find out when you can see the golden hour in your city.
            </p>

            <form className="golden-hour-form">
                <label
                    className="city-label"
                    htmlFor="city-input">
                    Type in your city
                    <input
                        className="city-input"
                        id="city-input"
                        type="text"
                        placeholder="Your city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                </label>

                <button
                    className="golden-hour-submit-button"
                    onClick={handleButtonClick}>
                        Submit
                </button>
            </form>
            
                {sunsetTime.hours && sunsetTime.minutes && location.latitude && location.longitude && (
                    <div className="golden-hour-result-container">
                        <p className="golden-hour-result-text">
                            You can see the golden hour from
                            {` ${sunsetTime.hours - 1}:${sunsetTime.minutes || '00'}`} to 
                            {` ${sunsetTime.hours}:${sunsetTime.minutes || '00'} UTC`} in {formData.city}.
                        </p>
                        <p className="golden-hour-result-text">
                            Please note that the beauty of the golden hour 
                            may vary depending on weather conditions and time of year.
                        </p>
                        <p className="golden-hour-result-text">
                            Weather condition today: {weatherData}.
                        </p>
                        <img
                            className="weather-icon"
                            src={iconUrl}
                            alt="Weather icon representing today's weather"
                        />
                    </div>
                )}
        </div>
    )
}

export default GoldenHour
