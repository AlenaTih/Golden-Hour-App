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

    const [sunsetTime, setSunsetTime] = useState<number | null>(null)

    const [location, setLocation] = useState({
        longitude: 0,
        latitude: 0,
    })

    const [isButtonClicked, setIsButtonClicked] = useState(false)

    const [weatherData, setWeatherData] = useState("")

    const [iconUrl, setIconUrl] = useState("")

    const apiKey = "8af606c0008cbd969fafbea21b7c4ab6" // My OpenWeatherMap API key

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
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

        // Check validity of the form
        if (!formData.city) {
            alert("Please type in a city")
            return
        }

        setIsButtonClicked(true)
    }

    useEffect(() => {
        const fetchLocationData = async () => {
            try {
              const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${formData.city}&limit=1&appid=${apiKey}`)
              
              if (response.data.length > 0) {
                const { lat, lon } = response.data[0]
                setLocation({ latitude: lat, longitude: lon })
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
        // Use the longitude and latitude to get the sunset time from the OpenWeatherMap API
        if (location.latitude && location.longitude) {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}`
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const unixSunsetTime = data.sys.sunset
                    const date = new Date(unixSunsetTime * 1000) // Convert from seconds to milliseconds
                    const sunsetTimeInHours = date.getHours()
                    setSunsetTime(sunsetTimeInHours)

                    const weatherDescription = data.weather[0].description
                    // console.log(data)
                    setWeatherData(weatherDescription)
	
                    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                    setIconUrl(iconUrl)
                })
                .catch(error => {
                    console.error(error)
                })
                .finally(() => {
                    setIsButtonClicked(false)
                })
        }

        // return () => {
        //     console.log("Clean up")
        // }

    }, [location])

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
            
                {sunsetTime && (
                    <div className="golden-hour-result-container">
                        <p className="golden-hour-result-text">
                            You can see the golden hour 
                            from {sunsetTime - 1} to {sunsetTime} in {formData.city}.
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
                            src={iconUrl} />
                    </div>
                )}
        </div>
    )
}

export default GoldenHour
